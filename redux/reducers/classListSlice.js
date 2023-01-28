import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import addClassService from './addClassService';




const initialState = {
  
    className:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}


export const classList = createAsyncThunk('class_/classItem',async (classData,thunkAPI)=>{
   
        
     if (classData)
     {
        return classData;
     }
     else return null;
       
    
})

export const authSlice = createSlice({
    name:'classList',
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
        .addCase(classList.pending,(state) => {
            state.isLoading = true
        })
        .addCase(classList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.className.push(action.payload)
           
           
        })
        .addCase(classList.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

           
        });

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer