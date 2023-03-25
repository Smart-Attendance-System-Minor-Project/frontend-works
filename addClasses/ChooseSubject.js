import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import ModalSelector from 'react-native-modal-selector'
import SelectDropdown from 'react-native-select-dropdown'

import {classList} from '../redux/reducers/classListSlice'
import { fetchStudent,setStudents,reset } from '../redux/reducers/fetchStudentSlice'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import { LoadingIndicator } from 'react-native-expo-fancy-alerts'
import * as SecureStore from 'expo-secure-store'



const ChooseSubject = ({navigation}) => {


  const batchList = ['075','076','077','078'];
  

  const [loading,setIsLoading] = useState(false);
  const [batch,setBatch] = useState('');
  const [section,setSection] = useState('');
  const [subSelected,setSubSelected] = useState('');
  const sections = {
    'BCT':['AB','CD'],
    'BCE':['AB','CD','EF','GH'],
    'BME':['AB'],
    'BEL':['AB'],
    'BEI':['AB'],
    
    

  };
  const [sectionFormated,setSectionFormated] = useState(['AB']);
  const classType = ['Lecture','Practical'];


  const {subjects} = useSelector((state)=>state.addClass)
  const {program} = useSelector(state=>state.addProgram)
  //const {isSuccess,isLoading,isError} = useSelector(state=>state.classList)
  const {isSuccess,isError,isLoading} = useSelector(state=>state.fetchStudent)
  //const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch();

  React.useEffect(()=>{
  
    async function choose()
    {
      if(isSuccess && batch)
      {
        navigation.navigate('Fetch Students');
        dispatch(reset());
      }
    }

    choose();
      

    
    
  },[isSuccess,isLoading,isError,loading])
  const handleClass= async()=>{

    if(await SecureStore.getItemAsync("connection") !== "true")
    {
      alert("No Internet Connection");
      return
    }
    else
    {
      const user = await SecureStore.getItemAsync("username");
      const token = await SecureStore.getItemAsync("token");
      
      if(batch && section && subSelected)
      {
        let classPrefix = subSelected + ' - ' + batch+program+section;
        setIsLoading(true);
        var updatedClasses = [];
        const newClass = {
          username:user,
          batch:batch,
          faculty:program,
          section:section,
          subject:subSelected,
          class_type:section.length == 1?'P':'L'
        }
  
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
   
         
         
        
        
        
        const fileUri = FileSystem.documentDirectory + `${user}_classList.json`;
        //var updatedClass = [];
        try {
          
          
         
       
          var PresentClasses = JSON.parse(await FileSystem.readAsStringAsync(fileUri,{ encoding: FileSystem.EncodingType.UTF8 }));
          if(PresentClasses.includes(classPrefix))
          {
            alert("Class Already Exists!");
            navigation.navigate("Add Class");
            return
          }
          else
          {
            if(PresentClasses)
            {
              for(var i=0;i<PresentClasses.length;i++){
                updatedClasses.push(PresentClasses[i]);
              }
            }
            
            updatedClasses.push(classPrefix);
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedClasses), { encoding: FileSystem.EncodingType.UTF8 });
          }
          
         
          //AsyncStorage.setItem('classList',JSON.stringify(updatedClasses));      
         
         
         
        } catch (error) {
          updatedClasses.push(classPrefix);
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedClasses), { encoding: FileSystem.EncodingType.UTF8 });
          //AsyncStorage.setItem('classList',JSON.stringify(updatedClasses));      
       
        }
  
        try {
          const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/add_class/',newClass,config);
        } catch (error) {
          alert("Error");
          console.log(error);
          setIsLoading(false);
          navigation.navigate("Home");
        }
  
        //below code is to set students
        try {
                      
          var parameters = [program,batch,section];
          var classroom__id = parameters[1] + parameters[0] + parameters[2];
          await SecureStore.setItemAsync("classroom__id",classroom__id);
          dispatch(fetchStudent(parameters));
  
          } catch (error) {
  
            console.log(error)
            
          }
        
  
       
        setIsLoading(false);
  
        
    
      }
      else
      {
        alert("Please enter all the details")
      }
   
    }
   
   
   
  }

  const handleSection = (option) =>{
   
    setSection(option);
  }

  const handleClassType = (option)=>{
   
    if (option === "Lecture")
    {  
        setSectionFormated(sections[program]);
       
        
    }
    else
    {
      var tempGroups = [];
      for(var i = 0; i < sections[program].length;i++)
      {
        for (var j = 0 ; j < 2; j++)
        {
          tempGroups.push((sections[program])[i][j]);
        }
        
      }
      setSectionFormated(tempGroups)
    }
  }


  return (
    <View style = {styles.ChooseClass__ContainerW}>
      <LoadingIndicator visible = {loading}/>
      <View>
        <Image source={require('../pictures/subjects_logo/computer_logo.png')}style = {styles.Subject__Logo}/>
      </View>
      <View style = {styles.ChooseSubject__Container}>
                  <ModalSelector
                           
                           data = {subjects}
                           onChange = {(option)=>{setSubSelected(option.label)}}
                           initValue={"Choose a Subject"}
                           visible = {true}
                           optionContainerStyle = {{backgroundColor:"#f2f2f2"}}
                           initValueTextStyle = {{color:'#7E7E7E'}}
                           cancelStyle = {{padding:15,backgroundColor:"#f2f2f2"}}
                           optionStyle = {{padding:15}}
                           selectStyle = {{padding:25,width:'100%'}}
                           />

                  <SelectDropdown
                                data={batchList}
                                onSelect={(selectedItem, index) => {
                                  setBatch(selectedItem)}
                                }
                                buttonStyle = {{backgroundColor:'#fff',
                                width:'95%',
                                marginTop:20,
                                borderRadius:9,
                                
                              }}
                                buttonTextStyle = {{color:'#232222'}}
                                dropdownStyle = {{borderBottomLeftRadius:9,borderBottomRightRadius:9,backgroundColor:'#F9F9F9'}}
                                
                                defaultButtonText = {'Select a Batch'}
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
                                data={classType}
                                onSelect={(selectedItem, index) => {
                                  handleClassType(selectedItem)}
                                }
                                buttonStyle = {{backgroundColor:'#fff',
                                width:'95%',
                                marginTop:20,
                                borderRadius:9,
                                
                              }}
                                buttonTextStyle = {{color:'#232222'}}
                                dropdownStyle = {{borderBottomLeftRadius:9,borderBottomRightRadius:9,backgroundColor:'#F9F9F9'}}
                                
                                defaultButtonText = {'Select Class Type'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                  // text represented after item is selected
                                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                                  return `Class Type: ${selectedItem}`
                                }}
                                rowTextForSelection={(item, index) => {
                                  // text represented for each item in dropdown
                                  // if data array is an array of objects then return item.property to represent item in dropdown
                                  return item
                                }}
                              />

                  <SelectDropdown
                                      data={sectionFormated}
                                      onSelect={(selectedItem, index) => {
                                        handleSection(selectedItem)
                                      }}
                                      buttonStyle = {{backgroundColor:'#fff',
                                      width:'95%',
                                      marginTop:20,
                                      borderRadius:9,
                                      
                                    }}
                                    buttonTextStyle = {{color:'#232222'}}
                                    dropdownStyle = {{borderBottomLeftRadius:9,borderBottomRightRadius:9,backgroundColor:'#F9F9F9'}}
                                      defaultButtonText = {'Select a Section'}
                                      buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return `Section: ${selectedItem}`
                                      }}
                                    
                                />

                           
      </View>
      <View style = {styles.ChooseSubject__button}>
        <TouchableOpacity style = {styles.ChooseSubject__AddClass} onPress = {handleClass} >
          <Text style = {{color:'white'}}>Add Class</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ChooseClass__ContainerW:{
    
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:'80%',
    marginTop:40,
    width:'100%',
    justifyContent:'space-around'
  },  
  ChooseSubject__Container:{

    marginTop:20,
    width:'85%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  ChooseSubject__button:{
    width:'82%',
    marginTop:40
  },
  ChooseSubject__AddClass:{
    backgroundColor:'#29B0DB',
    
    alignItems:'center',
    padding:20,
    borderRadius:9
  },
  Subject__Logo:{
    
    height:250,
    resizeMode:'contain'
  }

})

export default ChooseSubject