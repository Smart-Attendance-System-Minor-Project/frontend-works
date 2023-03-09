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
import AddClass from './addClasses/AddClass';
import AttendanceScreen from './takeAttendance/AttendanceScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Appearance,
  Image,
  View,
  Button,
  TouchableOpacity,
  AppState,
} from 'react-native';
import { Platform } from 'react-native';
// import * as TaskManager from 'expo-task-manager';


import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './components/forgetPassword/ForgotPassword';
import OTPValidate from './components/forgetPassword/OTPValidate';
import EnterNewPassword from './components/forgetPassword/EnterNewPassword';
import FetchStudents from './addClasses/FetchStudents';
import ViewRecords from './AttendanceRecords/ViewRecords';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
//net info checks the network status of device: offline, online (Wifi or Cellular (2g,3g,4g,5g))
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterEmailEnter from './components/RegisterComponents/RegisterEmailEnter';
import RegisterOTP from './components/RegisterComponents/RegisterOTP';
import RegisterCreateUser from './components/RegisterComponents/RegisterCreateUser';




/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();


// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
Notifications.setNotificationHandler({
  handleNotification: async () => {
  return {
  shouldShowAlert: true
  }}
  })
const App = () => {

  

  
 
  Notifications.scheduleNotificationAsync(
  {  content: {
      title: "New data ready to be synchronized!",
      body: 'Tap to open the app.',
      data: { data: 'goes here' },
      sound:"notification_sound.wav"
    },
    
    
    trigger:{
      hour:20,
      minute:30,
      second:0,
      repeats:true
    }
   }
  );
  
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  const [isOnline,setIsOnline] = useState(null);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 

 })

 
 NetInfo.addEventListener(async(state) => {
  await AsyncStorage.setItem("connection",JSON.stringify(state.isConnected)); 
  });

 AppState.addEventListener('change', async (nextAppState) => {
  console.log(nextAppState);
  const loggedIn = await AsyncStorage.getItem("token");
  const username_ = await AsyncStorage.getItem("username");
  const internet = await AsyncStorage.getItem("connection");
  if(nextAppState === "active" && loggedIn && internet === "true")
    { 
      
      const classListUri = FileSystem.documentDirectory + `${username_}_classList.json`;
      try {
        
        
        const config = {
          headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` }
        };
        
        const dataFinder = {
          username:username_
        }
       
     
        //below code will be used to sync data with backend when back online
        var PresentClassesInLocal = JSON.parse(await FileSystem.readAsStringAsync(classListUri,{ encoding: FileSystem.EncodingType.UTF8 }));
        var PresentClassesInDB = (await axios.post("https://wellattend.pythonanywhere.com/attendance/view_class/",dataFinder,config)).data;
        var classNamesInDB = [];
        
        PresentClassesInDB.map(eachClassInfo=>{
          classNamesInDB.push(eachClassInfo.subject);
        })
       

        
        PresentClassesInLocal.map(async(eachClass)=>{
          if(!classNamesInDB.includes(eachClass.split(' - ')[0]))
          {
            const newClass = {
              username:username_,
              batch:eachClass.split(' - ')[1].slice(0,3),
              faculty:eachClass.split(' - ')[1].slice(3,6),
              section:eachClass.split(' - ')[1].slice(6,9),
              subject:eachClass.split(' - ')[0],
              class_type:eachClass.split(' - ')[1].slice(6,9) == 1?'P':'L'
            }

            const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/add_class/",newClass,config);
          }
        })
        
        //any new records
        const getRecordList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `AttendanceRecords_${username_}`);
        const response = (await axios.post("https://wellattend.pythonanywhere.com/attendance/get_records/",dataFinder,config)).data;

        var recordListInDB = [];
        response.map(eachSubRec=>{
          recordListInDB.push(`${eachSubRec.class_name}_${eachSubRec.subject.replace(/\s+/g, '')}.json`);
        })

        
        
        getRecordList.map(async(eachRecord)=>{
          if(!recordListInDB.includes(eachRecord))
          {
            const eachRecordDataUri = FileSystem.documentDirectory + `AttendanceRecords_${username_}/`+ eachRecord;
            const eachRecordData = JSON.parse(await FileSystem.readAsStringAsync(eachRecordDataUri,{encoding:FileSystem.EncodingType.UTF8}));
            
            
            const AttendanceRecord = {
              username:username_,
              class_name:eachRecord.split('_')[0],
              class_type:(eachRecord.split('_')[1]).slice(6,9).length == 1?"P":"L",
              subject:(eachRecord.split('_')[1]).split('.')[0].replace(/([A-Z])/g, ' $1').trim(),
              attendance_record:eachRecordData
      
            }
      
            
            //console.log(recordLists)
           
            
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/save_record/',AttendanceRecord,config);


          }
          
        })

        //any new attendance records
        for(var i = 0 ; i < getRecordList.length;i++)
        {
          const fileUri = FileSystem.documentDirectory + `AttendanceRecords_${username_}/` + getRecordList[i];
          const eachRecordData = JSON.parse(await FileSystem.readAsStringAsync(fileUri,{encoding:FileSystem.EncodingType.UTF8}));
          response.map(eachClassRecord=>{
            if(`${eachClassRecord.class_name}_${(eachClassRecord.subject).replace(/\s+/g, '')}.json` === getRecordList[i])
            {
              Object.keys(eachRecordData).map(async(eachDate)=>{
                if(!Object.keys(eachClassRecord.attendance_record).includes(eachDate))
                {
                  console.log("A new record of",eachClassRecord.subject,"found");
                  const newRecord = new Object();
                  newRecord[eachDate] = eachRecordData[eachDate]
                  const AttendanceRecord = {
                    username:username_,
                    class_name:eachClassRecord.class_name,
                    class_type:eachClassRecord.class_type,
                    subject:eachClassRecord.subject,
                    attendance_record:newRecord
            
                  }
                  const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/save_record/',AttendanceRecord,config);
                  

                }
              })
            }
          })
          

        }

      } catch(err)
      {
        console.log(err)
      }
    }
        
        
       
});
  

 
 


 useEffect(()=>{

  Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
    if(statusObj.status === "granted")
    {
      console.log("Paisakexa")
    }
    if (statusObj.status !== ("granted")) {
    return Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    return statusObj;
   
    }).then((statusObj) => {
    if (statusObj.status !== "granted") {
    return;
    }
    })

  },[]);

  return (
  
    <Provider store={store}>
      
      
      <NavigationContainer>
      
      <Stack.Navigator initialRouteName = 'Login' >
        <Stack.Screen name = "Login" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}> 
      
          {(props) => <Login {...props} theme = {theme}/>} 
        
        </Stack.Screen>

        <Stack.Screen name = "Register OTPValidate" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
          title: "Verfiy OTP",
          gestureEnabled:false,
          headerBackVisible:false  
          }}> 
      
          {(props) => <RegisterOTP {...props} theme = {theme}/>} 
        
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
       title:'Home',
       headerBackVisible:false,
       gestureEnabled:false,
       left:null,
      
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

        <Stack.Screen name = "View Records" options = {{headerStyle:{backgroundColor:'#29B0DB'},
        title:'Your Records',
        gestureEnabled:false,
       
        headerTintColor: '#fff'}}>
        {(props) => <ViewRecords {...props} theme = {theme}/>} 
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
  App__Container:{
    
  }
});

export default App;
