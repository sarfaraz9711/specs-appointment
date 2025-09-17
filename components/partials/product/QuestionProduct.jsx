import React, { useState } from 'react';
//import {ConnectPlugin}   from "../../connectPlugins";
import { abuseListApi } from '../../../api';
import ReportPopup from '../../shared/modal/ReportAbuse';
import LikeQues from './LikeUnlike';

function QuestionAllProduct({questionInfo,name,price,keyword,setKeyword,setQuesLoader,quesLoader}){
    const [showReportModal,setShowReportModal]=useState(false)
    const [abuseReason,setAbuseReason]=useState([])

    // const [showQuesModal,setShowQuesModal]=useState(false)
    const [ansId,setAnsId]=useState("")



    const abuseFunc=(e,answerId)=>{
        setAnsId(answerId)
        e.preventDefault()
        setShowReportModal(true)
        abuseListApi(setAbuseReason)

    }

    return(
        <div className="product-question-containor">
            <ReportPopup  showModal={showReportModal} setShowModal={setShowReportModal} abuseReason={abuseReason} ansId={ansId}/>

         
        <div className="ps-img-left-containor">
            <div className="ps-ques-image">
                <img src="/static/img/favi.png"/>

            </div>

            <p>{name}</p>
            <h3>$ {price}</h3>

        </div>

        <div className="ps-right-ques-containor">

            <div className="ps-right-ques-heading">
                <h2>Question Answers</h2>
            </div>

            <div className="ps-product-ques-search">
                <button>
                <i class="fa fa-search" aria-hidden="true"/>
                </button>
                <input placeholder="Have question ? search for an answer" value={keyword} onChange={e=>{setKeyword(e.target.value);setQuesLoader(true)}}/>
            </div>
            {quesLoader===false?<div>
            {questionInfo&&questionInfo.length===0?
            <div className="ques-no-result">No search results found</div>:
            <div className="question-answer-padding">
                
           {questionInfo&&questionInfo.map((info,index)=>{
                   return(
                   <div className="question-answer-containor"  key={index}>

                    <div className="product-ques-content">
                      
                    <h3>
                        <span>Question</span>
                        <div className="product-question-main">{info.question} ?</div>
                    </h3>

                    {info.answerCount!==0&&<div className="product-answer-section">
                        <span>Answer</span>
                        <div className="product-answer-container">
                   <h4>{info&&info.answerList&&info.answerList.answer}</h4>
                            <p>by {info.postedBy.firstName}</p>
                        </div>

                    </div>}

                    {info.answerCount!==0&&<LikeQues answerId={info&&info.answerList&&info.answerList.answerId} likes={info&&info.answerList&&info.answerList.likes} unLike={info&&info.answerList&&info.answerList.dislikes} userLike={info.answerList.likeType} setShowReportModal={setShowReportModal} setAnsId={setAnsId} setAbuseReason={setAbuseReason}/>}

                </div>
                </div>
                )
            })}
            
                </div>}
                </div>:<div className="question-answer-containor" style={{textAlign:"center",display: "block"}}>
            <img src="/static/img/spurt-original-loader.gif" />
</div>}
           
            
        </div>

    </div>


    )

    

}
export default QuestionAllProduct