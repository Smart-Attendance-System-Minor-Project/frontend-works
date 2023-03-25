import { View, Text,Image, TouchableOpacity,StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { TapGesture,Swipeable } from 'react-native-gesture-handler'
import { getStudent,reset } from '../redux/reducers/getStudent'
import { useDispatch,useSelector } from 'react-redux'
import * as FileSystem from 'expo-file-system'
import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
//This is the component which is basically each classes the teacher adds, shown as a list after clicking Take Attendance.

 
const ClassAdded = ({className,classType,navigation}) => {
    const dispatch = useDispatch();

  const {isSuccess,isLoading} = useSelector(state=>state.getStudent)

    
    useEffect(()=>{
      
        if(isSuccess)
        {   
            

            navigation.navigate('Attendance Screen')
            dispatch(reset())
            
        }

    },[isSuccess,isLoading])

    const handleStudents= async()=>{
        //console.log(`${className.split(' - ')[1]}`)

        const user = await SecureStore.getItemAsync("username");
        await SecureStore.setItemAsync("classroom__id",className.split(' - ')[1]);
        //await AsyncStorage.setItem('classroom__id',className.split(' - ')[1]);
        await SecureStore.setItemAsync("class_",className);

        //console.log(user,"We are in student List");
        const fileUriStudents = FileSystem.documentDirectory +  `${user}_studentList.json`;

        try {
         
          const studentData = JSON.parse(await FileSystem.readAsStringAsync(fileUriStudents, { encoding: FileSystem.EncodingType.UTF8 }));
          const classID = className.split(' - ')[1]
          console.log(classID, "In class Added");

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
                <View style = {[{borderRadius:50,width:24},((className.split(' - ')[1]).slice(6,8)).length == 1?{backgroundColor:'#FFC5C5'}:{backgroundColor:'#A3FFA1'}]}>
                    <Text style = {{color:'#1B5C21',padding:3,textAlign:'center'}}>{((className.split(' - ')[1]).slice(6,8)).length == 1?'P':'L'}</Text>
                
                </View>
                <Text style = {{color:'#000',marginLeft:10}}>{(className.split(' - ')[0]).length > 15?className.split(' - ')[0].slice(0,20) + "...":className.split(' - ')[0]}</Text>
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
