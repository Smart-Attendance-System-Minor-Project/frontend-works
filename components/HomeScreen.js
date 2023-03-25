import { View, Text,StyleSheet, SafeAreaView ,Modal,TouchableOpacity,ScrollView, ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react'
import darkModeHS from '../styles/darkModeHS';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store'
import WeekCalendar from './Calender';
import Category from '../category_components/Category';
import { record,reset } from '../redux/reducers/recordsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { recordList } from '../redux/reducers/recordListSlice';
import * as FileSystem from 'expo-file-system';
import { Ionicons,Fontisto,SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import { userData } from '../redux/reducers/authSlice';
import { FancyAlert,LoadingIndicator } from 'react-native-expo-fancy-alerts';
import { Stack } from 'native-base';

const HomeScreen = ({navigation,theme}) => {
  


 
  const [month,setmonth] = useState('');
  const [year,setyear] = useState('');
  const [user,setUser] = useState('');
  const [fullName,setFullName] = useState('');
  const [sureToLogOut,setSureToLogOut] = useState(false);
  
 
  
  
  const dispatch = useDispatch();
  const [recordList,setRecordList] = useState([]);
  const [status,setStatus] = useState(null);
  //const {user} = useSelector(state=>state.auth)
  const {isSuccess,isLoading} = useSelector(state=>state.records)
  //const {recordLists} = useSelector(state=>state.recordList)

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
    const openPanel = async() => {
        const recordFileDirUri = FileSystem.documentDirectory + `AttendanceRecords_${user}`;
        try {
          //const recordFileDirUri = FileSystem.documentDirectory + `AttendanceRecords_${user}`;
          const recordsPresent = await FileSystem.readDirectoryAsync(recordFileDirUri);
          if(recordsPresent) 
          {   
            
            
            setRecordList(recordsPresent);

          }
        } catch (error) {
          
        }
        setIsPanelActive(true);
        
      }
  
  async function setData()
  { 
   
    
    if(!await SecureStore.getItemAsync("token"))
    {
      navigation.navigate('Login');

    }
    
    setStatus(await SecureStore.getItemAsync("connection"));
    setUser(await SecureStore.getItemAsync("username"));
    
    const currDate = new Date();
    setmonth(currDate.toLocaleString('default', { month: 'short' }));
    setyear(currDate.getFullYear());
  }

  useEffect(()=>{

    if(isSuccess)
    {
      navigation.navigate('View Records')
      dispatch(reset())
    }
  
    
    async function getClass()
    {
     
      setData();
      dispatch(userData(user));
    }
   
    getClass();

   

 
   
  },[isSuccess,recordList,user,isLoading])

  const handleRecord = async(recordName)=>{

    //recordName is set as CLASSID_CLASS.JSON

    
    const fileURI  = FileSystem.documentDirectory + `AttendanceRecords_${user}/` + recordName;
    
    const recordPresent = JSON.parse(await FileSystem.readAsStringAsync(fileURI,{encoding:FileSystem.EncodingType.UTF8}));
    await SecureStore.setItemAsync('classroom__id',(recordName.split('.')[0]).split('_')[0])

    
    
    var columnHeaders = [];
    var rows = [];
    var totalPresenceRow = [];
    var totalAbsentRow = [];

    if(recordPresent)
    {
      Object.keys(recordPresent).map(eachDate=>{
        columnHeaders.push(eachDate);
      })
      
      columnHeaders.unshift("Roll Number");
      columnHeaders.unshift("Name");

      Object.keys(recordPresent[columnHeaders[2]]["Records"]).map(eachStudent=>{
        var eachStudentRowData = [];
        var countPresence = 0;
        var percentage = 0;
        eachStudentRowData.push(eachStudent.split(" - ")[0]);
        eachStudentRowData.push(eachStudent.split(" - ")[1]);
        Object.keys(recordPresent).map(eachDate=>{
          eachStudentRowData.push(recordPresent[eachDate]["Records"][eachStudent]);
          if(recordPresent[eachDate]["Records"][eachStudent] === "P")
          {
            countPresence += 1;
          }
        })

        // percentage = countPresence/columnHeaders.length * 100;
        // eachStudentRowData.push(percentage.toFixed(2));
        rows.push(eachStudentRowData);
      })

      // columnHeaders.push("Percentage Presence")
      

      Object.keys(recordPresent).map(eachDate=>{
        var absentCount = 0;
        var presentCount = 0;
        Object.keys(recordPresent[columnHeaders[2]]["Records"]).map(eachStudent=>{
          if(recordPresent[eachDate]["Records"][eachStudent] === "P")
          {
            presentCount += 1;
          } 
          else {
            absentCount += 1;
          }
        })
        totalAbsentRow.push(absentCount.toString());
        totalPresenceRow.push(presentCount.toString());
      })


      totalAbsentRow.unshift('');
      totalAbsentRow.unshift("Total Absent Students");

      totalPresenceRow.unshift('');
      totalPresenceRow.unshift("Total Present Students");


      var completeDataForView = [columnHeaders,rows,totalPresenceRow,totalAbsentRow];

     
      dispatch(record(completeDataForView));
  
    }
    
  } 

  const handleLogOutEvent =async()=> 
  {
    setSureToLogOut(false);
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("username");
    dispatch(reset());
    navigation.dispatch(
      StackActions.replace('Login')
    );
   
  }


  return (
    <View style= {[styles.HomeScreen__Container]}>
       <WeekCalendar theme = {theme}/>
       <LoadingIndicator visible = {isLoading}/>
      
       <View style = {styles.titles}>

       </View>
       
       <Category label = {'Take Attendance'} 
       navigation = {navigation} 
       action = 'TAKE_ATTENDANCE'
    
       />
       
       <Category label = {'View Classes'} navigation = {navigation}
       action='VIEW_CLASS'
    
       />
      
        <TouchableOpacity style = {styles.View__Records} onPress={()=>openPanel()}>
          <View style = {{display:"flex",flexDirection:"row",alignItems:'center'}}>
            <FontAwesome name="files-o" size={24} color="#29b0db" />
            <Text style={{color:"#000",marginLeft:12}}>View Records</Text>
          </View>

          <AntDesign name="up" size={20} color="#000" />
        
        </TouchableOpacity>
        <View style={styles.container}>
                   
                  
                    <SwipeablePanel {...panelProps} isActive={isPanelActive}
                    noBackgroundOpacity = {false}
                    allowTouchOutside = {false}
                    showCloseButton = {false}
                    closeOnTouchOutside = {true}
                    style = {[theme==='light'?{backgroundColor:'#fff'}:{backgroundColor:'#2B2B2B'}]}
                    barStyle = {{backgroundColor:'#29B0DB'}}
                    >
                         
                        
                        
                        <ScrollView style = {[styles.history__titleContainer,{flex:1}]} vertical = {true}>
                            <Text style = {styles.history__title}>Previous Records</Text>
                            <View style = {styles.history__ListContainer}>
                            
                                {recordList.map(eachRecord =>{
                                    return (
                                        <TouchableOpacity key={eachRecord} style = {styles.history__List} onPress = {()=>handleRecord(eachRecord)}>
                                            
                                            <Text style = {styles.history__ListText}>{(((eachRecord.split('.')[0]).split('_')[1]).replace(/([A-Z])/g, ' $1').trim()).length > 15?
                                            ((eachRecord.split('.')[0]).split('_')[1]).replace(/([A-Z])/g, ' $1').trim().slice(0,20) + "...":((eachRecord.split('.')[0]).split('_')[1]).replace(/([A-Z])/g, ' $1').trim()}</Text>
                                            <Text style = {styles.history__ListText}>{(eachRecord.split('.')[0]).split('_')[0]}</Text>
                                        </TouchableOpacity> 
                                    )
                                })}
                            </View>    
                        </ScrollView>   
                        
                    </SwipeablePanel> 

                   
        </View>
        
        <Text style = {styles.version}>v1.0.0</Text>
        
        <View style = {styles.TabNavigator}>
              <View>
                <TouchableOpacity style = {styles.tab__EachButton} onPress = {()=>{navigation.navigate("Add Class")}}>
                  <Ionicons name="ios-add-circle-outline" size={20} color="#fff" style = {{margin:5}}/>
                  <Text style = {{fontSize:12,color:"#fff"}}>Add Class</Text>
                </TouchableOpacity>
               
              </View>
         
              <View>
              <TouchableOpacity style = {styles.tab__EachButton} onPress = {()=>{setSureToLogOut(true)}}>
                  <SimpleLineIcons name="logout" size={20} color="#fff" style = {{margin:5}}  />
                  <Text style = {{fontSize:12,color:"#fff"}}>Log out</Text>
                </TouchableOpacity>
              </View>
        </View>
       

       {/* Below is the fancy alert for the logout handler */}
       <FancyAlert
                  visible={sureToLogOut}
                  icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F9E060',
                    borderRadius: 50,
                    width: '100%',
                  }}><Ionicons name="alert-outline" size={32} color="#000" /></View>}
                  style={{ backgroundColor: 'white' }}
                >
                  <Text style={{ marginTop: -16, marginBottom: 32 }}>Are you sure to logout?</Text>
                  <View style = {{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <TouchableOpacity style={styles.btn1} onPress={handleLogOutEvent}>
                      <Text style = {{textAlign:'center'}}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>{setSureToLogOut(false)}}>
                      <Text style = {{textAlign:'center',color:'white'}}>No</Text>
                    </TouchableOpacity>

                  </View>
                
          </FancyAlert>
       
           
    </View>
  )
}



