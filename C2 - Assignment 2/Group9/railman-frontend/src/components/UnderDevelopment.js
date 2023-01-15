import React from 'react';
import { isUserLoggedIn } from './Common';

class UnderDevelopment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!isUserLoggedIn()) {
      return (
        <div>
        <h1>Plese login to continue..</h1>
      </div>
      )
    }
    
    return (
      <div>
      <h1>Coming Sooon..</h1>
    </div>
    )
  }

}

export default UnderDevelopment;
