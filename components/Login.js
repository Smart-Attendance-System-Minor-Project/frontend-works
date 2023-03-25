import { View, Text,StyleSheet,Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import {React,useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import darkMode from '../styles/darkMode';
import {login,reset,userData} from '../redux/reducers/authSlice';
import {useSelector,useDispatch} from 'react-redux';
import * as FileSystem from 'expo-file-system'
import {Ionicons} from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store';
import { recordList } from '../redux/reducers/recordListSlice';
import { StackActions } from '@react-navigation/native';
const Login = ({navigation,theme}) => {
 
   
    const dispatch = useDispatch();

    const {isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)
    const [isSecureEntry,setIsSecureEntry] = useState(true);
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

            
   
    useEffect(()=>{
      
      
        async function checkStatus()
        {
           
            const user = await SecureStore.getItemAsync("token");
       
            
            // 9857031201
            

            if(user || isSuccess) {

                const recordFileDirUri = FileSystem.documentDirectory + `AttendanceRecords_${username}`;
                try {
                  const recordsPresent = await FileSystem.readDirectoryAsync(recordFileDirUri);
                  if(recordsPresent) 
                  {   
                    
                    
                    dispatch(recordList(recordsPresent))
          
                  }
                 
                  
          
          
                } catch (error) {
                  await FileSystem.makeDirectoryAsync(recordFileDirUri);
                  console.log("Directory has been created")
                }
               
           
             
              dispatch(userData(username))
              navigation.dispatch(
                StackActions.replace('Home')
              );
              setIsSecureEntry(true);
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
       
       <View style = {{height:5,marginTop:10}}>
        {isLoading && <ActivityIndicator size="large" color="#29b0db" style = {{marginTop:40}} />}
      </View>
      <View style = {styles.Login__LogoContainer}>
         <Image source={theme === 'light'?require('../pictures/Logos/LOGO_WA_LIGHT.png'):require('../pictures/Logos/LOGO_WA_DARK.png')} style = {styles.Login__Logo} /> 
         
      </View>
     

      <View style = {styles.Login__Form}>
        
        <Text style = {{color:'#F73C3C'}}>{message}</Text>
        <TextInput style = {[theme === 'light'?styles.Login__Inputs:darkMode.Login__Inputs,message?styles.textinvalid:styles.textvalid ]}
        autoCorrect = {false}
        autoCapitalize = "none" placeholder='Username or Email'
        value = {username}
        onPressIn = {()=>{}}
        onChangeText = {(e)=>{setUsername(e)}}
        ></TextInput>

        <View style = {[styles.Login__PasswordContainer,message?styles.textinvalid:styles.textvalid ]}>
        <TextInput style = {[styles.Login__InputsPassword]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="password"
        value = {password}
        onChangeText = {(e)=>{setPassword(e)}}
        secureTextEntry={isSecureEntry}
        
        >
        
        </TextInput>
        <TouchableOpacity onPress={()=>{ setIsSecureEntry(!isSecureEntry);}} >
            {isSecureEntry && <Ionicons name="eye-off-sharp" size={24} color="black" />}
            {!isSecureEntry && <Ionicons name="eye" size={24} color="black" />}
        
        </TouchableOpacity>
       
        </View>
        
       
        {/* <View style = {styles.showPassword__Container}>
            <CheckBox value = {!isSecureEntry} color = {'#29b0db'}
                            onValueChange = {()=>{
                            setIsSecureEntry(!isSecureEntry);
                            }}
            />
            <Text style = {{marginLeft:10}}>Show Password</Text>
        </View> */}
       
      

        <TouchableOpacity style = {styles.Login__Button}
        onPress = {handleLogin}
        >
            <Text style = {styles.Login__ButtonLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}}><Text style = {styles.Login__Forgot}>Forgot Password?</Text></TouchableOpacity>
      <View style = {styles.Login__RegisterSection}>
        <Text style = {theme === 'light'?styles.Login__Registertext:darkMode.Login__Registertext}> Don't have an account?  </Text>
            
        <TouchableOpacity onPress = {()=>{dispatch(reset());navigation.navigate('Register EmailEnter')}}><Text style = {styles.Login__SignUp}>Sign up</Text></TouchableOpacity>

       
      </View>
      
      <View style = {styles.Login__ChangeMode}>
            
            <Image style = {styles.Login__DeepLearners} source={require('../pictures/Logos/deep_learners_cropped.png')}></Image>
            
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

        marginTop:-10,
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
        margin:-50,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    LoginForm__Text:{
        
        fontFamily:'Arial',
        fontSize:25,
        fontWeight:'800'
        
    },
    Login__PasswordContainer:{

        backgroundColor:"#e8e8e8",
        width:290,
        height:50,
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        
        borderRadius:3
    },
    Login__Inputs:{
        backgroundColor:'#E8E8E8',
        width:290,
        marginTop:20,
        height:50,
        paddingLeft:20,
        borderRadius:3
    },
    Login__InputsPassword:{
        backgroundColor:'#E8E8E8',
        width:230,
  
   
        height:48,
        paddingLeft:0,
        borderRadius:3
    },
    Login__Button:{
        width:290,
        backgroundColor:'#29B0DB',
        alignItems:'center',
        padding:16,
        margin:30,
        borderRadius:3
    },
    showPassword__Container:{
        display:'flex',
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
       
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
        marginTop:45,
        marginBottom:10
    },
    // Login__ChangeMode:{
    //     position:'fixed',
    //     bottom:-100,
    //     display:'flex',
    //     alignItems:'center',
    // },
    Login__DeepLearners:{
        resizeMode:'contain',
        height:22,
        marginTop:140,
    }
    ,
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