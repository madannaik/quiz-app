
import './App.css';
import Quiz from './components/quiz';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Score } from './components/score'
import { Intro } from './pages/Intro';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/" component={Intro} />
        <Route exact path="/score" component={Score} />
      </Switch>
    </Router>

  );
}

export default App;
