import {React, useContext, useEffect, useRef, useState} from 'react';
import  "./css/cards.css"
import {ReactReduxContext} from 'react-redux';
import {questionsAnswer,cleanRedux} from '../store/questions'
import data from '../components/data';



export const Cards = ({question={},question_number})=>{

  //accessing redux-store
  const ques = useContext(ReactReduxContext);


  const [active, setActive] = useState([false,false,false,false]);


  //run getAnswer when question number changes
  useEffect(()=>{
    // ques.store.dispatch(cleanRedux())

    var myobj = ques.store.getState().answered;
    var count = Object.keys(myobj).length;
    console.log(count);
    getAnswerState();
  },[question_number,]);


  //prefetch  the user entered answer for questions
  const getAnswerState = () =>{
    const answer = ques.store.getState().answered[question_number];
    // console.log(answer);
    setActive(active.map((data,index)=>{
      if(index+1===parseInt(answer)) return true
      else return false
    }))

  }


  //when user clicks on different options update the answer in redux-answer and run getAnswer for updated ui element
  const onClick = (id)=>{


    ques.store.dispatch(questionsAnswer({
      id:question_number,
      data:id.target.id,
    }));
    getAnswerState();
    // const answer = ques.store.getState();
      // console.log(answer);
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