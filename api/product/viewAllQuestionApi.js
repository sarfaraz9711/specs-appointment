
import APIServices from '../../services'
export async function ViewAllQuestionApi(setQuestionInfo,productId,limit,keyword,setOrderLoader) {

    // fetch(apiUrl + '/list/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0', {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         if(json.data){
            
               
    //             setQuestionInfo(json.data)
    //             // setLoader(true)
    //         }
    //     })

    // const result = await APIServices.getAll('list/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0')
    // if(result && result.data && result.data.data){
    //     setQuestionInfo(result.data.data)
    //              // setLoader(true)
    // }

    const result = await APIServices.getAll('store-question-answer/question-list?productId='+productId+'&limit='+limit+'&offset=0&keyword='+keyword+'&count=0')
    if(result && result.data && result.data.data){
        setQuestionInfo(result.data.data)
                 // setLoader(true)
                 setOrderLoader(false)
    }
    
}