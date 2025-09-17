import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReportsPopup from './ReportPopups';
import PostQuestionsPopup from './PostQuestionPopup';
// import { abuseListApi } from '../../api';
import Link from 'next/link';
// import LikeQues from '../../components/partials/product/LikeUnlike';
import moment from 'moment'
// import Modal from 'react-modal';
// import { useTranslation } from '../../i18n';
import  Router  from 'next/router';
import {AnswerListAPi, postAnswerPopApi, questionsandAnswerApi} from '../../../api/product/QuestionAnswerApi'
import { abuseListApi } from '../../../api';
import LikeQues from '../product/LikeUnlike';
import { useTranslation } from '../../../i18n';
import { message } from 'antd';
import {Modal} from 'antd';
function QuestionandAnswer({productId}) {
    const singleProduct = useSelector(s => s.product.singleProduct);
    const [showReportModal, setShowReportModal] = useState(false)
    const [showQuesModal, setShowQuesModal] = useState(false)
    const [abuseReason, setAbuseReason] = useState([])
   const[questionInfo,setquestionInfo]=useState([])
    const [ansId, setAnsId] = useState("")
  
    const[keyword,setKeyWord]=useState("")
    const[limit,setLimit]=useState(3)
     const[product,setproduct]=useState(singleProduct)
     const [showAnsPop,setAnsPos]=useState(false)
     const [listQues,setListQues]=useState("")
     const [answerList,setAnserList]=useState([])
     const [postYourAnswer,setPostYourAns]=useState(false)
     const [question,setQuestion]=useState("")
     const [questionError,setQuestionError]=useState("")
     const [dataInAnswer,setDataInAnswer]=useState("")
    

     const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgb(64, 64, 64,55%)',

           
          },
        content : {
          top                   : '15%',
          left                  : '15%',
          right                 : '15%',
          bottom                : '30%',
        //   overflow:"auto",
          backgroundColor: 'white',

        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        }
      };
// useEffect(()=>{


   
//     setproduct(singleProduct)


// },[productId,product,singleProduct])
const customStyless = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgb(64, 64, 64,55%)',
       
      },
    content : {
      top                   : '23%',
      left                  : '25%',
      right                 : '27%',
      bottom                : '44%',
    //   overflow:"auto",
      backgroundColor: 'white',

    //   marginRight           : '-50%',
    //   transform             : 'translate(-13%, -13%)'
    }
  };


    
useEffect(()=>{

   
    questionsandAnswerApi(productId,setquestionInfo,keyword,limit)
   
},[singleProduct])



    const { t } = useTranslation('common');
    // let res = {};
    // product && product.productImage.forEach(obj => {
    //     res["name"] = obj.image; res["containerName"] = obj.containerName
    // })

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


    const closeModal=()=>{
        setAnsPos(false)
        setPostYourAns(false)
     
    }

    const hanldePopOpen=(e,data)=>{
        console.log(data)
        setAnsPos(true)
        setListQues(data.question)
        AnswerListAPi(data?.questionId,setAnserList,keyword,limit)
    }

const hadnlePostanswer=(e,data)=>{
    setPostYourAns(true)
    setListQues(data.question)
    setDataInAnswer(data.questionId)

}
   
