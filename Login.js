import { View, Text,StyleSheet,Image, Appearance, TextInput, TouchableOpacity } from 'react-native'
import {React,useEffect, useState} from 'react';
import { Button } from 'react-native-web';
import darkMode from './styles/darkMode';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Login = () => {

    const [theme,setTheme] = useState(Appearance.getColorScheme());
    Appearance.addChangeListener((scheme)=>{
        setTheme(scheme.colorScheme); 
    })

    let mode = 2;
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

  
    const moveSlider=()=>{
       theme === 'light'?setTheme('dark'):setTheme('light');
      
    }

   

 
    useEffect(()=>{
        
     },[theme]);

    return (
    <View style = {theme === 'light'?styles.Login__Container:darkMode.Login__Container}>
        
      <View style = {styles.Login__LogoContainer}>
         <Image source={theme === 'light'?require('./pictures/Logos/Attend_Hori_Dark.png'):require('./pictures/Logos/Attend_Hori_Bright.png')} style = {styles.Login__Logo} /> 
      </View>

      <View style = {styles.Login__Form}>
        <Text style = {theme === 'light'?styles.LoginForm__Text:darkMode.LoginForm__Text}>WELCOME</Text>
        <TextInput style = {styles.Login__Inputs}
        autoCorrect = {false}
        autoCapitalize = "none" placeholder='username'
    
        ></TextInput>
        <TextInput style = {styles.Login__Inputs}
        label = 'label'
        autoCorrect = {false}
        autoCapitalize = "none"
         placeholder="placeholder"
        secureTextEntry={true}
        ></TextInput>

        <TouchableOpacity style = {styles.Login__Button}>
            <Text style = {styles.Login__ButtonLogin}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.Login__RegisterSection}>
        <Text style = {theme === 'light'?styles.Login__Registertext:darkMode.Login__Registertext}> Don't have an account?  </Text>
            
        <TouchableOpacity><Text style = {styles.Login__SignUp}>Sign up</Text></TouchableOpacity>

      </View>

      <View style = {styles.Login__ChangeMode}>
             <View style = {theme === 'light'?styles.Slider__bg:darkMode.Slider__bg}>
                <TouchableOpacity style = {theme === 'light'?styles.Slider__Button:darkMode.Slider__Button} onPress = {moveSlider}></TouchableOpacity>
             </View>
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
        marginTop:50
        
       
        
    },
    Login__LogoContainer:{

        marginTop:-140,
    },
    Login__Logo:{
        resizeMode:'contain',
        width:300
        
    },
    Login__Form:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    LoginForm__Text:{
        marginTop:-130,
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
        backgroundColor:'#FF914D',
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
        color:'#FF914D'
    },
    Login__ChangeMode:{
        bottom:-200,
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