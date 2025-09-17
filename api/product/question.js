
import APIServices from '../../services'
export async function questionsApi(productId,setQuestionInfo,keyword,limit) {

   
    // fetch(apiUrl + '/list/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0', {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         if(json.data){
             
    //             setQuesLoader && setQuesLoader(false)
    //             setQuestionInfo(json.data)
    //         }
    //     })


    // const result = await APIServices.getAll('list/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0')
    // if(result && result.data && result.data.data){
    //     setQuesLoader && setQuesLoader(false)
    //     setQuestionInfo(result.data.data)
    // }

    
    const result = await APIServices.getAll('list/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0')

   
    if(result && result.data && result.data.data){
       
        setQuestionInfo(result.data.data)
    }
}