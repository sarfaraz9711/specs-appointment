import React, { Component } from 'react';
import { useState } from 'react';
// import Modal from 'react-modal';
import {abuseReportQuestionApi} from '../../../api/product/QuestionAnswerApi'
import { useTranslation } from '../../../i18n';
// import {useTranslation} from '../../i18n'
import { Modal } from 'antd';
function ReportsPopup({showModal,setShowModal,abuseReason,ansId}){
    const [remark,setRemark]=useState("")
    const [reasonId,setReasonId]=useState("")
    const [remarkError,setRemarkError]=useState("")
    const [reasonError,setReasonError]=useState("")
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
          bottom                : '39%',
        //   overflow:"auto",
          backgroundColor: 'white',

        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        }
      };

      const closeModal=()=>{
        setShowModal(false)
      
    }

    const submitReport=()=>{
        if(remark!==""&&reasonId!=="" && remark.length <= 200){
            abuseReportQuestionApi(remark,ansId,reasonId,setShowModal,setRemark,setReasonId)

        }
        else{
            if(remark===""){
                setRemarkError("* Remark is required")

            }
            if(remark.length > 200){
                setRemarkError("* Only 200 characters allowed.")
            }
            if(reasonId===""){
                setReasonError("*please select a reason")
            }   
        }
    }
    
            return (
                <Modal
                visible={showModal}
                width={1024}
                footer={null}
              //   onAfterOpen={afterOpenModal}
                onCancel={e=>closeModal(e)}
                // style={customStyles}
                // contentLabel="Example Modal"
              >
                 
                  <div className="custom-report-containor">
                      <h2>{t('ReportAbuse.ReportAbuse')}
                          {/* <button className="report-exit">
                              <span onClick={e=>closeModal()}>x</span>
                          </button> */}
                      </h2>

                      <div className="report-content">
                          <form>
                              <div className="report-form-container">
                                  <div className="report-main-containor">
                                      <div className="report-reason">
                                          <div className="report-left-column">
                                              <label>{t('ReportAbuse.Reason')}</label>
                                              <select className="report-custom-select" onChange={e=>{setReasonId(e.target.value);setReasonError("")}}style={{borderColor: reasonError && "red"}}>
                                                  <option value="" disabled selected hidden>{t('CancelHistory.Selectreason')}</option>
                                                  {abuseReason&&abuseReason.map((reason)=>{
                                                      return(
                                                      <option key={reason.id} value={reason.id}>{reason.reason}</option>
                                                      )
                                                  })}

                                              </select>
                                                {reasonError!==""&&<div className="report-error">{reasonError}</div>}

                                          </div>
                                      </div>
                                      <div className="report-custom-remark">
                                          <div className="report-custom-right">
                                              <label>{t('ReportAbuse.Remark')}</label>
                                              <textarea value={remark} onChange={e=>{setRemark(e.target.value);setRemarkError("")}} style={{borderColor: remarkError && "red"}}/>
                                                {remarkError!==""&&<div className="report-error" style={{marginLeft:"20px"}}>{remarkError}</div>}

                                          </div>

                                      </div>

                                  </div>

                              </div>

                          </form>

                      </div>

                      <div className="report-submit">
                          <button onClick={e=>submitReport()}>{t('ReportAbuse.submit')}</button>
                          <button onClick={e=>closeModal()}>{t('ReportAbuse.cancel')}</button>

                      </div>

                  </div>

              </Modal>)
            
}

export default ReportsPopup;
