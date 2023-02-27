import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
//get user from localStorage




const initialState = {
 
    isError:false,
    isSuccess: false,
    isLoading: false,
    message: '',
    user: ''
}

export const userData = createAsyncThunk('auth/user',async (user,thunkAPI)=>{
    try {
        return user
    } catch (error) {
        
        return thunkAPI.rejectWithValue(message)
    }
})

//Register user
export const register = createAsyncThunk('auth/register',async (user,thunkAPI)=>{
    try {
        AsyncStorage.removeItem('unsuccessRegister')
        return await authService.register(user);
    } catch (error) {
       
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})
export const login = createAsyncThunk('auth/login',async (user, thunkAPI) => {

    try {           
            return await authService.login(user);

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})




export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            AsyncStorage.removeItem('errorUsername')
            AsyncStorage.removeItem('errorPassword')
           
           
        }
    },
    extraReducers:(builder)=>{

        builder
        .addCase(login.pending,(state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
           
        })
        .addCase(login.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
           
        })
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
           
        })
        .addCase(register.rejected,(state,action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
           
        })
        .addCase(userData.fulfilled,(state,action)=>{
            state.user = action.payload
        })
       
     
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer