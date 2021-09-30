import React, { useContext } from 'react';
import "./Intro.css";
import { useHistory } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { ReactReduxContext } from 'react-redux';
import { actionLogin } from '../store/login';
import { doc, addDoc, collection, setDoc, getFirestore } from "firebase/firestore";
import { cleanRedux} from '../store/questions';
export const Intro = () => {
    const db = getFirestore();
    const provider = new GoogleAuthProvider();
    const providerGit = new GithubAuthProvider();
    const auth = getAuth();
    const his = useHistory();
    const loginSt = useContext(ReactReduxContext);
    const signInWithGitHub = () => {
        signInWithPopup(auth, providerGit).then((result) => {
            // const credential = GithubAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // loginSt.store.dispatch(actionLogin({
            //     email: user.email,
            // }))

            console.log(user.email);

            // ...
        })
    }
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.  
                const user = result.user;
                console.log(user);
                loginSt.store.dispatch(actionLogin({
                    email: user.email,
                }))
                his.push("/quiz");
                try {
                    addDoc(collection(db, user.email), {
                        currentQuestion:"",
                        score:""
                    }).then(data => {
                        console.log("Document written with ID: ", data.id);
                    }).finally(e=>console.log(e));

                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                // console.log(user);
                // ...
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
                            {/* <input type="email" required className="validate__form--input" placeholder="Email" />
                            <button type="submit" className="validate__form--btn">Validate</button>
                            </form>
                            <hr className="validate__form--line" />
                            <div className="validate__form--divider">
                            <span></span>
                            <span>OR</span>
                            <span></span>
                            </div>
                            <div className="validate__form--icons">
                            <FaGoogle style={{ marginRight: "2rem", fontSize: "1.4rem" }} />
                            <FaGithub style={{ fontSize: "1.4rem" }} />
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
