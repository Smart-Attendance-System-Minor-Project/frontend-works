

import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';




export const syncData =async()=>{
    const loggedIn = await SecureStore.getItemAsync("token");
    const username_ = await SecureStore.getItemAsync("username");
    const internet = await SecureStore.getItemAsync("connection");
    if(loggedIn && internet === "true")
    { 
     
      const classListUri = FileSystem.documentDirectory + `${username_}_classList.json`;
      try {
        
        
        const config = {
          headers: { Authorization: `Bearer ${await SecureStore.getItemAsync("token")}` }
        };
        
        const dataFinder = {
          username:username_
        }
       
     
        //below code will be used to sync data with backend when back online
        var PresentClassesInLocal = JSON.parse(await FileSystem.readAsStringAsync(classListUri,{ encoding: FileSystem.EncodingType.UTF8 }));
  
        var PresentClassesInDB = (await axios.post("https://wellattend.pythonanywhere.com/attendance/view_class/",dataFinder,config)).data;
        var classNamesInDB = [];
        
        PresentClassesInDB.map(eachClassInfo=>{
          classNamesInDB.push(eachClassInfo.subject);
        })
       

        
        PresentClassesInLocal.map(async(eachClass)=>{
          if(!classNamesInDB.includes(eachClass.split(' - ')[0]))
          {
            const newClass = {
              username:username_,
              batch:eachClass.split(' - ')[1].slice(0,3),
              faculty:eachClass.split(' - ')[1].slice(3,6),
              section:eachClass.split(' - ')[1].slice(6,9),
              subject:eachClass.split(' - ')[0],
              class_type:eachClass.split(' - ')[1].slice(6,9) == 1?'P':'L'
            }

            const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/add_class/",newClass,config);
          }
        })
        
        //any new records
        const getRecordList = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `AttendanceRecords_${username_}`);
        const response = (await axios.post("https://wellattend.pythonanywhere.com/attendance/get_records/",dataFinder,config)).data;

        var recordListInDB = [];
        response.map(eachSubRec=>{
          recordListInDB.push(`${eachSubRec.class_name}_${eachSubRec.subject.replace(/\s+/g, '')}.json`);
        })

        
        
        getRecordList.map(async(eachRecord)=>{
          if(!recordListInDB.includes(eachRecord))
          {
            const eachRecordDataUri = FileSystem.documentDirectory + `AttendanceRecords_${username_}/`+ eachRecord;
            const eachRecordData = JSON.parse(await FileSystem.readAsStringAsync(eachRecordDataUri,{encoding:FileSystem.EncodingType.UTF8}));
            
            
            const AttendanceRecord = {
              username:username_,
              class_name:eachRecord.split('_')[0],
              class_type:(eachRecord.split('_')[1]).slice(6,9).length == 1?"P":"L",
              subject:(eachRecord.split('_')[1]).split('.')[0].replace(/([A-Z])/g, ' $1').trim(),
              attendance_record:eachRecordData
      
            }
      
            
            //console.log(recordLists)
           
            
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/save_record/',AttendanceRecord,config);


          }
          
        })

        
        //any new attendance records
        for(var i = 0 ; i < getRecordList.length;i++)
        {
          const fileUri = FileSystem.documentDirectory + `AttendanceRecords_${username_}/` + getRecordList[i];
          const eachRecordData = JSON.parse(await FileSystem.readAsStringAsync(fileUri,{encoding:FileSystem.EncodingType.UTF8}));
          response.map(eachClassRecord=>{
            if(`${eachClassRecord.class_name}_${(eachClassRecord.subject).replace(/\s+/g, '')}.json` === getRecordList[i])
            {
              Object.keys(eachRecordData).map(async(eachDate)=>{
                if(!Object.keys(eachClassRecord.attendance_record).includes(eachDate))
                {
                  console.log("A new record of",eachClassRecord.subject,"found");
                  const newRecord = new Object();
                  newRecord[eachDate] = eachRecordData[eachDate]
                  const AttendanceRecord = {
                    username:username_,
                    class_name:eachClassRecord.class_name,
                    class_type:eachClassRecord.class_type,
                    subject:eachClassRecord.subject,
                    attendance_record:newRecord
            
                  }
                  const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/save_record/',AttendanceRecord,config);
                  

                }
              })
            }
          })
          

        }

      } catch(err)
      {
        console.log(err)
      }
    }


  }


  const SyncData = {
    syncData
  }

  export default SyncData