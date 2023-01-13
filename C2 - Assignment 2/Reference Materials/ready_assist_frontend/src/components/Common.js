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