import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import addClassReducer from './reducers/addClassSlice'
import classListReducer from './reducers/classListSlice';
import addProgramReducer from './reducers/programSlice'
import fetchStudentReducer from "./reducers/fetchStudentSlice";
// export const store = configureStore({


export const store = configureStore(
    {
        reducer:{
            auth:authReducer,
            addClass:addClassReducer,
            classList:classListReducer,
            fetchStudent:fetchStudentReducer,
            addProgram:addProgramReducer
        }
    }
    
  );