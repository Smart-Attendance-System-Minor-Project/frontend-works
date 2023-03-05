import { View, Text,StyleSheet, RefreshControlBase ,TouchableOpacity,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import darkModeHS from '../styles/darkModeHS';
import { SwipeablePanel } from 'rn-swipeable-panel';
import axios from 'axios';
import WeekCalendar from './Calender';
import Category from '../category_components/Category';
import { record,reset } from '../redux/reducers/recordsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { recordList } from '../redux/reducers/recordListSlice';
import * as FileSystem from 'expo-file-system';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation,theme}) => {



 
  const [month,setmonth] = useState('');
  const [year,setyear] = useState('');
  
 
  
  
  const dispatch = useDispatch();

  const [status,setStatus] = useState(null);
  const {user} = useSelector(state=>state.auth)
  const {isSuccess} = useSelector(state=>state.records)
  const {recordLists} = useSelector(state=>state.recordList)

  const closePanel = ()=>{
    setIsPanelActive(false);
}
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    openSmall:true,
    showCloseButton: false,
    onClose: () =>{setIsPanelActive(false)},
    onPressCloseButton: () => setIsPanelActive(false)});

    const [isPanelActive, setIsPanelActive] = useState(false);
    const openPanel = () => {
        setIsPanelActive(true);
      }
        

  useEffect(()=>{
    
    async function getClass()
    {
     
      //await FileSystem.deleteAsync(FileSystem.documentDirectory + `AttendanceRecords_${user}`)
      setStatus(await AsyncStorage.getItem("connection"));
      const currDate = new Date();
      setmonth(currDate.toLocaleString('default', { month: 'short' }));
      setyear(currDate.getFullYear());
      
      const fileUri = FileSystem.documentDirectory +  `${user}_classList.json`;
     
      var Classes = [];
      try { 
        var PresentClasses = JSON.parse(await FileSystem.readAsStringAsync(fileUri,{ encoding: FileSystem.EncodingType.UTF8 }));
        if(PresentClasses)
        {
          
          for(var i=0;i<PresentClasses.length;i++){
            Classes.push(PresentClasses[i]);
            
          }
        }
      
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(Classes), { encoding: FileSystem.EncodingType.UTF8 });
          
      } catch (error) {
        console.log("No classes yet");
      }


    
     

    }
   
    getClass();

    if(isSuccess)
    {
      navigation.navigate('View Records')
      dispatch(reset())
    }
  

 
   
  },[isSuccess,recordList])

  const handleRecord = async(recordName)=>{

    //recordName is set as CLASSID_CLASS.JSON

    const fileURI  = FileSystem.documentDirectory + `AttendanceRecords_${user}/` + recordName;
    
    const recordPresent = JSON.parse(await FileSystem.readAsStringAsync(fileURI,{encoding:FileSystem.EncodingType.UTF8}));
    await AsyncStorage.setItem('classroom__id',(recordName.split('.')[0]).split('_')[0])
    
    if(recordPresent)
    {


        dispatch(record(recordPresent))
       
    }
    
  } 


  return (
    <View style= {theme === 'light'?styles.HomeScreen__Container:darkModeHS.HomeScreen__Container}>
       <WeekCalendar theme = {theme}/>
      
       <View style = {styles.titles}>
        <Text style = {theme === 'light'?styles.HomeScreen__Category:darkModeHS.HomeScreen__Category}>CATEGORIES</Text>
        <Text style = {status === "true"?styles.HomeScreen__StatusOnline:styles.HomeScreen__StatusOffline}>{status === "true"?"Online":"Offline"}</Text>
       </View>
       
       <Category label = {'Take Attendance'} 
       navigation = {navigation} 
       action = 'TAKE_ATTENDANCE'
    
       />
       <Category label = {'Add Classes'}
        navigation = {navigation}
        action = 'ADD_CLASS'
        
        />
       <Category label = {'Log Out'} navigation = {navigation}
       action='LOG_OUT'
    
       />
        <TouchableOpacity style = {styles.View__Records} onPress={()=>openPanel()}><Text style={{color:"#fff"}}>View Records</Text></TouchableOpacity>
        <View style={styles.container}>
                   
                  
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
                                {recordLists.map(eachRecord =>{
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
       
           
    </View>
  )
}



const styles = StyleSheet.create({
    HomeScreen__Container:{
   backgroundColor:'#F2F2F2'
    },
  
    HomeScreen__Category:{
      color:'#C9C8C8',  
    },
    HomeScreen__StatusOnline:{
      color:'green',  
    },
    HomeScreen__StatusOffline:{
      color:'yellow',  
    },
    View__Records:{
     marginTop:20,
      
      height:60,
      alignItems:'center',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      backgroundColor:'#29B0DB',
      borderRadius:9,
      
      shadowOffset: {
          width: 1,
          height: 4,
      },
      marginLeft:20,
      marginRight:20,
      color:'#fff',
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
      color:'#000'
  },
  history__ListContainer:{
      marginTop:20
  },
  history__List:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      backgroundColor:'#F3F3F2',
      borderColor:'#29b0db',
      borderRadius:9,
      padding:20,
      margin:10

  },
  history__ListText:{
      color:'#000'
  },
  titles:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:50,
    marginLeft:20,
    marginRight:20
    
  }
})

export default HomeScreen