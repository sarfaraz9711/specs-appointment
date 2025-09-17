import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useState } from 'react';
import Modal from 'react-modal';
import { postQuestionPopApi } from '../../../api/product/postQuestion';
import { useTranslation } from '../../../i18n'
function PostQuestionPopup({showModal,setShowModal,productId}){
    const [question,setQuestion]=useState("")
    const [questionError,setQuestionError]=useState("")
    const { t } = useTranslation('common');
    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgb(64, 64, 64,55%)'
          },
        content : {
          top                   : '23%',
          left                  : '23%',
          right                 : '23%',
          bottom                : '33%',
        //   overflow:"auto",
          backgroundColor: 'white',

        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        }
      };

      const closeModal=()=>{
          setShowModal(false)
          setQuestionError("")
          setQuestion("")
      }

      const submitQuestion=()=>{
          if(question!==""){
           
            postQuestionPopApi(JSON.parse(productId),question,setShowModal,setQuestionError,setQuestion)
          }
          else{
              setQuestionError("*Question is required")
          }
      }
    
            return (
                <Modal
                isOpen={showModal}
              //   onAfterOpen={afterOpenModal}
                onRequestClose={e=>closeModal(e)}
                style={customStyles}
                contentLabel="Example Modal"
              >
                  {}
                  <div className="custom-qa-question">
                      <h2>{t('products.PostYourQuestion')}
                          <button className="exit-qa-button"  onClick={e=>closeModal(e)}>x</button>

                      </h2>
                      <div className="qna-ques-content">
                          <div className="qna-ques-content-container">
                            <h4 style={{marginLeft:"20px",color: "gray"}}>{t('products.questionhere')}</h4>
                             
                              <textarea value={question} placeholder={t('products.questionhere')} onChange={e=>{setQuestion(e.target.value);setQuestionError("")}}/>
                              {questionError!==""&&<div className="error-ques-qna">{questionError}</div>}

                          </div>

                      </div>
                      <div className="qna-ques-submit">
                          <button style={{color:"white", background:"#FB641B"}} onClick={e=>submitQuestion()}>{t('products.Submit')}</button>
                          <button style={{color:"#FB641B",border:" 1px solid #FB641B",marginRight:"300px"}} onClick={e=>closeModal(e)}>{t('products.Cancel')}</button>

                      </div>

                  </div>
                 
              </Modal>)
            
}

export default PostQuestionPopup;