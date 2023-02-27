import { View, Text,StyleSheet,Appearance} from 'react-native'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { reset } from '../redux/reducers/authSlice'
import { TouchableOpacity } from 'react-native'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'


const Category = ({icon,label,numbers,action,navigation,disabled}) => {

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })
 const [sureToLogOut,setSureToLogOut] = useState(false);

    useEffect(()=>{

    },[sureToLogOut])

    const dispatch = useDispatch()

    const handleClick = async()=>{
       switch (action) {
        case 'TAKE_ATTENDANCE':
          navigation.navigate('Choose Class');
          break;

        case 'ADD_CLASS':
          navigation.navigate('Add Class');
          break;

        case 'LOG_OUT':
          setSureToLogOut(true);
         
       
        default:
          break;
       }
    }
    
    const handleLogOutEvent =()=> 
    {
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('username')
      dispatch(reset());
      navigation.navigate('Login')
    }
  return (
    <View style = {[styles.category_container]}>
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
                  }}><Text>Alert</Text></View>}
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


      <TouchableOpacity  style = {[styles.category_buttons,theme=== 'light'?{backgroundColor:'#fff'}:{backgroundColor:'#2B2B2B'}]} onPress = {handleClick}>
        <Text style = {[styles.category__title,theme=== 'light'?{color:'#000'}:{color:'#fff'}]}>{label}</Text>
       
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
       
        
    },
    btn1:{color:'#000',borderWidth:1,padding:10,width:80,textAlign:'center',borderRadius:3,borderColor:'#29b0db'},
    btn2:{color:'#fff',backgroundColor:'#29b0db',textAlign:'center',padding:10,width:80,marginLeft:10,borderRadius:3}
})
export default Category