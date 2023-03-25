import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';





const initialState = {
  
    headers:[],
    rows:[],
    totalPresenceRow:[],
    totalAbsentRow:[],
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
          
            state.headers = action.payload[0]
            state.rows = action.payload[1]
            state.totalPresenceRow = action.payload[2]
            state.totalAbsentRow = action.payload[3]
           
           
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