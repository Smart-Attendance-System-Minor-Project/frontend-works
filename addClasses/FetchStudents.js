import { ScrollView, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FetchStudents = ({navigation}) => {

  const {students} = useSelector(state=>state.fetchStudent)
  const {className} = useSelector(state=>state.classList)
  const {user} = useSelector(state=>state.auth);
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
  
    navigation.navigate('Home');
    
  }
  return (
    
    <ScrollView>
    
      {students.map((item,index)=>{
        return (
          <Text key={index}>{item}</Text>
        )
      })}

      <TouchableOpacity style = {{backgroundColor:'#29b0db',padding:20,position:'absolute'}} onPress={handleFetchStudent}><Text>Fetch</Text></TouchableOpacity>

    </ScrollView>
  )
}

export default FetchStudents