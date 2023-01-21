import React from 'react';
import { isUserLoggedIn, getUser, getAppDomain, isRestaurantOwnerLogin } from './Common';
import { withRouter } from "react-router-dom";
import './Restaurants.css';
import RestaurantTile from './RestaurantTile';
import axios from 'axios';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);

    this.handleRestaurantClick = this.handleRestaurantClick.bind(this);
    this.addNewRestaurant = this.addNewRestaurant.bind(this);
    
    this.state = {
      // currentbooking: this.props.location.state.detail,
      restaurantData: []
    }
  }

  handleRestaurantClick = (event) => {
    console.log("in handleRestaurantClick: " + event);
    this.props.history.push({
      pathname: '/Menu',
      state: { restaurant_id: event }
    });
  }

  addNewRestaurant = (event) => {
    const user = getUser();
    if (isRestaurantOwnerLogin()) {
      var owner_id = user.id;
      console.log("restaurant_owner user: " + owner_id);
      this.props.history.push({
        pathname: '/AddRestaurant',
        state: { restaurant_owner_id: owner_id }
      });
    }
    else {
      console.log("customer user: " + user.role);
    }
  }

  searchRestaurants = async (event) => {
    let keyword = event.target.value;
    console.log("in searchRestaurants: " + keyword);
    await this.fetchRestaurantsData(keyword);
  }

  addRestaurantTiles() {
    return this.state.restaurantData.map((restaurant) => {
      if(restaurant.Name !== null && restaurant.Timings !== null && restaurant.Description !== null)
      {
        return <RestaurantTile key={restaurant.id} details={restaurant} onClickEvent={this.handleRestaurantClick}></RestaurantTile>
      }
      return <div />
    })
  }

  addNewRestaurantButton() {
    if (isRestaurantOwnerLogin()) {
      return (
        <div className='user-menu'>
          <input type="button" onClick={this.addNewRestaurant} value="Add a Restaurant" />
        </div>
      )
    }
    return null
  }

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
        <h2>Order</h2>
        {this.addNewRestaurantButton()}
        <section className="restaurant section bd-container" id="restaurant">
          <input type="text" placeholder="Filter by Area" onChange={(e) => this.searchRestaurants(e)} />
          <div className="restaurant__container bd-grid">
            {(this.state.restaurantData.length > 0) ? this.addRestaurantTiles() : <h3>No Restaurants found in this area!</h3>}
          </div>
        </section>
      </div>
    );
  }

  async fetchRestaurantsData(location) {
    console.log("delivery destination: " + location);
    
    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/restaurants"
    var apiBaseUrl = getAppDomain() + "/restaurants?"
    if (location !== "") {
      apiBaseUrl = apiBaseUrl + "Address=" + location;
    }

    const user = getUser();
    if (isRestaurantOwnerLogin()) {
      var restaurant_owner_id = user.id;
      console.log("restaurant_owner user: " + restaurant_owner_id);
      apiBaseUrl = apiBaseUrl + "&restaurant_owner_id=" + restaurant_owner_id;
    }
    else {
      console.log("customer user: " + user.role);
    }

    let restaurantsReceivedData = await axios.get(apiBaseUrl);
    console.log("restaurantsReceivedData status: ", restaurantsReceivedData.data.length);
    if (restaurantsReceivedData.status === 200) {
      let restaurantsReceived = restaurantsReceivedData.data.map((restaurant) => {
        console.log("restaurant: " + restaurant["Name"], restaurant["Address"], restaurant["Timings"], restaurant["Description"]);
        return {
          "Name": restaurant["Name"],
          "Logo": restaurant["Logo"],
          "Address": restaurant["Address"],
          "Timings": restaurant["Timings"],
          "Description": restaurant["Description"],
          "id": restaurant["id"]
        }
      });
      this.setState({ restaurantData: restaurantsReceived });
      console.log("restaurantsReceived: " + this.state.restaurantData.length);
    }
  }

  async componentDidMount() {
    if(isUserLoggedIn()) {
      await this.fetchRestaurantsData("");
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Restaurants);
