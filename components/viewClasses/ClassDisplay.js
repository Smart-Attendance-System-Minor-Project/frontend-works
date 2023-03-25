import { ScrollView,View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EachClassDisplay from './EachClassDisplay'
import * as SecureStore from 'expo-secure-store'
import * as FileSystem from 'expo-file-system'



const ClassDisplay = ({navigation,theme}) => {
  //const {className,isSuccess,isLoading} = useSelector(state=>state.classList)
  const [className,setClassName] = useState([]);

  const [refresh,setRefresh] = useState(false);
  const getClass=async()=>{
    try {
      const username = await SecureStore.getItemAsync("username");
      const fileUri = FileSystem.documentDirectory +  `${username}_classList.json`;
      const class_ = JSON.parse(await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 }));

      //class_.push("view");
      //dispatch(classList(class_));
      setClassName(class_);
      setRefresh(false);


    } catch (error) {
      console.log(error)
      alert("No classes yet");
      navigation.navigate("Home");
     // dispatch(classList([]));
      
    }
  }
  useEffect(()=>{
    
    
   
    console.log(1)
    getClass();
   
    
  
  },[refresh])

  
  return (
    <View style={{flex:1}}>
    <View >
      <Text style = {styles.holdToDelete}>Tips: Hold a class to delete it</Text>
    </View>
    <ScrollView>
      {className.map(eachClass=>{
        return (
          <View key = {eachClass}>
            <EachClassDisplay 
             classInfo = {eachClass}
             RecordsTaken = {10}
             refreshing = {setRefresh}
             />
          </View>
        )
      })}

      
    </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  holdToDelete:{
    fontSize:12,
    textAlign:"right",
    fontWeight:"600",
    color:"#505050",
    margin:20
  }
})

export default ClassDisplay