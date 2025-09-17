

import APIServices from '../../services'
import { modalSuccess, modalWarning } from "../../api/intercept";
import {apiUrl} from '../../api/url'
export async function questionsandAnswerApi(productId,setQuestionInfo,keyword,limit) {

    const result = await APIServices.getAll('list/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0')

   
    if(result && result.data && result.data.data){
       
        setQuestionInfo(result.data.data)
    }
}

export async function AnswerListAPi(productId,setAnserList,keyword,limit) {

  const result = await APIServices.getAll('list/answer-list?questionId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0')

 
  if(result && result.data && result.data.data){
    setAnserList(result.data.data)
  }
}

export async function postQuestionandAnswerPopApi(
  productId,
  question,
  setShowModal,
  setQuestionError,
  setQuestion
) {
 

  const data = JSON.stringify({
    productId: productId,
    question: question,
  });

  const result = await APIServices.create(
    "store-question-answer/add-question",
    data
  );

 
  if(result && result.data && result.data.status ==1){

      setShowModal(false)
                      modalSuccess('success',result.data.message)
                      setQuestionError("")
                      setQuestion("")
  }else{
      modalWarning('error',result.data.message)
  }
}




export async function abuseReportQuestionApi(remark,answerId,reasonId,setShowModal,setRemark,setReasonId) {
   

    const data =  JSON.stringify({
                remark:remark,
                answerId:answerId,
                reasonId:reasonId  
            })

    const result =  await APIServices.create('store-question-answer/add-report-abuse',data)


    if(result && result.data){
        if (result.data.status===1) {                
                        setShowModal(false)
                        modalSuccess('success',result.data.message)
                        setRemark("")
                        setReasonId("")
                    }
                    else{
                        modalWarning('error',data.message)
                    }
    }
}




export async function postAnswerPopApi(
  productId,
  question,
  setPostYourAns,setQuestionError,setQuestion
  
) {
 

  const data = JSON.stringify({
    answer:question  ,
    questionId: productId,
  });

  const result = await APIServices.create(
    "store-question-answer/add-answer",
    data
  );

 
  if(result && result.data && result.data.status ==1){

    setPostYourAns(false)
                      modalSuccess('success',result.data.message)
                      setQuestionError("")
                      setQuestion('')
                    
  }else{
      modalWarning('error',result.data.message)
  }
}
