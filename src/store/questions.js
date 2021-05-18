import {createSlice} from '@reduxjs/toolkit';
import {act} from '@testing-library/react';

const initialState = {
  answered:[],
};
const questions = createSlice({
  name:"questions",
  initialState:initialState,
  reducers:{
    "questionsAnswer":(state,actions)=>{
      return {
        ...state,
        [actions.payload.id]:{
          userEnteredAnswer:actions.payload.data,
        }
      }
    },
    "answered":(state,action) =>{
      return {
        ...state,
        answered:[...state.answered,action.payload.id],

      }
    }
  }
})



export const {questionsAnswer,answered} = questions.actions;
export const reducer = questions.reducer;