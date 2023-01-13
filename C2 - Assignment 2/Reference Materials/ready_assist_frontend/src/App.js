import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Contact from "./components/Contact";
import Login from './components/Login.js';
import Registration from "./components/Registration";
import DashboardC from './components/dashboard.js';
import DashboardE from './components/dashboardE.js';
import CreateService from './components/createService.js';
import UpdateService from './components/UpdateService.js';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
 
  render() {
    return (
      <div className="container">
        <h1 className='App-header title'>ReadyAssist</h1>
        <nav className="site-nav">                                           
            <ul className="mainnav" >
              <li ><a href="/">Home</a></li>
              <li  ><a href="/Courses">Courses</a></li>
              <li ><a href="/Account">Account</a></li>
              <li ><a href="/support">Support</a></li>
              <li ><a href="/about">About</a></li>              
            </ul>
          </nav>
        <div className='App-body'>            
          <BrowserRouter>                 
              <Route path="/" exact component={() => <Login />} />      
              <Route path="/registration" component={Registration} />  
              <Route path="/dashboardC" exact component={() => <DashboardC />} />
              <Route path="/dashboardE" exact component={() => <DashboardE />} /> 
              <Route path="/CreateService" exact component={() => <CreateService />} />
              <Route path="/UpdateService" exact component={() => <UpdateService />} />   
          </BrowserRouter>
        </div>

        <div className='App-footer'>        
          <Contact />
        </div>

      </div>
    );
  }
}


export default App;
