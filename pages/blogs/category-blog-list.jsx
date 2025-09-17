import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import BreadCrumb from "../../components/elements/BreadCrumb";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import ThemeChanger from "../../components/elements/color/themeControl";
import { getCategoryBlog } from "../../api/blogs/blogList";
import DisplayImageWithS3PreSignedUrl from '../../components/elements/AwsS3PreSignedUrl';
import moment from "moment";
import ReactHtmlParser from 'react-html-parser';
import Link from "next/link";
import { useRouter } from 'next/router';

function CategoryBlog() {
    const [categoryBlogData, setCategoryBlogData] = useState([]);
    const router = useRouter();
    const { name } = router.query;

    const breadCrumb = [
        {
            text: "Home",
            url: "/",
        },
        {
            text: "Blog",
        },
    ];
    useEffect(() => {
        getCategoryBlog(name,setCategoryBlogData);
    }, []);

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="mainBg">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <img src={"/static/img/red-chiefblog-banner.png"} className="blogbanner"  alt='whatsapp'/>
                <div>
                    <h5 className="text-capitalize ml-4 mt-5">{name}</h5>
                    <div class="">
                        <div className="ps-shopping-product">
                    <div class="row ">
                        {categoryBlogData && categoryBlogData.map((blog) => (
                            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-xs-6 mb-5 ">
                                <Link href={`/blogs/blog-detail?id=${blog.id}`}>
                                    <div class="card blogcard">
                                    <DisplayImageWithS3PreSignedUrl
                                        imageKey={blog?.image}
                                        resizeRequired="NO"
                                        alt=''
                                    />
                                    <div className="blogDescription">
                                    <p> {moment(blog.createdDate).format("MMMM D, YYYY")}</p>
                                    <h5 className="text-capitalize ">{blog.title}</h5>
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
export default CategoryBlog;
