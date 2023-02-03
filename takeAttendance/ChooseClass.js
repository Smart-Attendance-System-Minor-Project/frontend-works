import { View, Text,StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import ClassAdded from './ClassAdded';

const ChooseClass = ({navigation}) => {
    let index = 0;

    const [class_,setClass_] = useState([]);
    const [classType_,setClassTypes] = useState('');

    const [group,setGroup] = useState('');
    const {className} = useSelector(state=>state.classList)

    useEffect(()=>{
        async function getClasses()
        {
          setClass_(JSON.parse(await AsyncStorage.getItem('classList')));
        
          
        }
        getClasses()
    },[])
    
   

    var data = [];
    for(var i=0;i<class_.length;i++)
    {
        data.push(class_[i])
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

    const handleClassForAttendance = async()=>{

        
        navigation.navigate('Attendance Screen');
    }
  return (
    <View style = {styles.ClassSelection__Container}>
        <View style = {styles.ClassSelection__Section1}>
            {
                data.map(data=>{
                    return(
                        <ClassAdded
                        className={data}
                        classType = 'L'
                        navigation={navigation}
                        />
                    )
                   
                })
            }

        
        </View>
      

        <View style = {styles.ClassSelection__Buttons}>
           
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
        marginTop:30,
        height:'100%'
    },
   ClassSelection__Buttons:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    top:'50%'
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
    bottom:0,
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