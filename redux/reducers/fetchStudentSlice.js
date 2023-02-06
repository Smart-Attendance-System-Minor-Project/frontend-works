import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';



const initialState = {
  
    students:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}



export const fetchStudent = createAsyncThunk('addClass/fetchStudent',async (parameters,thunkAPI)=>{
   
        
    try {
        let Student_Info = [];
        if(parameters[2].length == 1)
        {
            let params1 = new FormData();
            params1.append('prog',parameters[0]);
            params1.append('batch',parameters[1]);
            params1.append('group',parameters[2]);

            const studentData1 = ( await axios.post('http://assmnt.pcampus.edu.np/api/students/',params1)).data;

         
            studentData1.map(student=>{
                let rollNo = student[0] + student[1] + student[2];
                let studentName = student[3];
                let studentID = studentName + " - " + rollNo;
                Student_Info.push(studentID);
            })

            return Student_Info;
    
        }
        else
        {   let params1 = new FormData();
            params1.append('prog',parameters[0]);
            params1.append('batch',parameters[1]);
            params1.append('group',parameters[2][0]);
    
            let params2 = new FormData();
            params2.append('prog',parameters[0]);
            params2.append('batch',parameters[1]);
            params2.append('group',parameters[2][1]);
           
            
            studentData1 = ( await axios.post('http://assmnt.pcampus.edu.np/api/students/',params1)).data;
            studentData2 = ( await axios.post('http://assmnt.pcampus.edu.np/api/students/',params2)).data;

          
            studentData1.map(student=>{
                let rollNo = student[0] + student[1] + student[2];
                let studentName = student[3];
                let studentID = studentName + " - " + rollNo;
                Student_Info.push(studentID);
            })

            studentData2.map(student=>{
                let rollNo = student[0] + student[1] + student[2];
                let studentName = student[3];
                let studentID = studentName + " - " + rollNo;
                Student_Info.push(studentID);
            })
            //AsyncStorage.setItem(`${parameters[1]}${parameters[0]}${parameters[2]}`,JSON.stringify(Student_Info));
       
            return Student_Info;
            
        }
       
      
  
      
       

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
      
        return thunkAPI.rejectWithValue(message)
    }
       
    
})

export const authSlice = createSlice({
    name:'fetchStudent',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
   
        }
    },
    extraReducers:(builder)=>{

        builder
        .addCase(fetchStudent.pending,(state) => {
            state.isLoading = true
        })
        .addCase(fetchStudent.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.students = action.payload
           
        })
        .addCase(fetchStudent.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
 
        })
       

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer