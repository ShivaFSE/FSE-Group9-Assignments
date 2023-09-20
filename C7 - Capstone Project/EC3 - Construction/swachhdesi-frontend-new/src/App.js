import "./App.css";
import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login.js";
import Registration from "./components/Registration";
import UnderDevelopment from "./components/UnderDevelopment";
import Dashboard from "./components/Dashboard";
import AddIncident from "./components/AddIncident";
import IncidentDetails from "./components/IncidentDetails";
import CreatedIncidents from "./components/CreatedIncidents";
import ParticipatedIncidents from "./components/ParticipatedIncidents";
import ContactUs from "./components/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // getUserIpAddress();
    console.log("In App.js");
    return (
      <div>
        {/* <nav className="site-nav">
          <ul className="mainnav">
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <a href="/CreatedIncidents">Created Incidents</a>
            </li>
            <li>
              <a href="/ParticipatedIncidents">Participated Incidents</a>
            </li>
            <li>
              <a href="/UnderDevelopment">Contact</a>
            </li>
            <li>
              <a href="/UnderDevelopment">About</a>
            </li>
          </ul>
        </nav> */}
        <div className="App-body">
          <BrowserRouter>
            <Header />
            <Route path="/home" component={Home} />
            <Route path="/" exact component={() => <Login />} />
            <Route path="/registration" component={Registration} />
            <Route path="/Dashboard" exact component={() => <Dashboard />} />
            <Route
              path="/AddIncident"
              exact
              component={() => <AddIncident />}
            />
            <Route
              path="/IncidentDetails"
              exact
              component={() => <IncidentDetails />}
            />
            <Route path="/UnderDevelopment" component={UnderDevelopment} />
            <Route path="/CreatedIncidents" component={CreatedIncidents} />
            <Route path="/Contact" component={ContactUs} />
            <Route
              path="/ParticipatedIncidents"
              component={ParticipatedIncidents}
            />
          </BrowserRouter>
        </div>
        <Footer />
        {/* <div className="App-footer"><Contact /></div> */}
      </div>
    );
  }
}

export default App;
