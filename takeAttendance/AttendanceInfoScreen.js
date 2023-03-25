import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper'

const AttendanceInfoScreen = ({route,navigation,theme}) => {

  const {subject,classroom,dateTaken,timeTaken,totalPresent,totalAbsent} = route.params;

  
  return (
    <View style = {styles.container}>
      <View>
        <Text style ={styles.heading}>Attendance taken successfully.</Text>
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Subject</DataTable.Title>
            <DataTable.Title style = {{justifyContent:"flex-end"}}>{subject}</DataTable.Title>            
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Classroom</DataTable.Title>
            <DataTable.Title  style = {{justifyContent:"flex-end"}}>{classroom}</DataTable.Title>            
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Date Taken</DataTable.Title>
            <DataTable.Title  style = {{justifyContent:"flex-end"}}>{dateTaken}</DataTable.Title>            
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Time Taken</DataTable.Title>
            <DataTable.Title  style = {{justifyContent:"flex-end"}}>{timeTaken}</DataTable.Title>            
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Total No. of Present Students</DataTable.Title>
            <DataTable.Title  style = {{justifyContent:"flex-end"}}>{totalPresent}</DataTable.Title>            
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Total No. of Absent Students</DataTable.Title>
            <DataTable.Title  style = {{justifyContent:"flex-end"}}>{totalAbsent}</DataTable.Title>            
          </DataTable.Header>
        </DataTable>
      </View>
      <View>
        <TouchableOpacity style = {styles.goToHome} onPress = {()=>{navigation.navigate("Home")}}>
          <Text style = {{color:"#fff",textAlign:"center"}}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 
  heading:{
    fontSize:18,
    fontWeight:"700",
    color:"#505050",
    textAlign:"center",
    margin:20
  },
  goToHome:{
    backgroundColor:'#29B0DB',
    height:60,
    padding:15,
    width:250,
    borderRadius:9,
    marginLeft:"18%",
    marginTop:30,
    display:"flex",
    flexDirection:"column",
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.09,
    shadowRadius: 3.84,
  }
})

export default AttendanceInfoScreen