/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import ChooseClass from './takeAttendance/ChooseClass';
import ChooseSubject from './addClasses/ChooseSubject';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { handleDelete } from './takeAttendance/ClassAdded';
import AddClass from './addClasses/AddClass';
import AttendanceScreen from './takeAttendance/AttendanceScreen';
import {
  StyleSheet,
  Appearance,
  AppState,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';


import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './components/forgetPassword/ForgotPassword';
import OTPValidate from './components/forgetPassword/OTPValidate';
import EnterNewPassword from './components/forgetPassword/EnterNewPassword';
import FetchStudents from './addClasses/FetchStudents';
import ViewRecords from './AttendanceRecords/ViewRecords';
import * as Notifications from 'expo-notifications';
import { MaterialCommunityIcons,MaterialIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
//net info checks the network status of device: offline, online (Wifi or Cellular (2g,3g,4g,5g))
import NetInfo from '@react-native-community/netinfo';
import RegisterEmailEnter from './components/RegisterComponents/RegisterEmailEnter';
import ValidateOTP from './components/RegisterComponents/ValidateOTP';
import RegisterCreateUser from './components/RegisterComponents/RegisterCreateUser';
import * as SecureStore from 'expo-secure-store';
import ClassDisplay from './components/viewClasses/ClassDisplay';
import StudentDisplay from './components/viewClasses/StudentDisplay';
import { syncData } from './SyncData';
import AttendanceInfoScreen from './takeAttendance/AttendanceInfoScreen';


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();



const App = () => {

  
 
  { Notifications.scheduleNotificationAsync(
    {  content: {
        title: "New data ready to be synchronized!",
        body: 'Tap to open the app.',
        data: { data: 'goes here' },
        sound:"notification_sound.wav"
      },
      trigger:{
        hour: 20,
        minute: 30,
        repeats: true
      }
  
     }
    );
  
   }
 
  
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  // const [isOnline,setIsOnline] = useState(null);
  // const [isRegistered, setIsRegistered] = useState(false);
  // const [status, setStatus] = useState(null);
  const [userExists,setUserExists] = useState(false);
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })


 AppState.addEventListener('change', async (nextAppState) => {
  
  if(nextAppState === "active")
  {
    syncData(); 
  }
  
});
  

 
 


 useEffect(()=>{

  async function getNotificationSetup()
  {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const isUser = await SecureStore.getItemAsync("token");
    if(isUser)
    {
      setUserExists(true);
    }
    else setUserExists(false);
    

  }
  getNotificationSetup();

  },[userExists]);

 

  return (
  
    <Provider store={store}>
      
      
      <NavigationContainer>
      
      <Stack.Navigator initialRouteName = "Login">
        <Stack.Screen name = "Login" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
      headerBackVisible:false,
      }}> 
      
          {(props) => <Login {...props} theme = {theme}/>} 
        
        </Stack.Screen>

        <Stack.Screen name = "Register OTPValidate" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
          title: "Verfiy OTP",
          gestureEnabled:false,
          headerBackVisible:false  
          }}> 
      
          {(props) => <ValidateOTP {...props} theme = {theme}/>} 
        
        </Stack.Screen>

        <Stack.Screen name = "Register CreateUser" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
          title: "Create User",
          gestureEnabled:false,
          headerBackVisible:false
          }}> 
      
          {(props) => <RegisterCreateUser {...props} theme = {theme}/>} 
        
        </Stack.Screen>

        <Stack.Screen name = "Register EmailEnter" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
      title: "Email Verify"  
      }}> 
      
          {(props) => <RegisterEmailEnter {...props} theme = {theme}/>} 
        
        </Stack.Screen>

       

        
        {/* <Stack.Screen name = "Register"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
        headerBackVisible:false,
        gestureEnabled:false,
      }}>

              {(props) => <Register {...props} theme = {theme}/>} 
        </Stack.Screen> */}
        <Stack.Screen name = "ForgotPassword"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
      gestureEnabled:false,
      headerBackVisible:true
      }}>

        {(props) => <ForgotPassword {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Choose Class"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
        gestureEnabled:false,
      
      }}>

        {(props) => <ChooseClass {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Add Class"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
        gestureEnabled:false,}}>

        {(props) => <AddClass {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Choose Subject"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
        gestureEnabled:false,
      }}>

        {(props) => <ChooseSubject {...props} />} 
        </Stack.Screen>

        <Stack.Screen name = "Fetch Students"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
        gestureEnabled:false,
        headerBackVisible:false
      }}>

        {(props) => <FetchStudents {...props} />} 
        </Stack.Screen>        


        <Stack.Screen name = "Home" options = {{headerStyle:{backgroundColor:'#29B0DB'},
       title:null,
       headerBackVisible:false,
       gestureEnabled:false,
       headerShown:true,
       
       headerLeft:()=>(
     
        <Image source = {require("./pictures/Logos/brightLogo_WA.png")} style = {styles.wellAttendLogo}/>

       ),
      //  headerRight:()=>(
      //   <MaterialCommunityIcons name="dots-vertical" size={32} color="#fff" style = {{marginLeft:-20}}/>
      //  ),
      
        headerTintColor: '#fff'}}>
        {(props) => <HomeScreen {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Attendance Screen" options = {{headerStyle:{backgroundColor:'#29B0DB'},
       title:'Attendance Time!',
       gestureEnabled:false,
       headerBackVisible:false,
        headerTintColor: '#fff'}}>
        {(props) => <AttendanceScreen {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "AttendanceInfoScreen" options = {{headerStyle:{backgroundColor:'#29B0DB'},
       title:'Attendance Information',
       gestureEnabled:false,
       headerBackVisible:false,
        headerTintColor: '#fff'}}>
        {(props) => <AttendanceInfoScreen {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "View Records" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'Your Records',
        gestureEnabled:false,
       
        headerTintColor: '#fff'}}>
        {(props) => <ViewRecords {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "ViewClass" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'Your Classes',
        gestureEnabled:false,
       
        headerTintColor: '#fff'}}>
        {(props) => <ClassDisplay {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "ViewStudents" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'Students',
        gestureEnabled:false,
       
        headerTintColor: '#fff'}}>
        {(props) => <StudentDisplay {...props} theme = {theme}/>} 
        </Stack.Screen>


        <Stack.Screen name = "OTP Validation" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'Validate OTP',
        gestureEnabled:false,
        headerBackVisible:false,
        headerTintColor: '#fff'}}>
        {(props) => <OTPValidate {...props} theme = {theme}/>} 
        </Stack.Screen>

        {/* <Stack.Screen name = "OTP for Email" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'OTP',
        gestureEnabled:false,
        headerBackVisible:false,
        headerTintColor: '#fff'}}>
        {(props) => <OTPforEmail {...props} theme = {theme}/>} 
        </Stack.Screen> */}

        <Stack.Screen name = "Enter NewPassword" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'New Password',
        gestureEnabled:false,
        headerBackVisible:false,
        headerTintColor: '#fff'}}>
        {(props) => <EnterNewPassword {...props} theme = {theme}/>} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
   
   
    
  );
};

const styles = StyleSheet.create({
  wellAttendLogo:{
    resizeMode:"contain",
    height:20,
    marginRight:'85%'
    
  }
})

export default App;
