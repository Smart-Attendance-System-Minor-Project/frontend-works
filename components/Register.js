import { View, Text,StyleSheet,Appearance,TextInput,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import darkModeRegister from '../styles/darkModeRegister';
import {register,reset} from '../redux/reducers/authSlice';
import { useDispatch,useSelector } from 'react-redux';
const Register = ({navigation}) => {

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })

 const {isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

 const dispatch = useDispatch();

 useEffect(()=>{
    async function checkRegister()
    {
    

        if(isSuccess) {
           
            navigation.navigate('Home')
          }
          
          dispatch(reset())
    
    }
    
  
  checkRegister()

},[isLoading, isError,isSuccess,message,dispatch])

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [email,setEmail] = useState('');
  const [fullName,setFullName] = useState('');
  const [error,setError] = useState([]);

  
  const handleRegister = ()=>
  {
   
    
    const data = {
        username:username,
        password:password,
        confirm_password:confirmPassword,
        email:email,
        full_name:fullName
    }

    console.log(data);
    try {
       
        dispatch(register(data));
    } catch (error) {
        console.log(error.response);   
    }
   
     
  }
 


  useEffect(()=>{
        
   },[theme,username,password]);
  return (
    <View style = {theme === 'light'?styles.Register__Container:darkModeRegister.Register__Container}>
       <View style = {styles.Register__LogoContainer}>
         <Image source={theme === 'light'?require('../pictures/Logos/LOGO_WA_BGT_LIGHT.png'):require('../pictures/Logos/LOGO_WA_BGT_DARK.png')} style = {styles.Register__Logo} /> 
      </View>

      <View style = {styles.Register__Form}>
        
        <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,error[0]?styles.textinvalid:styles.textvalid ]}
        autoCorrect = {false}
        autoCapitalize = "words" placeholder='Full Name'
        value = {fullName}
        onPressIn = {()=>{}}
        onChangeText = {(e)=>{setFullName(e)}}
        ></TextInput>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{error[0]}</Text>
       
        {/* These are actually the inputs taken */}
        <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,error[1]?styles.textinvalid:styles.textvalid ]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="Email Address"
        value = {email}
        onChangeText = {(e)=>{setEmail(e)}}
        secureTextEntry={false}
        ></TextInput>
        <Text style = {{color:'#9CA8BD',marginTop:'1%'}}>Please use your campus email id</Text>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{error[1]}</Text>
        

        <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,error[2]?styles.textinvalid:styles.textvalid ]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="Username"
        value = {username}
        onChangeText = {(e)=>{setUsername(e)}}
        secureTextEntry={false}
        ></TextInput>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{error[2]}</Text>

        <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,error[3]?styles.textinvalid:styles.textvalid ]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="Password"
        value = {password}
        onChangeText = {(e)=>{setPassword(e)}}
        secureTextEntry={false}
        ></TextInput>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{error[3]}</Text>

        <TextInput style = {[theme === 'light'?styles.Register__Inputs:darkModeRegister.Register__Inputs,error[3]?styles.textinvalid:styles.textvalid ]}
        label = 'label'
        autoCorrect = {false}
        onPressIn = {()=>{}}
        autoCapitalize = "none"
        placeholder="Confirm Password"
        value = {confirmPassword}
        onChangeText = {(e)=>{setConfirmPassword(e)}}
        secureTextEntry={false}
        ></TextInput>
        <Text style = {{color:'#F73C3C',marginLeft:'-44%'}}>{error[4]}</Text>

      

        

        <TouchableOpacity style = {styles.Register__Button}
        onPress = {handleRegister}
        >
            <Text style = {styles.Register__ButtonRegister}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.Register__RegisterSection}>
        <Text style = {theme === 'light'?styles.Register__Registertext:darkModeRegister.Register__Registertext}> Already have an account?  </Text>
            
        <TouchableOpacity onPress = {()=>{navigation.navigate('Login')}}><Text style = {styles.Register__SignUp}>Login</Text></TouchableOpacity>

      </View>
   
      <View style = {styles.Register__ChangeMode}>
            
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

export default Register