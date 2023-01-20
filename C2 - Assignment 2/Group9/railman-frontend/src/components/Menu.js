import React from 'react';
import { isUserLoggedIn, getUser, getAppDomain, isCustomerLogin, isRestaurantOwnerLogin } from './Common';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Menu.css';
import MenuTile from './MenuTile';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleRemoveRestaurant = this.handleRemoveRestaurant.bind(this);
    this.handleAddMenuItem = this.handleAddMenuItem.bind(this);

    this.state = {
      menuData: []
    }
  }

  handleRemoveRestaurant = (e) => {
    console.log("handleRemoveRestaurant restaurant_id: " + this.props.location.state?.restaurant_id);
    var apiBaseUrl = getAppDomain() + "/api/core/restaurants?id=" + this.props.location.state?.restaurant_id;
    var self = this;
    
    axios.delete(apiBaseUrl)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          alert("Restaurant successfull removed");
          self.props.history.push('/Restaurants');
        }
        else if (response.data.code === 204) {
          console.log("invalid restaurant data");
          alert("invalid restaurant data")
        }
        else {
          console.log("User exists");
          alert("User exist");
        }
      })
      .catch(function (error) {
        console.log("")
        console.log(error);
      });

    e.preventDefault();
  }

  handleAddMenuItem = (e) => {
    console.log("handleRemoveRestaurant restaurant_id: " + this.props.location.state?.restaurant_id);
    this.props.history.push({
      pathname: '/AddMenuItem',
      state: { restaurant_id: this.props.location.state?.restaurant_id }
    });
  }

  removeMenuItem = (item) => {
    var apiBaseUrl = getAppDomain() + "/api/core/menu?id=" + item.id;
    var self = this;
    
    axios.delete(apiBaseUrl)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          alert("Menu Item successfull removed");
          self.props.history.push('/Restaurants');
        }
        else if (response.data.code === 204) {
          console.log("invalid restaurant data");
          alert("invalid restaurant data")
        }
        else {
          console.log("User exists");
          alert("User exist");
        }
      })
      .catch(function (error) {
        console.log("")
        console.log(error);
      });
  }

  getCartRestaurant = async (newMenuItem) => {
    let user = getUser()
    var apiBaseUrl = getAppDomain() + "/cart?"
    apiBaseUrl = apiBaseUrl + "customer_id=" + user.id;

    let allCartItems = await axios.get(apiBaseUrl);
    console.log("Existing CartItems: ", allCartItems);
    if (allCartItems.status === 200) {
      let cartReceived = allCartItems.data.map((item) => {
        console.log("item: customer_id: " + item["customer_id"], ", restaurant_id: ", item["restaurant_id"], ", menu_item_id: ", item["menu_item_id"], ", id: ", item["id"]);
        return {
          "restaurant_id": item["restaurant_id"]
        }
      });

      if (cartReceived.length > 0) {
        console.log("cart restaurant_id: " + cartReceived[0].restaurant_id, ", new restaurant_id: ", newMenuItem.restaurant_id);
        if (cartReceived[0].restaurant_id === newMenuItem.restaurant_id) {
          return true;
        }
      }
    }
    console.log("returning false");
    return false;
  }

  addCartItem = (item) => {
    var apiBaseUrl = getAppDomain() + "/api/core/cart";
    var self = this;
    const user = getUser();

    var payload = {
      "menu_item_id": item.id,
      "restaurant_id": item.restaurant_id,
      "customer_id": user.id
    }
    
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Cart Item successfull added");
          self.props.history.push('/Cart');
        }
        else if (response.data.code === 204) {
          console.log("invalid cart item data");
          alert("invalid cart item data")
        }
        else {
          console.log("User exists");
          alert("User exist");
        }
      })
      .catch(function (error) {
        console.log("")
        console.log(error);
      });
  }

  handleMenuItemClick = async (item) => {
    console.log("in handleMenuItemClick: " + item.id + ", " + item.restaurant_owner_id + ", " + item.Name);
    if (isRestaurantOwnerLogin()) {
      console.log("remove Menu item id: " + item.id);
      this.removeMenuItem(item);
    }
    else if (isCustomerLogin()) {
      if(await this.getCartRestaurant(item) === true) {
        this.addCartItem(item);
      }
      else {
        alert("The Cart has items already from a different Restaurant");
      }
    }
  }

  addMenuTiles() {
    return this.state.menuData.map((item) => {
      if(item.Name !== null && item.Timings !== null && item.Price !== null)
      {
        return <MenuTile details={{...item, "button_title": isRestaurantOwnerLogin() ? "Remove Item" : "Add to cart"}} onClickEvent={this.handleMenuItemClick}></MenuTile>
      }
      return <div />
    })
  }

  addRemoveRestaurantOrAddMenuItemButton() {
    if (isRestaurantOwnerLogin()) {
      return (
        <div className='user-button-menu'>
          <input type="button" onClick={this.handleRemoveRestaurant} value="Remove Restaurant" />
          <input type="button" onClick={this.handleAddMenuItem} value="Add Menu Item" />
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
        <h2>Menu</h2>
        {this.addRemoveRestaurantOrAddMenuItemButton()}
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

    var apiBaseUrl = getAppDomain() + "/menu?"
    apiBaseUrl = apiBaseUrl + "restaurant_id=" + restaurant_id;

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
            "restaurant_id": item["restaurant_id"],
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
