import React from 'react';
import './Restaurants.css';
import mainLogo from './../assets/img/home.png'

class RestaurantTile extends React.Component {
  constructor(props) {
    super(props);
    this.onClickEvent = this.onClickEvent.bind(this);
  }

  onClickEvent(event) {
    this.props.onClickEvent(this.props.details.id, this.props.details.Name);
  }

  render() {
    return (
      <div className="restaurant__content" onClick={this.onClickEvent}>
          <img src={mainLogo} alt="" className="restaurant__img" />
          <h3 className="restaurant__name">{this.props.details.Name}</h3>
          <span className="restaurant__city">{this.props.details.Address}</span>
          <span className="restaurant__timings">{this.props.details.Timings}</span>
          <span className="restaurant__detail">{this.props.details.Description}</span>
      </div>
    );
  }
}

export default RestaurantTile;
