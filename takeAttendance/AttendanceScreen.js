import { View, ScrollView, Text,StyleSheet,TouchableOpacity,Image, ActivityIndicator} from 'react-native'
import React,{useEffect,useState} from 'react'
import Swiper from 'react-native-deck-swiper'
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import { recordList } from '../redux/reducers/recordListSlice';
import axios from 'axios';
import CheckBox from 'expo-checkbox'
import { FancyAlert,LoadingIndicator } from 'react-native-expo-fancy-alerts';
import moment from 'moment/moment';
import { Ionicons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';
import {Button, Stack, Center, NativeBaseProvider} from 'native-base';

const AttendanceScreen = ({navigation}) => {

    const [preserveRecordState,setPreserveRecordState] = useState({});
    const [classN,setClassN] = useState('');
    let [studentList,setStudentList] = useState({});
    const [TodayDate,setDate] = useState('');
    const [visible, setVisible] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [reviewBool,setReviewBool] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [sureToMarkAll,setSureToMarkAll] = useState(false);
    const [sureToCancel,setSureToCancel] = useState(false);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [user,setUser] = useState('');
    const [firstTimeUser,setFirstTimeUser] = useState(false);

    var recordLists = new Object();
    var TodayRecord = new Object();
   
    const {students} = useSelector(state=>state.getStudent)

    const dispatch = useDispatch();

    const removeAsNewUser =async()=>{
      video.current.pauseAsync();
      setFirstTimeUser(false);
      await SecureStore.deleteItemAsync("FirstTimeUser");
    }

    useEffect(()=>{
      async function getStudentsForAttendance()
      {

          
          setDate(moment().format('lll'))
          //console.log(currDate.toLocaleString('default', { month:'2-digit' ,day:'2-digit', year:'numeric' }));
          //setDate(currDate.toLocaleString('default', { month:'2-digit' ,day:'2-digit', year:'numeric' }));
          let className = await SecureStore.getItemAsync('class_');
          let aNewUser = await SecureStore.getItemAsync("FirstTimeUser");
          
          if(aNewUser === "true")
          {
            setFirstTimeUser(true);
            video.current.playAsync();

          }
          
          setUser(await SecureStore.getItemAsync("username"));
          setClassN(className);
          //console.log(visible,isLoading)
 

      }
      getStudentsForAttendance();

      if(Object.keys(recordLists).length === 0)
      {
        recordLists = preserveRecordState;
      }
      
    },[visible,isLoading,reviewBool,refresh,sureToMarkAll,setPreserveRecordState,firstTimeUser,sureToCancel])


    const presentStudentsHandler = (student) =>{
      recordLists[student] = "P";
    }

    const absentStudentsHandler = (student) =>{

      recordLists[student] = "A";

    }


    const withLeaveStudentsHandler = (student)=>{
      recordLists[student] = "L";
    }

  

    const handleReviewEvent =(studentList)=>{
      setReviewBool(false);
      handleTodayRecord(studentList);

    }

    const handleAllPresent =async()=>{
      setSureToMarkAll(false);
      students.map(student=>{
        recordLists[student] = "P";
      })
      handleTodayRecord(recordLists);
    }

    const handleCancelEvent =()=> {
      setSureToCancel(false);
      navigation.navigate('Home');
    }

    

    const handleTodayRecord =async(recordLists)=> {

      

      setIsLoading(true);
     
      TodayRecord[TodayDate] = {
        ClassType: (classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
        Group:(classN.split(' - ')[1]).slice(6,8),
        Records:recordLists

      }

      //creating a uri for record file
      const directory = FileSystem.documentDirectory + `AttendanceRecords_${user}/`;
      const recordFileDirUri = directory + `${(classN.split(' - ')[1])}_${classN.split(' - ')[0].replace(/\s+/g, '')}.json`;
      
      //This is the code for saving data in database SQL 
      const AttendanceRecord = {
        username:user,
        class_name:classN.split(' - ')[1],
        class_type:(classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
        subject:classN.split(' - ')[0],
        attendance_record:TodayRecord

      }

      //console.log(recordLists)
      const config = {
        headers: { Authorization: `Bearer ${await SecureStore.getItemAsync('token')}` }
      };
      
      if(await SecureStore.getItemAsync("connection") === "true")
      {
        try {
          const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/save_record/',AttendanceRecord,config);
        } catch (error) {
          console.log(error);
        }
        
      }
      
   


      try {
        const pastRecords = JSON.parse(await FileSystem.readAsStringAsync(recordFileDirUri,{encoding:FileSystem.EncodingType.UTF8}));

        pastRecords[TodayDate] = {
          ClassType: (classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
          Group:(classN.split(' - ')[1]).slice(6,8),
          Records:recordLists
        }

       
        //console.log((pastRecords))
       
        await FileSystem.writeAsStringAsync(recordFileDirUri,JSON.stringify(pastRecords), { encoding: FileSystem.EncodingType.UTF8 });
        console.log("Record successfully added!")
        
        
        

      } catch (error) {
        var newRecord = new Object();
        newRecord[TodayDate] = {
          ClassType: (classN.split(' - ')[1]).slice(6,8).length == 1?"P":"L",
          Group:(classN.split(' - ')[1]).slice(6,8),
          Records:recordLists
        }


       
        await FileSystem.writeAsStringAsync(recordFileDirUri,JSON.stringify(newRecord), { encoding: FileSystem.EncodingType.UTF8 });

        const getRecordList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `AttendanceRecords_${user}`)
       
        dispatch(recordList(getRecordList))

      }

      
      
      var totalPresent = 0;
      var totalAbsent = 0;
      Object.keys(recordLists).map(eachStudent=>{
        if(recordLists[eachStudent] === "P")
        { 
          totalPresent += 1;
        }
        else
        {
          totalAbsent += 1;
        }
      })
      
      setIsLoading(false);
      
      navigation.navigate('AttendanceInfoScreen',{
        subject:classN.split(' - ')[0],
        classroom:classN.split(' - ')[1],
        dateTaken:TodayDate.slice(0,-8),
        timeTaken:TodayDate.slice(13),
        totalPresent:totalPresent,
        totalAbsent:totalAbsent
        
      });
      
    }   
    
    return (
        <View style = {styles.AttendanceScreen__Container}>
           
          
            <FancyAlert
              visible={firstTimeUser}
              icon={<View style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F9E060',
                  borderRadius: 50,
                  width: '100%',

              }}></View>}
              style={{ backgroundColor: 'white'}}
            >
              <Text style = {{textAlign:"left",marginBottom:20,fontSize:15}}>1. Swipe the card in right direction to mark as "Present".</Text>
              <Text style = {{textAlign:"left",marginBottom:20,fontSize:15}}>2. Swipe the card in left direction to mark as "Absent without Application".</Text>
              <Text style = {{textAlign:"left",fontSize:15}}>3. Swipe the card in Upward direction to mark as "Absent with Application".</Text>
              <Video
                ref={video}
                style={styles.video}
                source={
                 require('../pictures/videos/tutorial.mp4')
                }
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
              <View style = {{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10}}>
               
                <TouchableOpacity style={styles.btn2} onPress={removeAsNewUser}>
                  <Text style = {{textAlign:'center',color:'white'}}>Close</Text>
                </TouchableOpacity>

              </View>
            
            </FancyAlert>

           
         
          
           
            
            <View style = {styles.AttendanceScreen__SubTitle}>
                <Text style = {{textAlign:'center',fontSize:14}}>{classN}</Text>
               
            </View>
            <Text>{TodayDate}</Text>
           
         

            <View style = {{position:'relative',zIndex:0,
            marginRight:'75%',marginTop:-30
          }}>
              
             <Swiper 
                 cards={students}
                 onSwipedLeft  = {(cardIndex)=>absentStudentsHandler(students[cardIndex])}
                 onSwipedRight = {(cardIndex)=>presentStudentsHandler(students[cardIndex])}
                 onSwipedTop = {(cardIndex)=>{withLeaveStudentsHandler(students[cardIndex])}}
                 onSwipedAll={()=>{setStudentList(recordLists);setReviewBool(true) }}
                 cardIndex={0}
                 backgroundColor={'#4FD0E9'}
                
                 overlayLabels = {{
                  left: {
                  /* Optional */
                  title: 'ABSENT',
                    style: {
                      label:{
                          color:'#FF9191',
                          fontSize:20,
                          borderWidth:1,
                          borderColor:'#ff9191'
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft:-130,
                        
                      }
                    }
                  },
                  right: {
                 /* Optional */
                  title: 'PRESENT',
                    style: { label:{
                      color:'#29B0DB',
                      fontSize:20,
                      borderWidth:1,
                      borderColor:'#29b0db'
                       },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: 30
                      }
                    }
                  },
                  top: {
                 /* Optional */
                  title: 'LEAVE ACCEPTED',
                    style: { label:{
                      color:'#F3CE48',
                      fontSize:20,
                      borderWidth:1,
                      borderColor:'#F3CE48'
                       },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 100,
                        marginLeft: 30
                      }
                    }
                  },
                 }}
                
                 stackSize= {3}
                 disableBottomSwipe = {true}
                 disableTopSwipe = {false}
                 renderCard = {(card)=>(
                  <View  style = {styles.AttendanceScreen__Swipes}>
                      <View style = {styles.AttendanceSwipe__Photo}>
                       {/* <Image source={require("../pictures/tempPictures/RajeshNeupane_076bct055.jpg")} style = {styles.studentPic}/> */}
                      </View>
                      <View style = {styles.AttendanceSwipe__Information}>
                        <Text style = {{fontSize:17}}>{card.split(' - ')[0]}</Text>
                        <Text style={{color:'#29b0db',fontSize:16}}>{card.split(' - ')[1]}</Text>
                        
                      </View>
                  </View>
                 )}
                 />
           
            </View>

            
            
            
            <View style = {styles.AttendanceScreen__Buttons}>
                  <TouchableOpacity style = {styles.ClassSelection__Button1}
                  onPress = {()=>{setPreserveRecordState(recordLists); setSureToMarkAll(true)}}
                  >
                      <Text style = {{color:'white'}}>Mark All Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.ClassSelection__Button2} onPress = {()=>{
                  
                    setPreserveRecordState(recordLists);
                    setSureToCancel(true)
                  }}>
                      <Text>Cancel</Text>
                  </TouchableOpacity>
            </View>
           
            <FancyAlert
                  visible={sureToMarkAll}
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
                  <Text style={{ marginTop: -16, marginBottom: 32,textAlign:'center',width:250 }}>Every student will be marked present. Are you sure for this?</Text>
                  <View style = {{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <TouchableOpacity style={[styles.btn2,{marginRight:10}]} onPress={handleAllPresent}>
                      <Text style = {{textAlign:'center',color:"#fff"}}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn1,{marginLeft:0}]} onPress={()=>{setSureToMarkAll(false)}}>
                      <Text style = {{textAlign:'center',color:'#000'}}>No</Text>
                    </TouchableOpacity>

                  </View>
                
          </FancyAlert>


            <FancyAlert
                  visible={sureToCancel}
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
                  <Text style={{ marginTop: -16, marginBottom: 32,textAlign:'center' }}>Are you sure to cancel?</Text>
                  <View style = {{display:"flex",flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <TouchableOpacity style={styles.btn1} onPress={handleCancelEvent}>
                      <Text style = {{textAlign:'center'}}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>{
                      setSureToCancel(false)}}>
                      <Text style = {{textAlign:'center',color:'white'}}>No</Text>
                    </TouchableOpacity>

                  </View>
            </FancyAlert>

            <FancyAlert
                  visible={reviewBool}
                  icon={<View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#29b0db',
                    borderRadius: 10,
                    width: '170%',
                  }}><Text style = {{color:'white'}}>Review</Text></View>}
                  style={{ backgroundColor: '#fff'}}
                  
                >
                  <View>
                    <Text style={{ marginTop: -20,textAlign:'center'}}>Please review before confirming</Text>
                    <Text style={{ marginTop: 10,textAlign:'center' }}>
                      P = Present, A = Absent
                    </Text>
                    <Text style={{ marginTop: 7,textAlign:'center', marginBottom: 22 }}>
                     L = Leave Accepted
                    </Text>

                    <ScrollView style = {{maxHeight:400,width:250}}>
                    {Object.keys(studentList).map((key, index) => {
                      return (

                      <View key = {index} style = {styles.ReviewList__EachItem}>
                        <Text>{key.split(' - ')[1]}</Text>
                        <View style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
                          <TouchableOpacity style ={[studentList[key]=== "P"?{backgroundColor:"#29b0db"}:{backgroundColor:"#CCC9C9"},{margin:5,borderRadius:3,height:28,width:28}]}
                          onPress = {()=>{
                            console.log("Before",studentList[key]);
                            studentList[key] = (studentList[key]==="A"?"P":(studentList[key]==="L"?"P":"P"));
                            console.log("After",studentList[key]);
                            setRefresh(!refresh);5
                          }}
                          >
                            <Text style ={[{color:"#fff",marginTop:5,textAlign:"center"}]}>P</Text>  
                          </TouchableOpacity>
                          <TouchableOpacity style ={[studentList[key]=== "A"?{backgroundColor:"#FF9191"}:{backgroundColor:"#CCC9C9"},{margin:5,borderRadius:3,height:28,width:28}]}
                            onPress = {()=>{
                                console.log("Before",studentList[key]);
                                studentList[key] = (studentList[key]==="P"?"A":(studentList[key]==="L"?"A":"A"));
                                console.log("After",studentList[key]);
                                setRefresh(!refresh);
                            }}
                          
                          >
                          <Text style ={[{color:"#fff",marginTop:5,textAlign:"center"}]}>A</Text>  
                          </TouchableOpacity>
                          <TouchableOpacity style ={[studentList[key]=== "L"?{backgroundColor:"#F3CE48"}:{backgroundColor:"#CCC9C9"},{margin:5,borderRadius:3,height:28,width:28}]}
                          onPress = {()=>{
                                console.log("Before",studentList[key]);
                                studentList[key] = (studentList[key]==="A"?"L":(studentList[key]==="P"?"L":"L"));
                                console.log("After",studentList[key]);
                                setRefresh(!refresh);
                          }}
                          
                          >
                          <Text style ={[{color:"#fff",marginTop:5,textAlign:"center"}]}>L</Text>  
                          </TouchableOpacity>
                        </View>

                        {/* <CheckBox value = {studentList[key] === "P"? true:false} color = {'#29b0db'}
                        onValueChange = {()=>{
                          
                          studentList[key] = (studentList[key]==="P"?"A":"P");
                          
                          setRefresh(!refresh);
                        }}
                        /> */}
                      </View>
                      );
                    })}
                    
 
                    </ScrollView>

                    <TouchableOpacity style={styles.btn} onPress={()=>handleReviewEvent(studentList)}>
                     <Text style={{color:'#fff'}}>Confirm</Text>
                    </TouchableOpacity>

                  </View>
                 
            </FancyAlert>
          
        </View>
    )
}


