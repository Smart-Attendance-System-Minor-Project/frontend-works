import { View, Text,StyleSheet,Appearance} from 'react-native'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { reset } from '../redux/reducers/authSlice'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Category = ({icon,label,numbers,action,navigation,disabled}) => {

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })

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
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('username')
          dispatch(reset());
          navigation.navigate('Login')
       
        default:
          break;
       }
    }
    
  return (
    <View style = {[styles.category_container]}>
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
       
        
    }
})
export default Category