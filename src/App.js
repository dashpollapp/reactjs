import React, { Component } from 'react';
import logo from './logo.svg';
import logoFont from './data/logo.png';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Poll from './Poll/Poll';
import Law from './Law';


class App extends Component {


  render() {
    return (

      <div>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Index}/>
        {/* both /roster and /roster/:number begin with /roster */}
        <Route path='/poll/:pollid' component={Poll}/>
        <Route path='/login' component={Login}/>
        <Route path='/law' component={Law}/>
        <Route component={NotFound}/>
      </Switch>
      </BrowserRouter>
      </div>

    );
  }
}


const Index = () => (
  <div class="container index">
    <img src={logoFont}/>
    <h1>Willkommen bei Dashpoll</h1>
    <p>Bald erscheint unsere neue iOS, Andoid und Web Version. Weitere Infos Folgen bald.</p>



    <Link to="law">
      <a>Rechtliches</a>
    </Link>
  </div>
)

const Login = () => (
  <div className="container">
    <h1>Chill ma 😉</h1>  
    <h3>Du kannst Momentan nur Abstimmen & Umfragen erstllen</h3>
    <h6>App Download:</h6>
    <div className="stores">
      <div className="store">
        <img src={require("./data/appstore.png")}/>
      </div>
      <div class="store">
        <img src={require("./data/playstore.png")}/>
      </div>
    </div>  
    <br/><br/><br/>
    <p>Wir haben viele coole Ideen die die nÃ¤chste Zeit umsetzen werden. Dies ist nur ein ganz ganz kleiner Teil von Dashpoll. <br/><br/><br/><b>Danke für dein Verständniss :)</b><br/><br/><b>Dein Dashpoll-Team</b></p>
  </div>
)


const NotFound = () => (
  <div>
    <span>404 Page not Found</span>
  </div>
)


export default App;