const styles = StyleSheet.create({
    HomeScreen__Container:{
     backgroundColor:'#f2f2f2'
    },
  
    HomeScreen__Category:{
      color:'#505050',  
    },
    HomeScreen__StatusOnline:{
      color:'#000',  
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
    },
    HomeScreen__StatusOffline:{
      color:'#505050',  
    },
    View__Records:{
      marginTop:20,
      
      height:60,
      alignItems:'center',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:"#fff",
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
  tab__EachButton:{
    display:"flex",
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
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
  TabNavigator:{
    position:'relative',
    bottom:'-53%',
    backgroundColor:'#29b0db',
    height:70,
    display:"flex",
    flexDirection:"row",
   
    justifyContent:'space-around'
  },
  titles:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:50,
    marginLeft:20,
    marginRight:20
    
  },
  version:{
    fontSize:15,
    fontWeight:"bold",
    color:"#505050",
    opacity:0.5,
    position:"relative",
    bottom:0,
    zIndex:3,
    left:'44%',
    top:'18%'

  },
  btn1:{color:'#000',borderWidth:1,padding:10,width:80,textAlign:'center',borderRadius:3,borderColor:'#29b0db'},
  btn2:{color:'#fff',backgroundColor:'#29b0db',textAlign:'center',padding:10,width:80,marginLeft:10,borderRadius:3}
})

export default HomeScreen