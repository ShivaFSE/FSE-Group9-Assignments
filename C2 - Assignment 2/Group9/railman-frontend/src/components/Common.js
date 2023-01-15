// return the user data from the session storage
export const getUser = () => {
    const userStr= [];
     userStr.id = sessionStorage.getItem('id');
     userStr.name = sessionStorage.getItem('user');
     userStr.address = sessionStorage.getItem('useraddress');
    return userStr;
   }
  
  // return the token from the session storage
  export const getToken = () => {
    //return sessionStorage.getItem('token') || null;
    return "dfdfdsf";
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('user');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (id, name, address) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('user', JSON.stringify(name));
    sessionStorage.setItem('useraddress', JSON.stringify(address));
  }

  // get the status of user log in information
  export const isUserLoggedIn = () => {
    console.log("isUserLoggedIn is " + sessionStorage.getItem('user'));
     if (sessionStorage.getItem('user') != null )
      return true;
     else
      return false;
   }

   //api to get orders for a user
   export const fetchUserOrders = async (userRole) => {
    return async dispatch => {
    const user = getUser();
    var apiBaseUrl = "http://localhost:8000/api/core/orders?"
    if (userRole === "Customer") {
      var customer_id = user.id;
      apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;
    }
    else if (userRole === "expert") {
      var expert_id = user.id;
      apiBaseUrl = apiBaseUrl + "expert_id=" + expert_id;
    }

    console.log("calling api");

    let response = await fetch(apiBaseUrl);
    if (response.status == 200) {
      let data = await response.json();
      let ordersfromapi = data.map((order) => {
        return {
          "Order ID": order["Order ID"],
          "Restaurent Name": order["Restaurent Name"],
          "Station Name": order["Station Name"],
          "Ordered Date": order["Ordered Date"],
          "Time": order["Time"],
          "Order Status": order["Order Status"],
          "Payment Status": order["Payment Status"],
          "Delivered By": order["Delivered By"]
        }
      });
      console.log(ordersfromapi);
      return ordersfromapi;
      //return json;
    }
  }

      // .then((response) => {
      //   return response.json();
      // })
      // .then(data => {
      //   let ordersfromapi = data.map((order) => {
      //     return {
      //       "Order ID": order["Order ID"],
      //       "Restaurent Name": order["Restaurent Name"],
      //       "Station Name": order["Station Name"],
      //       "Ordered Date": order["Ordered Date"],
      //       "Time": order["Time"],
      //       "Order Status": order["Order Status"],
      //       "Payment Status": order["Payment Status"],
      //       "Delivered By": order["Delivered By"]
      //     }
      //   });
      //   console.log(ordersfromapi);
      //   return ordersfromapi;
      //   // this.setState({ tableData: ordersfromapi });
      //   // console.log(this.state.tableData);

      // }).catch(error => {
      //   console.log(error);
      // });
  }
  