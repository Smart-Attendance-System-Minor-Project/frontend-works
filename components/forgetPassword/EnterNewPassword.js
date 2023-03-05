import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterNewPassword = ({navigation,theme}) => {
    const [password_,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

   
    const handleChangePassword = async()=>{
      console.log(password_,confirmPassword);

      const validateData = {
        password:password_,
        confirm_password:confirmPassword,
        email:await AsyncStorage.getItem('emailForChangePassword')
      }
      
      try {
        const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/password_reset/',validateData);

        //localStorage.removeItem('emailForChangePassword');
        navigation.navigate('Login');

        
      } catch (error) {
       console.log(error); 
      }
    }
  return (
    <View style = {styles.emailEnter__Container}>
    <Text>Enter New Password</Text>
     
      <TextInput
       placeholder='Password'
       value = {password_} onChangeText={(e)=>{setPassword(e)}}
       style = {styles.email__Enter}
       ></TextInput>
      <TextInput
       placeholder='Confirm Password'
       value = {confirmPassword} onChangeText={(e)=>{setConfirmPassword(e)}}
       style = {styles.email__Enter}
       ></TextInput>
       <TouchableOpacity onPress={handleChangePassword}
       style = {styles.email__Verify}
       >
        <Text>Confirm Change</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate("Login")}
       style = {styles.email__cancel}
       >
        <Text>Cancel</Text>
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
        marginTop:'30%'
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
        padding:20,
        margin:20
      },
      email__cancel:{
        backgroundColor:"#fff",
        color:'#fff',
        width:'80%',
        borderRadius:9,
        padding:20,
        
      }
})
export default EnterNewPassword