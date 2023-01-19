// return the user data from the session storage
export const getUser = () => {
    const userStr= [];
     userStr.id = sessionStorage.getItem('id');
     userStr.name = sessionStorage.getItem('user');
     userStr.address = sessionStorage.getItem('useraddress');
     userStr.role = sessionStorage.getItem('role');
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
    sessionStorage.removeItem('useraddress');
    sessionStorage.removeItem('role');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (id, name, address, role) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('user', JSON.stringify(name));
    sessionStorage.setItem('useraddress', JSON.stringify(address));
    sessionStorage.setItem('role', JSON.stringify(role));
  }

  // get the status of user log in information
  export const isUserLoggedIn = () => {
    console.log("isUserLoggedIn is " + sessionStorage.getItem('user'));
     if (sessionStorage.getItem('user') != null )
      return true;
     else
      return false;
   }

   export const getAppDomain = () => {
    return "http://localhost:8000"
   }



