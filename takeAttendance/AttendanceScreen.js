import { View, ScrollView, Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import Swiper from 'react-native-deck-swiper'
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { recordList } from '../redux/reducers/recordListSlice';
import axios from 'axios';
import CheckBox from 'expo-checkbox'
import { FancyAlert,LoadingIndicator } from 'react-native-expo-fancy-alerts';
import { record } from '../redux/reducers/recordsSlice';


const AttendanceScreen = ({navigation}) => {

    let [presentCount,setPresentCount] = useState(0);
    let [absentCount,setAbsentCount] = useState(0);
    const [classN,setClassN] = useState('');
    let [studentList,setStudentList] = useState({});
    const [TodayDate,setDate] = useState('');
    const [visible, setVisible] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [reviewBool,setReviewBool] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [sureToMarkAll,setSureToMarkAll] = useState(false);
    const [sureToCancel,setSureToCancel] = useState(false);
    var recordLists = new Object();
    var TodayRecord = new Object();
   
    const {students} = useSelector(state=>state.getStudent)
    const {user} = useSelector(state=>state.auth)

    const dispatch = useDispatch();

    useEffect(()=>{
      async function getStudentsForAttendance()
      {

          const currDate = new Date();
          setDate(currDate.toLocaleString('default', { month:'2-digit' ,day:'2-digit', year:'numeric' }));
          let className = await AsyncStorage.getItem('class_');
          setClassN(className);
          //console.log(visible,isLoading)
 

      }
      getStudentsForAttendance();
      
    },[visible,isLoading,reviewBool,refresh,sureToMarkAll])


    const presentStudentsHandler = (student) =>{
     
      recordLists[student] = "P";

    }

    const absentStudentsHandler = (student) =>{
     
     
      recordLists[student] = "A";
    }

    const handleAlertEvent = ()=>{
      setVisible(false);
      navigation.navigate('Home')
    }

    const handleReviewEvent =(studentList)=>{
      setReviewBool(false);
      handleTodayRecord(studentList);

    }

    const handleAllPresent =async()=>{
      setSureToMarkAll(false);
      students.map(student=>{
        recordLists[student] = "P";
      })
      handleTodayRecord(recordLists);
    }

    const handleCancelEvent =()=> {
      setSureToCancel(false);
      navigation.navigate('Home');
    }

    

    const handleTodayRecord =async(recordLists)=> {

      

      
      TodayRecord[TodayDate] = {
        ClassType: (classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
        Group:(classN.split(' - ')[1]).slice(6,8),
        Records:recordLists

      }

      //creating a uri for record file
      const recordFileDirUri = FileSystem.documentDirectory + `AttendanceRecords_${user}/`+ `${(classN.split(' - ')[1])}_${classN.split(' - ')[0].replace(/\s+/g, '')}.json`;
      
      //This is the code for saving data in database SQL 
      const AttendanceRecord = {
        username:user,
        class_name:classN.split(' - ')[1],
        class_type:(classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
        subject:classN.split(' - ')[0],
        attendance_record:TodayRecord

      }

      //console.log(recordLists)
      
      const response = await axios.post('https://prat051.pythonanywhere.com/attendance/save_record/',AttendanceRecord);
      // console.log(response);
      //Code upto here


      try {
        const pastRecords = JSON.parse(await FileSystem.readAsStringAsync(recordFileDirUri,{encoding:FileSystem.EncodingType.UTF8}));

        pastRecords[TodayDate] = {
          ClassType: (classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
          Group:(classN.split(' - ')[1]).slice(6,8),
          Records:recordLists
        }

       
       
        await FileSystem.writeAsStringAsync(recordFileDirUri,JSON.stringify(pastRecords), { encoding: FileSystem.EncodingType.UTF8 });
        console.log("Record successfully added!")
        
        
        

      } catch (error) {
        var newRecord = new Object();
        newRecord[TodayDate] = {
          ClassType: (classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
          Group:(classN.split(' - ')[1]).slice(6,8),
          Records:recordLists
        }


        await FileSystem.writeAsStringAsync(recordFileDirUri,JSON.stringify(newRecord), { encoding: FileSystem.EncodingType.UTF8 });

        const getRecordList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `AttendanceRecords_${user}`)
       
        dispatch(recordList(getRecordList))

      }

      //setIsLoading(false);
      setVisible(true);
      
      
      
      //navigation.navigate('Home')
    }   
    
   
   
    return (
        <View style = {styles.AttendanceScreen__Container}>
         
            <LoadingIndicator visible={isLoading} />
            <View style = {styles.AttendanceScreen__SubTitle}>
                <Text style = {{textAlign:'center'}}>{classN}</Text>
            </View>
            <View style = {styles.AttendanceScreen__Infos}>
         
                <Text style = {{textAlign:'center'}}>{TodayDate}</Text>
                
                {/* <Text style = {{backgroundColor:'#fff',padding:4}}>Present {presentCount}</Text>
                <Text style = {{backgroundColor:'#fff',padding:4}}>Absent {absentCount}</Text> */}
                
               
            </View>

            <View style = {{position:'relative',zIndex:0,
            marginRight:'75%',marginTop:-30
          }}>
              
             <Swiper 
                 cards={students}
                 onSwipedLeft  = {(cardIndex)=>absentStudentsHandler(students[cardIndex])}
                 onSwipedRight = {(cardIndex)=>presentStudentsHandler(students[cardIndex])}
                 onSwipedAll={()=>{setStudentList(recordLists);setReviewBool(true) }}
                 cardIndex={0}
                 backgroundColor={'#4FD0E9'}
                
                 overlayLabels = {{
                  left: {
                  /* Optional */
                  title: 'ABSENT',
                    style: {
                      label:{
                          color:'#FF9191',
                          fontSize:20,
                          borderWidth:1,
                          borderColor:'#FF9191'
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft:-130,
                        
                      }
                    }
                  },
                  right: {
                 /* Optional */
                  title: 'PRESENT',
                    style: { label:{
                      color:'green',
                      fontSize:20,
                      borderWidth:1,
                      borderColor:'green'
                       },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: 30
                      }
                    }
                  },
                 }}
                
                 stackSize= {3}
                 disableBottomSwipe = {true}
                 disableTopSwipe = {true}
                 renderCard = {(card)=>(
                  <View  style = {styles.AttendanceScreen__Swipes}>
                      <View style = {styles.AttendanceSwipe__Photo}>
                       
                      </View>
                      <View style = {styles.AttendanceSwipe__Information}>
                        <Text style = {{fontSize:17}}>{card.split(' - ')[0]}</Text>
                        <Text style={{color:'#29b0db',fontSize:16}}>{card.split(' - ')[1]}</Text>
                        
                      </View>
                  </View>
                 )}
                 />
           
            </View>
            
            
            <View style = {styles.AttendanceScreen__Buttons}>
                  <TouchableOpacity style = {styles.ClassSelection__Button1}
                  onPress = {()=>{setSureToMarkAll(true)}}
                  >
                      <Text style = {{color:'white'}}>Mark All Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.ClassSelection__Button2} onPress = {()=>{
                    //alert("Are you sure want to cancel the attendance? Terminating won't save any data you took so far")
                    setSureToCancel(true)
                  }}>
                      <Text>Cancel</Text>
                  </TouchableOpacity>
            </View>
            <FancyAlert
                  visible={sureToMarkAll}
                  icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F9E060',
                    borderRadius: 50,
                    width: '100%',
                  }}><Text>Alert</Text></View>}
                  style={{ backgroundColor: 'white' }}
                >
                  <Text style={{ marginTop: -16, marginBottom: 32,textAlign:'center' }}>Every student will be marked present.    Are you sure for this?</Text>
                  <View style = {{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <TouchableOpacity style={styles.btn1} onPress={handleAllPresent}>
                      <Text style = {{textAlign:'center'}}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>{setSureToMarkAll(false)}}>
                      <Text style = {{textAlign:'center',color:'white'}}>No</Text>
                    </TouchableOpacity>

                  </View>
                
          </FancyAlert>


            <FancyAlert
                  visible={visible}
                  icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#4CB748',
                    borderRadius: 50,
                    width: '100%',
                  }}><Text><Image source={require('../pictures/icons_images/check-mark.png')} style = {{width:20,height:20}}/></Text></View>}
                  style={{ backgroundColor: 'white' }}
                >
                  <Text style={{ marginTop: -16, marginBottom: 32 }}>Attendance record saved successfully!</Text>
                  <TouchableOpacity style={styles.btn} onPress={handleAlertEvent}>
                     <Text style={{color:'#fff'}}>Ok</Text>
                  </TouchableOpacity>
            </FancyAlert>

            <FancyAlert
                  visible={sureToCancel}
                  icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F9E060',
                    borderRadius: 50,
                    width: '100%',
                  }}><Text>Alert</Text></View>}
                  style={{ backgroundColor: 'white' }}
                >
                  <Text style={{ marginTop: -16, marginBottom: 32,textAlign:'center' }}>Are you sure to cancel?                     Current session won't be saved.</Text>
                  <View style = {{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <TouchableOpacity style={styles.btn1} onPress={handleCancelEvent}>
                      <Text style = {{textAlign:'center'}}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>{setSureToCancel(false)}}>
                      <Text style = {{textAlign:'center',color:'white'}}>No</Text>
                    </TouchableOpacity>

                  </View>
            </FancyAlert>

            <FancyAlert
                  visible={reviewBool}
                  icon={<View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#29b0db',
                    borderRadius: 10,
                    width: '170%',
                  }}><Text style = {{color:'white'}}>Review</Text></View>}
                  style={{ backgroundColor: '#fff'}}
                  
                >
                  <View>
                    <Text style={{ marginTop: -20,textAlign:'center', marginBottom: 32 }}>Please review before confirming</Text>
                    <ScrollView style = {{maxHeight:200}}>
                    {Object.keys(studentList).map((key, index) => {
                      return (

                      <View key = {index} style = {styles.ReviewList__EachItem}>
                        <Text>{key.split(' - ')[1]}</Text>
                        <CheckBox value = {studentList[key] === "P"? true:false} color = {'#29b0db'}
                        onValueChange = {()=>{
                          console.log("Before",studentList[key]);
                          studentList[key] = (studentList[key]==="P"?"A":"P");
                          console.log("After",studentList[key]);
                          setRefresh(!refresh);
                        }}
                        />
                      </View>
                      );
                    })}
                    
 
                    </ScrollView>

                    <TouchableOpacity style={styles.btn} onPress={()=>handleReviewEvent(studentList)}>
                     <Text style={{color:'#fff'}}>Confirm</Text>
                    </TouchableOpacity>

                  </View>
                 
            </FancyAlert>
          
        </View>
    )
}


const styles = StyleSheet.create({
  AttendanceScreen__Container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
   
    height:'100%'
  },
 container:{
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  margin:'auto'
 }, 
  AttendanceScreen__SubTitle:{
    padding:20,
    backgroundColor:'white',
    width:'100%',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3.84,
    
  },
  AttendanceScreen__Infos:{
    display:'flex',
    width:'80%',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:30,
    alignItems:'center'
    
  },
  
  AttendanceScreen__Swipes:{
    backgroundColor:'white',
    height:'40%',
    marginTop:0,

    width:250,
    borderRadius:9,
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5.84,
  },
  AttendanceSwipe__Photo:{
    backgroundColor:'#fff',
    width:250,
    height:'65%',
    borderTopLeftRadius:9,
    borderTopRightRadius:9,
    
    alignItems:'center',
   
  },
  AttendanceSwipe__Information:{
    display:'flex',
    height:'30%',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  AttendanceScreen__Buttons:{
   
      display:'flex',
     marginTop:'110%',
      alignItems:'center',  
  },
  ClassSelection__Button1:{
    backgroundColor:'#29B0DB',
    height:60,
    padding:15,
    width:250,
    borderRadius:9,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.09,
    shadowRadius: 3.84,
   },
   btn:{
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 10,
    marginBottom:20,
    minWidth: '50%',
    paddingHorizontal: 16,
   },
   ClassSelection__Button2:{
    backgroundColor:'#FFF',
    height:60,
    padding:15,
    width:250,
    marginTop:20,
    borderRadius:9,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3.84,
   },
   swipe__list:{
    display:'flex'
   },
   ReviewList__EachItem:{display:'flex',
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
   margin:10},
   btn1:{color:'#000',borderWidth:1,padding:10,width:80,textAlign:'center',borderRadius:3,borderColor:'#29b0db'},
   btn2:{color:'#fff',backgroundColor:'#29b0db',textAlign:'center',padding:10,width:80,marginLeft:10,borderRadius:3}
})

export default AttendanceScreen