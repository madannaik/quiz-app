
import './App.css';
import Quiz from './components/quiz';
import {HashRouter as Router,Route,} from 'react-router-dom';
import {Score} from './components/score'


function App() {
  return (

      <Router>
        <Route exact path="/" component={Quiz}  />
        <Route exact path="/score" component={Score} />

      </Router>


  );
}

export default App;
