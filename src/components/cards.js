import {React, useContext, useRef, useState} from 'react';
import  "./css/cards.css"
import {ReactReduxContext} from 'react-redux';
import {questionsAnswer} from '../store/questions'
import data from '../components/data';
export const Cards = ({question,options={}})=>{
  const ques = useContext(ReactReduxContext);

  // const id  = useRef();
  const onClick = (id)=>{
    // window.alert(id.target.id);
    ques.store.dispatch(questionsAnswer({
      id:1,
      data:id.target.id,
    }))
  }
  return <div className="cards-align">
    <div className="question">
      <div>
        How old are you?
      </div>
      <div>
        Select a option
      </div>

    </div>
    <div className="options">
      <span id="1" onClick={onClick}>1. 20 years</span>
      <span id="2" onClick={onClick}>2. 30 years</span>
      <span id="3" onClick={onClick}>3. 40 years</span>
      <span id="4" onClick={onClick}>4. 50 years</span>
    </div>
  </div>
}