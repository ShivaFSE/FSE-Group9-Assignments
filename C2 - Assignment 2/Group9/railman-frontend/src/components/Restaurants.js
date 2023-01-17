import React from 'react';
import { isUserLoggedIn } from './Common';
import { withRouter } from "react-router-dom";
import './Restaurants.css';
import mainLogo from './../assets/img/home.png'
import RestaurantTile from './RestaurantTile';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentbooking: this.props.location.state.detail,
      restaurantData: []
    }
  }

  searchRestaurants = (event) => {
    let keyword = event.target.value;
    console.log("in searchRestaurants: " + keyword);
    this.fetchRestaurantsData(keyword);
  }

  addRestaurantTiles() {
    return this.state.restaurantData.map((restaurant) => {
      if(restaurant.Name !== null && restaurant.Timings !== null && restaurant.Description !== null)
      {
        return <RestaurantTile logo={mainLogo} name={restaurant.Name} timings={restaurant.Timings} description={restaurant.Description}></RestaurantTile>
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
        <h2>Order</h2>
        <section className="menu section bd-container" id="menu">
          <input type="text" placeholder="Filter by Area" onChange={(e) => this.searchRestaurants(e)} />
          <div className="menu__container bd-grid">
            {(this.state.restaurantData.length > 0) ? this.addRestaurantTiles() : <h3>No Restaurants found in this area!</h3>}
          </div>
        </section>
      </div>
    );
  }

  fetchRestaurantsData(location) {
    
    console.log("delivery destination: " + location);
    if (location === "") {
      return
    }

    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/restaurants"
    var apiBaseUrl = "http://localhost:8000/restaurants?"
    apiBaseUrl = apiBaseUrl + "Address=" + location;

    fetch(apiBaseUrl)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let restaurantsReceived = data.map((restaurant) => {
          console.log("restaurant: " + restaurant["Name"], restaurant["Address"], restaurant["Timings"], restaurant["Description"]);
          return {
            "Name": restaurant["Name"],
            "Logo": restaurant["Logo"],
            "Address": restaurant["Address"],
            "Timings": restaurant["Timings"],
            "Description": restaurant["Description"]
          }
        });
        this.setState({ restaurantData: restaurantsReceived });
        console.log("restaurantsReceived: " + this.state.restaurantData.length);

      }).catch(error => {
        console.log(error);
      });
  }
}

export default withRouter(Restaurants);