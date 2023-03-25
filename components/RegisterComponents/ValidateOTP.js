import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { saveEmail } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store'
import { LoadingIndicator } from 'react-native-expo-fancy-alerts';
import OTPTextView from 'react-native-otp-textinput'

const validateOTP = ({navigation,theme}) => {
    const [otpInput,setOTP] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [run,setRun] = useState(true);
    const dispatch = useDispatch();

    const handleOTP = (e)=>{
      setOTP(e);
      
    
      if(e.length === 6)
      {
        var value = otpInput + e.slice(-1);
       
        verifyOTP(value);
      }
    }


    useEffect(()=>{
        console.log(otpInput);
    },[])

    const verifyOTP = async(value)=>{
        setIsLoading(true);
        if(await SecureStore.getItemAsync("connection") === "false")
        {
          alert("No internet connection");
          return
        }
            
       
         const validatingData = {
             email: await SecureStore.getItemAsync('emailForOTP'),
             otp:value
 
         }
 
         try {
             
             
             const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/otp_validation/',validatingData);
             if(response)
             {
                
                 dispatch(saveEmail(validatingData.email)); 
                 setIsLoading(false);
                 navigation.navigate('Register CreateUser')
             }
         } catch (error) {
             console.log(error)
             alert('OTP validation failed!')
             navigation.navigate('Login');
         }
        
 
 
 
         
     }
    
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
  


export default validateOTP