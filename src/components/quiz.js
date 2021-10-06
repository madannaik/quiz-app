import React, { useContext, useEffect, useState } from 'react';
import './css/quiz.css';
import { Cards } from './cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


export default function Quiz() {
  const auth = getAuth();
  const db = getFirestore();


  // const userEmail = auth.currentUser.email.toString();
  const [data, setData] = useState([]);
  useEffect(() => {
    let controller = new AbortController();
    const getQuestions = async () => {

      const scoreRef = await getDoc(doc(db, auth.currentUser.email, "userdetails"), { AbortSignal: controller.signal });

      if (scoreRef.data().score !== "-1") {
        history.push({
          pathname: "/score",
          state: {
            score: scoreRef.data().score
          }
        });
      }
      else {

        const docRef = doc(db, "questions", "XoxZmBPACPJFiBFfoOJW");
        console.log(docRef);
        const docSnap = await getDoc(docRef).catch(err => {
          history.push("/");
        });
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setData(docSnap.data());
          console.log(data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    }
    getQuestions();
    return () => {

      controller?.abort();
    }
  }, [])

  let history = useHistory();
  const [button, setButton] = useState(true);
  const [currentquestion, setCurrentquestion] = useState(1);
  // const ques = useContext(ReactReduxContext);


  //to track total number of questions answered
  useEffect(() => {
    checkButton();

    // setCurrentquestion(ques.store.getState().answered.currentQuestion);
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
  const onbackClick = async () => {

    // const docSnap = await getDoc(docRef);

    if (currentquestion !== 1) {
      setCurrentquestion(currentquestion - 1);
      updateDoc(doc(db, auth.currentUser.email, "userdetails"), {
        "currentQuestion": currentquestion - 1
      })
    }
  };

  //next question
  const onfrontClick = () => {

    if (currentquestion !== 7) {
      updateDoc(doc(db, auth.currentUser.email, "userdetails"), {
        "currentQuestion": currentquestion + 1
      })
      setCurrentquestion(currentquestion + 1);
    }

  };

  //on click submit check if all question answered,
  //if yes calculate score and update score
  //if no dont push

  const onSubmit = async () => {

    const usDocSnap = await getDoc(doc(db, auth.currentUser.email, "userdetails"));
    const anSocSnap = await getDoc(doc(db, "answers", "fjXvm0MzOJcyAluSeRmk"));
    let marks = 0;
    var length = Object.keys(usDocSnap.data().answers).length;
    console.log(length);
    if (length === 7) {
      for (let i = 1; i <= 7; i++) {
        if (usDocSnap.data()[i] === anSocSnap.data()[i]) {
          marks++;
        }
      }
      await updateDoc(doc(db, auth.currentUser.email, "userdetails"), {
        "score": marks
      }).then(() => {
        console.log("daw");
        history.push({

          pathname: "/score",
          state: {
            score: marks
          }
        });
      }).catch(err => {
        console.log(err);
      });
    }

  };

  // const hoursMinSecs = { minutes: 7, seconds: 0 }

  return (
    <div className="main-div">
      {/* <CustomLoader/> */}
      <div className="heading">
        <h6>React Quiz</h6>
        {/* <div className="timer">

          <CountDownTimer hoursMinSecs={hoursMinSecs} />
        </div> */}
      </div>
      <div className="question-cards">
        {data.length === 0 ? <div>Wait for the question</div> : <Cards question={data[`${currentquestion}`]}
          question_number={currentquestion} />}
      </div>
      <div className="footer-progress-bar">
        <div className="left-icon-button" onClick={onbackClick}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x"
            style={{ 'margin': '1vw' }} />
        </div>
        <div className="pagination" style={{ 'margin': '1.5vw' }}>
          {currentquestion}/7
        </div>
        <div className="right-icon-button" onClick={onfrontClick}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x"
            style={{ 'margin': '1vw' }} />
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
