import {StyleSheet, View, Text,Appearance,ScrollView } from 'react-native'

import { SwipeablePanel } from 'rn-swipeable-panel';
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system'
import { useSelector } from 'react-redux';

const History_panel = ({navigation}) => {
    const [theme,setTheme] = useState(Appearance.getColorScheme());
    
    const [presentStudents,setPresentStudents] = useState(0);
    const [absenStudents,setAbsentStudents] = useState(0);
    Appearance.addChangeListener((scheme)=>{
     setTheme(scheme.colorScheme); 
   })

   const {recordList} = useSelector(state=>state.recordList)
   const {user} = useSelector(state=>state.auth)
    
    const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    openSmall:true,
    showCloseButton: false,
    onClose: () =>closePanel(),
    onPressCloseButton: () => closePanel()});

    const [isPanelActive, setIsPanelActive] = useState(false);
    const openPanel = () => {
        setIsPanelActive(true);
        setPanelProps({
            fullWidth: true,
            openLarge: true,
            openSmall:false,
            showCloseButton: false,
            onClose: () =>closePanel(),
            onPressCloseButton: () => closePanel()

        })
        
        

    };
    const handleRecord = async(recordName)=>{

        const fileURI  = FileSystem.documentDirectory + `AttendanceRecords_${user}/` + recordName;
        
        const recordPresent = await FileSystem.readAsStringAsync(fileURI,{encoding:FileSystem.EncodingType.UTF8});
        if(recordPresent)
        {
            console.log(recordPresent)
        }
        
    }

    


    useEffect(()=>{
       
       
    },[isPanelActive])
    

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
                    style = {[theme==='light'?{backgroundColor:'#fff'}:{backgroundColor:'#2B2B2B'}]}
                    barStyle = {{backgroundColor:'#29B0DB'}}
                    >
                       
                        {/* Your Content Here */}
                        
                        <ScrollView style = {styles.history__titleContainer}>
                            <Text style = {styles.history__title}>Previous Records</Text>
                            <View style = {styles.history__ListContainer}>
                                {recordList.map(eachRecord =>{
                                    return (
                                        <TouchableOpacity key={eachRecord} style = {styles.history__List} onPress = {()=>handleRecord(eachRecord)}>
                                            <Text style = {styles.history__ListText}>{(eachRecord.split('.')[0]).split('_')[1]}</Text>
                                            <Text style = {styles.history__ListText}>{(eachRecord.split('.')[0]).split('_')[0]}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>

                            
                        </ScrollView>   
                        
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
        color:'#fff'
    },
    history__ListContainer:{
        marginTop:20
    },
    history__List:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#232323',
        borderRadius:9,
        padding:20,
        margin:10

    },
    history__ListText:{
        color:'#29B0DB'
    }
})

module.exports = {
    History_panel:History_panel,
    
}

