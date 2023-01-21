import React from 'react';
import { isUserLoggedIn, getUser, getAppDomain, isCustomerLogin, isRestaurantOwnerLogin } from './Common';
import { withRouter } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import './Orders.css';
import axios from 'axios';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    }
    this.handleOrderFood = this.handleOrderFood.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  handleOrderFood = (e) => {
    this.props.history.push('/Restaurants');
    e.preventDefault();
  }

  handleCart = (e) => {
    this.props.history.push('/Cart');
    e.preventDefault();
  }

  addOrdersTable() {
    return (<div className="Orders">
      <h2 className='orders-heading'>All Orders</h2>
      <OrdersTable data={this.state.tableData} />
    </div>)
  }

  addOrderFoodBox() {
    return (<div className="searchbox-container">
      <fieldset>
        <legend>Order Food</legend>
        <input type='submit' value='Restaurants' onClick={this.handleOrderFood} />
        <input type='submit' value='Cart' onClick={this.handleCart} />
      </fieldset>
    </div>)
  }

  render() {
    const user = getUser();
    if(!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
        <h1>Plese login to continue..</h1>
      </div>
      )
    }
        
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name} !</h3>
        </div>

        {isCustomerLogin() ? this.addOrderFoodBox() : null}

        {(this.state.tableData.length > 0) ? this.addOrdersTable() : <h2 className='orders-heading'>No Orders!</h2>}
        
      </div>
    );
  }

  async fetchOrdersData() {
    const user = getUser();

    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/orders"
    var apiBaseUrl = getAppDomain() + "/orders?"
    if (isCustomerLogin()) {
      console.log("customer user");
      var customer_id = user.id;
      apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;
    }
    else if (isRestaurantOwnerLogin()) {
      console.log("restaurant_owner user");
      var restaurant_owner_id = user.id;
      apiBaseUrl = apiBaseUrl + "restaurant_owner_id=" + restaurant_owner_id;
    }
    else {
      console.log("incorrect user: " + user.role);
    }

    let allOrdersData = await axios.get(apiBaseUrl);
    console.log("allOrdersData status: ", allOrdersData.status);
    if (allOrdersData.status === 200) {
      let allOrders = allOrdersData.data.map((order) => {
        return {
          "id": order["id"],
          "Restaurant Name": order["Restaurant Name"],
          "Station Name": order["Station Name"],
          "Ordered Date": order["Ordered Date"],
          "Time": order["Time"],
          "Order Status": order["Order Status"],
          "Order Total": order["Order Total"],
          "Payment Status": order["Payment Status"],
          "Delivered By": order["Delivered By"]
        }
      });

      allOrders.sort((a, b) => Date.parse(`${b["Ordered Date"]} ${b.Time}`) - Date.parse(`${a["Ordered Date"]} ${a.Time}`));

      this.setState({ tableData: allOrders });
      console.log(this.state.tableData);
      console.log("allOrders: " + this.state.tableData.length);
    }
  }

  async componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("User is " + getUser().name);
      await this.fetchOrdersData();
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Orders);