const submitQuestion=()=>{
    
    if(question!==""){
        if(question.length <=150){
        postAnswerPopApi(dataInAnswer,
            question,setPostYourAns,setQuestionError,setQuestion)
        }else{
            setQuestionError("Only 150 characters are allowed.")
        }
      }
      else{
          setQuestionError("*Answer is required")
      }

    // if(question!==""){
    //   postQuestionandAnswerPopApi(productId,question,setShowModal,setQuestionError,setQuestion)
    // }
    // else{
    //     setQuestionError("*Question is required")
    // }
}
    return (
        <>
         <Modal
                visible={showAnsPop}
              //   onAfterOpen={afterOpenModal}
                onCancel={e=>closeModal(e)}
                footer={null}
                width={1024}
                // style={customStyles}
                // contentLabel="Example Modal"
              >
                   {answerList && answerList.length !== 0 && <>
                   
                        
                  <div className="custom-qa-question answer-popup">
                      <h2>{listQues}
                          {/* <button className="exit-qa-button"  onClick={e=>closeModal(e)}>x</button> */}

                      </h2>
                      <hr></hr>
                       {answerList && answerList.map((info, index) =>(
                        <>
                        <div className="question-answer-containor" key={index}>
                           
                           <div className="product-ques-content" >
                      <div className="product-answer-section">
                                    <span>{t('Customerquestions.Answer')}</span>
                                    <div className="product-answer-container">
                                        <h5>{info.answer}</h5>
                                    </div>  

                                </div>
                              
                                {/* {info && info.postedBy && info.postedBy.firstName && <h5 style={{ marginTop: "10px" }}>By {" "}{info.postedBy.firstName} <span>{moment(info && info.answerList && info.answerList.createdDate).format('LL')}</span></h5>} */}
                                {info && info.postedBy && info.postedBy.firstName && <h5 style={{ marginTop: "10px" }}>By {" "}{info.postedBy.firstName} <span>{moment(info.createdDate).format('LL')}</span></h5>}
                               
                                {info&& <LikeQues answerId={info.answerId} likes={info.likes} unLike={info.dislikes} userLike={info.likeType} setShowReportModal={setShowReportModal} setAnsId={setAnsId} setAbuseReason={setAbuseReason} />}

                                </div> 
                                </div> 

                         <hr></hr>
                        </>
               ))}
               
                      {/* <div className="qna-ques-content">
                          <div className="qna-ques-content-container">
                            <p style={{marginLeft:"20px",color: "gray"}}>{t('products.questionhere')}</p>
                              
                              <textarea  placeholder={t('products.questionhere')} />
                              <div className="error-ques-qna">
                                questionError</div>
                              

                          </div>

                      </div> */}
                      {/* <div className="qna-ques-submit">
                          <button style={{color:"white", background:"#FB641B"}} >{t('products.Submit')}</button>
                          <button style={{color:"#FB641B",border:" 1px solid #FB641B",marginRight:"300px"}} onClick={e=>closeModal(e)}>{t('products.Cancel')}</button>

                      </div> */}
{/* <hr></hr> */}
                  </div>
                   
                  </>}
              </Modal>
        
     
        <div className="ps-questions pl-3">
            <ReportsPopup showModal={showReportModal} setShowModal={setShowReportModal} abuseReason={abuseReason} ansId={ansId} />
            <PostQuestionsPopup showModal={showQuesModal} setShowModal={setShowQuesModal} productId={productId} />
            <div className="questions-header">
                <h5>{t('products.CustomerQuestionsAnswer')}</h5>
                <div className="post-question">
                    <button onClick={e => handleAddItemToWishlist(e)}>{t('products.PostYourQuestion')}</button>
                    {/* <button onClick={hadnlePostanswer} style={{background:"green"}}>Post Your Answer</button> */}
                    {/* <span>Post Your Answer</span> */}
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
                               
                                {info.answerCount > 1&&<><a className='answerQues'  onClick={e=>hanldePopOpen(e,info)}>Read other answer</a></>}
                               
                                    {product.buyed==1&&<div className='anserPost mt-3'><a onClick={e=>hadnlePostanswer(e,info)}>Post Your Answer</a></div>

                                    }
                                    
                                {info && info.postedBy && info.postedBy.firstName && <h5 style={{ marginTop: "10px" }}>{info.postedBy.firstName} <span>{moment(info && info.answerList && info.answerList.createdDate).format('LL')}</span></h5>}
                                
                              
                                {info.answerList && <LikeQues answerId={info && info.answerList && info.answerList.answerId} likes={info && info.answerList && info.answerList.likes} unLike={info && info.answerList && info.answerList.dislikes} userLike={info && info.answerList && info.answerList.likeType} setShowReportModal={setShowReportModal} setAnsId={setAnsId} setAbuseReason={setAbuseReason} />}


                            </div>
                        </div>

                    )
                })}</> : <div className=" "><p>{t('products.NoQuestionFound')}</p></div>}


          
{questionInfo.length >=3?
            <div className="view-all-questions">
                <Link href={{ pathname: "/product/productquestion", query: {  productId: product.productId, name: product.name, price: product.price,productSlug:product.productSlug    } }}>
                    <a>{t('checkouts.ViewAll')}</a>
                </Link>
            </div>
            :""}
           
        </div>


        <Modal
                visible={postYourAnswer}
              //   onAfterOpen={afterOpenModal}
                onCancel={e=>closeModal(e)}
                width={1024}
                footer={null}
                // style={customStyless}
                // contentLabel="Example Modal"
              >
                  {}
                  <div className="custom-qa-question">
                      <h2>{listQues}
                          {/* <button className="exit-qa-button"  onClick={e=>closeModal(e)}>x</button> */}

                      </h2>
                      <div className="qna-ques-content">
                          <div className="qna-ques-content-container mt-3">
                            {/* <p style={{marginLeft:"20px",color: "gray"}}>Post your answer</p> */}
                              
                              <textarea  placeholder='Post Your Answer' value={question}  onChange={e=>{setQuestion(e.target.value);setQuestionError("")}}/>
                              {questionError!==""&&<div className="error-ques-qna">{questionError}</div>}

                          </div>

                      </div>
                      <div className="qna-ques-submit">
                          <button style={{color:"white", background:"#FB641B"}}  onClick={e=>submitQuestion()}>{t('products.Submit')}</button>
                          <button style={{color:"#FB641B",border:" 1px solid #FB641B",marginRight:"300px"}} onClick={e=>closeModal(e)}>{t('products.Cancel')}</button>

                      </div>

                  </div>
                 
              </Modal>
        </>
    )



}

export default QuestionandAnswer 
