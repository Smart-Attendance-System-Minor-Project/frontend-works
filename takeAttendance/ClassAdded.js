import { View, Text,Image, TouchableOpacity,StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStudent,reset } from '../redux/reducers/getStudent'
import { useDispatch,useSelector } from 'react-redux'
import * as FileSystem from 'expo-file-system'
import { useEffect } from 'react'

//This is the component which is basically each classes the teacher adds, shown as a list after clicking Take Attendance.
const ClassAdded = ({className,classType,navigation}) => {
    const dispatch = useDispatch();

  const {isSuccess,isLoading} = useSelector(state=>state.getStudent)

    const {user} = useSelector(state=>state.auth)
    useEffect(()=>{
        if(isSuccess)
        {   
            
            navigation.navigate('Attendance Screen')
            dispatch(reset())
            
        }

    },[isSuccess,isLoading])

    const handleStudents= async()=>{
        //console.log(`${className.split(' - ')[1]}`)

        await AsyncStorage.setItem('classroom__id',className.split(' - ')[1]);
       
        AsyncStorage.setItem('class_',className);

        const fileUriStudents = FileSystem.documentDirectory +  `${user}_studentList.json`;

        try {
         
          const studentData = JSON.parse(await FileSystem.readAsStringAsync(fileUriStudents, { encoding: FileSystem.EncodingType.UTF8 }));
          const classID = await AsyncStorage.getItem('classroom__id')
          

          if(studentData)
          {
          
            dispatch(getStudent(studentData[classID]));
            
          }

        } catch (error) {
          console.log(error)
        }
       

     
       
    }
  return (
    <View style = {styles.ClassAdded__Container}>
        
        <TouchableOpacity style = {styles.ClassAdded__Touch} onPress = {handleStudents}>
            <View style = {{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <View style = {[{borderRadius:'50%',width:24},((className.split(' - ')[1]).slice(6,8)).length == 1?{backgroundColor:'#FFC5C5'}:{backgroundColor:'#A3FFA1'}]}>
                    <Text style = {{color:'#1B5C21',padding:3,textAlign:'center'}}>{((className.split(' - ')[1]).slice(6,8)).length == 1?'P':'L'}</Text>
                
                </View>
                <Text style = {{color:'#000',marginLeft:10}}>{className.split(' - ')[0]}</Text>
            </View>
            <View style = {{borderRadius:100,backgroundColor:'#AEF5FF',width:80}}>
                    <Text style = {{color:'#407142',padding:5,fontSize:12,textAlign:'center'}}>{className.split(' - ')[1]}</Text>
            </View>

        </TouchableOpacity>
     
    </View>
  )
}

const styles = StyleSheet.create({
    ClassAdded__Container:{
        padding:8
    },
    ClassAdded__Touch:{
        backgroundColor:'#fff',
        borderRadius:9,
        
        shadowColor:'black',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 3.84,
        height:60,
        padding:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})
export default ClassAdded