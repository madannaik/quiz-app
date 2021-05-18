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
import {changeQuestion} from '../store/questions';

export default function Quiz() {
  // console.log(data);
  const [button, setButton] = useState(true);
  const [currentquestion, setCurrentquestion] = useState(1);
  const ques = useContext(ReactReduxContext);
  useEffect(() => {
    checkButton();
    setCurrentquestion(ques.store.getState().currentQuestion);
  }, []);

  useEffect(() => {
    return () => {
      checkButton();

    };
  }, [currentquestion]);

  const checkButton = () => {
    if (currentquestion === 7) {

      setButton(false);
    } else {
      setButton(true);
    }
  };

  const onbackClick = () => {

    if (currentquestion !== 1){
      setCurrentquestion(currentquestion - 1);
      ques.store.dispatch(changeQuestion({
        current: currentquestion-1,
      }));
    }
  };

  const onfrontClick = () => {

    if (currentquestion !== 7) {
      setCurrentquestion(currentquestion + 1);
      ques.store.dispatch(changeQuestion({
        current: currentquestion+1,
      }));
    }

  };

  return (
      <div className="main-div">
        <div className="heading">
          <h6>Personality Quiz</h6>
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
          <button className="myButton" disabled={button}>
            Submit
          </button>
        </div>

      </div>
  );
}
