import { View, Text,StyleSheet,TouchableOpacity,Appearance } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addClass,reset } from '../redux/reducers/addClassSlice';
import { addProgram } from '../redux/reducers/programSlice';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddClass = ({navigation}) => {

  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
   setTheme(scheme.colorScheme); 
 })


  const [program,setProgram] = useState('');
  const [year,setYear] = useState('');
  const [part,setPart] = useState('');

  const dispatch = useDispatch();

  const {subjects,isSuccess,isLoading,isError} = useSelector(state=>state.addClass)

  useEffect(()=>{

    
    if(isSuccess)
    {
      dispatch(addProgram(program));
      navigation.navigate('Choose Subject');
    }
    dispatch(reset())
  },[subjects,isSuccess,isError,isLoading,dispatch])

  const year_part = ['1/1','1/2','2/1','2/2','3/1','3/2','4/1','4/2'];
 
  const Programs = ['BCT','BCE','BME','BEL','BEX', "BEI", "BAE"];


  const handleProgram = (option) =>{
    setProgram(option);
  }

  const handleYearPart = (option) =>
  {
    setYear((option.split('/')[0]));
    setPart((option.split('/')[1]));
  }

 
  
  
   
  function fetchClasses ()
    {   
        
        let params1 = new FormData();
        params1.append('prog',program);
        params1.append('year',year);
        params1.append('part',part);

        try {
       
          dispatch(addClass(params1));
         
        
        
        } catch (error) {
          console.log(error)
          
        }
     
      

    }

  
 
  
  return (
    <View style = {[styles.AddClass__Container,theme=== 'light'?{backgroundColor:''}:{backgroundColor:'#212121'}]}>
      { <View style = {styles.AddClass__Section1}>
           <SelectDropdown
              data={Programs}
              onSelect={(selectedItem, index) => {
                handleProgram(selectedItem)
              }}
              buttonStyle = {styles.selection_contains}
              buttonTextStyle = {{color:'#232222'}}
              dropdownStyle = {{borderBottomLeftRadius:9,borderBottomRightRadius:9,backgroundColor:'#F9F9F9'}}
              
              defaultButtonText = {'Select a Program'}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return `Program: ${selectedItem}`
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />

            <SelectDropdown
              data={year_part}
              onSelect={(selectedItem, index) => {
                handleYearPart(selectedItem)
              }}
              buttonStyle = {{backgroundColor:'#fff',
              width:'95%',
              marginTop:20,
              borderRadius:9,
              
            }}
            buttonTextStyle = {{color:'#232222'}}
            dropdownStyle = {{borderBottomLeftRadius:9,borderBottomRightRadius:9,backgroundColor:'#F9F9F9'}}
              defaultButtonText = {'Select a Year/Part'}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return `Year: ${selectedItem[0]} and Part: ${selectedItem[2]}`
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />

           
                      
            
      </View>}

      <View style = {styles.ClassSelection__Buttons}>
        {<TouchableOpacity style = {[styles.ClassSelection__Button1]} 
                onPress = {fetchClasses}
                disabled = {false}
            >
                <Text style = {{color:'white'}}>Get Subjects</Text>
            </TouchableOpacity> }

           
    
        
     
        
      </View>
        
    </View>
  )
}


const styles = StyleSheet.create({
    AddClass__Container:{
        padding:20,
        
        height:'100%'

    },
    AddClass__Section1:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      marginTop:120
    
    },  
    selection_contains:{
      width:'95%',
      borderRadius:9,
     backgroundColor:'#fff'
      
    },
  
    ClassSelection__ButtonGetSubject:{
      backgroundColor:'#29B0DB',
      height:60,
      marginLeft:8,
      width:'95%',
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
    ClassSelection__Buttons:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        position:'relative',
        bottom:-200,
        width:'100%',
        
       },
       ClassSelection__Button1:{
        backgroundColor:'#29B0DB',
        height:60,
        padding:15,
        width:'95%',
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
        width:'95%',
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
       }
})
export default AddClass