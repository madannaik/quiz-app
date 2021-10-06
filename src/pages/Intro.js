import React, { useContext } from 'react';
import "./Intro.css";
import { useHistory } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { ReactReduxContext } from 'react-redux';
import { actionLogin } from '../store/login';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { cleanRedux } from '../store/questions';
export const Intro = () => {
    const db = getFirestore();
    const provider = new GoogleAuthProvider();
    const providerGit = new GithubAuthProvider();
    const auth = getAuth();
    const his = useHistory();
    const loginSt = useContext(ReactReduxContext);

    const createDocu = async (email) => {
        const docRef = doc(db, email, "userdetails");
        getDoc(docRef).then(data => {
            if (!data.exists()) {
                try {
                    setDoc(doc(db, email.toString(), "userdetails"), {
                        currentQuestion: "0",
                        score: "-1"
                    }).then(data => {
                        console.log("Document written with ID: ");
                        his.push("/quiz");
                    }).catch(err => {
                        console.log("cannot write data");
                    })


                } catch (e) {
                    console.error("Error adding document: ", e);
                    return;
                }
            }
            his.push("/quiz")
        });
    }

    const signInWithGitHub = async () => {
        signInWithPopup(auth, providerGit).then((result) => {
            const user = result.user;
            createDocu(user.email);
            console.log(user.email);
        })
    }
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                createDocu(user.email);
                loginSt.store.dispatch(actionLogin({
                    email: user.email,
                }));
            }).catch((error) => {
                // Handle Errors here.
                console.log(error);
            });
    }
    React.useEffect(() => {
        loginSt.store.dispatch(cleanRedux({}));

    }, [])

    return (
        <div className="intro">
            <div className="intro__svg">
                {/* <img src={inn} className="svg-1" alt="quiz-innovations" /> */}
            </div>
            <div className="intro__details">

                <div className="intro__start">
                    <h1 className="start__header">WELCOME</h1>
                    <div className="validate">
                        <form className="validate__form" onSubmit={(event) => {
                            event.preventDefault();
                            his.push("/quiz");
                        }}>
                            <h4 className="validate__form--header"> PLEASE LOGIN TO ACCESS QUIZ</h4>
                            <div className="login-with-google" onClick={signInWithGoogle}>
                                LOGIN WITH GOOGLE
                            </div>
                            <div className="validate__form--divider">
                                <span></span>
                                <span>OR</span>
                                <span></span>
                            </div>
                            <div className="login-with-github" onClick={signInWithGitHub}>
                                LOGIN WITH GITHUB
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
