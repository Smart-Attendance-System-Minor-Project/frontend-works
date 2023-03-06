import { View, Text,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import { saveEmail } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPTextView from 'react-native-otp-textinput';

const RegisterOTP = ({navigation,theme}) => {
    const [otpInput,setOTP] = useState('');
    
    const dispatch = useDispatch();

    const verifyOTP = async()=>{
         
 
         const validatingData = {
             email: await AsyncStorage.getItem('emailForOTP'),
             otp:otpInput
 
         }
 
         try {
             
             
             const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/otp_validation/',validatingData);
             if(response)
             {
                
                 dispatch(saveEmail(validatingData.email)); 
                 navigation.navigate('Register CreateUser')
             }
         } catch (error) {
             console.log(error)
             alert('OTP validation failed!')
             navigation.navigate('Login');
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

export default RegisterOTP