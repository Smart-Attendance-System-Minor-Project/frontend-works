import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'
import { Spinner, HStack, Center, NativeBaseProvider } from 'native-base';


const EnterNewPassword = ({navigation,theme}) => {
    const [password_,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isSecureEntry,setIsSecureEntry] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
   
    useEffect(()=>{},[isLoading]);
    const handleChangePassword = async()=>{
      setIsLoading(true);

      

      if(await SecureStore.getItemAsync("connection") === "false")
      {
        alert("No internet connection");
        return
      }

      const validateData = {
        password:password_,
        confirm_password:confirmPassword,
        email:await SecureStore.getItemAsync('emailForChangePassword')
      }
      
      try {
        const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/password_reset/',validateData);

        //localStorage.removeItem('emailForChangePassword');
        setIsLoading(false);
        navigation.navigate('Login');

        
      } catch (error) {
        alert("OTP expired. Please start again.")
        setIsLoading(false);
        navigation.navigate("Login");
        console.log(error); 
      }
    }
    const Example = () => {
      return <HStack space={8} justifyContent="center" alignItems="center">
         
          <Spinner size="lg" />
        </HStack>;
    };
  return (
    <View style = {styles.emailEnter__Container}>
    <Text style = {styles.EnterNewPassword}>Enter New Password</Text>
       <View style = {{height:20,marginTop:20}}>
          <NativeBaseProvider>
              <Center flex={1} px="3">
                  {isLoading && <Example />}
              </Center>
          </NativeBaseProvider>

        </View>
     
       <View style = {[styles.Login__PasswordContainer]}>
        <TextInput style = {[styles.Login__InputsPassword]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="Password"
        value = {password_}
        onChangeText = {(e)=>{setPassword(e)}}
        secureTextEntry={isSecureEntry}
        
        >
        
        </TextInput>
        <TouchableOpacity onPress={()=>{ setIsSecureEntry(!isSecureEntry);}} style = {styles.icons}>
            {isSecureEntry && <Ionicons name="eye-off-sharp" size={24} color="black" />}
            {!isSecureEntry && <Ionicons name="eye" size={24} color="black" />}
        </TouchableOpacity>
       
        </View>

       <View style = {[styles.Login__PasswordContainer]}>
        <TextInput style = {[styles.Login__InputsPassword]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="Confirm Password"
        value = {confirmPassword}
        onChangeText = {(e)=>{setConfirmPassword(e)}}
        secureTextEntry={isSecureEntry}
        
        >
        
        </TextInput>
        <TouchableOpacity onPress={()=>{ setIsSecureEntry(!isSecureEntry);}} style = {styles.icons}>
            {isSecureEntry && <Ionicons name="eye-off-sharp" size={24} color="black" />}
            {!isSecureEntry && <Ionicons name="eye" size={24} color="black" />}
        </TouchableOpacity>
       
        </View>
     
       <TouchableOpacity onPress={handleChangePassword}
       style = {styles.email__Verify}
       >
        <Text style = {{color:"#fff",textAlign:'center'}}>Confirm Change</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate("Login")}
       style = {styles.email__cancel}
       >
        <Text style = {{textAlign:'center'}}>Cancel</Text>
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Login__PasswordContainer:{

    backgroundColor:"#e8e8e8",
    width:310,
    height:60,
    marginTop:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    paddingLeft:10,
    
    borderRadius:3
},
icons:{
  marginRight:10
},

  EnterNewPassword:{
    fontSize:20,
    marginBottom:20
  },

    emailEnter__Container:{

        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'20%'

      },
    email__Enter:{
        padding:20,
        backgroundColor:"#e8e8e8",
        width:'80%',
        margin:10,
        borderRadius:9,
      },
      email__Verify:{
        backgroundColor:"#29b0db",
        color:'#fff',
        width:'80%',
        borderRadius:9,
        padding:18,
        marginTop:30
      },
      email__cancel:{
        backgroundColor:"#fff",
        color:'#fff',
        width:'80%',
        borderRadius:9,
        padding:18,
        marginTop:20
        
      }
})
export default EnterNewPassword