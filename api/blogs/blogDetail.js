import { getPostsDetail } from "../../store/post/action";
import APIServices from '../../services'

export async function blogDetailApi(blogSlug,dispatch,setPostLoading) {

   
    const result = await APIServices.get('list/blog/blog-detail',blogSlug)

  
        if(result && result.data&&result.data.data){
            dispatch(getPostsDetail(result.data.data))
            setPostLoading(false)
           
        }
}