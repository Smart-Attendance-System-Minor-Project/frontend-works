import React,{useEffect, useState} from 'react';
import { StyleSheet, View ,Text,Image,Modal,Pressable} from 'react-native';
import moment from 'moment/moment';
import * as SecureStore from 'expo-secure-store'
import { Avatar, VStack,NativeBaseProvider,Center } from "native-base";
import * as adbs from 'ad-bs-converter'
import  NetInfo from '@react-native-community/netinfo'
import { TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { syncData } from '../SyncData';

export default function WeekCalendar({theme}) {
 
  const [dateToDisplayBS,setDateToDisplayBS] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const [isActive,setIsActive] = useState(false);
  const [dateToDisplayAD,setDateToDisplayAD] = useState({
    year:'',
    strMonth:'',
    day:'',
    strDayOfWeek:'',
  });
  const [user,setUser] = useState('');
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');

  NetInfo.addEventListener(async(state) => {
    await SecureStore.setItemAsync("connection", JSON.stringify(state.isConnected));
    if(state.isConnected)
    {
      
      setIsActive(true);
      syncData();
    }
    else {
      setIsActive(false);
    }
  
    });
  useEffect(()=>{
    async function setData()
    {
      setDateToDisplayBS(moment().format('MMMM Do, YYYY'));
      var currentDate = moment().format('L');
      var tempListForDate = currentDate.split("/");
      var setDateForConversion = tempListForDate[2] + '/' + tempListForDate[0] + '/'+ tempListForDate[1];
      var setNepaliDate = adbs.ad2bs(setDateForConversion);
      var values = {
        year:setNepaliDate["ne"].year,
        strMonth:setNepaliDate["ne"].strMonth,
        day:setNepaliDate["ne"].day,
        strDayOfWeek:setNepaliDate["ne"].strDayOfWeek
      }
      setDateToDisplayAD(values);

      setUser(await SecureStore.getItemAsync("username"));
      setFullName(await SecureStore.getItemAsync("fullName"));
      setEmail(await SecureStore.getItemAsync("email"));

    }
    setData();
    
    
    

  },[dateToDisplayBS,user,isActive,modalVisible])
 
  const Example = ({active}) => {
    return <VStack space={2} alignItems="center" padding={4}>
       
        <Avatar bg="gray"  padding={1} borderWidth ={1} borderColor="#29b0db"  source={ require("../pictures/icons_images/account_icon.png")
      } size="md">
          
          {active && <Avatar.Badge bg="green.500" />}
          {!active && <Avatar.Badge bg="gray.500" />}
          
         
        </Avatar>
      </VStack>;
  };
  
  return (
    <>
    <View style={styles.container}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <NativeBaseProvider> 
            <View style = {{marginTop:-20}}>
            <Example active = {isActive }/>
            </View>
            </NativeBaseProvider>
            <DataTable style = {{marginTop:50}}>
              <DataTable.Header>
                <DataTable.Title>Username</DataTable.Title>
                <DataTable.Title>{user}</DataTable.Title>
              </DataTable.Header>
              <DataTable.Header>
                <DataTable.Title>Full Name</DataTable.Title>
                <DataTable.Title>{fullName}</DataTable.Title>
              </DataTable.Header>
              <DataTable.Header>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>{email}</DataTable.Title>
              </DataTable.Header>
              <DataTable.Header>
                <DataTable.Title>Institute</DataTable.Title>
                <DataTable.Title>Pulchowk Campus</DataTable.Title>
              </DataTable.Header>
            </DataTable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <NativeBaseProvider> 
          <TouchableOpacity style = {{display:'flex',flexDirection:'row',alignItems:'center'}} onPress = {()=>{setModalVisible(true)}}>
          <Example active = {isActive }/>
          <Text style = {{color:"#fff",fontSize:15,fontWeight:"600"}}>{user}</Text>
          </TouchableOpacity>
      </NativeBaseProvider>

    </View>
    <View style = {styles.overlay}>
      <View style = {styles.dates}>
        
        <Text style = {[styles.DisplayDate]}>{dateToDisplayAD.strDayOfWeek}  {dateToDisplayAD.strMonth} {dateToDisplayAD.day}, {dateToDisplayAD.year}</Text>
        <Text style = {[styles.DisplayDate,{fontSize:14}]}>{dateToDisplayBS}</Text>
      </View>
      <View style = {{marginRight:0}}>
        <Image source = {require("../pictures/Logos/icon_wa.png")} style = {styles.tuLogo}/>
      </View>
    
      {/* <Text style = {styles.DisplayFullName}>{fullName}</Text> */}
    </View>
    </>
    
  );
}
 
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    
    height:340,
    width:350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    marginTop:18
  },
  buttonOpen: {
    backgroundColor: '#29b0db',
  },
  buttonClose: {
    backgroundColor: '#29b0db',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    
    backgroundColor:"#29b0db",
    height:140,
    borderBottomRightRadius:200,
    borderBottomLeftRadius:200,
    marginBottom:30
    
  },
  DisplayDate:{
    fontSize:20,

    marginLeft:10,

    fontWeight:'bold',
    color:"#505050"
  },
  dates:{
    display:"flex",
    flexDirection:"column",
    justifyContent:'space-around',
    height:60
  },

  overlay:{
    backgroundColor:"#fff",
    borderTopRightRadius:30,
    
    height:110,
    width:'90%',
    position:'absolute',
    display:"flex",
    flexDirection:'row',
    alignItems:"center",
    borderRadius:10,
    left:'5%',
    marginTop:75,
    shadowColor:'black',
    shadowOffset: {
        width: 1,
        height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 5.84,
  },
  DisplayFullName:{
    color:"#505050",
    fontSize:18,
    marginLeft:12,
  },
  tuLogo:{
    resizeMode:'contain',
    height:50,
    marginLeft:0,
  }

  
})