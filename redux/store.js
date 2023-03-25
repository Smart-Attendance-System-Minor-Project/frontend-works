import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import addClassReducer from './reducers/addClassSlice'
import classListReducer from './reducers/classListSlice';
import addProgramReducer from './reducers/programSlice'
import fetchStudentReducer from "./reducers/fetchStudentSlice";
import getStudentReducer from './reducers/getStudent';
import recordListReducer from './reducers/recordListSlice'
import recordReducer from './reducers/recordsSlice'
// export const store = configureStore({


export const store = configureStore(
    {
        reducer:{
            auth:authReducer,
            addClass:addClassReducer,
            classList:classListReducer,
            fetchStudent:fetchStudentReducer,
            addProgram:addProgramReducer,
            getStudent:getStudentReducer,
            recordList:recordListReducer,
            records:recordReducer
        }
    }
    
  );