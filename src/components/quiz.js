import React, {useContext, useEffect, useState} from 'react';
import './css/quiz.css';
import {Cards} from './cards';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import data from './data';
import {ReactReduxContext} from 'react-redux';
import {changeQuestion, updateScore} from '../store/questions';
import {useHistory} from 'react-router-dom';
import {getMarks} from './constants';
import CountDownTimer from './CountDown';

export default function Quiz() {

  let history = useHistory();
  const [button, setButton] = useState(true);
  const [currentquestion, setCurrentquestion] = useState(1);
  const ques = useContext(ReactReduxContext);

  //to track total number of questions answered
  useEffect(() => {
    checkButton();
    setCurrentquestion(ques.store.getState().answered.currentQuestion);
  }, []);

  //make button visible on answered each and every question
  useEffect(() => {
    checkButton();
  }, [currentquestion]);

  const checkButton = () => {
    if (currentquestion === 7) {

      setButton(false);
    } else {
      setButton(true);
    }
  };

  //previous question
  const onbackClick = () => {

    if (currentquestion !== 1) {
      setCurrentquestion(currentquestion - 1);
      ques.store.dispatch(changeQuestion({
        current: currentquestion - 1,
      }));
    }
  };

  //next question
  const onfrontClick = () => {

    if (currentquestion !== 7) {
      setCurrentquestion(currentquestion + 1);
      ques.store.dispatch(changeQuestion({
        current: currentquestion + 1,
      }));
    }

  };

  //on click submit check if all question answered,
  //if yes calculate score and update score
  //if no dont push
  
  const onSubmit = () => {
    var myobj = ques.store.getState().answered.answered;
    console.log(myobj);
    var count = Object.keys(myobj).length;
    var score = getMarks(myobj);
    console.log(score);
    if (count === 7) {
      ques.store.dispatch(updateScore({
        score: score,
      }));
      history.push('/score');
    }
  };

  const hoursMinSecs = { minutes: 7, seconds: 0}

  return (
      <div className="main-div">
        <div className="heading">
          <h6>React Quiz</h6>
          <div className="timer">
              
              <CountDownTimer hoursMinSecs={hoursMinSecs} />
          </div>
        </div>
        <div className="question-cards">
          <Cards question={data[`${currentquestion}`]}
                 question_number={currentquestion}/>
        </div>
        <div className="footer-progress-bar">
          <div className="left-icon-button" onClick={onbackClick}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x"
                             style={{'margin': '1vw'}}/>
          </div>
          <div className="pagination" style={{'margin': '1.5vw'}}>
            {currentquestion}/7
          </div>
          <div className="right-icon-button" onClick={onfrontClick}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x"
                             style={{'margin': '1vw'}}/>
          </div>
        </div>
        <div>
          <button className="myButton" disabled={button} onClick={onSubmit}>
            Submit
          </button>
        </div>

      </div>
  );
}
