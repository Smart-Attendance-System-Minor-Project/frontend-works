import { ScrollView,View, Text,StyleSheet ,TouchableOpacity,Modal,Pressable, TextInput} from 'react-native'
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store'
import { FontAwesome5,MaterialCommunityIcons,AntDesign,Ionicons } from '@expo/vector-icons'
import { classList } from '../../redux/reducers/classListSlice';
import axios from 'axios';
import { DataTable } from 'react-native-paper';

const EachClassDisplay = ({classInfo,NumberOfStudents,RecordsTaken,refreshing}) => {

  const [toDelete,setToDelete] = useState(false);
  const [showStudents,setShowStudents] = useState(false);
  const [studentOfClass,setStudentsOfClass] = useState([]);
  const [confirmation,setConfirmation] = useState('');
  const [numberOfRecords,setNumberOfRecords] = useState(0);

  const dispatch = useDispatch();

  useEffect(()=>{

    async function getRecordNumber()
    {
        const user = await SecureStore.getItemAsync("username");
        const fileUri = FileSystem.documentDirectory + `AttendanceRecords_${user}/` + `${classInfo.split(' - ')[1]}_${classInfo.split(' - ')[0].replace(/\s+/g, '')}.json`;
        try
        {
            const classRecord = JSON.parse(await FileSystem.readAsStringAsync(fileUri,{encoding:FileSystem.EncodingType.UTF8}));

            setNumberOfRecords(Object.keys(classRecord).length);
    
        } catch(error)
        {
            setNumberOfRecords(0);
        }
      
        
    }
  
    getRecordNumber();

  },[studentOfClass,showStudents,setNumberOfRecords])

  const handleDeleteClass = async()=>{
        const internet = await SecureStore.getItemAsync("connection");
       
        if(internet !== "true")
        {
            alert("No internet connection");
            return
        }
        if(confirmation !== 'Confirm')
        {
            alert("Enter Confirm to proceed");
            return
        }
        
        
        var updatedClass = [];
        var user = await SecureStore.getItemAsync("username");
        var classUri = FileSystem.documentDirectory + `${user}_classList.json`;
        var recordFileDirUri = FileSystem.documentDirectory + `AttendanceRecords_${user}/`;
        var studentDirUri = FileSystem.documentDirectory + `${user}_studentList.json`;

        
        try {
            const presentClasses = JSON.parse(await FileSystem.readAsStringAsync(classUri,{ encoding: FileSystem.EncodingType.UTF8 }));
            const recordFiles = (await FileSystem.readDirectoryAsync(recordFileDirUri,{ encoding: FileSystem.EncodingType.UTF8 }));
            const fileName = `${(classInfo.split(' - ')[1])}_${classInfo.split(' - ')[0].replace(/\s+/g, '')}.json`;
            if(recordFiles.includes(fileName))
            {
           
                await FileSystem.deleteAsync(recordFileDirUri + fileName);
            }
          
            
            for(var i = 0 ; i < presentClasses.length;i++)
            {
                if(presentClasses[i] !== classInfo)
                {
                    updatedClass.push(presentClasses[i])
                }
                else continue
            }
            
            
            var flag = 0;
            for (var i = 0 ; i < updatedClass.length ; i++)
            {
                if(updatedClass[i].split(' - ')[1] === classInfo.split(' - ')[1])
                {
                    flag = 1;
                }
              
            }
            if(!flag)
            {
                const students = JSON.parse(await FileSystem.readAsStringAsync(studentDirUri,{ encoding: FileSystem.EncodingType.UTF8 }));
                delete students[classInfo.split(' - ')[1]]
                if(students.length !== 0)
                {
                    await FileSystem.writeAsStringAsync(studentDirUri,JSON.stringify(students),{ encoding: FileSystem.EncodingType.UTF8 });
                }
                else

                {
                    await FileSystem.deleteAsync(studentDirUri);
                }

            }

            
            if(updatedClass.length !== 0)
            {
                
                await FileSystem.writeAsStringAsync(classUri,JSON.stringify(updatedClass),{ encoding: FileSystem.EncodingType.UTF8 });
                console.log(updatedClass);
                dispatch(classList(updatedClass));
            }
           
            else 
            {
                await FileSystem.deleteAsync(classUri);
                dispatch(classList([]));
            }
            
            try {
                const config = {
                    headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('token')}` }
                  };

                const classToDelete = {
                username:user,
                batch:classInfo.split(' - ')[1].slice(0,3),
                faculty:classInfo.split(' - ')[1].slice(3,6),
                section:classInfo.split(' - ')[1].slice(6,9),
                subject:classInfo.split(' - ')[0],
                class_type:classInfo.split(' - ')[1].slice(6,9).length == 1?'P':'L'
                }  
                  
                const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/delete_class/",classToDelete,config);
                console.log(response.data);
                
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        }


        refreshing(true);
        setToDelete(false);
  }  

  const handleViewStudents =async()=>{
    const user = await SecureStore.getItemAsync("username");
    const fileUri = FileSystem.documentDirectory + `${user}_studentList.json`;
    try {
        const studentData = JSON.parse(await FileSystem.readAsStringAsync(fileUri,{encoding:FileSystem.EncodingType.UTF8}));
        const studentOfThisClass = studentData[classInfo.split(' - ')[1]];
     
        setShowStudents(true);
        setStudentsOfClass(studentOfThisClass);
        
        

    } catch (error) {
        console.log("HERE",error)
    }
    

  }

  return (
    <Pressable style = {styles.EachClassDisplay__Container} onLongPress = {()=>{setToDelete(true)}}>
        {/* Fancy alert here to check if user is sure to delete */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={showStudents}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setShowStudents(!showStudents);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title style = {{marginRight:-120}}>Roll Number</DataTable.Title>
          
          </DataTable.Header>        
            
          <ScrollView style = {{maxHeight:300,overflow:"scroll"}}>
                {studentOfClass.map((eachStudent,index)=>{
                    return (
                        <DataTable.Header style = {{width:420}} key = {index}>
                        <DataTable.Title>{eachStudent.split(' - ')[0]}</DataTable.Title>
                        <DataTable.Title>{eachStudent.split(' - ')[1]}</DataTable.Title>
                        </DataTable.Header>
                    )
                   
                })}
          </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowStudents(!showStudents)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <FancyAlert
                  visible={toDelete}
                  icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F9E060',
                    borderRadius: 50,
                    width: '100%',
                  }}><Ionicons name="alert-outline" size={32} color="#000" /></View>}
                  style={{ backgroundColor: 'white' }}
                >
                 
                  <Text style={{ marginTop: -16, marginBottom: 32,textAlign:'center' }}>Type "Confirm" below</Text>
                  <TextInput style = {styles.ConfirmDelete_Input} value = {confirmation} onChangeText = {(e)=>{setConfirmation(e)}} autoCapitalize='words'></TextInput>
                  <Text style={{ marginTop: 16, marginBottom: 32,textAlign:'center',width:200 }}>Deleting a class will also delete records of this class both from device & database</Text>
                  <View style = {styles.buttons}>
                    <TouchableOpacity style={styles.btn1} onPress={handleDeleteClass}>
                      <Text style = {{textAlign:'center'}}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>{setConfirmation('');setToDelete(false)}}>
                      <Text style = {{textAlign:'center',color:'white'}}>Cancel</Text>
                    </TouchableOpacity>

                  </View>
                
          </FancyAlert>


         <Text style = {styles.display_SubName}>{(classInfo.split(" - ")[0]).length > 30?classInfo.split(' - ')[0].slice(0,32)+"...":classInfo.split(' - ')[0]}</Text>
        <View style = {styles.EachClassDisplay__InnerContainer}>
            <View style = {styles.EachClassDisplay__TitleContainer}>
                
                 <Text style = {styles.display_ClassName}>{classInfo.split(' - ')[1]} - {classInfo.split(' - ')[1].slice(6,9).length == 1?"Practical":"Lecture"}</Text>
                 
            </View>
        </View>
        <View style = {styles.Last_Container}>
            <View style = {styles.EachClassDisplay__InnerContainer2}>

                <View style = {styles.EachClassDisplay__RecordInfo}>
                    <Text>Total Number of Records:</Text>
                    <Text style = {styles.display_Numbs}>{numberOfRecords}</Text>
                </View>

                <TouchableOpacity style = {styles.EachClassDisplay__RecordInfo} onPress = {handleViewStudents}>
                   <Text style = {{color:"#29b0db"}}>View Students</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style = {{marginRight:10}} onPress = {()=>setToDelete(true)}>
                        <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity> */}
            </View>
        </View>
       
    </Pressable>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        
        height:540,
        maxHeight:400,
        width:355,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        overflow:'scroll',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 6,
        padding: 10,
        elevation: 2,
        marginTop:18
      },
      buttonOpen: {
        backgroundColor: '#29b0db',
      },
      buttonClose: {
        backgroundColor: '#29b0db',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
    EachClassDisplay__Container:{
        backgroundColor:'#fff',
        borderRadius:9,
        padding:10,
        marginLeft:15,
        marginRight:15,
        marginTop:12,
        height:140,
     
        shadowColor:'black',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 3.84,
        display:'flex',
        flexDirection:'column'
    },
    EachClassDisplay__InnerContainer:{
        display:'flex',
        flexDirection:'row'
    },
    EachClassDisplay__InnerContainer2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
        width:'100%'
    },
    display_SubName:{
        margin:10,
        fontSize:20,
        color:"#505050"
    },
    EachClassDisplay__TitleContainer:{
        margin:10,
    },
    display_ClassName:{
        color:"#505050",
        fontSize:15
    },
   EachClassDisplay__RecordInfo:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginRight:10
   },
   display_Numbs:{
    fontSize:16,
    color:"#505050",
    marginLeft:10
   },
   buttons:{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10},
   ConfirmDelete_Input:{
    width:200,backgroundColor:"#fff",borderWidth:2,padding:12,marginTop:-10,borderRadius:4,textAlign:'center' ,borderColor:'#29b0db'
   },
   btn1:{color:'#000',borderWidth:1,padding:10,width:80,textAlign:'center',borderRadius:3,borderColor:'#29b0db'},
   btn2:{color:'#fff',backgroundColor:'#29b0db',textAlign:'center',padding:10,width:80,marginLeft:10,borderRadius:3}
  
})


export default EachClassDisplay