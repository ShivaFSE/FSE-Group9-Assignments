import React from 'react';
import { isUserLoggedIn } from './Common';
import { withRouter } from "react-router-dom";
import './Menu.css';
import MenuTile from './MenuTile';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);

    this.state = {
      menuData: []
    }
  }

  handleMenuItemClick = (item) => {
    console.log("in handleMenuItemClick: " + item.id + ", " + item.restaurant_owner_id + ", " + item.Name);
  }

  addMenuTiles() {
    return this.state.menuData.map((item) => {
      if(item.Name !== null && item.Timings !== null && item.Price !== null)
      {
        return <MenuTile details={item} onClickEvent={this.handleMenuItemClick}></MenuTile>
      }
      return <div />
    })
  }

  render() {
    console.log("In");
    if(!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
        <h1>Plese login to continue..</h1>
      </div>
      )
    }

    return (
      <div className="dashboard-container">
        <h2>Menu</h2>
        <section className="menu section bd-container" id="menu">
          <div className="menu__container">
            {(this.state.menuData.length > 0) ? this.addMenuTiles() : <h3>No Menu for this Restaurant yet!</h3>}
          </div>
        </section>
      </div>
    );
  }

  fetchMenuData(restaurant_id) {
    
    console.log("selected restaurant_id: " + restaurant_id);
    if (restaurant_id === "") {
      return
    }

    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/menu"
    var apiBaseUrl = "http://localhost:8000/menu?"
    apiBaseUrl = apiBaseUrl + "restaurant_owner_id=" + restaurant_id;

    fetch(apiBaseUrl)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let menuReceived = data.map((item) => {
          console.log("item: " + item["Name"], item["Price"], item["Timings"], item["id"]);
          return {
            "Name": item["Name"],
            "Logo": item["Logo"],
            "Price": item["Price"],
            "Timings": item["Timings"],
            "restaurant_owner_id": item["restaurant_owner_id"],
            "id": item["id"]
          }
        });
        this.setState({ menuData: menuReceived });
        console.log("menuReceived: " + this.state.menuData.length);

      }).catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("user selected restaurant_id : " + this.props.location.state?.restaurant_id);
      this.fetchMenuData(this.props.location.state?.restaurant_id);
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Menu);
