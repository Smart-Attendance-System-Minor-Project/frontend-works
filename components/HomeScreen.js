import { View, Text,StyleSheet, RefreshControlBase } from 'react-native'
import React,{useState,useEffect} from 'react'
import darkModeHS from '../styles/darkModeHS';
import * as SQLite from 'expo-sqlite'
import WeekCalendar from './Calender';
import Category from '../category_components/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { version } from 'react';
import {History_panel} from '../category_components/History_panel';
const HomeScreen = ({navigation,theme}) => {



  const [class_,setClass] = useState([]);
  const [month,setmonth] = useState('');
  const [year,setyear] = useState('');
  const [disabled,setDisabled] = useState(true);
  const  [countClass,setCountClass] = useState(0);
  
  

  useEffect(()=>{
    async function getClass()
    {
     
      const currDate = new Date();
      //await AsyncStorage.removeItem('classList')
      console.log(await AsyncStorage.getItem('076BCE'));
      setmonth(currDate.toLocaleString('default', { month: 'short' }));
      setyear(currDate.getFullYear());
  
    }

    getClass();
 
   
  },[])


  return (
    <View style= {theme === 'light'?styles.HomeScreen__Container:darkModeHS.HomeScreen__Container}>
       <WeekCalendar theme = {theme}/>
       <Text style = {theme === 'light'?styles.HomeScreen__Category:darkModeHS.HomeScreen__Category}>CATEGORIES</Text>
       <Category label = {'Take Attendance'} 
       navigation = {navigation} 
       action = 'TAKE_ATTENDANCE'
       disabled = {disabled}
       />
       <Category label = {'Add Classes'} numbers = {`${0}`}
        navigation = {navigation}
        action = 'ADD_CLASS'
        
        />
       <Category label = {'Download Records'} navigation = {navigation}
       action='LOG_OUT'
       disabled = {disabled}
       />
       <History_panel/>
    </View>
  )
}



const styles = StyleSheet.create({
    HomeScreen__Container:{
   
    },
  
    HomeScreen__Category:{
      color:'#C9C8C8',
      marginTop:50,
      marginLeft:20
    }
})

export default HomeScreen