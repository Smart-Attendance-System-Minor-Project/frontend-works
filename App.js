/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import HomeScreen from './components/HomeScreen';
import ChooseClass from './takeAttendance/ChooseClass';
import ChooseSubject from './addClasses/ChooseSubject';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
var Datastore = require('react-native-local-mongodb');
import { useSelector } from 'react-redux';
import AddClass from './addClasses/AddClass';
import AttendanceScreen from './takeAttendance/AttendanceScreen';
import * as FileSystem from 'expo-file-system'
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
  TouchableOpacity
} from 'react-native';



import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './components/ForgotPassword';
import FetchStudents from './addClasses/FetchStudents';
import { useEffect } from 'react';
import ViewRecords from './AttendanceRecords/ViewRecords';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();


const App = () => {


  
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 

 })


  // const createFile = async()=>{
  //   const fileUri = FileSystem.documentDirectory + 'studentList.json';
  //   const data='';
  //   await FileSystem.writeAsStringAsync(fileUri,data,{ encoding: FileSystem.EncodingType.UTF8 });
  // }

  

 useEffect(()=>{
  

 },[])

 

 


  return (
  
    <Provider store={store}>
      
      
      <NavigationContainer>
      
      <Stack.Navigator initialRouteName = 'Login' 
     

      
      >
        <Stack.Screen name = "Login" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}> 
      
          {(props) => <Login {...props} theme = {theme}/>} 
        
        </Stack.Screen>
        
        <Stack.Screen name = "Register"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff',
        headerBackVisible:false,
        gestureEnabled:false,
      }}>

              {(props) => <Register {...props} theme = {theme}/>} 
        </Stack.Screen>
        <Stack.Screen name = "ForgotPassword"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

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
        headerLeft: ()=>(
          <Button
          onPress={()=>alert("You pressed it")}
          title = {''}
          color = '#fff'
          
          ></Button>
        ),
      
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
