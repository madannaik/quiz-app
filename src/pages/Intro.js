import React, { useContext } from 'react';
import "./Intro.css";
import { useHistory } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { ReactReduxContext } from 'react-redux';
import { actionLogin } from '../store/login';
export const Intro = () => {

    const provider = new GoogleAuthProvider();
    const providerGit = new GithubAuthProvider();
    const auth = getAuth();
    const his = useHistory();
    const loginSt = useContext(ReactReduxContext);
    const signInWithGitHub = ()=>{
        signInWithPopup(auth,providerGit).then((result)=>{
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
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
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                loginSt.store.dispatch(actionLogin({
                    email: user.email,
                }))
                // console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

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
