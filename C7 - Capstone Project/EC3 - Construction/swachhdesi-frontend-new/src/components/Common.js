import axios from "axios";

// return the user data from the session storage
export const getUser = () => {
  const userStr = [];
  userStr.id = sessionStorage.getItem("id");
  userStr.name = sessionStorage.getItem("user");
  userStr.address = sessionStorage.getItem("useraddress");
  userStr.role = sessionStorage.getItem("role");
  return userStr;
};

// return the token from the session storage
export const getToken = () => {
  //return sessionStorage.getItem('token') || null;
  return "dfdfdsf";
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("useraddress");
  sessionStorage.removeItem("role");
};

// set the token and user from the session storage
export const setUserSession = (id, name, address, role) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("user", JSON.stringify(name));
  sessionStorage.setItem("useraddress", JSON.stringify(address));
  sessionStorage.setItem("role", JSON.stringify(role));
};

// get the status of user log in information
export const isUserLoggedIn = () => {
  if (sessionStorage.getItem("user") != null) return true;
  else return false;
};

export const isUserLogin = () => {
  if (isUserLoggedIn()) {
    const user = getUser();
    if (user.role === JSON.stringify("user")) {
      return true;
    }
  }
  return false;
};

export const isModeratorLogin = () => {
  if (isUserLoggedIn()) {
    const user = getUser();
    if (user.role === JSON.stringify("moderator")) {
      return true;
    }
  }
  return false;
};

export const getAppDomain = () => {
  return "http://localhost:8000";
  return "http://192.168.1.7:8000";
  // return sessionStorage.getItem('ipv4');
};

export const getUserIpAddress = () => {
  const res = axios.get("https://geolocation-db.com/json/");
  console.log("getUserIpAddress: " + res.data);
  sessionStorage.setItem("ipv4", res.data.IPv4);
};
