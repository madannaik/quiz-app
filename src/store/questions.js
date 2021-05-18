import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  answered:{},
  currentQuestion:1,
  score:null,
};
const questions = createSlice({
  name:"questions",
  initialState:initialState,
  reducers:{
    "questionsAnswer":(state,actions)=>{
      return {
        ...state,
        answered: {
          ...state.answered,
          [actions.payload.id]: actions.payload.data,
        }

      }
    },
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
    },
    "updateScore":(state ,action ) =>{
      return {
        ...state,
        score: action.payload.score,
      }
}
  }
})



export const {questionsAnswer,changeQuestion,cleanRedux,updateScore} = questions.actions;
export const reducer = questions.reducer;