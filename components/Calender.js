import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
 import darkModeCalendar from '../styles/darkModeCalendar';
export default function WeekCalendar({theme}) {
 
  return (
    <View style={styles.container}>
      <WeeklyCalendar  style={theme === 'light'?styles.WeekCalendar_style:darkModeCalendar.WeekCalendar_style} 
      titleStyle = {theme === 'light'?styles.WeekCalendar_titlestyle:darkModeCalendar.WeekCalendar_titlestyle}
      titleFormat = 'MMM YYYY'
      themeColor={'#29B0DB'} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {

    backgroundColor: '#212121',
    alignItems: 'center',
    
    
  },
  WeekCalendar_style:{
    height:100,
    backgroundColor:'#fff',
    
  },
  WeekCalendar_titlestyle:{
    color:'#242424'
  }
})