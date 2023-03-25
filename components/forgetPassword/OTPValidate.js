import { View, Text,Button, TouchableOpacity ,StyleSheet} from 'react-native'
import React,{useEffect, useRef,useState} from 'react'
import OTPTextView from 'react-native-otp-textinput'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Spinner, HStack, Center, NativeBaseProvider } from 'native-base';
import * as SecureStore from 'expo-secure-store'
import CountDown from 'react-native-countdown-component';
import { LoadingIndicator } from 'react-native-expo-fancy-alerts';

const OTPValidate = ({navigation,theme}) => {
    const [otpInput,setOTP] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [run,setRun] = useState(true);
    useEffect(()=>{},[isLoading,run])

    const handleOTP = (e)=>{
      setOTP(e);
      
    
      if(e.length === 6)
      {
        var value = otpInput + e.slice(-1);
       
        verifyOTP(value);
      }
    }

    
    const verifyOTP = async(e)=>{
        
        setIsLoading(true);
        if(await SecureStore.getItemAsync("connection") === "false")
        {
          alert("No internet connection");
          return
        }

        
        

        const validatingData = {
            email: await SecureStore.getItemAsync('emailForChangePassword'),
            otp:e

        }

        try {
          
            
            console.log(validatingData)
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/otp_validation/',validatingData);
            if(response)
            {
                setIsLoading(false);
                navigation.navigate('Enter NewPassword')
            }
        } catch (error) {
            
            setIsLoading(false);
            alert('OTP validation failed!')
            navigation.navigate('ForgotPassword');
        }
       



        
    }

    const Example = () => {
      return <HStack space={8} justifyContent="center" alignItems="center">
         
          <Spinner size="lg" />
        </HStack>;
    };
  
  return (
    <View>
     
      <Text style = {styles.Validate_OTPText}>Enter the OTP sent to the email address</Text>
      <View style = {{height:20,marginTop:20}}>
      </View>
      <OTPTextView handleTextChange = {e=>handleOTP(e)}
      inputCount = {6}
      />
      <LoadingIndicator visible = {isLoading}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
Validate_OTPText:{
  textAlign:'center',
  padding:20,
  fontSize:20
}
})

export default OTPValidate