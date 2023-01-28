import axios from 'axios';
import {AsyncStorage} from 'react-native';

const register = async(userData)=>{
    console.log(userData);
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
           }
    
           return response.data

}

const authService = {
    login,
    register
}

export default authService