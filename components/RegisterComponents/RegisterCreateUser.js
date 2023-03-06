import { View, Text,Image,TextInput,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import darkModeRegister from '../../styles/darkModeRegister';
import { register,reset,userData } from '../../redux/reducers/authSlice';
import CheckBox from 'expo-checkbox';
import { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { useDispatch,useSelector } from 'react-redux';

const RegisterCreateUser = ({navigation,theme}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [fullName,setFullName] = useState('');
    const [isSecureEntry,setIsSecureEntry] = useState(true);

    const dispatch = useDispatch();
    const {isLoading,isError,isSuccess,message,email} = useSelector(state=>state.auth);
    useEffect(()=>{
        async function registerUser()
        {
            if(isSuccess)
            {
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
                navigation.navigate("Home");
            }
        }
        registerUser();
       
    },[isSuccess,isError,isLoading]);

    const handleRegister = async()=>{

        try {
            
            const data = {
                username:username,
                password:password,
                confirm_password:confirmPassword,
                full_name:fullName,
                email:email
            }
            console.log("1",data)
            dispatch(register(data));
            
        } catch (error) {
            console.log(error.response);   
        }
    
    }

  return (
    <View style = {theme === 'light'?styles.Register__Container:darkModeRegister.Register__Container}>
    <View style = {styles.Register__LogoContainer}>
      <Image source={theme === 'light'?require('../../pictures/Logos/LOGO_WA_BGT_LIGHT.png'):require('../../pictures/Logos/LOGO_WA_BGT_DARK.png')} style = {styles.Register__Logo} /> 
   </View>
   {isLoading && <ActivityIndicator size="large" color="#29b0db" />}
  
   <View style = {styles.Register__Form}>

     <Text style = {{color:'#F73C3C',textAlign:'center'}}>{message}</Text>
     
     <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,message?styles.textinvalid:styles.textvalid ]}
     autoCorrect = {false}
     autoCapitalize = "words" placeholder='Full Name'
     value = {fullName}
     onPressIn = {()=>{}}
     onChangeText = {(e)=>{setFullName(e)}}
     ></TextInput>
    
    
     {/* These are actually the inputs taken */}
    
     

     <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,message?styles.textinvalid:styles.textvalid ]}
     label = 'label'
     autoCorrect = {false}
     onPressIn = {()=>{}}
     autoCapitalize = "none"
     placeholder="Username"
     value = {username}
     onChangeText = {(e)=>{setUsername(e)}}
     secureTextEntry={false}
     ></TextInput>
    

     <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,message?styles.textinvalid:styles.textvalid ]}
     label = 'label'
     autoCorrect = {false}
     onPressIn = {()=>{}}
     autoCapitalize = "none"
     placeholder="Password"
     value = {password}
     onChangeText = {(e)=>{setPassword(e)}}
     secureTextEntry={isSecureEntry}
     ></TextInput>
    

     <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,message?styles.textinvalid:styles.textvalid ]}
     label = 'label'
     autoCorrect = {false}
     onPressIn = {()=>{}}
     autoCapitalize = "none"
     placeholder="Confirm Password"
     value = {confirmPassword}
     onChangeText = {(e)=>{setConfirmPassword(e)}}
     secureTextEntry={isSecureEntry}
     ></TextInput>
    
    {/* button to show or hide password */}
     <View style = {styles.showPassword__Container}>
         <CheckBox value = {!isSecureEntry} color = {'#29b0db'}
                         onValueChange = {()=>{
                         setIsSecureEntry(!isSecureEntry);
                         }}
         />
         <Text style = {{marginLeft:10}}>Show Password</Text>
     </View>

     {/* button to register */}
     <TouchableOpacity style = {styles.Register__Button}
     onPress = {handleRegister}>
         <Text style = {styles.Register__ButtonRegister}>Register</Text>
     </TouchableOpacity>
   </View>
 </View>
  )
}
const styles = StyleSheet.create({
    Register__Container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        
     
        
       
        
    },
    Register__LogoContainer:{
  
      
    },
    Register__Logo:{
        resizeMode:'contain',
        width:200
        
    },
    textvalid: {
       
    },
    textinvalid: {
        borderWidth:1,
        borderColor: '#F73C3C',
    },
    showPassword__Container:{
      display:'flex',
      marginTop:10,
      flexDirection:'row',
      alignItems:'center',
     
  },
    Register__Form:{
        marginTop:-20,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    RegisterForm__Text:{
        
        fontFamily:'Arial',
        fontSize:25,
        fontWeight:'800'
        
    },
    Register__Inputs:{
        backgroundColor:'#E8E8E8',
        width:290,
        marginTop:10,
        height:50,
        paddingLeft:20,
        borderRadius:3
    },
    Register__Button:{
        width:290,
        backgroundColor:'#29B0DB',
        alignItems:'center',
        padding:10,
        margin:30,
        borderRadius:3
    },
    Register__ButtonRegister:{
        color:'#FFFFFF',
    },
    Register__RegisterSection:{
        display:'flex',
        flexDirection:'row'
        
    },
    Register__Registertext:{
        color:'#000000'
    },
    Register__SignUp:{
        color:'#29B0DB'
    },
    Register__Forgot:{
        color:'#29B0DB',
  
        marginBottom:18
    },
    Register__ChangeMode:{
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
  

export default RegisterCreateUser