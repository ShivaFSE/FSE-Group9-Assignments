import React from 'react';
import { isUserLoggedIn } from './Common';
import './UnderDevelopment.css';

class UnderDevelopment extends React.Component {

  render() {
    if(!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
        <h1>Plese login to continue..</h1>
      </div>
      )
    }
    
    return (
      <div className="dashboard-container">
      <h1>Coming Sooon..</h1>
    </div>
    )
  }

}

export default UnderDevelopment;
