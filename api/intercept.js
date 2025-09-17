import toast from './toast'
import Axios from "axios";
import {apiUrl} from './url'


const http = Axios.create({
    
    baseURL: apiUrl,
    headers: {
      "Content-type": "application/json",
    },
  });

  export const modalSuccess = (type, message) => {
  
 
    toast({ type: type, message:message});
  
  }
  
  export const modalWarning = (type, message) => {
    toast({ type: type, message:message });
  
  };

  export const modalDone = (type, message) => {
  
 
    toast({ type: type, message:message});
  
  }

  export const modalError = (type, message) => {
    toast({ type: type, message:message });
  
  };

  


 
http.interceptors.request.use((config) => {
    // const token = sessionStorageService.getAccessToken();
    var token = localStorage.getItem('spurtToken')
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  });
  

  http.interceptors.response.use((response) => {
    return response;
  }, 

  (error) => {
  
    switch (error?.response?.status) {
     
      // case 400:

      //  handleBadRequest(error.response.data.message);
      //   break;

      case 401:
        handleUnauthorized(error?.response?.statusText);
        break;

      // case 403:
      //   handleForbidden(error.response.statusText);
      //   break;

      case 404:
        handleNotFound(error.response.statusText);
        break;

      case 422:
        handleUnProcessableEntry(error.response.statusText);
        break;

      case 500:
        handleServerError(error.response.statusText);
        break;
    
     
      default:
        break;
    }

    return error.response;
    // return error.response;
  }


)

function handleBadRequest(error) {
  modalWarning({ type: "error", message: error });
}

function handleUnauthorized(error) {
//   Router.push("/account/login")
// localStorage.removeItem('spurtToken')
  //  removes.removeItem("spurtToken")
  // localStorage.removeItem('userProfile')
  // localStorage.removeItem('companyProfile')
  // toast({type:"error",message:error})
}

function handleForbidden() {
  toast({type:"error",message:error})
}

function handleNotFound(error) {
  // toast({type:"error",message:error})
}

function handleUnProcessableEntry(error) {
  toast({type:"error",message:error})
}

function handleServerError(error) {

  toast({type:"error",message:error})
}



export default http;



