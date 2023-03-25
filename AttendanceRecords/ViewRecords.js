import { View, Text,StyleSheet,ScrollView,RefreshControl } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { DataTable } from 'react-native-paper'

const ViewRecords = ({navigation}) => {
  
  const {headers,rows,totalPresenceRow,totalAbsentRow, isSuccess} = useSelector(state=>state.records)
  

  return (
    <View style = {styles.ViewRecord__Container}>


     
      <ScrollView>
      
          <ScrollView horizontal = {true} vertical = {true}>
            {/* <View>
             <Text>{classType}</Text>
            </View> */}
              <View style={styles.container}>
                <DataTable>
                    <DataTable.Header >
                      {headers.map((eachHeader,index)=>{
                          if(index === 0)
                          {
                            return (
                              <DataTable.Title key = {index}  style = {{width:220}}>{eachHeader}</DataTable.Title>
                            )
                          }
                          else if(index == 1)
                          {
                            return (
                              <DataTable.Title key = {index}  style = {{width:160, justifyContent:'center'}}>{eachHeader}</DataTable.Title>
                            )
                          }
                          else
                          {
                            return (
                              <DataTable.Title key = {index}  style = {{width:140,marginRight:10,justifyContent:'center'}}>{eachHeader}</DataTable.Title>
                              )
                          }
                         
                      })}
                    
                    </DataTable.Header>
                    {rows.map((eachStudentRecord,index)=>{
                      return (
                        <DataTable.Row key = {index} >
                          
                          {eachStudentRecord.map((eachStudentData,index)=>{
                            if(index === 0)
                            {
                              return (
                                <DataTable.Cell key = {index}  style = {{width:220}} >{eachStudentData}</DataTable.Cell>
                              )
                            }
                            else if(index === 1)
                          {
                            return (
                              <DataTable.Cell key = {index} style = {{width:120,justifyContent:'center',marginRight:50}}>{eachStudentData}</DataTable.Cell>
                            )
                          }
                            else
                            {
                              return (
                                <DataTable.Cell key = {index}  style = {{width:120,justifyContent:'center'}} >{eachStudentData}</DataTable.Cell>
                                )
                            }
                            
                          })}
                        </DataTable.Row>
                      )
                    })}

                    <DataTable.Row>
                      {totalPresenceRow.map((eachPresenceCell,index)=>{
                        if(index === 0)
                        {
                          return (
                            <DataTable.Title key = {index}  textStyle = {{color:"#29b0db"}}>{eachPresenceCell}</DataTable.Title>
                          )
                          
                        }
                        // else if(index === 1)
                        // {
                        //   return (
                        //     <DataTable.Title key = {index} textStyle = {{width:120,justifyContent:'center',marginRight:50}}>{eachPresenceCell}</DataTable.Title>
                        //   )
                        // }
                        else
                        {
                          return (
                            <DataTable.Cell key = {index}style = {{justifyContent:'center'}}>{eachPresenceCell}</DataTable.Cell>
                          )
                          
                        }
                      })}
                    </DataTable.Row>

                    <DataTable.Row>
                      {totalAbsentRow.map((eachAbsentCell,index)=>{
                        if(index === 0)
                        {
                          return (
                            <DataTable.Title key = {index} textStyle = {{color:"#29b0db"}}>{eachAbsentCell}</DataTable.Title>
                          )
                          
                        }

                        // else if(index === 1)
                        // {
                        //   return (
                        //     <DataTable.Title key = {index} textStyle = {{width:120,justifyContent:'center',marginRight:50}}>{eachAbsentCell}</DataTable.Title>
                        //   )
                        // }
                        else
                        {
                          return (
                            <DataTable.Cell key = {index} style = {{justifyContent:'center'}}>{eachAbsentCell}</DataTable.Cell>
                          )
                          
                        }
                      })}
                    </DataTable.Row>

                  </DataTable>
              
              </View>

            </ScrollView>

      </ScrollView>
      
    </View>
    
  )
}

const styles = StyleSheet.create({
  ViewRecord__Container:{height:'100%',width:'100%'},
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',width:'100%' },
  head: {  height: 30,  backgroundColor: '#f1f8ff' },
  wrapper: { display:'flex',flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#fff',width:250 },
  row: {  height: 28,marginLeft:-150 },
  text: { textAlign: 'center' },
  text2:{textAlign:'center'},
  headings:{display:"flex",flexDirection:"row",justifyContent:'space-around'}
});
export default ViewRecords