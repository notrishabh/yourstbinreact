import React from 'react';
import './App.css';
import UnpaidList from './UnpaidList.js';
import FullList from './FullList.js';
import Navbar from './Navbar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {increment} from './actions';




const App = () =>{

  return(
    <Router>
      <div className="container">
        <Navbar />
        <div className="innerContainer">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/fullList" exact component={FullList} />
          <Route path="/unpaidList" exact component={UnpaidList} />
        </Switch>
        </div>
      </div>
    </Router>
  );
};
const Home = () =>{
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();


  return(
    <div>
      <h1>Home {counter}</h1>
      <button onClick={()=>dispatch(increment(2))}>add</button>
    </div>
  );
};

export default App;