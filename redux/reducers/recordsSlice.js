import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';





const initialState = {
  
    record:{},
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}


export const record = createAsyncThunk('record/record',async (recordData,thunkAPI)=>{
   
        
     if (recordData)
     {
        return recordData;
     }
     else return null;
       
    
})

export const authSlice = createSlice({
    name:'record',
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
        .addCase(record.pending,(state) => {
            state.isLoading = true
        })
        .addCase(record.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
          
            state.record = action.payload
           
           
        })
        .addCase(record.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

           
        });

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer