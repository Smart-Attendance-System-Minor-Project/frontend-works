import { View, Text,StyleSheet,TextInput,TouchableOpacity,Image,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
const RegisterEmailEnter = ({navigation,theme}) => {
    
    const [email_,setEmail] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{

    },[isLoading])
    const handleEmail = async()=>{
      setIsLoading(true);
        try {
            if(await SecureStore.getItemAsync("connection") === "false")
            {
              alert("No internet connection");
              return
            }
            const validateData = {
                email:email_
            }
            const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/register/",validateData);
            if(response.data.success)
            {
                await SecureStore.setItemAsync("emailForOTP",email_);
                setIsLoading(false);
                navigation.navigate('Register OTPValidate');
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }

  return (
    <View style = {styles.emailEnter__Container}>
        <Image source={theme === 'light'?require('../../pictures/Logos/LOGO_WA_LIGHT.png'):require('../../pictures/Logos/LOGO_WA_DARK.png')} style = {styles.Login__Logo} /> 
        <View style = {{height:20}}>
        {isLoading && <ActivityIndicator size={10} color = "#29b0db"/>}
        </View>
       
      <Text style = {styles.email_EnterText}>Enter your "@pcampus.edu.np" Email ID</Text>
      <TextInput style = {styles.email__Enter} onChangeText={(e)=>{setEmail(e)}} placeholder="Email Address" autoCapitalize='none'></TextInput>
      <TouchableOpacity style = {styles.email__Verify} onPress = {handleEmail}>
        <Text style = {{color:"#fff",textAlign:'center'}}>Verify Email</Text>
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
        marginTop:'10%'
      },
      email_EnterText:{
        fontSize:15,
        padding:15,
        fontWeight:"600",
        marginTop:0,
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