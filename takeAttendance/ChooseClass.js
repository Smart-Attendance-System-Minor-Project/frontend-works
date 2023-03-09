import { View, Text,StyleSheet, TextInput,TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux';
import ClassAdded from './ClassAdded';
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import { classAdd } from '../redux/reducers/classListSlice';
//This is the class choosing section 
const ChooseClass = ({navigation}) => {
    const dispatch = useDispatch();
    const [class_,setClass_] = useState([]);
    const [isclass_,setisclass_] = useState(false);
    
    const {user} = useSelector(state=>state.auth);

    useEffect(()=>{

      
        async function getClasses()
        {
           try {
            const fileUri = FileSystem.documentDirectory +  `${user}_classList.json`;
            const class_ = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
            setisclass_(true);
            setClass_(JSON.parse(class_));

        
           } catch (error) {
            setisclass_(false);
           }

   
          
        }
        getClasses()
    },[])

    
    
    
    
   

  

  {return (
    <ScrollView style = {styles.ClassSelection__Container}>

        {isclass_ && <View style = {styles.ClassSelection__Section1}>
            {
                class_.map(classroom=>{
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
        {!isclass_ && <View style = {styles.No__Classes}>
            <Text style = {styles.NoClass_Text}>No Classes Created.</Text>
            <Text style = {styles.NoClass_Text}>Create a class to start taking the attendance.</Text>    
        </View>}
      
    </ScrollView>
  )}
}
const styles = StyleSheet.create({
    ClassSelection__Container:{
        padding:10,
        marginTop:30,
        height:'100%'
    },

    No__Classes:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        
        
    },
    NoClass_Text:{
        color:'#2c2c2c',
        fontSize:20,
        textAlign:'center'
    }
  
    

   
})
export default ChooseClass