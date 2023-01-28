import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import ModalSelector from 'react-native-modal-selector'
import SelectDropdown from 'react-native-select-dropdown'
import {classList,reset} from '../redux/reducers/classListSlice'
import { fetchStudent } from '../redux/reducers/fetchStudentSlice'

const ChooseSubject = ({navigation}) => {

  const batchList = ['075','076','077','078'];
  
 
  const [batch,setBatch] = useState('');
  const [section,setSection] = useState('');
  const [subSelected,setSubSelected] = useState('');
  const sections = ['AB','CD','EF','GH','IJ','KL'];


  const {subjects} = useSelector((state)=>state.addClass)
  const {program} = useSelector(state=>state.addProgram)
  const {isSuccess,isLoading,isError} = useSelector(state=>state.classList)

  const dispatch = useDispatch();

  React.useEffect(()=>{
  
      if(isSuccess && batch)
      {
      
                  let parameters = [program,batch,section];

             
        

                  try {

                  
                  dispatch(fetchStudent(parameters));
                  navigation.navigate('Fetch Students');
                  
                  } catch (error) {
                    console.log(error)
                    
                  }
              
            
              
      }

    
    
  },[isSuccess,isLoading,isError])
  const handleClass= async()=>{

 
    
 
   
    let classPrefix = subSelected + ' - ' + batch+program+section;

    try {
      
      dispatch(classList(classPrefix))
      dispatch(reset())
     
     
    } catch (error) {
      console.log(error)
    }

  }

  const handleSection = (option) =>{
   
    setSection(option);
  }


  return (
    <View style = {styles.ChooseClass__ContainerW}>
      <View>
        <Image source={require('../pictures/subjects_logo/computer_logo.png')}style = {styles.Subject__Logo}/>
      </View>
      <View style = {styles.ChooseSubject__Container}>
                  <ModalSelector
                           
                           data = {subjects}
                           onChange = {(option)=>{setSubSelected(option.label)}}
                           initValue={"Choose a Subject"}
                      
                           initValueTextStyle = {{color:'#7E7E7E'}}
                           cancelStyle = {{padding:15}}
                           optionStyle = {{padding:15}}
                           selectStyle = {{padding:25}}
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
                                      data={sections}
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
    justifyContent:'space-around'
  },  
  ChooseSubject__Container:{

    marginTop:20,
    width:'82%'
  },
  ChooseSubject__button:{
    width:'82%'
  },
  ChooseSubject__AddClass:{
    backgroundColor:'#29B0DB',
    
    alignItems:'center',
    padding:20,
    borderRadius:9
  },
  Subject__Logo:{
    
    height:300,
    resizeMode:'contain'
  }

})

export default ChooseSubject