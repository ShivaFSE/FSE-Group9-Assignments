import React from 'react';
import './Menu.css';
import { isUserLoggedIn } from './Common';
import mainLogo from './../assets/img/plate1.png'

class MenuTile extends React.Component {
  constructor(props) {
    super(props);
    this.onClickEvent = this.onClickEvent.bind(this);
  }

  onClickEvent(event) {
    this.props.onClickEvent(this.props.details);
  }

  addCartOrRemoveItemButton() {
    if (isUserLoggedIn() && this.props.details.button_title != null) {
      return (
        <div>
          <button className="menu__button" onClick={this.onClickEvent}>{this.props.details.button_title}</button>
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <div className="menu__content">
        <div>
          <img src={mainLogo} alt="" className="menu__img" />
        </div>
        <div className="menu_details">
          <h3 className="menu__name">{this.props.details.Name}</h3>
          <label className="menu__price">{`₹ ${this.props.details.Price}`}</label>
          <label className="menu__timings">{this.props.details.Timings}</label>
        </div>
        {this.addCartOrRemoveItemButton()}
      </div>
    );
  }
}

export default MenuTile;
