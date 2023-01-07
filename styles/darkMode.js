import React from 'react';
import { StyleSheet } from 'react-native';


const darkMode = StyleSheet.create({
    Login__Container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
       backgroundColor:'#262626',
       marginTop:50
        
    },
    Login__LogoContainer:{

        marginTop:-140,
    },
    Login__Logo:{
        resizeMode:'contain',
        width:300
        
    },
    Login__Form:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    LoginForm__Text:{
        marginTop:-130,
        fontFamily:'Arial',
        fontSize:25,
        fontWeight:'800',
        color:"#FFFFFF"
        
    },
    Login__Inputs:{
        backgroundColor:'#E8E8E8',
        width:290,
        marginTop:20,
        height:50,
        paddingLeft:20,
        borderRadius:3
    },

    Login__Button:{
        width:290,
        backgroundColor:'#FF914D',
        alignItems:'center',
        padding:10,
        margin:30,
        borderRadius:3
    },
    Login__ButtonLogin:{
        color:'#FFFFFF',
    },
    Login__RegisterSection:{
        display:'flex',
        flexDirection:'row',
        color:'#FFFFFF'
        
    },
    Login__Registertext:{
        color:'#FFFFFF'
    },
    Login__SignUp:{
        color:'#FF914D'
    },
    Login__ChangeMode:{
        bottom:-200,
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

export default darkMode