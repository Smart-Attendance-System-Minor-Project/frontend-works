import { View, Text,StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import ModalSelector from 'react-native-modal-selector'
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const ChooseClass = ({navigation}) => {
    let index = 0;

    const [class_,setClass_] = useState('');
    const [classType_,setClassTypes] = useState('');
    const [group,setGroup] = useState('');

    const {className} = useSelector(state=>state.classList)

    const data = [];

    for(var i=0;i<className.length;i++)
    {
        data.push({key:i,label:className[i]})
    }

    const classType = [
        {key:0,label:'Lecture'},
        {key:1,label:'Practical'},
    ]

    const Group = [
        {key:0, section:true, label:"Choose Group"},
        {key:1, label:'A'},
        {key:2, label:'B'},
        {key:3, label:'C'},
        {key:4, label:'D'},
      
    ]

    const handleClassForAttendance = ()=>{

        
        navigation.navigate('Attendance Screen');
    }
  return (
    <View style = {styles.ClassSelection__Container}>
        <View style = {styles.ClassSelection__Section1}>
            <ModalSelector
                            data={data}
                            initValue="Select Class"
                            style = {{margin:10}}
                            initValueTextStyle = {{color:'#7E7E7E'}}
                            cancelStyle = {{padding:15}}
                            optionStyle = {{padding:15}}
                            selectedItemTextStyle = {{padding:15}}
                            selectStyle = {{padding:25}}
                            onChange = {(option)=>{setClass_(option.label)}}
                            />

            <ModalSelector
                            data={classType}
                            initValue="Select Class Type"
                            style = {{margin:10}}
                            initValueTextStyle = {{color:'#7E7E7E'}}
                            cancelStyle = {{padding:15}}
                            optionStyle = {{padding:15}}
                            selectStyle = {{padding:25}}
                            onChange = {(option)=>{setClassTypes(option.label)}}
                            />
            <ModalSelector
                            data={Group}
                            initValue="Select Group"
                            style = {{margin:10}}
                            initValueTextStyle = {{color:'#7E7E7E'}}
                            cancelStyle = {{padding:15}}
                            optionStyle = {{padding:15}}
                            selectStyle = {{padding:25}}
                            onChange = {(option)=>{setGroup(option.label)}}
                            />
        </View>
      

        <View style = {styles.ClassSelection__Buttons}>
            <TouchableOpacity style = {styles.ClassSelection__Button1}
            onPress = {handleClassForAttendance}
            >
                <Text style = {{color:'white'}}>Take Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.ClassSelection__Button2}>
                <Text>Cancel</Text>
            </TouchableOpacity>
        </View>

               
        

              
        


    </View>
  )
}
const styles = StyleSheet.create({
    ClassSelection__Container:{
        padding:20,
        marginTop:30
    },
   ClassSelection__Buttons:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:'30%'
   },
   ClassSelection__Button1:{
    backgroundColor:'#29B0DB',
    height:60,
    padding:15,
    width:'95%',
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
   ClassSelection__Button2:{
    backgroundColor:'#FFF',
    height:60,
    padding:15,
    width:'95%',
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
   }
    

   
})
export default ChooseClass