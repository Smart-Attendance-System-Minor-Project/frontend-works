import { ScrollView, Text ,TouchableOpacity,Image,View,StyleSheet} from 'react-native'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FancyAlert,LoadingIndicator } from 'react-native-expo-fancy-alerts';

const FetchStudents = ({navigation}) => {

  const {students} = useSelector(state=>state.fetchStudent)
  const {className} = useSelector(state=>state.classList)
  const {user} = useSelector(state=>state.auth);

  const [visible,setVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    console.log(visible,isLoading)

  },[visible,isLoading])

  const handleFetchStudent = async()=>{

   

    const fileUriStudents = FileSystem.documentDirectory +  `${user}_studentList.json`;
    const classroom__id = await AsyncStorage.getItem('classroom__id');
    const newStudentData = new Object();
    const studentList = [];
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
                  }}><Text><Image source={require('../pictures/icons_images/check-mark.png')} style = {{width:20,height:20}}/></Text></View>}
                  style={{ backgroundColor: 'white' }}
                >
                  <Text style={{ marginTop: -16, marginBottom: 32 }}>New class successfully added!</Text>
                  <TouchableOpacity style={styles.btn} onPress={handleAlertEvent}>
                     <Text style={{color:'#fff'}}>Great</Text>
                  </TouchableOpacity>
    </FancyAlert>
    <ScrollView>
      
      {students.map((item,index)=>{
        return (
          <Text key={index}>{item}</Text>
        )
      })}

      <TouchableOpacity style = {{backgroundColor:'#29b0db',padding:20,position:'relative'}} onPress={handleFetchStudent}><Text>Fetch</Text></TouchableOpacity>
      

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
})

export default FetchStudents