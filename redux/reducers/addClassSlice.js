import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import addClassService from './addClassService';




const initialState = {
    subjects:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}





export const addClass = createAsyncThunk('addClass/addClass',async (classInfo,thunkAPI)=>{
   
       
        const responseFromAPI = await addClassService.addClass(classInfo);
        if(!responseFromAPI)
        {
            alert('Please enter the necessary information.')
            return thunkAPI.rejectWithValue()
        }

        else return responseFromAPI;
   
       
    
})

export const authSlice = createSlice({
    name:'addClass',
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
        .addCase(addClass.pending,(state) => {
            state.isLoading = true
        })
        .addCase(addClass.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.subjects = action.payload
           
           
        })
        .addCase(addClass.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

           
        });

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer