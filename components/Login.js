import { View, Text,StyleSheet,Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import {React,useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import darkMode from '../styles/darkMode';
import {login,reset,userData} from '../redux/reducers/authSlice';
import {useSelector,useDispatch} from 'react-redux';
import { version } from 'react';


const Login = ({navigation,theme}) => {
 
   
    const dispatch = useDispatch()

    const {isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorUsername,setErrorUsername] = useState('');
    const [errorPassword,setErrorPassword] = useState('');

            
   
    useEffect(()=>{
      
        async function checkStatus()
        {
           
            const user = await AsyncStorage.getItem('token');
         
            if(await AsyncStorage.getItem('errorUsername'))
            {
                setErrorUsername(await AsyncStorage.getItem('errorUsername'))
            }
            if(await AsyncStorage.getItem('errorPassword'))
            {
                setErrorPassword(await AsyncStorage.getItem('errorPassword'))
            }

            if(user || isSuccess) {
               
              dispatch(userData(username))
              navigation.navigate('Home')
              dispatch(reset())
        
        }
    }
        
      
      checkStatus()
    
    },[isLoading, isError,isSuccess,message,dispatch])
    
    const handleLogin =()=>
    {
        const data = {
            username:username,
            password:password
        }

        try {
           
            dispatch(login(data));
         
            
        } catch (error) {
            console.log(error.response);   
        }
    }


 
   

    return (
    <View style = {theme === 'light'?styles.Login__Container:darkMode.Login__Container}>
        
      <View style = {styles.Login__LogoContainer}>
         <Image source={theme === 'light'?require('../pictures/Logos/LOGO_WA_BGT_LIGHT.png'):require('../pictures/Logos/LOGO_WA_BGT_DARK.png')} style = {styles.Login__Logo} /> 
      </View>
      {isLoading && <ActivityIndicator size="large" color="#29b0db" />}

      <View style = {styles.Login__Form}>
        
        <TextInput style = {[theme === 'light'?styles.Login__Inputs:darkMode.Login__Inputs,errorUsername?styles.textinvalid:styles.textvalid ]}
        autoCorrect = {false}
        autoCapitalize = "none" placeholder='username'
        value = {username}
        onPressIn = {()=>{setErrorUsername('')}}
        onChangeText = {(e)=>{setUsername(e)}}
        ></TextInput>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{errorUsername}</Text>
        <TextInput style = {[theme === 'light'?styles.Login__Inputs:darkMode.Login__Inputs,errorPassword?styles.textinvalid:styles.textvalid ]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{setErrorPassword('')}}
        autoCapitalize = "none"
        placeholder="password"
         
        value = {password}
        onChangeText = {(e)=>{setPassword(e)}}
        secureTextEntry={true}
       
        ></TextInput>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{errorPassword}</Text>

        <TouchableOpacity style = {styles.Login__Button}
        onPress = {handleLogin}
        >
            <Text style = {styles.Login__ButtonLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}}><Text style = {styles.Login__Forgot}>Forgot Password?</Text></TouchableOpacity>
      <View style = {styles.Login__RegisterSection}>
        <Text style = {theme === 'light'?styles.Login__Registertext:darkMode.Login__Registertext}> Don't have an account?  </Text>
            
        <TouchableOpacity onPress = {()=>{navigation.navigate('Register')}}><Text style = {styles.Login__SignUp}>Sign up</Text></TouchableOpacity>

      </View>
    
   
      <View style = {styles.Login__ChangeMode}>
            
      </View>
     
    </View>
  )
}


const styles = StyleSheet.create({
    Login__Container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
      
        height:'100%',
        
     
        
       
        
    },
    Login__LogoContainer:{

        marginTop:70,
    },
    Login__Logo:{
        resizeMode:'contain',
        width:200
        
    },
    textvalid: {
       
    },
    textinvalid: {
        borderWidth:1,
        borderColor: '#F73C3C',
    },
    Login__Form:{
        marginTop:30,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    LoginForm__Text:{
        
        fontFamily:'Arial',
        fontSize:25,
        fontWeight:'800'
        
    },
    Login__Inputs:{
        backgroundColor:'#E8E8E8',
        width:290,
        marginTop:20,
        height:50,
        paddingLeft:20,
        borderRadius:3
    },
    Login__Button:{
        width:290,
        backgroundColor:'#29B0DB',
        alignItems:'center',
        padding:10,
        margin:30,
        borderRadius:3
    },
    Login__ButtonLogin:{
        color:'#FFFFFF',
    },
    Login__RegisterSection:{
        display:'flex',
        flexDirection:'row'
        
    },
    Login__Registertext:{
        color:'#000000'
    },
    Login__SignUp:{
        color:'#29B0DB'
    },
    Login__Forgot:{
        color:'#29B0DB',

        marginBottom:18
    },
    Login__ChangeMode:{
        bottom:-110,
    },
    Slider__bg:{
        backgroundColor:'#E8E8E8',
        height:25,
        width:50,
        borderRadius:20

    },
    Slider__Button:{
        backgroundColor:'#FF914D',
        height:25,
        width:25,
        borderRadius:50
    }
})

export default Login