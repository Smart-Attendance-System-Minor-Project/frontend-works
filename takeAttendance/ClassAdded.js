import { View, Text,Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchStudent, getStudent } from '../redux/reducers/fetchStudentSlice'
import { useDispatch } from 'react-redux'

const ClassAdded = ({className,classType,navigation}) => {
    const dispatch = useDispatch();
    const handleStudents= async()=>{
        //console.log(`${className.split(' - ')[1]}`)
        console.log(className.split(' - ')[1]);
        dispatch(getStudent(className.split(' - ')[1]));
        navigation.navigate('Attendance Screen')
    }
  return (
    <View style = {styles.ClassAdded__Container}>
        <TouchableOpacity style = {styles.ClassAdded__Touch} onPress = {handleStudents}>
          
            <View style = {{marginLeft:10}}>
                <View style = {{borderRadius:100,backgroundColor:'#AEF5FF',maxWidth:80,marginBottom:10}}>
                    <Text style = {{color:'#407142',padding:5,fontSize:12,textAlign:'center'}}>{className.split(' - ')[1]}</Text>
                </View>
                <Text style = {{color:'#000'}}>{className.split(' - ')[0]}</Text>
            </View>
          
            <View style = {{borderRadius:'50%',backgroundColor:'#8DFF98',width:24}}>
                <Text style = {{color:'#1B5C21',padding:3,textAlign:'center'}}>{classType}</Text>
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
        padding:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})
export default ClassAdded