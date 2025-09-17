import { modalSuccess, modalWarning } from "../intercept";
import APIServices from "../../services";
export async function postQuestionPopApi(
  productId,
  question,
  setShowModal,
  setQuestionError,
  setQuestion
) {
  
  // fetch(apiUrl+'/store-question-answer/add-question', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //         "productId": productId,
  //         "question": question
  //     })
  // })
  // .then(json => {
  //     if (json) {
  //         if (json.status===1) {
  //                 setShowModal(false)
  //                 modalSuccess('success',json.message)
  //                 setQuestionError("")
  //                 setQuestion("")
  //             }
  //             else{
  //                 modalWarning('error',json.message)
  //             }
  //         }
  //     })

  const data = JSON.stringify({
    productId: productId,
    question: question,
  });

  const result = await APIServices.create("store-question-answer/add-question",data);

 
  if(result && result.data && result.data.status ==1){

      setShowModal(false)
                      modalSuccess('success',result.data.message)
                      setQuestionError("")
                      setQuestion("")
  }else{
      modalWarning('error',result.data.message)
  }
}
