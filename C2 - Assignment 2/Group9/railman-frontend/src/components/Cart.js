import React from 'react';
import { isUserLoggedIn, getAppDomain, getUser, isCustomerLogin } from './Common';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Menu.css';
import MenuTile from './MenuTile';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);

    this.state = {
      cartData: [],
      restaurantData: {}
    }
  }
  
  deleteCartItem(id) {
    console.log("clearCart");
    var apiBaseUrl = getAppDomain() + "/api/core/cart?id=" + id;
    
    axios.delete(apiBaseUrl)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Cart successfull cleared");
        }
        else if (response.data.code === 204) {
          console.log("invalid restaurant data");
        }
        else {
          console.log("User exists");
        }
      })
      .catch(function (error) {
        console.log("")
        console.log(error);
      });
  }

  clearCart() {
    this.state.cartData.forEach((item) => {
      console.log("clearing Cart: customer_id: " + item["customer_id"], ", cart_id: ", item["cart_id"], ", restaurant_id: ", item["restaurant_id"], ", menu_item_id: ", item["menu_item_id"], ", id: ", item["id"]);
      this.deleteCartItem(item.cart_id);
    })
  }

  handlePlaceOrder = (e) => {
    console.log("handlePlaceOrder");
    var apiBaseUrl = getAppDomain() + "/orders";
    var self = this;
    let user = getUser();

    let orderTotal = this.state.cartData.reduce((n, {Price}) => n + parseInt(Price), 0);

    console.log("restaurant: Name: ", this.state.restaurantData.Name, ", Address: ", this.state.restaurantData.Address, ", restaurant_owner_id: ", this.state.restaurantData.restaurant_owner_id, ", order total: ", orderTotal);
    var date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
    let timeString = date.getHours() + ":" + ("00" + date.getMinutes()).slice(-2)
    var payload = {
      "Restaurant Name": this.state.restaurantData.Name,
      "Station Name": this.state.restaurantData.Address,
      "Ordered Date": dateString,
      "Time": timeString,
      "Order Status": "Active",
      "Order Total": `₹ ${orderTotal}`,
      "Payment Status": "Pending",
      "Delivered By": "Satish",
      "customer_id": user.id,
      "restaurant_owner_id": this.state.restaurantData.restaurant_owner_id
    }
    
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          console.log("clearing Cart");
          self.clearCart();
          self.props.history.push('/Orders');
        }
        else if (response.data.code === 204) {
          console.log("invalid cart data");
          alert("invalid cart data")
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

  handleMenuItemClick = (item) => {
    console.log("in handleMenuItemClick: " + item.id + ", " + item.restaurant_owner_id + ", " + item.Name);
    if (isCustomerLogin()) {
      this.deleteCartItem(item.cart_id);
      window.location.reload(false);
    }
  }

  addCartTiles() {
    return this.state.cartData.map((item) => {
      if(item.Name !== null && item.Timings !== null && item.Price !== null)
      {
        return <MenuTile details={{...item, "button_title":"Remove Item"}} onClickEvent={this.handleMenuItemClick}></MenuTile>
      }
      return <div />
    })
  }

  addPlaceOrderButton() {
      return (
        <div className='user-button-menu'>
          <input type="button" onClick={this.handlePlaceOrder} value="Place Order" />
        </div>
      )
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
        <h2>Cart</h2>
        {this.addPlaceOrderButton()}
        <section className="menu section bd-container" id="cart">
          <div className="menu__container">
            {(this.state.cartData.length > 0) ? this.addCartTiles() : <h3>No Items in the Cart yet!</h3>}
          </div>
        </section>
      </div>
    );
  }

  async getRestaurantData(restaurant_id) {
    var apiBaseUrl = getAppDomain() + "/restaurants?"
    apiBaseUrl = apiBaseUrl + "id=" + restaurant_id;

    let restaurantData = await axios.get(apiBaseUrl);
    console.log("restaurantData: ", restaurantData);
    if (restaurantData.status === 200) {
      let restaurantReceived = restaurantData.data.map((restaurant) => {
        console.log("Restaurant: Name: " + restaurant["Name"], ", Address: ", restaurant["Address"], ", id: ", restaurant["id"]);
        return {
          "Name": restaurant["Name"],
          "Address": restaurant["Address"],
          "restaurant_owner_id": restaurant["restaurant_owner_id"],
          "id": restaurant["id"]
        }
      });

      return restaurantReceived[0];
    }
    else {
      alert("Failed to get Restaurant details, try again later!");
      this.props.history.push('/Restaurants');
    }
    return {};
  }

  async fetchCartData(customer_id) {
    
    console.log("selected customer_id: " + customer_id);
    if (customer_id === "") {
      return
    }
    
    var apiBaseUrl = getAppDomain() + "/cart?"
    apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;

    let allCartItems = await axios.get(apiBaseUrl);
    console.log("allCartItems: ", allCartItems);
    if (allCartItems.status === 200) {
      let cartReceived = allCartItems.data.map((item) => {
        console.log("item: customer_id: " + item["customer_id"], ", restaurant_id: ", item["restaurant_id"], ", menu_item_id: ", item["menu_item_id"], ", id: ", item["id"]);
        return {
          "menu_item_id": item["menu_item_id"],
          "restaurant_id": item["restaurant_id"],
          "customer_id": item["customer_id"],
          "id": item["id"]
        }
      });

      var allCartDetails = [];
      var restaurantDetails = {};
      if (cartReceived.length > 0) {
        allCartDetails = await this.getCartItemDetails(cartReceived);
        console.log("allCartDetails: " + allCartDetails);

        restaurantDetails = await this.getRestaurantData(cartReceived[0].restaurant_id);
      }

      this.setState({ cartData: allCartDetails, restaurantData: restaurantDetails });
    }
    else {
      alert("Failed to get Cart items, try again later!");
      this.props.history.push('/Restaurants');
    }
  }

  async getCartItemDetails(cartReceived) {
    console.log("cartReceived: " + cartReceived.length);
    var allCartDetails = [];
    
    for (let item = 0; item < cartReceived.length; item++) {
      console.log("item: ", item);
      let cartItem = cartReceived[item];
      var apiBaseUrl = getAppDomain() + "/menu?";
      apiBaseUrl = apiBaseUrl + "id=" + cartItem.menu_item_id + "&restaurant_id=" + cartItem.restaurant_id;
      
      let cartDetailsData = await axios.get(apiBaseUrl);
      console.log("cartDetailsData: ", cartDetailsData);
      if (cartDetailsData.status === 200) {
        allCartDetails.push({...cartDetailsData.data[0], "cart_id": cartItem.id});
      }
      else {
        alert("Failed to get Cart item details, try again later!");
        this.props.history.push('/Restaurants');
      }
    }
    return allCartDetails;
  }

  async componentDidMount() {
    if(isUserLoggedIn()) {
      let user = getUser();
      console.log("current customer_id : " + user.id);
      await this.fetchCartData(user.id);
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Cart);
