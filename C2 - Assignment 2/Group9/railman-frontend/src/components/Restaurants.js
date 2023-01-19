import React from 'react';
import { isUserLoggedIn, getUser } from './Common';
import { withRouter } from "react-router-dom";
import './Restaurants.css';
import RestaurantTile from './RestaurantTile';

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
    if (user.role === JSON.stringify("restaurant_owner")) {
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

  searchRestaurants = (event) => {
    let keyword = event.target.value;
    console.log("in searchRestaurants: " + keyword);
    this.fetchRestaurantsData(keyword);
  }

  addRestaurantTiles() {
    return this.state.restaurantData.map((restaurant) => {
      if(restaurant.Name !== null && restaurant.Timings !== null && restaurant.Description !== null)
      {
        return <RestaurantTile details={restaurant} onClickEvent={this.handleRestaurantClick}></RestaurantTile>
      }
      return <div />
    })
  }

  addNewRestaurantButton() {
    const user = getUser();
    if (user.role === JSON.stringify("restaurant_owner")) {
      return (
      <div className='user-menu'>
        <input type="button" onClick={this.addNewRestaurant} value="Add a Restaurant" />
        </div>
      )
    }
    return null
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

  fetchRestaurantsData(location) {
    
    console.log("delivery destination: " + location);
    
    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/restaurants"
    var apiBaseUrl = "http://localhost:8000/restaurants?"
    if (location !== "") {
      apiBaseUrl = apiBaseUrl + "Address=" + location;
    }

    const user = getUser();
    if (user.role === JSON.stringify("restaurant_owner")) {
      var restaurant_owner_id = user.id;
      console.log("restaurant_owner user: " + restaurant_owner_id);
      apiBaseUrl = apiBaseUrl + "&restaurant_owner_id=" + restaurant_owner_id;
    }
    else {
      console.log("customer user: " + user.role);
    }

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
            "Description": restaurant["Description"],
            "id": restaurant["id"]
          }
        });
        this.setState({ restaurantData: restaurantsReceived });
        console.log("restaurantsReceived: " + this.state.restaurantData.length);

      }).catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if(isUserLoggedIn()) {
      this.fetchRestaurantsData("");
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Restaurants);
