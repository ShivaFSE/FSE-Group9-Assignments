import React from 'react';
import './Home.css';
import mainLogo from './../assets/img/main.jpg'

class Home extends React.Component {

  render() {
    return (
      <div className="home__container">
      <div className="home__data">
          <h1 className="home__title">Swachh Desi</h1>
          <h2 className="home__subtitle">A clean country start from our house and local streets.</h2>
          <a href="/Dashboard" className="button">View Incidents</a>
      </div>
      <div>
          <img src={mainLogo} alt="" className='home__img'/>
     </div>
     </div>
    )
  }

}
export default Home;