const styles = StyleSheet.create({
  AttendanceScreen__Container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
   
    height:'100%'
  },
 container:{
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  margin:'auto'
 }, 
  AttendanceScreen__SubTitle:{
    padding:18,
    backgroundColor:'white',
    width:'100%',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3.84,
    marginBottom:40
    
  },
  video:{
    alignSelf: 'center',
    width: 293,
    height: 330,
    marginTop:30,
    marginBottom:50
  },
  studentPic:{
    width:250,
    height:200,
    borderTopRightRadius:9,
    borderTopLeftRadius:9
  },
  AttendanceScreen__Infos:{
    display:'flex',
    width:'90%',
    flexDirection:'column',
    justifyContent:'center',
    marginTop:30,
    alignItems:'center'
    
  },
  
  AttendanceScreen__Swipes:{
    backgroundColor:'white',
    height:'40%',
    marginTop:0,

    width:250,
    borderRadius:9,
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5.84,
  },
  AttendanceSwipe__Photo:{
    backgroundColor:'#fff',
    width:250,
    height:'65%',
    borderTopLeftRadius:9,
    borderTopRightRadius:9,
    
    alignItems:'center',
   
  },
  AttendanceSwipe__Information:{
    display:'flex',
    height:'30%',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  AttendanceScreen__Buttons:{
   
      display:'flex',
     marginTop:'110%',
      alignItems:'center',  
  },
  ClassSelection__Button1:{
    backgroundColor:'#29B0DB',
    height:60,
    padding:15,
    width:250,
    borderRadius:9,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.09,
    shadowRadius: 3.84,
   },
   btn:{
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 10,
    marginBottom:20,
    minWidth: '50%',
    paddingHorizontal: 16,
   },
   ClassSelection__Button2:{
    backgroundColor:'#FFF',
    height:60,
    padding:15,
    width:250,
    marginTop:20,
    borderRadius:9,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3.84,
   },
   swipe__list:{
    display:'flex'
   },
   ReviewList__EachItem:{display:'flex',
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
   margin:10},
   btn1:{color:'#000',borderWidth:1,padding:10,width:80,textAlign:'center',borderRadius:3,borderColor:'#29b0db'},
   btn2:{color:'#fff',backgroundColor:'#29b0db',textAlign:'center',padding:10,width:80,marginLeft:10,borderRadius:3}
})

export default AttendanceScreen