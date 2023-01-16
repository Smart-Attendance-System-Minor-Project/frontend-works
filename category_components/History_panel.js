import {StyleSheet, View, Text, NativeModules } from 'react-native'

import { SwipeablePanel } from 'rn-swipeable-panel';
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native';

const History_panel = () => {

   
    
    const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    openSmall:true,
    showCloseButton: false,
    onClose: () =>closePanel(),
    onPressCloseButton: () => closePanel()});

    const [isPanelActive, setIsPanelActive] = useState(true);
    const openPanel = () => {
        setIsPanelActive(true);
        
    };
    

    const closePanel = ()=>{
        setIsPanelActive(false);
    }

     
    
   
  return (
               

         
                <View style={styles.container}>
                   
                   <TouchableOpacity style = {styles.View__Records} onPress = {openPanel}>
                    <Text style = {{color:"white"}}>View Records</Text></TouchableOpacity>
                    <SwipeablePanel {...panelProps} isActive={isPanelActive}
                    noBackgroundOpacity = {true}
                    allowTouchOutside = {true}
                    showCloseButton = {false}
                    
                    barStyle = {{backgroundColor:'#29B0DB'}}
                    >
                       
                        {/* Your Content Here */}
                        <View style = {styles.history__titleContainer}>
                            <Text style = {styles.history__title}>Previous Records</Text>
                        </View>
                    </SwipeablePanel>
                </View>
           
   
  );
}

const styles = StyleSheet.create({

    container:{
        marginTop:'120%',
        backgroundColor:'Blue'
    },
    View__Records:{
        marginTop:'-115%',
        
        height:60,
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#29B0DB',
        borderRadius:9,
        shadowColor:'black',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        marginLeft:20,
        marginRight:20,
        
        shadowOpacity: 0.04,
        shadowRadius: 3.84,
        padding:15
      
    },
    history__titleContainer:{
      
        
        marginTop:10,
        padding:20
       
        
    },
    history__title:{
        fontSize:18,
        textAlign:'center',
        color:'#29B0DB'
    }
})

module.exports = {
    History_panel:History_panel,
    
}

