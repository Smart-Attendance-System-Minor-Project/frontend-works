import React from 'react';
import { StyleSheet } from 'react-native';


const darkModeRegister = StyleSheet.create({
    Register__Container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
       backgroundColor:'#212121',
      
        
    },
   
  
    RegisterForm__Text:{
     
        fontFamily:'Arial',
        fontSize:25,
        fontWeight:'800',
        color:"#FFFFFF"
        
    },
    Register__Inputs:{
        backgroundColor:'#323232',
        width:290,
        marginTop:10,
        height:50,
        paddingLeft:20,
        color:'white',
        borderRadius:3
    },

   
    
  
    Register__Registertext:{
        color:'#FFFFFF'
    },
   
    Slider__bg:{
        backgroundColor:'#000000',
        height:25,
        width:50,
        borderRadius:20

    },
    Slider__Button:{
        backgroundColor:'#FF914D',
        height:25,
        width:25,
        borderRadius:50,
        left:25,
        //transform:'ease'
    }
})

export default darkModeRegister