import React from 'react';
import './css/score.css'
import avatar from "../svg/success.svg"
import { getState } from './constants';

// import { ReactReduxContext } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom"

export const Score = () => {
  // const store = React.useContext(ReactReduxContext)
  // const score = store.store.getState().answered.score;
  const his = useHistory();
  const loc = useLocation();

  React.useEffect(() => {
    return () => {
      his.push("/")
    };
  });

  return <div className="score-div">
    <div className="score-details">
      <img src={avatar} alt="" className="success-ava" />
      <h3 className="result">Your Score is {loc.state.score}/7</h3>
      <h3 className="result">{getState(loc.state.score)}</h3>
    </div>
  </div>
}