import axios from 'axios';


const addClass = async(classInfo)=>{
    var Subjects = [];

    const config = {
		headers: {
			'Content-Type':'multipart/form-data'
        }
    }
    const data = (await axios.post('http://assmnt.pcampus.edu.np/api/subjects/',classInfo,config)).data;
  
    if(data.length < 12 && data.length !=0)
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