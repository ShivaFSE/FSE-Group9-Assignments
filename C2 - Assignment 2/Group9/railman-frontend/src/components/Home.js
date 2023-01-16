import React from 'react';
import './Home.css';
import mainLogo from './../assets/img/main.jpg'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home__container">
      <div className="home__data">
          <h1 className="home__title">Railman</h1>
          <h2 className="home__subtitle">Try the Food Catering Service For Indian Railways and Beyond.</h2>
          <a href="/Restaurants" className="button">View Menu</a>
      </div>
      <div>
          <img src={mainLogo} alt="" className='home__img'/>
     </div>
     </div>
    )
  }

}
export default Home;
