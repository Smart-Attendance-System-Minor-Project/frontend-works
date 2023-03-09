import { View, Text,TextInput,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgotPassword = ({navigation,theme}) => {
   const [Email,setEmail]= useState('');
    
    const [error,setError] = useState('');

    useEffect(()=>{},[error])

    const handleEmailVerification =async()=> {

        if(!Email)
        {
          
          setError("Please enter your email")
          return
        }
     
        const emailData = {
            email:Email
        }
        try {
            
           
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/forgot_password/',emailData);
            await AsyncStorage.setItem('emailForChangePassword',Email);
            navigation.navigate('OTP Validation')
        } catch (error) {
          console.log(error)
            
        }
        
      

    }
  return (
    <View style = {styles.emailEnter__Container}>
      <Image source={theme === 'light'?require('../../pictures/Logos/LOGO_WA_BGT_LIGHT.png'):require('../../pictures/Logos/LOGO_WA_BGT_DARK.png')} style = {styles.Login__Logo} /> 
      <Text style = {{color:'red'}}>{error}</Text>
     <Text style = {styles.email_EnterText}>Enter your email you used during registration.</Text>
     {/* <Text style = {styles.email__OTPtext}>A six-digit OTP will be sent to the email address you are registered with.</Text> */}
     <TextInput placeholder='email' value = {Email} onPressIn = {()=>{setError('')}} onChangeText={(e)=>setEmail(e)} style = {styles.email__Enter}></TextInput>
     <TouchableOpacity onPress={handleEmailVerification} style = {styles.email__Verify}>
      <Text style = {{color:'#fff',textAlign:'center'}}>Verify Email</Text>
     </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  Login__Logo:{
    resizeMode:'contain',
    width:200
  },
  emailEnter__Container:{

    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'20%'
  },
  email_EnterText:{
    fontSize:15,
    padding:15,
    
    marginTop:50,
  },
  email__OTPtext:{
    marginTop:10,
    textAlign:'center',
    color:"#29b0db",
    width:'80%',
    fontSize:15
  },
  email__Enter:{
    padding:20,
    backgroundColor:"#e8e8e8",
    width:'80%',
    margin:20,
    borderRadius:9,
  },
  email__Verify:{
    backgroundColor:"#29b0db",
    color:'#fff',
    width:'80%',
    borderRadius:9,
    padding:20
  }
})

export default ForgotPassword