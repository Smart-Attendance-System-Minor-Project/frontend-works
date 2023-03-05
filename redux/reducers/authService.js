import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = async(userData)=>{
  
    const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/register/",userData);

    if(response.data)
    {
        
        await AsyncStorage.setItem('username',userData.username);
        await AsyncStorage.setItem('token',response.data.access);
        return response.data;
    }
}

const login = async (userData) => {

           const response = await axios.post("https://wellattend.pythonanywhere.com/attendance/login/",userData);

           if(response.data)
           {
            AsyncStorage.setItem("token",response.data.access);
            await AsyncStorage.setItem('username',userData.username);
           }
           
           return response.data

}

const authService = {
    login,
    register
}

export default authService