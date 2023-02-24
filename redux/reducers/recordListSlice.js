import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';





const initialState = {
  
    recordLists:[],
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}


export const recordList = createAsyncThunk('record/recordList',async (recordData,thunkAPI)=>{
   
        
     if (recordData)
     {
        return recordData;
     }
     else return null;
       
    
})

export const authSlice = createSlice({
    name:'recordList',
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
        .addCase(recordList.pending,(state) => {
            state.isLoading = true
        })
        .addCase(recordList.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.recordLists = action.payload
           
           
        })
        .addCase(recordList.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

           
        });

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer