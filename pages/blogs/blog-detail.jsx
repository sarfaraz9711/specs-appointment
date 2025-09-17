import React, { useEffect, useState } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import ThemeChanger from "../../components/elements/color/themeControl";
import BreadCrumb from "../../components/elements/BreadCrumb";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import { addNewComment, getAllComments, getBlogDetailById, getRecentBlog } from "../../api";
import moment from "moment";
import ReactHtmlParser from 'react-html-parser';
import DisplayImageWithS3PreSignedUrl from "../../components/elements/AwsS3PreSignedUrl";
import { useRouter } from 'next/router';
import Link from "next/link";


function Blog() {
    const [blogDetail, setBlogDetail] = useState("")
    const [comments, setcomments] = useState([])
    const [addComment, setAddComment] = useState("")
    const [addCommmentError, setAddCommentError] = useState("")
    const [submit, setSubmit] = useState(0)
    const [recentBlogs, setRecentBlogs] = useState([])
    const router = useRouter();
    const { id } = router.query;
    
    useEffect(() => {
        getBlogDetailById(id, setBlogDetail);
        getAllComments(id, setcomments)
        getRecentBlog(setRecentBlogs)
    }, [id]);

    const breadCrumb = [
        {
            text: "Home",
            url: "/",
        },
        {
            text: "Blog",
            url: "/"
        },
        {
            text: "Blog Details",
        },
    ];

    const validate = () => {
        let validateObj = { commnetsub: true }
        if (addComment === "") {
            setAddCommentError("Address is required")
            validateObj.commnetsub = false;
        } else {
            setAddCommentError("")
            validateObj.commnetsub = true;
        }
        if (validateObj.commnetsub) {
            return true;
        } else {
            return false;
        }
    }

    const handleChange = () => {
        console.log(addComment.length, "length")
        setSubmit(1);
        if (addComment.length <= 200) {
            if (validate()) {
                addNewComment(id, addComment, setAddComment)
            }
        } else {
            setAddCommentError("Comments only 200 character allowed")
        }
    }

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="mainBg">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <DisplayImageWithS3PreSignedUrl
                    imageKey={blogDetail?.banner_image}
                    resizeRequired="NO"
                    alt='Blog Banners'
                    style={{height:"70vh", width:"100%"}}
                />
                <div>
                    <div className="bgWhite mt-5">
                        <div>
                            <h3 className="text-capitalize">{blogDetail?.title}</h3>
                            <span> <i class="fa fa-calendar mr-2" aria-hidden="true"></i>
                                {moment(blogDetail?.createdDate).format("MMMM D, YYYY")}</span>
                            <p className="mt-3 linkdesign">{ReactHtmlParser(blogDetail?.description)}<br />
                            </p>

                        </div>
                        <div className="commentSection">
                            {comments && comments.map(data => {
                                return <div className="commentsectionData">
                                    <div className="d-flex">
                                        <div>
                                            <img src={"/static/img/user.jpg"} className="userImage" />
                                        </div>
                                        <div className="commentsData">
                                            <p>{data.comment}</p>
                                            <p> {moment(data.createdDate).format("MMMM D, YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            })}

                            <div className="addComment">
                                <div>
                                    <textarea placeholder="Write Comment" value={addComment} onChange={e => { setAddComment(e.target.value) }}
                                        style={{ border: submit === 1 && addCommmentError !== "" && "1px solid red" }} />
                                    {submit === 1 && addCommmentError !== "" && (
                                        <span className="error-span">{addCommmentError}</span>
                                    )}
                                </div>
                                <button onClick={() => { handleChange() }}>Comment</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="mt-4 ml-4"> MORE BLOGS</h2>
                        <div className="moreBlogSection ps-shopping-product">
                            <div class="row ">
                                {recentBlogs && recentBlogs.map((blog) => (
                                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-xs-6 mb-3" >
                                                                        <Link href={`/blogs/blog-detail?id=${blog.id}`}>
                                                                            <div class="card blogcard">

                                        <DisplayImageWithS3PreSignedUrl
                                            imageKey={blog?.image}
                                            resizeRequired="NO"
                                            alt=''
                                        />
                                      <div className="blogDescription">
                                        <p> {moment(blog.createdDate).format("MMMM D, YYYY")}</p>
                                        <h5 className="text-capitalize">{blog.title}</h5>
                                        <p className="descptiondata linkdesign">{ReactHtmlParser(blog.description?.substring(0, 133))}</p>
                                        </div>
                                        </div>
                                        </Link>

                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterFullwidth />
        </div>
    );
}
export default Blog;