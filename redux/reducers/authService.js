import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
const register = async(userData)=>{
    
    const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/create_user/",userData);
  
    
    if(response.data)
    {
        
        
        await SecureStore.setItemAsync("fullName",response.data.full_name);
        await SecureStore.setItemAsync("email",response.data.email);
        await SecureStore.setItemAsync("token", response.data.access);
        await SecureStore.setItemAsync("username",userData.username);
        await SecureStore.setItemAsync("FirstTimeUser","true");
        return response.data;
    }
}



const login = async(userData) => {

           const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/login/",userData);

           
           if(response.data)
           {  
            
            await SecureStore.setItemAsync("fullName",response.data.full_name);
            await SecureStore.setItemAsync("email",response.data.email);
            await SecureStore.setItemAsync("token", response.data.access);
            await SecureStore.setItemAsync("username",response.data.username);
            
           }
           return response.data
           
           
           

}

const authService = {
    login,
    register
}

export default authService