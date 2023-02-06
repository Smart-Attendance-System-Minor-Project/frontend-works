import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = async(userData)=>{
  
    const response = await axios.post("https://prat051.pythonanywhere.com/attendance/register/",userData);

    if(response.data)
    {
        return response.data;
    }
}

const login = async (userData) => {

           const response = await axios.post("https://prat051.pythonanywhere.com/attendance/login/",userData);

           if(response.data)
           {
            AsyncStorage.setItem("token",response.data.success)
            await AsyncStorage.setItem('username',userData.username);
           }
    
           return response.data

}

const authService = {
    login,
    register
}

export default authService