import './App.css';
import React from 'react';
import { isCustomerLogin } from './components/Common';
import { Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login.js';
import Registration from "./components/Registration";
import UnderDevelopment from "./components/UnderDevelopment";
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import AddRestaurant from './components/AddRestaurant';
import AddMenuItem from './components/AddMenuItem';
import Cart from './components/Cart';
import OrderDetails from './components/OrderDetails';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className='App-header title'>Railman</h1>
        <nav className="site-nav">
            <ul className="mainnav" >
              <li ><a href="/Home">Home</a></li>
              <li  ><a href="/">Login</a></li>
              <li  ><a href="/Restaurants">Restaurants</a></li>
              <li  ><a href="/Orders">Orders</a></li>
              {isCustomerLogin() ? <li  ><a href="/Cart">Cart</a></li> : null }
              <li  ><a href="/UnderDevelopment">Services</a></li>
              <li  ><a href="/UnderDevelopment">Contact</a></li>
              <li  ><a href="/UnderDevelopment">About</a></li>
            </ul>
          </nav>
        <div className='App-body'>
          <BrowserRouter>
              <Route path="/home" component={Home} />
              <Route path="/" exact component={() => <Login />} />
              <Route path="/registration" component={Registration} />
              <Route path="/UnderDevelopment" component={UnderDevelopment} />
              <Route path="/Dashboard" exact component={() => <Dashboard />} />
              <Route path="/Orders" exact component={() => <Orders />} />
              <Route path="/Restaurants" exact component={() => <Restaurants />} />
              <Route path="/Menu" exact component={() => <Menu />} />
              <Route path="/AddRestaurant" exact component={() => <AddRestaurant />} />
              <Route path="/AddMenuItem" exact component={() => <AddMenuItem />} />
              <Route path="/Cart" exact component={() => <Cart />} />
              <Route path="/OrderDetails" exact component={() => <OrderDetails />} />
          </BrowserRouter>
        </div>

        <div className='App-footer'>
          {/* <Contact /> */}
        </div>

      </div>
    );
  }
}


export default App;
