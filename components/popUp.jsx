import React from "react";
import { useState } from "react";



function PopUpMesage(props) {

    const [showPopup, setShowPopUp] = useState(false)
   // const [data, setData] = useState(props.actionMessage)
    console.log(props.actionMessage, "vvnv")
    // console.log(data, "fgv")
    

    const closePopup = () => {
        setShowPopUp(false);
        setData(true);
    }


    return (
<>{data.popupshow &&
        <>
       
                        <div className="modal fade show pop-show">
             
           
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{data.message}</h4>
                            </div>
                            <div className="modal-body">
                               {data.header}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={closePopup}>{data.action}</button>
                            </div>
                        </div>
                    </div>
                  
                             
                       
                      
                   
       
               </div>
           
             <div className="pop-up-overflow" >{data.popupshow}</div>
             </> 
}</>
         
                        )
    
    
    
    
    




}

export default PopUpMesage;