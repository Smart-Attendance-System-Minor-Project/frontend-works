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
import AddClass from './addClasses/AddClass';
import AttendanceScreen from './takeAttendance/AttendanceScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  Appearance,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './components/ForgotPassword';
import Ionicons from '@expo/vector-icons/Ionicons';
import FetchStudents from './addClasses/FetchStudents';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();

const App = () => {

 

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })


  return (
  
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Login' 
      
      >
        <Stack.Screen name = "Login" options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}> 
      
          {(props) => <Login {...props} theme = {theme}/>} 
        
        </Stack.Screen>
        
        <Stack.Screen name = "Register"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

              {(props) => <Register {...props} theme = {theme}/>} 
        </Stack.Screen>
        <Stack.Screen name = "ForgotPassword"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

        {(props) => <ForgotPassword {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Choose Class"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

        {(props) => <ChooseClass {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Add Class"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

        {(props) => <AddClass {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Choose Subject"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

        {(props) => <ChooseSubject {...props} />} 
        </Stack.Screen>

        <Stack.Screen name = "Fetch Students"  options = {{headerStyle:{backgroundColor:'#29B0DB'}, headerTintColor: '#fff'}}>

        {(props) => <FetchStudents {...props} />} 
        </Stack.Screen>        


        <Stack.Screen name = "Home" options = {{headerStyle:{backgroundColor:'#29B0DB'},
       title:'',
        
        headerTintColor: '#fff'}}>
        {(props) => <HomeScreen {...props} theme = {theme}/>} 
        </Stack.Screen>

        <Stack.Screen name = "Attendance Screen" options = {{headerStyle:{backgroundColor:'#29B0DB'},
       title:'',
        
        headerTintColor: '#fff'}}>
        {(props) => <AttendanceScreen {...props} theme = {theme}/>} 
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
