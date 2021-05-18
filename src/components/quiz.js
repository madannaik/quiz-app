import React, {useRef, useState,useEffect} from 'react';
import "./css/quiz.css";
import {Cards} from './cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft, faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';


export default function Quiz() {
  const [button, setButton] = useState(true);
  const [currentquestion, setCurrentquestion] = useState(1);
  useEffect(() => {
    return () => {
      checkButton();
    };
  }, [currentquestion,]);
  const checkButton = ()=>{
    console.log(currentquestion);
    if( currentquestion+1===10){

      setButton(false)
    }
    else{
      setButton(true);
    }
  }

  const onbackClick = () =>{
    if (currentquestion !== 1) setCurrentquestion(currentquestion-1);
  }

  const onfrontClick = () =>{
    if (currentquestion !== 10) setCurrentquestion(currentquestion+1)

  }

    return (
        <div className="main-div"> 
            <div className="heading" >
                <h6>Personality Quiz</h6>
            </div>
            <div className="question-cards">
                <Cards/>
            </div>
            <div className="footer-progress-bar">
                <div className="left-icon-button" onClick={onbackClick}>
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" style={{"margin":"1vw"}}/>
                </div>
                <div className="pagination" style={{"margin":"1.5vw"}}>
                  {currentquestion}/10
                </div>
                <div className="right-icon-button" onClick={onfrontClick}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x"  style={{"margin":"1vw"}}/>
                </div>
            </div>
          <div>
            <button className="myButton"  disabled={button} >
              Submit
            </button>
          </div>

        </div>
    )
}
