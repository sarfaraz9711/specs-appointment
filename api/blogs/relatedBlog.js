import { getRelatedBlog } from "../../store/post/action";
import APIServices from '../../services'

export async function blogRelatedApi(blogSlug,dispatch) {

    // fetch(apiUrl + '/list/related-blog-list?blogSlug='+blogSlug, {
    //     method: 'GET',
    // })
    // .then(json => {       
    //     if(json.data){
    //         dispatch(getRelatedBlog(json.data))
          
    //     }             
    // })

    const result= await APIServices.getAll('list/related-blog-list?blogSlug='+blogSlug)
    if(result&&result.data&&result.data.data){
        dispatch(getRelatedBlog(result.data.data))
    }
}