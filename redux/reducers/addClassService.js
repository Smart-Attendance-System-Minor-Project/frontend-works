import axios from 'axios';
import {AsyncStorage} from 'react-native';

const addClass = async(classInfo)=>{
    var Subjects = [];

    const data = (await axios.post('http://assmnt.pcampus.edu.np/api/subjects/',classInfo)).data;
    
    if(data.length < 9 && data.length !=0)
    {
        for (var i = 0; (i < data.length); i++)
        {
          
          Subjects.push({key:i,label:data[i][1]});
    
        }

        return Subjects;
    }
    return null
    
}



const addClassService = {
    addClass,

}

export default addClassService