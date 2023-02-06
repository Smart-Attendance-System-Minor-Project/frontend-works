import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import Swiper from 'react-native-deck-swiper'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const AttendanceScreen = ({navigation}) => {

    let [count,setCount] = useState(0);
    const [classN,setClassN] = useState('');
    const [studentList,setStudentList] = useState([]);
    const [month,setmonth] = useState('');
    const {students} = useSelector(state=>state.getStudent)
    useEffect(()=>{
      async function getStudentsForAttendance()
      {

         
          let className = await AsyncStorage.getItem('class_');
          setClassN(className);
          const currDate = new Date();
          setmonth(currDate.toLocaleString('default', { month: 'short',day:'2-digit', year:'numeric' }));

      }
      getStudentsForAttendance();
      
    },[])

    
   
    return (
        <View style = {styles.AttendanceScreen__Container}>
            <View style = {styles.AttendanceScreen__SubTitle}>
                <Text style = {{textAlign:'center'}}>{classN}</Text>
            </View>
            <View style = {styles.AttendanceScreen__Infos}>
         
                <Text>{month}</Text>
                <Text>{count} out of {students.length}</Text>
            </View>

            <View style = {{position:'relative',zIndex:1,
            marginRight:'75%',marginTop:-30
          }}>
              
             <Swiper 
                 cards={students}
                 onSwiped={(cardIndex) => {console.log(students[cardIndex]); setCount(++count)}}
                 onSwipedAll={() => {alert("Attendance has been successful")}}
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
                          borderColor:'#FF9191'
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
                      color:'#9DFC7C',
                      fontSize:20,
                      borderWidth:1,
                      borderColor:'#9DFC7C'
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
                 }}
                
                 stackSize= {3}
                 disableBottomSwipe = {true}
                 disableTopSwipe = {true}
                 renderCard = {(card)=>(
                  <View  style = {styles.AttendanceScreen__Swipes}>
                      <View style = {styles.AttendanceSwipe__Photo}></View>
                      <View style = {styles.AttendanceSwipe__Information}>
                        <Text style = {{fontSize:17}}>{card.split(' - ')[0]}</Text>
                        <Text style={{color:'#29b0db',fontSize:16}}>{card.split(' - ')[1]}</Text>
                        
                      </View>
                  </View>
                 )}
                 >

                 </Swiper>
           
            </View>
            
            
            <View style = {styles.AttendanceScreen__Buttons}>
                  <TouchableOpacity style = {styles.ClassSelection__Button1}
                  onPress = {()=>{navigation.navigate('Attendance Screen')}}
                  >
                      <Text style = {{color:'white'}}>Mark All Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.ClassSelection__Button2}>
                      <Text>Cancel</Text>
                  </TouchableOpacity>
            </View>
          
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
    padding:20,
    backgroundColor:'white',
    width:'100%',
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3.84,
    
  },
  AttendanceScreen__Infos:{
    display:'flex',
    width:'80%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30
    
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
    backgroundColor:'grey',
    width:250,
    height:'65%',
    borderTopLeftRadius:9,
    borderTopRightRadius:9
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
   }
})

export default AttendanceScreen