import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';
import {AsyncStorage} from 'react-native';
//get user from localStorage




const initialState = {
 
    isError:false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register user
export const register = createAsyncThunk('auth/register',async (user,thunkAPI)=>{
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()
      
        return thunkAPI.rejectWithValue(message)
    }
})
export const login = createAsyncThunk('auth/login',async (user, thunkAPI) => {

    try {       
            AsyncStorage.removeItem('errorUsername')
            AsyncStorage.removeItem('errorPassword')
            return await authService.login(user);
           

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message || error.toString()

        AsyncStorage.setItem('errorUsername','username_error')
        AsyncStorage.setItem('errorPassword','password_error')
        return thunkAPI.rejectWithValue(message)
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
           
        });

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer