import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterEmailEnter = ({navigation,theme}) => {
    
    const [email_,setEmail] = useState('');

    const handleEmail = async()=>{
        try {
            const validateData = {
                email:email_
            }
            const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/register/",validateData);
            if(response.data.success)
            {
                await AsyncStorage.setItem("emailForOTP",email_);
                navigation.navigate('Register OTPValidate');
            }
        } catch (error) {
            
        }
    }

  return (
    <View style = {styles.emailEnter__Container}>
      <Text style = {styles.email_EnterText}>Enter your "@pcampus.edu.np" Email ID</Text>
      <TextInput style = {styles.email__Enter} onChangeText={(e)=>{setEmail(e)}} placeholder="Email Address"></TextInput>
      <TouchableOpacity style = {styles.email__Verify} onPress = {handleEmail}>
        <Text style = {{color:"#fff",textAlign:'center'}}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    emailEnter__Container:{

        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'50%'
      },
      email_EnterText:{
        fontSize:15,
        padding:15,
        fontWeight:"600",
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

export default RegisterEmailEnter