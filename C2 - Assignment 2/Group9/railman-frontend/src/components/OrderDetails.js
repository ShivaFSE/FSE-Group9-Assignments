import React from 'react';
import { isUserLoggedIn, getAppDomain, isRestaurantOwnerLogin } from './Common';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import MenuTile from './MenuTile';
import './OrderDetails.css';

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleAcceptOrder = this.handleAcceptOrder.bind(this);
    this.handleRejectOrder = this.handleRejectOrder.bind(this);
    this.handleCancelOrder = this.handleCancelOrder.bind(this);

    this.state = {
      orderData: {
        "Restaurant Name": '',
        "Station Name": '',
        "Ordered Date": '',
        "Time": '',
        "Order Status": '',
        "Order Total": '',
        "Payment Status": '',
        "Delivered By": '',
        "customer_id": '',
        "restaurant_owner_id": '',
        "items": [],
        "id": ''
      },
      orderItemDetails: []
    }
  }

  handleAcceptOrder = async (e) => {
    console.log("handleAcceptOrder id: " + this.state.orderData["id"]);
    var apiBaseUrl = getAppDomain() + "/orders/" + this.state.orderData["id"];
    var self = this;
    var payload = self.state.orderData
    payload["Order Status"] = "Accepted";
    payload["Payment Status"] = "Completed";
    
    let orderUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("orderPatchData: ", orderUpdatedData.status);
    if (orderUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  handleRejectOrder = async (e) => {
    console.log("handleRejectOrder id: " + this.state.orderData["id"]);
    var apiBaseUrl = getAppDomain() + "/orders/" + this.state.orderData["id"];
    var self = this;
    var payload = self.state.orderData
    payload["Order Status"] = "Rejected";
    payload["Payment Status"] = "Refunded";
    
    let orderUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("orderPatchData: ", orderUpdatedData.status);
    if (orderUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  handleCancelOrder = async (e) => {
    console.log("handleCancelOrder id: " + this.state.orderData["id"]);
    var apiBaseUrl = getAppDomain() + "/orders/" + this.state.orderData["id"];
    var self = this;
    var payload = self.state.orderData
    payload["Order Status"] = "Canceled";
    payload["Payment Status"] = "Refunded";
    
    let orderUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("orderPatchData: ", orderUpdatedData.status);
    if (orderUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  addAcceptAndRejectButtons() {
    return (
      <div className='user-button-menu'>
        { (this.state.orderData["Order Status"] === "Pending" || this.state.orderData["Order Status"] === "Rejected") ? 
        <input type="button" onClick={this.handleAcceptOrder} value="Accept" /> : null }
        { (this.state.orderData["Order Status"] === "Pending" || this.state.orderData["Order Status"] === "Accepted") ? 
        <input type="button" onClick={this.handleRejectOrder} value="Reject" /> : null }
      </div>
    )
  }

  addCancelButton() {
    return (
      <div className='user-button-menu'>
        { (this.state.orderData["Order Status"] === "Pending") ? 
        <input type="button" onClick={this.handleCancelOrder} value="Cancel" /> : null }
      </div>
    )
  }

  addOrderItemTiles() {
    return this.state.orderItemDetails.map((item) => {
      if(item.Name !== null)
      {
        return <MenuTile key={item.id} details={{...item}} onClickEvent={this.handleMenuItemClick}></MenuTile>
      }
      return <div />
    })
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
        <h2>Order Details</h2>
        { isRestaurantOwnerLogin() ? this.addAcceptAndRejectButtons() : this.addCancelButton()}
        <div className="order-details-container">
          <section className="menu section bd-container" id="menu">
            <div className="menu_details">
              <h3><br/><br/><br/>{"Restaurant Name: " + this.state.orderData["Restaurant Name"]}</h3>
              <h3 className="order_details">{"Order Total: " + this.state.orderData["Order Total"]}<br/><br/><br/></h3>
              <label className="order_details">{"Ordered Date: " + this.state.orderData["Ordered Date"] + ", " + this.state.orderData["Time"]}</label>
              <label className="order_details">{"Order Status: " + this.state.orderData["Order Status"]}</label>
              <label className="order_details">{"Payment Status: " + this.state.orderData["Payment Status"]}</label>
              <label className="order_details">{"Station Name: " + this.state.orderData["Station Name"]}</label>
              <label className="order_details">{"Delivered By: " + this.state.orderData["Delivered By"]}</label>
              <h3 className="order_details"><br/><br/><br/>{"Ordered Items: "}<br/><br/></h3>
              {this.addOrderItemTiles()}
            </div>
          </section>
        </div>
      </div>
    );
  }

  async getOrderItemsData(orderDetails) {
    console.log("in getOrderItemsData");

    var allOrderDetails = [];
    
    for (let item = 0; item < orderDetails[0].items.length; item++) {
      let orderItem = orderDetails[0].items[item];
      if (orderItem.menu_item_id != null) {
        var apiBaseUrl = getAppDomain() + "/menu?";
        apiBaseUrl = apiBaseUrl + "id=" + orderItem.menu_item_id + "&restaurant_id=" + orderDetails[0].restaurant_id;
        console.log("apiBaseUrl-------: ", apiBaseUrl);

        let orderDetailsData = await axios.get(apiBaseUrl);
        console.log("orderDetailsData: ", orderDetailsData);
        if (orderDetailsData.status === 200) {
          allOrderDetails.push({...orderDetailsData.data[0]});
        }
        else {
          alert("Failed to get Order details, try again later!");
          this.props.history.push('/Orders');
        }
      }
    }
    return allOrderDetails;
  }

  async fetcOrderData(order_id) {
    
    console.log("selected order_id: " + order_id);
    if (order_id === "") {
      return
    }

    var apiBaseUrl = getAppDomain() + "/orders?"
    apiBaseUrl = apiBaseUrl + "id=" + order_id;

    let orderDetailsData = await axios.get(apiBaseUrl)
    if (orderDetailsData.status === 200) {
      let orderDetails = orderDetailsData.data.map((item) => {
        console.log("item: customer_id: " + item["customer_id"], ", restaurant_id: ", item["restaurant_id"], ", menu_item_id: ", item["menu_item_id"], ", id: ", item["id"]);
        return {
          "Restaurant Name": item["Restaurant Name"],
          "Station Name": item["Station Name"],
          "Ordered Date": item["Ordered Date"],
          "Time": item["Time"],
          "Order Status": item["Order Status"],
          "Order Total": item["Order Total"],
          "Payment Status": item["Payment Status"],
          "Delivered By": item["Delivered By"],
          "customer_id": item["customer_id"],
          "restaurant_id": item["restaurant_id"],
          "restaurant_owner_id": item["restaurant_owner_id"],
          "items": item["items"],
          "id": item["id"]
        }
      });

      console.log("order details received: " + orderDetails[0]["items"].length);
      let orderItemsInfo = await this.getOrderItemsData(orderDetails);
      console.log("order items received: " + orderItemsInfo.length);
      this.setState({ orderData: orderDetails[0], orderItemDetails: orderItemsInfo });
    }
    console.log("order call done");
  }

  async componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("user selected order details");
      const queryString = window.location.search;
      console.log("attributes: ", queryString);
      const urlParams = new URLSearchParams(queryString);
      const attributeValue = urlParams.get('id')
      console.log("attributeValue: ", attributeValue);
      await this.fetcOrderData(attributeValue);
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(OrderDetails);
