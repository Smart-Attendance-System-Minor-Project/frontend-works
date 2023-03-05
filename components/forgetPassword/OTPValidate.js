import { View, Text,Button, TouchableOpacity } from 'react-native'
import React,{useRef,useState} from 'react'
import OTPTextView from 'react-native-otp-textinput'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OTPValidate = ({navigation,theme}) => {
    const [otpInput,setOTP] = useState('');
    


   const verifyOTP = async()=>{
        

        const validatingData = {
            email: await AsyncStorage.getItem('emailForChangePassword'),
            otp:otpInput

        }

        try {
            
            console.log(validatingData)
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/otp_validation/',validatingData);
            if(response)
            {
                navigation.navigate('Enter NewPassword')
            }
        } catch (error) {
            console.log(error)
            alert('OTP validation failed!')
            navigation.navigate('ForgotPassword');
        }
       



        
    }
    const setText = () => {
        otpInput.current.setValue("1234");
    }
  return (
    <View>
      <Text>OTPValidate</Text>
      <OTPTextView handleTextChange = {e=>setOTP(e)}
      inputCount = {6}
      />
      <View>
        <TouchableOpacity onPress={verifyOTP}>
            <Text>Verify</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default OTPValidate