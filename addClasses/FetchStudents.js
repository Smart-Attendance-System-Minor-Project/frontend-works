import { ScrollView, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const FetchStudents = ({navigation}) => {

  const {students} = useSelector(state=>state.fetchStudent)
  const {className} = useSelector(state=>state.classList)
  return (
    
    <ScrollView>
    
      {students.map((item,index)=>{
        return (
          <Text key={index}>{item}</Text>
        )
      })}

      <TouchableOpacity style = {{backgroundColor:'#29b0db',padding:20,position:'absolute'}} onPress={()=>{navigation.navigate('Home')}}><Text>Fetch</Text></TouchableOpacity>

    </ScrollView>
  )
}

export default FetchStudents