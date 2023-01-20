import React from 'react';
import { isUserLoggedIn, getAppDomain } from './Common';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './OrderDetails.css';

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleAcceptOrder = this.handleAcceptOrder.bind(this);
    this.handleRejectOrder = this.handleRejectOrder.bind(this);

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
        "id": ''
      }
    }
  }

  handleAcceptOrder = async (e) => {
    console.log("handleAcceptOrder id: " + this.state.orderData["id"]);
    var apiBaseUrl = getAppDomain() + "/orders/" + this.state.orderData["id"];
    var self = this;
    var payload = self.state.orderData
    payload["Order Status"] = "Accepted";
    
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
    
    let orderUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("orderPatchData: ", orderUpdatedData.status);
    if (orderUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  addMenuTiles() {
    return (
    <div className="menu_details">
      <h3 className="menu__name">{this.state.orderData["Restaurant Name"]}</h3>
    </div>)
  }

  addAcceptAndRejectButtons() {
    return (
      <div className='user-button-menu'>
        <input type="button" onClick={this.handleAcceptOrder} value="Accept" />
        <input type="button" onClick={this.handleRejectOrder} value="Reject" />
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
        <h2>Order Details</h2>
        {this.addAcceptAndRejectButtons()}
        <section className="menu section bd-container" id="menu">
          <div className="menu__container">
            {this.addMenuTiles()}
          </div>
        </section>
      </div>
    );
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
          "restaurant_owner_id": item["restaurant_owner_id"],
          "id": item["id"]
        }
      });

      console.log("order call setting state");
      this.setState({ orderData: orderDetails[0] });
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
