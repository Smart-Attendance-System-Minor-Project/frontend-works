import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';




const initialState = {
   
    program:'',
    isError:false,
    isSuccess: false,
    isLoading: false,
    
}


export const addProgram = createAsyncThunk('addProgram/addProgram',async (programInfo,thunkAPI)=>{
   
        
   if(programInfo){

    return programInfo;
   } 
   else return thunkAPI.rejectWithValue();

   

})



export const authSlice = createSlice({
    name:'addProgram',
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
        .addCase(addProgram.pending,(state) => {
            state.isLoading = true
        })
        .addCase(addProgram.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.program += action.payload
           
           
        })
        .addCase(addProgram.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true

           
        });

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer