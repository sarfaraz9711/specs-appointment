import APIServices from "../../services";
import { modalSuccess } from "../intercept";

export async function blogListApi(setPost) {
  // fetch(apiUrl + '/list/blog/blog-list?limit=10&offset=0&keyword=&count=', {
  //     method: 'GET',
  // })

  // .then(json => {
  //     if(json.data){
  //         setBLogList(json.data)
  //     }
  // })

  const result = await APIServices.getAll(
    "list/blog/blog-list?limit=10&offset=0&keyword=&count=0"
  );

  if (result && result.data && result.data.data) {
    setPost(result.data.data);
  }
}

export async function getBlogListApi(setBlogList) {
  const result = await APIServices.get("blog/all-store-blog");
  console.log("data-blog-list>>>", result);
  if (result && result.data) {
    const data = result.data.data;
    console.log("ff>>>", data);
    setBlogList(data);
  }
}

export async function getBlogDetailById(id, setBlogDetail){
  const result = await APIServices.get("blog/get-blog-by-id?id="+id)
  if(result && result.data){
    setBlogDetail(result.data.data)
  }
}

export async function getAllComments(id, setcomments){
  const result = await APIServices.get(`blog/get-comment-by-blog-id?blogId=`+id)
  if(result && result.data){
    setcomments(result.data.data)
  }
}

export async function addNewComment(id, comment,setAddComment){
  const data = JSON?.stringify({
    comment:comment,
    blog_id:id
})

  const result = await APIServices.create("blog/add-new-comment",data)
  if(result && result.data){
    console.log("result", result.data.status)

    if(result.data.status == 1){
      modalSuccess('success',"Comment Save Successfully, wait for Approval from Admin")
      setAddComment("")
    }
  }
}

export async function getCategoryBlog(name, setCategoryBlogData){
  const result = await APIServices.get(`blog/all-blog?limit=12&category=${name}`)
  if(result && result.data){
    setCategoryBlogData(result.data.data)
  }
}

export async function getRecentBlog(setRecentBlogs){
  const result = await APIServices.get("blog/get-latest-blog")
  if(result && result.data){
    setRecentBlogs(result.data.data.latestBlog)
  }
}

