import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ClassAdded from '../../takeAttendance/ClassAdded';
import addClassService from './addClassService';
import axios from 'axios'



const initialState = {
  
    className:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    isForTakeAttendance:false,
    isForView:false
    
}

export const classAdd = createAsyncThunk('class_/classAddedDB',async(classData,thunkAPI)=>{
    try {
      
        const response = await axios.post('https://prat051.pythonanywhere.com/attendance/add_class/',classData);
        return response.data.message;

    } catch (error) {
        thunkAPI.rejectWithValue();
        
    }
})


export const classList = createAsyncThunk('class_/classItem',async (classData,thunkAPI)=>{
   
        
     if (classData)
     {
        // const actionSelector = [classData,purpose];
        // console.log(actionSelector)
        return classData;
     }
     else return null;
       
    
})

export const authSlice = createSlice({
    name:'classList',
    initialState,   
    reducers:{
        resetClass: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isForTakeAttendance = false
            state.isForView = false
           
          
            
           
      
           
        }
    },
    extraReducers:(builder)=>{

        builder
        .addCase(classList.pending,(state) => {
            state.isLoading = true
        })
        .addCase(classList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            
            if(action.payload.slice(-1)[0] === "view")
            {
                
                state.isForView = true
            }
            else if(action.payload.slice(-1)[0] === "takeAttendance")
            { 
                state.isForTakeAttendance = true
            
            }
            else {
                state.isForTakeAttendance = false;
                state.isForView = false;
            }
            state.className = action.payload.slice(0,-1)
           
           
        })
        .addCase(classList.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

           
        })
        .addCase(classAdd.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload)
            
            
           
           
        })
        .addCase(classAdd.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            
           
           
        })

    }
})

export const {resetClass} = authSlice.actions
export default authSlice.reducer