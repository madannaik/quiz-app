import {React, useContext, useEffect, useRef, useState} from 'react';
import  "./css/cards.css"
import {ReactReduxContext} from 'react-redux';
import {questionsAnswer} from '../store/questions'
import data from '../components/data';



export const Cards = ({question={},question_number})=>{


  const ques = useContext(ReactReduxContext);
  const [active, setActive] = useState([false,false,false,false]);



  useEffect(()=>{
    getAnswerState();
  },[question_number,]);


  //gets user pressed answer and sets
  const getAnswerState = () =>{
    const answer = ques.store.getState()[question_number];
    console.log(answer);
    setActive(active.map((data,index)=>{
      console.log(index,answer);
      if(index+1===parseInt(answer)) return true
      else return false
    }))
    console.log(active);
  }

  const onClick = (id)=>{
    console.log(active);

    ques.store.dispatch(questionsAnswer({
      id:question_number,
      data:id.target.id,
    }));
    getAnswerState();
    const answer = ques.store.getState();
      console.log(answer);
  }
  return <div className="cards-align">
    <div className="question">
      <div>
        {question.question}
      </div>
      <div>
        Select a option
      </div>

    </div>
    <div className="options " >
      <span id="1" className={active[0]?"active":"not-active"} onClick={onClick} >1. {question.answers[0]}</span>
      <span id="2" className={active[1]?"active":"not-active"} onClick={onClick}>2. {question.answers[1]}</span>
      <span id="3" className={active[2]?"active":"not-active"} onClick={onClick}>3. {question.answers[2]}</span>
      <span id="4" className={active[3]?"active":"not-active"} onClick={onClick}>4. {question.answers[3]}</span>
    </div>
  </div>
}