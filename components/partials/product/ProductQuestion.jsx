import React, { useState } from 'react';
//import {ConnectPlugin}   from "../../connectPlugins";
import ReportPopup from '../../shared/modal/ReportAbuse'
import PostQuestionPopup from '../../shared/modal/QuestionPop';
import { abuseListApi } from '../../../api';
import Link from 'next/link';
import LikeQues from './LikeUnlike';
import moment from 'moment'
import { useTranslation } from '../../../i18n'
import  Router  from 'next/router';

function QuestionProduct({ questionInfo, productId, product, image }) {

    const [showReportModal, setShowReportModal] = useState(false)
    const [showQuesModal, setShowQuesModal] = useState(false)
    const [abuseReason, setAbuseReason] = useState([])
    const [ansId, setAnsId] = useState("")
    const { t } = useTranslation('common');
    let res = {};
    product && product.productImage.forEach(obj => {
        res["name"] = obj.image; res["containerName"] = obj.containerName
    })

    const abuseFunc = (e, answerId) => {
        setAnsId(answerId)
        e.preventDefault()
        setShowReportModal(true)
        abuseListApi(setAbuseReason)

    }
    const handleAddItemToWishlist = (e,productId) => {
        e.preventDefault();

        let AuthCheck=localStorage.getItem("spurtToken")
        if(AuthCheck){
            setShowQuesModal(true)
        }
        else{
            Router.push('/account/login')
        }
        
    };



    return (
        <div className="ps-questions">
            <ReportPopup showModal={showReportModal} setShowModal={setShowReportModal} abuseReason={abuseReason} ansId={ansId} />
            <PostQuestionPopup showModal={showQuesModal} setShowModal={setShowQuesModal} productId={productId} />
            <div className="questions-header">
                <h5>{t('products.CustomerQuestionsAnswer')}</h5>
                <div className="post-question">
                    <button onClick={e => handleAddItemToWishlist(e)}>{t('products.PostYourQuestion')}</button>

                </div>
            </div>
          
            {questionInfo && questionInfo.length !== 0 ? <>
                {questionInfo && questionInfo.map((info, index) => {
                    return (
                        <div className="question-answer-containor" key={index}>
                           
                            <div className="product-ques-content" >
                               
                                <h3>
                                    <span>Question</span>
                                    <div className="product-question-main">{info.question} ?</div>
                                </h3>

                                {info.answerCount !== 0 && <div className="product-answer-section">
                                    <span>{t('Customerquestions.Answer')}</span>
                                    <div className="product-answer-container">
                                        <h5>{info && info.answerList && info.answerList.answer}</h5>
                                    </div>

                                </div>}
                                {info && info.postedBy && info.postedBy.firstName && <h5 style={{ marginTop: "10px" }}>{info.postedBy.firstName} <span>{moment(info && info.answerList && info.answerList.createdDate).format('LL')}</span></h5>}
                               
                                {info.answerList && <LikeQues answerId={info && info.answerList && info.answerList.answerId} likes={info && info.answerList && info.answerList.likes} unLike={info && info.answerList && info.answerList.dislikes} userLike={info && info.answerList && info.answerList.likeType} setShowReportModal={setShowReportModal} setAnsId={setAnsId} setAbuseReason={setAbuseReason} />}


                            </div>
                        </div>

                    )
                })}</> : <div className=" "><p>{t('products.NoQuestionFound')}</p></div>}


          

            {product.questionList.length > 3 && <div className="view-all-questions">
                <Link href={{ pathname: "/product/productquestion", query: {  productId: product.productId, name: product.name, price: product.price,productSlug:product.productSlug    } }}>
                    <a>{t('checkouts.ViewAll')}</a>
                </Link>
            </div>}
        </div>
    )



}

export default QuestionProduct 