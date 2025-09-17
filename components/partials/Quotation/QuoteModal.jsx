import React from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { useState } from 'react';
// import {quotationReq} from './quotationReqApi' 
// import { useTranslation } from '../../i18n'
import { quotationReq } from '../../../api/product/quotationReqApi';
import { useTranslation } from '../../../i18n';
export default function SpurtQuotationPop({product}){
    const [showModal, setShowModal] = useState(false);
    const [quantityVal,setQuantityVal]=useState("")
    const [quantError,setQuantError]=useState("")
    const [unit,setUnit]=useState("")
    const [unitError,setUnitError]=useState("")
    const [orderVal,setOrderVal]=useState("")
    const [orderValError,setOrderValError]=useState("")
    const [need,setNeed]=useState("")
    const [needError,setNeedError]=useState("")
    const [comments,setComments]=useState("")
    const [commentsError,setCommentsError]=useState("")
    const [submit,setSubmit]=useState(0)
    const { t } = useTranslation('common');
    const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
    const res = {};
        product&&product.productImage&&product.productImage.forEach(obj => {
        res["name"] = obj.image;res["containerName"]=obj.containerName
        })
        

    const customStyles = {
        content : {
          top                   : '0%',
          right                 : '0%',
          bottom                : '0%',
          left                  : "65%",
          padding:0,
          borderRadius:0,
        //   overflow:"auto"
        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        },
        overlay: {
            position: 'fixed',
            top: 0,
      left: 0,
      right: 0,
      bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            overflow:"none",
            zIndex:"7"
          },
      };


      const closeModal=()=>{
          setShowModal(false)
        setSubmit(0)
          setQuantityVal("")
          setQuantError("")
          setUnit("")
          setUnitError("")
          setOrderVal("")
          setOrderValError("")
          setNeed("")
          setNeedError("")
          setComments("")
          setCommentsError("")
          
      }

  
 

      useEffect(()=>{
        Modal.setAppElement('body');
        // product&&settingImage()   
      },[])

      const needFunc=(e)=>{
          setNeedError("")
          setNeed(e.target.value)
          if(submit===1&&need===""){
            //   setNeedError("Purpose is required")
          }

      }

      const quoteSubmit=(e)=>{
        
          setSubmit(1)
          if(quantityVal!==""&&unit!==""&&orderVal!==""&&need!==""&&comments!==""){
              quotationReq(product.productId,quantityVal,unit,orderVal,need,comments,setShowModal,setQuantityVal,setQuantError,setUnit,setUnitError,setOrderVal,setOrderValError,setNeed,setNeedError,setComments,setCommentsError,setSubmit,closeModal)
              setSubmit(0)
          }
          else{
            
              if(quantityVal.length === 0){
                 
                  setQuantError("Quantity is required")
              }
              else {
                setQuantError("")
              }
              if(unit.length === 0 ){
                  setUnitError("Unit is required")
              } else {
                setUnitError("")
              }
              if(orderVal.length === 0){
                  setOrderValError("Total value is required")
              } else {
                setOrderValError("")
              }
              if(need.length === 0){
                  setNeedError("Purpose is required")
              } else {
                setNeedError("")
              }
              if(comments.length === 0){
                  setCommentsError("Comments is required")
              } else {
                setCommentsError("")
              }
          }

      }
      



    return(
      <>
    {isLoggedIn && product.quotationAvailable === 1 && (
            <button
              className="custom-req-quote"
              onClick={(e) => setShowModal(!showModal)}
            >
              {t("products.Request")}
            </button>
          )} 
        <Modal
          isOpen={showModal}
       
          onRequestClose={e=>closeModal(e)}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <div className="custom-modal-quote-container">
                <div className="custom-modal-quote-header">
                <div className="custom-modal-exit">
                    <a onClick={e =>closeModal(e)}>X</a>
                </div>
                <h3>{t('RequestQuote.ContactSeller')}</h3>
                </div>

                <form>
                    <div className="custom-modal-form-container">
                        <div className="custom-modal-quote-input-container">
                            <p> {t('products.NoOfQuantity')}</p>
                            <input type="number" onChange={e=>{setQuantityVal(e.target.value);submit===1&&e.target.value!==""?setQuantError("") : setQuantError("Quantity is required")}} value={quantityVal}style={{borderColor:submit===1&& quantError && "red"}} />
                            {submit===1&&quantError!==""&&<div className="error-quote">{quantError}</div>}
                        </div>
                        <div className="custom-modal-quote-input-container">
                            <p>{t('RequestQuote.QuantityUnit')}</p>
                            <select placeholder="Select unit" onChange={e=>{setUnit(e.target.value);submit===1&&e.target.value!==""?setUnitError(""):setUnitError("Unit is required")}} style={{borderColor:submit===1&& unitError && "red"}}>
                                  <option value="" disabled selected hidden>Select unit</option>
                                  <option value="Kg">Kg</option>
                                  <option value="Piece">Piece</option>
                                  <option value="Other">Other</option>

                              </select>
                              {submit===1&&unitError!==""&&<div className="error-quote">{unitError}</div>}
                        </div>
                        <div className="custom-modal-quote-input-container">
                            <p>{t('products.TotalOrderValue')}</p>
                            <select placeholder="Select unit" onChange={e=>{setOrderVal(e.target.value);submit===1&&e.target.value!==""?setOrderValError(""):setOrderValError("Total value is required")}}style={{borderColor:submit===1&& orderValError && "red"}}>
                            <option value="" disabled selected hidden>Select a value</option>
                              <option value="upto 1,000">upto 1,000</option>
                              <option value="1,000 to 3,000">1,000 to 3,000</option>
                              <option value="3,000 to 10,000">3,000 to 10,000</option>
                              <option value="10,000 to 20,000">10,000 to 20,000</option>
                              <option value="20,000 to 50,000">20,000 to 50,000</option>
                              <option value="50,000 to 1 Lakh">50,000 to 1 Lakh</option>
                              <option value="1 Lakh to 2 Lakh">1 Lakh to 2 Lakh</option>
                              <option value="5 Lakh to 10 Lakh">5 Lakh to 10 Lakh</option>
                              <option value="10 Lakh to 20 Lakh">10 Lakh to 20 Lakh</option>
                              <option value="20 Lakh to 50 Lakh">20 Lakh to 50 Lakh</option>
                              <option value="50 Lakh to 1 Crore">50 Lakh to 1 Crore</option>
                              <option value="More than 1 Crore">More than 1 Crore</option>
                            </select>
                            {submit===1&&orderValError!==""&&<div className="error-quote">{orderValError}</div>}
                        </div>
                        <div className="right-custom-quote-row2">
                              <p>{t('RequestQuote.Why')} ? {t('RequestQuote.Selectonly')}</p>
                              <div className="custom-radio-quote-container">
                                  <div className="radio-div-quote">
                                  <input type="radio" name="quote" id="id1" value="1" onChange={e=>{needFunc(e)}} /> 
                                  <label for="id1">For Reselling</label>
                                  </div>
                                  <div className="radio-div-quote">
                                  <input  type="radio" id="id2" name="quote" value="2" onChange={e=>needFunc(e)} 
                                
                                  /> 
                                  <label for="id2">For Business Use</label>
                                  </div>
                                  <div className="radio-div-quote">
                                  <input type="radio" id="id3" name="quote" value="3" onChange={e=>needFunc(e)}
                                
                                  /> 
                                  <label for="id3">For Home Use</label>
                                  </div>
                                  {submit===1&&needError!==""&&<div className="error-quote">{needError}</div>}

                              </div> 

                          </div>
                          <div className="custom-modal-quote-input-container">
                              <p>{t('RequestQuote.Comments')}</p>
                              <textarea
                                className="comment-quote"
                                rows="8"
                                placeholder={t('RequestQuote.Comments')}  value={comments} onChange={e=>{setComments(e.target.value);submit===1&&e.target.value!==""?setCommentsError(""):setCommentsError("Comments is required")}} style={{borderColor:submit===1&& commentsError && "red"}}></textarea>
                                {submit===1&&commentsError!==""&&<div className="error-quote">{commentsError}</div>}
                          </div>
                    </div>
                    <div className="quote-submit-container">
                        <button  type="button" onClick={e=>quoteSubmit(e)}>{t('ReportAbuse.submit')}</button>
                    </div>
                </form>
            </div>

 
         
        </Modal>
        </>

    )
}