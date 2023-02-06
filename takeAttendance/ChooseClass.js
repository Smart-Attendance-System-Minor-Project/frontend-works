import { View, Text,StyleSheet, TextInput,TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import ClassAdded from './ClassAdded';
import * as FileSystem from 'expo-file-system'

const ChooseClass = ({navigation}) => {
    let index = 0;

    const [class_,setClass_] = useState([]);
    const [classType_,setClassTypes] = useState('');
    const [isData,setisData] = useState(false);
    const [group,setGroup] = useState('');
    const {className} = useSelector(state=>state.classList)
    const {user} = useSelector(state=>state.auth);
    const {isLoading} = useSelector(state=>state.fetchStudent)
    useEffect(()=>{

      
        async function getClasses()
        {
           try {
            const fileUri = FileSystem.documentDirectory +  `${user}_classList.json`;
            const data = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
            setisData(true);
            setClass_(JSON.parse(data));

        
           } catch (error) {
            setisData(false);
           }
            
          
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

    // const handleClassForAttendance = async()=>{

     
    //     navigation.navigate('Attendance Screen');
    // }
  {return (
    <ScrollView style = {styles.ClassSelection__Container}>

        {isData && <View style = {styles.ClassSelection__Section1}>
            {
                data.map(classroom=>{
                    return(
                        <View key={classroom}>
                            <ClassAdded

                                className={classroom}
                                navigation={navigation}
                            />
                        </View>
                       
                    )
                   
                })
            }

        
        </View>}
        {!isData && <View style = {styles.No__Classes}>
            <Text>No classes yet. Go and add classes.</Text>    
        </View>}
      

   

               
        

              
        


    </ScrollView>
  )}
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