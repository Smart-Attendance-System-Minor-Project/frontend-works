import { View, Text,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import darkModeHS from '../styles/darkModeHS';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import WeekCalendar from './Calender';
import Category from '../category_components/Category';
import {History_panel} from '../category_components/History_panel';
const HomeScreen = ({navigation,theme}) => {

  const [month,setmonth] = useState('');
  const [year,setyear] = useState('');

 


  useEffect(()=>{
    const currDate = new Date();
    setmonth(currDate.toLocaleString('default', { month: 'short' }));
    setyear(currDate.getFullYear());
  },[])


  return (
    <View style= {theme === 'light'?styles.HomeScreen__Container:darkModeHS.HomeScreen__Container}>
       <WeekCalendar theme = {theme}/>
       <Text style = {theme === 'light'?styles.HomeScreen__Category:darkModeHS.HomeScreen__Category}>CATEGORIES</Text>
       <Category label = {'Take Attendance'} numbers = {7}/>
       <Category label = {'Add Classes'} numbers = {10}/>
       <Category label = {'Download Records'}/>
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