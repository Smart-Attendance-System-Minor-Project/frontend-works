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

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();

const App = () => {

 

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })


  return (
  
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

        <Stack.Screen name = "Home" options = {{headerStyle:{backgroundColor:'#29B0DB'},
       title:'',
        
        headerTintColor: '#fff'}}>
        {(props) => <HomeScreen {...props} theme = {theme}/>} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
   
   
    
  );
};

const styles = StyleSheet.create({
  App__Container:{
    
  }
});

export default App;
