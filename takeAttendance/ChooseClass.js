import { View, Text,StyleSheet, TextInput,TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'

import { useDispatch,useSelector } from 'react-redux';
import ClassAdded from './ClassAdded';
import { Swipeable } from 'react-native-gesture-handler';

//This is the class choosing section 


const ChooseClass = ({navigation}) => {

    
    
    const {className} = useSelector(state=>state.classList);
    

    useEffect(()=>{

      

    },[])

    
    
    
    // const leftActions = ()=>{
    //     <View>
    //       <Text>Completed</Text>
    //     </View>
    //   }
   

  

  {return (
    <ScrollView style = {styles.ClassSelection__Container}>

        {<View>
            {
                className.map((classroom,index)=>{
                    return(
                       
                               <View key = {index} >
                                    <ClassAdded

                                        className={classroom}
                                        navigation={navigation}

                                    />
                                </View>
                     
                       
                       
                    )
                   
                })
            }

        
        </View>}
        {!className && <View style = {styles.No__Classes}>
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
