import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from "react-icons/fa";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};
export const color = (type) => {

  switch (type) {
    case "success":
      return "white";
    case "info":
      return "orange";
    case "error":
      return "white";
    case "warning":
      return "yellow";
    default:
      return "red";
  }
};
// function ToastMessage({ type, message }){  
//   toast.dismiss()

//   toast[type](
//       <div style={{ display: "flex", color: color(type) }}>
//         <div
//           // style={{
//           //   fontSize: 15,
//           //   paddingTop: 8,
//           //   flexShrink: 0,
//           //   textAlign: "center",
//           //   width: "30px",
//           // }}
//         >
          
//         </div>
//         <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
//          {message}
         
//         </div>
//       </div>
//     );
    
  
  
    
//   // if(toast.isActive(toastId)===false){
    
//   //   ToastMessage
   
//   // }else{
   
//   // }
  
  
//     ToastMessage.propTypes = {
//       message: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired,
//     };
    
//     ToastMessage.dismiss = toast.dismiss;
//     toast.clearWaitingQueue()
// }
// export default ToastMessage;
const ToastMessage = ({ type, message }) => {
 toast.dismiss()
 toast[type](
    <div style={{ display: "flex", color: color(type) }}>
      <div
        // style={{
        //   fontSize: 15,
        //   paddingTop: 8,
        //   flexShrink: 0,
        //   textAlign: "center",
        //   width: "30px",
        // }}
      >
        
      </div>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
       {message}
       
      </div>
    </div>
  );
  


  
// if(toast.isActive(toastId)===false){
  
//   ToastMessage
 
// }else{
 
// }

  ToastMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  
  ToastMessage.dismiss = toast.dismiss;
  toast.clearWaitingQueue()
};
export default ToastMessage;
