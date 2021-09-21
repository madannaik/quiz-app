import React from 'react';
import './css/score.css'
import avatar from "../svg/success.svg"
import {getState} from './constants';
import {changeQuestion, cleanRedux} from '../store/questions';
import {ReactReduxContext} from 'react-redux';

export const Score = ()=>{
  const store = React.useContext(ReactReduxContext)
  const score = store.store.getState().answered.score;
  React.useEffect(() => {
    return () => {
      store.store.dispatch(cleanRedux({}));
    };
  }, []);



  return <div className="score-div">
      <div className="score-details">
        <img src={avatar} alt="" className="success-ava"/>
        <h3 className="result">Your Score is {score}/7</h3>
        <h3 className="result">{getState(1)}</h3>
      </div>
  </div>
}