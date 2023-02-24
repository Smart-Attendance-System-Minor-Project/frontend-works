import { View, Text,StyleSheet,ScrollView,ActivityIndicator,RefreshControl } from 'react-native'
import React,{useEffect,useState} from 'react'
import {Table,Row,TableWrapper,Rows,Col} from 'react-native-table-component'
import * as FileSystem from 'expo-file-system'
import { useSelector } from 'react-redux'
import { useIsFocused } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'


const ViewRecords = ({navigation}) => {

  
  var [tableData,setTableData] = useState([])
  
  
  const {record,isSuccess} = useSelector(state=>state.records)
  const {user} = useSelector(state=>state.auth)
  const [refresh,setRefresh] = useState(false);

  const [tableHeads,setTableHeads] = useState([]);
  const [classType,setClassType] = useState('');
  const [Group,setGroup] = useState('');
  const [student,setStudent] = useState([]);
  const [heightARR,setheightARR] = useState([]);
  const [widthARR1,setwidthARR1] = useState([]);  
  const [widthARR2,setwidthARR2] = useState([]);  
  const isFocused = useIsFocused();
  

  useEffect(()=>{
   
    getStudent();
 
    
  },[])

  

  async function getStudent()
  {
    setRefresh(true);
    const fileUriStudents = FileSystem.documentDirectory +  `${user}_studentList.json`;

    try {
     
      const studentData = JSON.parse(await FileSystem.readAsStringAsync(fileUriStudents, { encoding: FileSystem.EncodingType.UTF8 }));
      const classID = await AsyncStorage.getItem('classroom__id')
     
      var temp_heightList = [] //this is the list to set height of each title of name column
      for(var i = 0 ; i < student.length;i++)
      {
        temp_heightList.push(28)
        

      }
      setheightARR(temp_heightList)
      setStudent(studentData[classID])


    } catch (error) {
      console.log(error)
    }
    var tableHead2 = Object.keys(record)
  
    
  
    setClassType(record[tableHead2[0]]['ClassType'])
    setGroup(record[tableHead2[0]]['Group'])
    
  
  
    var tempRecord = []
    var widthArr1TempList = []
    var widthArr2TempList = []
    for(var i = 0 ; i < tableHead2.length ; i++)
    {
     
      widthArr1TempList.push(85)
      widthArr2TempList.push(85)
      //console.log(Object.keys(record[tableHead2[i]]['Records']).length)
      for (var j = 0 ; j < (Object.keys(record[tableHead2[i]]['Records']).length);j++)
      {
  
          if(i != 0)
          {
            
            tempRecord[j].push(record[tableHead2[i]]['Records'][student[j]])
          }
          else
          {
            
            var tempRecordEachDay = []
            tempRecordEachDay.push(record[tableHead2[i]]['Records'][student[j]])
            tempRecord.push(tempRecordEachDay)
          }
      } 

      setRefresh(false)
    }
  
   
    widthArr1TempList.unshift(270)
    setwidthARR1(widthArr1TempList)
    setwidthARR2(widthArr2TempList)
    setTableData(tempRecord)
    tableHead2.unshift('Name')

    setTableHeads(tableHead2)

    setTimeout(() => {
      setRefresh(false);
    }, 2000000);
  
  }
  
  //table heads are the dates of each attendance
 



  return (
    <View style = {styles.ViewRecord__Container}>


     
      <ScrollView refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={()=>getStudent()} />}
        >
      
          <ScrollView horizontal = {true} vertical = {true}  
      >
            <View>
             <Text>{classType}</Text>
            </View>
              <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} >
                  <Row data={tableHeads} style={styles.head} widthArr = {widthARR1} textStyle = {styles.text }/>
                  <TableWrapper style={styles.wrapper}>
                    <Col data={student} style={styles.title} heightArr={heightARR} textStyle={styles.text2}/>
                    <Rows data={tableData}  style={styles.row} widthArr={widthARR2} textStyle={styles.text}/>
                  </TableWrapper>
                </Table>
              </View>

            </ScrollView>

      </ScrollView>
      
    </View>
    
  )
}

const styles = StyleSheet.create({
  ViewRecord__Container:{height:'100%'},
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 30,  backgroundColor: '#f1f8ff' },
  wrapper: { display:'flex',flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa',width:270 },
  row: {  height: 28 },
  text: { textAlign: 'center' },
  text2:{textAlign:'left'}
});
export default ViewRecords