import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import './App.css';
import Calculator from './Calculator'
import "./font-awesome/css/font-awesome.min.css"

class App extends React.Component{
  render(){
    return <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Sukaran Golani</Link>
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/calculator" className="nav-link">Calculator</Link></li>
        </ul>
        {/* <ul className="navbar-nav ml-auto">
          <li className="nav-item"><Link to="/" className="nav-link">This website is designed by Sukaran Golani</Link></li>
        </ul> */}
      </nav>
      <Switch>
        <Route exact path="/" component={Calculator}/>
        <Route path="/calculator" component={Calculator}/>
      </Switch>
    </Router>
  }
}

export default App;
