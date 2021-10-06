import { React, useEffect, useState } from 'react';
import "./css/cards.css";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDoc, getFirestore } from "@firebase/firestore";

export const Cards = ({ question = {}, question_number }) => {
  const db = getFirestore();
  const auth = getAuth();
  const setQuestionAnswer = async (id) => {
    const docRef = doc(db, auth.currentUser.email, "userdetails");
    await updateDoc(docRef, {
      [`answers.${question_number}`]: id.target.id,
    })
  }

  const [active, setActive] = useState([false, false, false, false]);

  const getAnswerState = async () => {

    try {
      const docSnap = await getDoc(doc(db, auth.currentUser.email, "userdetails"));
      const snapData = docSnap.data().answers[question_number];
      setActive(active.map((data, index) => {
        if (index + 1 === parseInt(snapData)) return true
        else return false
      }))
    } catch (error) {

    }




  }
  //  run getAnswer when question number changes
  useEffect(() => {
    getAnswerState();

  }, [question_number]);





  //when user clicks on different options update the answer in redux-answer and run getAnswer for updated ui element
  const onClick = (id) => {
    setQuestionAnswer(id);
    getAnswerState();
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
      <span id="1" className={active[0] ? "active" : "not-active"} onClick={onClick} >1. {question.answer[0]}</span>
      <span id="2" className={active[1] ? "active" : "not-active"} onClick={onClick}>2. {question.answer[1]}</span>
      <span id="3" className={active[2] ? "active" : "not-active"} onClick={onClick}>3. {question.answer[2]}</span>
      <span id="4" className={active[3] ? "active" : "not-active"} onClick={onClick}>4. {question.answer[3]}</span>
    </div>
  </div>
}