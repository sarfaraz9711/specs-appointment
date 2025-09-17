import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Newsletters from "../../components/partials/commons/Newletters";
import FooterDefault from "../../components/shared/footers/FooterDefault";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import BreadCrumb from "../../components/elements/BreadCrumb";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import ThemeChanger from "../../components/elements/color/themeControl";
import { getBlogListApi } from "../../api/blogs/blogList";
import Link from "next/link";
import moment from "moment";

//import HomeBanner from "../../components/partials/homepage/home-default/HomeBanner";
import DisplayImageWithS3PreSignedUrl from "../../components/elements/AwsS3PreSignedUrl";
import ReactHtmlParser from "react-html-parser";
import Router from "next/router";

function Blog() {
  const [getBlogList, setBlogList] = useState([]);
  // const [showText, setshowText] = useState("");

  // let banner = useSelector(s => s.wishlist.banners);

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
    getBlogListApi(setBlogList);
  }, []);
  let footwear =
    getBlogList?.footwear != undefined ? getBlogList?.footwear : [];
    let footwearCount =
    getBlogList?.footwearCount != undefined ? getBlogList?.footwearCount : 0;
  let garments =
    getBlogList?.garments != undefined ? getBlogList?.garments : [];
    let garmentsCount =
    getBlogList?.garmentsCount != undefined ? getBlogList?.garmentsCount : 0;
  let accessories =
    getBlogList?.accessories != undefined ? getBlogList?.accessories : [];
    let accessoriesCount =
    getBlogList?.accessoriesCount != undefined ? getBlogList?.accessoriesCount : 0;
  function viewAll(category) {
    //console.log("category>>>", category);
    Router.push(`/blogs/category-blog-list?name=${category}`);
  }

  return (
    <div className="site-content">
      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <ThemeChanger />
      <div className="container-fluid mainBg">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <img src={"/static/img/red-chiefblog-banner.png"} className="blogbanner"alt='whatsapp'/>
        {/* <HomeBanner data={banner} /> */}

        <div>
          <div>
          {footwear.length>0 ?
            <div className="d-flex justify-content-between m-2">
            <h5 style={{ padding: "10px" }}>FOOTWEAR</h5>
            {footwearCount>4 &&
            <div
              class="view d-flex justify-content-end mt-3"
              onClick={() => viewAll(getBlogList?.footwear[0]?.category_name)}
            >
             
              View All

            </div>
}
            </div>
            :''
          }
            <div class="ps-shopping-product">
              <div class="row">
                {footwear.map((blog) => (
                  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-xs-6 mb-3">
                    <Link href={`/blogs/blog-detail?id=${blog.id}`}>
                      <div
                        class="card blogcard"
                      >
                        <DisplayImageWithS3PreSignedUrl
                          imageKey={blog?.image}
                          resizeRequired="NO"
                          alt=""
                        />
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#9B9C98",
                            padding: "10px",
                          }}
                        >
                          {moment(blog?.created_date).format("MMMM D, YYYY")}
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            color: "#000",
                            marginTop: "5px",
                          }}
                        >
                          <h5>{blog.title}</h5>
                        </div>
                        <div style={{ color: "#9B9C98" }} className="descptiondata linkdesign">
                          {ReactHtmlParser(blog.description?.substring(0, 133))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {garments.length>0 ?
            <div className="d-flex justify-content-between m-2">
            <h5 style={{ padding: "10px" }}>GARMENTS</h5>
            {garmentsCount>4 &&
            <div
              class="view d-flex justify-content-end mt-3"
              onClick={() => viewAll(getBlogList?.garments[0]?.category_name)}
            >
              View All
            </div>
}
            </div>
            :''}
            <div class="ps-shopping-product">
              <div class="row">
                {garments.map((blog) => (
                  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-xs-6 mb-3">
                    <Link href={`/blogs/blog-detail?id=${blog.id}`}>
                      <div
                        className="card blogcard"
                      >
                        <DisplayImageWithS3PreSignedUrl
                          imageKey={blog?.image}
                          resizeRequired="NO"
                          alt=""
                        />
                          <div style={{ fontSize: "12px", color: "#9B9C98",padding: "10px" }}>
                            {moment(blog?.created_date).format("MMMM D, YYYY")}
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "18px",
                                color: "#000",
                                marginTop: "5px",
                              }}
                            >
                              {" "}
                              <h5>{blog.title}</h5>
                            </div>
                            <div style={{ color: "#9B9C98" }} className="descptiondata linkdesign">
                              {ReactHtmlParser(
                                blog.description?.substring(0, 133)
                              )}
                            </div>
                          </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {accessories.length>0 ?
            <div className="d-flex justify-content-between m-2">
            <h5 style={{ padding: "10px" }}>ACCESSORIES</h5>
            {accessoriesCount>4 &&
            <div
              class="view d-flex justify-content-end mt-3"
              onClick={() =>
                viewAll(getBlogList?.accessories[0]?.category_name)
              }
            >
              View All
            </div>
}
            </div>
            :''}
            <div class="ps-shopping-product">
              <div class="row">
                {accessories.map((blog) => (
                  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-xs-6 mb-3">
                    <Link href={`/blogs/blog-detail?id=${blog.id}`}>
                      <div
                        className="card blogcard"
                      >
                        <DisplayImageWithS3PreSignedUrl
                          imageKey={blog?.image}
                          resizeRequired="NO"
                          alt=""
                        />
                          <div style={{ fontSize: "12px", color: "#9B9C98",padding: "10px" }}>
                            <div>
                              {moment(blog?.created_date).format(
                                "MMMM D, YYYY"
                              )}
                            </div>
                          </div>
                          <div>
                            <h5>{blog.title}</h5>
                          </div>
                          <p className="mt-3 descptiondata linkdesign">
                            {ReactHtmlParser(
                              blog.description?.substring(0, 133)
                            )}
                          </p>
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
