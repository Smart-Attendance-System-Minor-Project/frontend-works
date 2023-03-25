import { View, Text,TextInput,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Spinner, HStack, Center, NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'

const ForgotPassword = ({navigation,theme}) => {
   const [Email,setEmail]= useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState('');
    

    useEffect(()=>{},[error,isLoading])

    const handleEmailVerification =async()=> {
        if(await SecureStore.getItemAsync("connection") === "false")
        {
          alert("No internet connection");
          return
        }
        
        setError('');
        setIsLoading(true);
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
            
            await SecureStore.setItemAsync('emailForChangePassword',Email);
            setIsLoading(false);
            navigation.navigate('OTP Validation')
        } catch (error_){
          
          setError(error_.response.data.error)
          setIsLoading(false);
            
        }
        
      

    }

    const Example = () => {
      return <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>;
    };
  return (
    <View style = {styles.emailEnter__Container}>
    
      <Image source={theme === 'light'?require('../../pictures/Logos/LOGO_WA_LIGHT.png'):require('../../pictures/Logos/LOGO_WA_DARK.png')} style = {styles.Login__Logo} /> 
      <View style = {{height:5}}>
        <NativeBaseProvider>
            <Center flex={1} px="0" mt="-20">
                {isLoading && <Example />}
            </Center>
        </NativeBaseProvider>

      </View>

      <Text style = {{color:'red',marginTop:-30,marginBottom:30}}>{error}</Text>
    
     {<Text style = {styles.email_EnterText}>Enter your email you used during registration.</Text>}
     {/* <Text style = {styles.email__OTPtext}>A six-digit OTP will be sent to the email address you are registered with.</Text> */}
     <TextInput placeholder='email' value = {Email} onPressIn = {()=>{setError('')}} onChangeText={(e)=>setEmail(e)} style = {styles.email__Enter} autoCapitalize = "none"></TextInput>
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
    marginTop:'0%'
  },
  email_EnterText:{
    fontSize:15,
    padding:15,
    
    marginTop:-30,
  },
  email__OTPtext:{
    marginTop:0,
    textAlign:'center',
    color:"#29b0db",
    width:'80%',
    fontSize:15
  },
  email__Enter:{
    padding:20,
    backgroundColor:"#e8e8e8",
    width:'80%',
    margin:0,
    borderRadius:9,
    margin:10
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