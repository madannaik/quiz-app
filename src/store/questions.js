import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  answered:[],
  currentQuestion:1,
};
const questions = createSlice({
  name:"questions",
  initialState:initialState,
  reducers:{
    "questionsAnswer":(state,actions)=>{
      return {
        ...state,
        [actions.payload.id]: actions.payload.data,

      }
    },
    // "answered":(state,action) =>{
    //   return {
    //     ...state,
    //     answered:[...state.answered,action.payload.id],
    //
    //   }
    // },
    "changeQuestion":(state,action)=>{
      return {
        ...state,
        currentQuestion: action.payload.current,
      }
    },
    "cleanRedux":(state)=>{
      return {
        ...initialState
      }
    }
  }
})



export const {questionsAnswer,answered,changeQuestion} = questions.actions;
export const reducer = questions.reducer;