import { View, Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { TouchableOpacity } from 'react-native'
import {openPanel,closePanel} from './History_panel';
import { SwipeablePanel } from 'rn-swipeable-panel';
const Category = ({icon,label,numbers,action}) => {

    const handleClick = ()=>{
        if(action == "ViewRecords")
        {
            
        
        }
    }
    
  return (
    <View style = {styles.category_container}>
      <TouchableOpacity style = {styles.category_buttons} onPress = {handleClick}>
        <Text style = {styles.category__title}>{label}</Text>
        {numbers &&  <View style = {styles.category__numbers}>
          <Text>{numbers}</Text>
        </View>}
      </TouchableOpacity>

     
      
    </View>
  )
}

const styles = StyleSheet.create({
    category_container:{
        backgroundColor:'FFFFFF',
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        borderRadius:9,
        color:'black',
    
        
    },
    category_buttons:{
        width:'100%',
        display:'flex',
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderRadius:9,
        shadowColor:'black',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 3.84,
        padding:15
    },
    category__numbers:{
        backgroundColor:'#99DEF3',
        width:30,
        height:30,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'50%'
    },
    container:{
        marginTop:'100%',
        backgroundColor:'Blue'
    },
    history__titleContainer:{
      
        
        marginTop:10,
        padding:20
       
        
    }
})
export default Category