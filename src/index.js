import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, persistor } from './store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";
dotenv.config();
const firebaseConfig = {
  apiKey: "AIzaSyBxQd5RNuxAD-QA_-8gWEKqrLlie5hsxu4",
  authDomain: "quizx-afdb3.firebaseapp.com",
  projectId: "quizx-afdb3",
  storageBucket: "quizx-afdb3.appspot.co",
  messagingSenderId: "956871966005",
  appId: "1:956871966005:web:d9d7de13fad7ed38bb207c",
  measurementId: "G-MTZ2XJMVDM"
};
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
);

