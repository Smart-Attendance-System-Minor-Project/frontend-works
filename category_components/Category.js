import { View, Text,StyleSheet,Appearance} from 'react-native'
import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { reset } from '../redux/reducers/authSlice'
import { TouchableOpacity } from 'react-native'
import { Ionicons,SimpleLineIcons,FontAwesome5,AntDesign } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { classList,resetClass } from '../redux/reducers/classListSlice'
import { useEffect } from 'react'
import * as FileSystem from 'expo-file-system'

const Category = ({icon,label,numbers,action,navigation,disabled}) => {

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  const {user} = useSelector(state=>state.auth);
  const {isSuccess,isForView,isForTakeAttendance,isError,isLoading} = useSelector(state=>state.classList);
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })
 const [sureToLogOut,setSureToLogOut] = useState(false);

    useEffect(()=>{
      
      if(isSuccess && isForTakeAttendance)
      {
        
        navigation.navigate("Choose Class");
        dispatch(resetClass())
      }
      if(isSuccess && isForView)
      {
        navigation.navigate("ViewClass");
        dispatch(resetClass())
      }
      
      
    },[sureToLogOut,isSuccess,isForTakeAttendance,isForView])

    const dispatch = useDispatch()

    const handleClick = async()=>{
      const username = await SecureStore.getItemAsync("username");
       switch (action) {
        case 'TAKE_ATTENDANCE':
          

          try {
            const fileUri = FileSystem.documentDirectory +  `${username}_classList.json`;
            const class_ = JSON.parse(await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 }));
      
            
            class_.push("takeAttendance");
            dispatch(classList(class_));
      
          } catch (error) {
            console.log(error)
            alert("No classes yet");
            dispatch(classList([]));
            
          }

          break;

        case 'VIEW_CLASS':
          
          try {
            const fileUri = FileSystem.documentDirectory +  `${username}_classList.json`;
            const class_ = JSON.parse(await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 }));
            navigation.navigate('ViewClass');
           
      
          } catch (error) {
          
            alert("No classes yet");
         
            
          }

        
          //navigation.navigate('Add Class');
         
          break;
        case 'ADD_CLASS':
          navigation.navigate('Add Class');
          break;

        // case 'LOG_OUT':
        //   setSureToLogOut(true);
        // default:
        //   break;
       }
    }
    
    // const handleLogOutEvent =async()=> 
    // {
    //   await SecureStore.deleteItemAsync("token");
    //   await SecureStore.deleteItemAsync("username");
    //   dispatch(reset());
    //   navigation.navigate('Login')
    //   setSureToLogOut(false);
    // }
  return (
    <View style = {[styles.category_container]}>
       {/* <FancyAlert
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
                
          </FancyAlert> */}


      <TouchableOpacity  style = {[styles.category_buttons,theme=== 'light'?{backgroundColor:'#fff'}:{backgroundColor:'#2B2B2B'}]} onPress = {handleClick}>
        <View style = {styles.categoryIconLabel}>
        {action === "TAKE_ATTENDANCE" && <Ionicons name="hand-right-outline" size={24} color="#29b0db" />}
        {action === "ADD_CLASS" && <Ionicons name="ios-add-circle-outline" size={24} color="#29b0db" />}
        {action === "LOG_OUT" && <SimpleLineIcons name="logout" size={24} color="#29b0db" />}
        {action === "VIEW_CLASS" && <FontAwesome5 name="list-alt" size={24} color="#29b0db" />}
        <Text style = {[styles.category__title,theme=== 'light'?{color:'#000'}:{color:'#fff'}]}>{label}</Text>
        </View>
       
        {action !== "LOG_OUT" && <AntDesign name="right" size={20} color="#000" />}
       
      </TouchableOpacity>

     
      
    </View>
  )
}

const styles = StyleSheet.create({
    category_container:{
       
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
        backgroundColor:'white',
        justifyContent:'space-between',
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
    categoryIconLabel:{ 

      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    

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
       
        
    },
    category__title:{
      marginLeft:10
    },
    btn1:{color:'#000',borderWidth:1,padding:10,width:80,textAlign:'center',borderRadius:3,borderColor:'#29b0db'},
    btn2:{color:'#fff',backgroundColor:'#29b0db',textAlign:'center',padding:10,width:80,marginLeft:10,borderRadius:3}
})
export default Category