import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';



const initialState = {
  
    students:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}


export const getStudent = createAsyncThunk('addClass/uploadStudent', (studentData,thunkAPI)=>{
    try {
        
        return studentData;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name:'getStudent',
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
        .addCase(getStudent.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getStudent.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.students = action.payload
           
        })
        .addCase(getStudent.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
 
        })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer