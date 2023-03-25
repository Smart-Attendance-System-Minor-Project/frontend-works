import { ScrollView, Text ,TouchableOpacity,Image,View,StyleSheet} from 'react-native'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as FileSystem from 'expo-file-system';
import { FancyAlert,LoadingIndicator } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'
const FetchStudents = ({navigation}) => {

  const {students} = useSelector(state=>state.fetchStudent)
  const {className} = useSelector(state=>state.classList)


  const [visible,setVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{


  },[visible,isLoading])

  const handleFetchStudent = async()=>{

   
   
    const username = await SecureStore.getItemAsync("username");

    if(username)
    {
      console.log(username,"In fetch students");
      const fileUriStudents = FileSystem.documentDirectory +  `${username}_studentList.json`;
      const classroom__id = await SecureStore.getItemAsync('classroom__id');
      console.log(classroom__id,"In fetch Students")
      const newStudentData = new Object();
    
      try {
        
        const studentData = JSON.parse(await FileSystem.readAsStringAsync(fileUriStudents, { encoding: FileSystem.EncodingType.UTF8 }));
       
  
        studentData[classroom__id] = students;      
        await FileSystem.writeAsStringAsync(fileUriStudents, JSON.stringify(studentData),{ encoding: FileSystem.EncodingType.UTF8 });
  
          
      } catch (error) {
        newStudentData[classroom__id] = students;
        await FileSystem.writeAsStringAsync(fileUriStudents, JSON.stringify(newStudentData),{ encoding: FileSystem.EncodingType.UTF8 });
      }
     
      setVisible(true);
    }
    
  
  }

  const handleAlertEvent = ()=>{
    setVisible(false);
    navigation.navigate('Home');
  }
  return (
    <>
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
                  }}><Ionicons name="checkmark" size = {32} color = "#fff"/></View>}
                  style={{ backgroundColor: 'white' }}
                >
                  <Text style={{ marginTop: -16, marginBottom: 32 }}>New class successfully added!</Text>
                  <TouchableOpacity style={styles.btn} onPress={handleAlertEvent}>
                     <Text style={{color:'#fff'}}>Great</Text>
                  </TouchableOpacity>
    </FancyAlert>
    <ScrollView>
      
      
      <ScrollView style = {styles.studentList__Container}>
      {students.map((item,index)=>{
        return (
          <View key = {index} style = {{display:"flex",flexDirection:"row",justifyContent:'space-between',padding:10}}>
            <View style = {{display:"flex",flexDirection:"row"}}>
              <Text>{index + 1}. </Text>
              <Text>{item.split(" - ")[0]}</Text>
            </View>
           
             <Text>{item.split(" - ")[1]}</Text>
          </View>
         
        )
      })}

      </ScrollView>
      

      <TouchableOpacity style = {styles.FetchStudents} onPress={handleFetchStudent}><Text style = {{color:"#fff",textAlign:"center"}}>Fetch</Text></TouchableOpacity>
      

    </ScrollView>
    </>
    
  )
}

const styles = StyleSheet.create({
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
    marginTop: 3,
    marginBottom:10,
    minWidth: '50%',
    paddingHorizontal: 16,
   },

   studentList__Container:{
    maxHeight:500
   },
   FetchStudents:{
    backgroundColor:"#29b0db",
    padding:18,
    width:'80%',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'10%',
    marginTop:20,
    borderRadius:6
   }
})

export default FetchStudents