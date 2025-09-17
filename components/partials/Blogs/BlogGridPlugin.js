import React, { useState, useEffect } from "react";
import { connect } from "react-redux";


import Link from "next/link";
import moment from "moment";
import Head from "next/head";

import { blogListApi } from "../../../api";
import { useTranslation } from "../../../i18n";
import { imageUrl } from "../../../api/url";
// import { blogListApi } from "./bloglistApi";
function BlogGridplugin() {
  const [postLoading, setPostLoading] = useState(true);
  const [temp, setTemp] = useState("");
  const [resulttemp, setresulttemp] = useState("");
  const { t } = useTranslation("common");
  const [post, setPost] = useState([])

  useEffect(() => {
    blogListApi(setPost)

  }, [])

  useEffect(() => {
    if (post.length !== 0) {
      let htmlString = post && post.featuredPost.description;
      let plainString = htmlString.replace(/<[^>]+>/g, "");
      setTemp(plainString);

    }
  }, [post]);

  return (
    <div className="site-content">
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="ps-page--blog">
        <div className="blog-wrapper">
          <div className="blog-banner">

            <img src="/static/img/blog-banner.jpg" alt="" />
          </div>
          <div className="blog-container">
            {post.length !== 0 ? (
              <div className="blog-featured-card">

                <h3>{t("Blogs.Featured")}</h3>
                <div className="bfc-row flex">
                  <div className="bfc-img">
                    <img
                      src={`${imageUrl}?path=${post.featuredPost.imagePath}&name=${post.featuredPost.image}&width=200&height=200`}
                      alt="martfury"
                    />
                  </div>
                  <div className="bfc-content">
                    <h5>
                      {moment(post.featuredPost.createdDate).format(
                        "DD MMM, YYYY"
                      )}
                      {/* <DateRev dateCarry={post && post.featuredPost.createdDate} /> */}
                    </h5>

                    <h4> {post.featuredPost.title}</h4>

                    <p>
                      {/* {temp} */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.featuredPost.description
                            .replaceAll("&amp;", "&")
                            .replaceAll("&lt;", "<")
                            .replaceAll("&gt;", ">")
                            .replaceAll("&quot;", '"')
                            .replaceAll("&#39;", "'")
                            .replaceAll("&sbquo;", "‚")
                            .replaceAll("&#61;", "=")
                            .replaceAll("&#45;", "-")
                            .replaceAll("&hellip;", "…")
                            .replaceAll("&commat;", "@")
                            .replaceAll("&copy;", "©")
                            .replaceAll("&#35;", "#")
                            .replaceAll("&ldquo;", "“")
                            .replaceAll("&rsquo;", "’")
                            .replaceAll("&lsquo;", "‘")
                            .replaceAll("&trade;", "™")
                            .replaceAll("&reg;", "®")
                            .replaceAll("&ndash;", "–")
                            .replaceAll("&eacute;", "é")
                            .replaceAll("&euro;", "€")
                            .replaceAll("&pound;", "£"),
                        }}
                      ></div>
                      {/* <div dangerouslySetInnerHTML={{ __html: temp }}></div> */}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="ps-page--blog">
              <div className="blog-wrapper">
                <div className="blog-recent-post">
                 

{post.length !== 0 ? (
                    <>
                      {post.results.map((posted) => {
                        return (
                          <>
                           

                            {/* <PostGrid data={posted} type={"blog"} setPostLoading={setPostLoading} /> */}
                            {/* </Link> */}

                            <div className="brp-row">
                              <div className="brp-col" key={posted.id}>
                                <Link
                                  href="/post/[pid]"
                                  as={`/post/${posted.blogSlug}`}
                                >
                                  <a onClick={(e) => setPostLoading(true)}>
                                    <img
                                      src={
                                        imageUrl +
                                        "?path=" +
                                        posted.imagePath +
                                        "&name=" +
                                        posted.image +
                                        "&width=200&height=200"
                                      }
                                      alt="martfury"
                                    />
                                    <div className="brp-content">
                                      <h4>{posted.title}</h4>
                                      <p>
                                        
                                        {/* <div
                                          dangerouslySetInnerHTML={{
                                            __html: posted.description
                                              .replaceAll("&amp;", "&")
                                              .replaceAll("&lt;", "<")
                                              .replaceAll("&gt;", ">")
                                              .replaceAll("&quot;", '"')
                                              .replaceAll("&#39;", "'")
                                              .replaceAll("&sbquo;", "‚")
                                              .replaceAll("&#61;", "=")
                                              .replaceAll("&#45;", "-")
                                              .replaceAll("&hellip;", "…")
                                              .replaceAll("&commat;", "@")
                                              .replaceAll("&copy;", "©")
                                              .replaceAll("&#35;", "#")
                                              .replaceAll("&ldquo;", "“")
                                              .replaceAll("&rsquo;", "’")
                                              .replaceAll("&lsquo;", "‘")
                                              .replaceAll("&trade;", "™")
                                              .replaceAll("&reg;", "®")
                                              .replaceAll("&ndash;", "–")
                                              .replaceAll("&eacute;", "é")
                                              .replaceAll("&euro;", "€")
                                              .replaceAll("&pound;", "£")
                                              .replace(/<[^>]+>/g, "")
                                          }}
                                        ></div> */}
                                      </p>
                                    </div>
                                    <div className="brb-footer flex">
                                      {moment(posted.createdDate).format(
                                        "DD MMM, YYYY"
                                      )}
                                      {/* <DateRev dateCarry={posted && posted.createdDate} /> */}
                                    </div>
                                    <div className="brp-hover-content">
                                      <h4>{posted.title}</h4>
                                      <p>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: posted.description.replaceAll("&amp;", "&")
                                            .replaceAll("&lt;", "<")
                                            .replaceAll("&gt;", ">")
                                            .replaceAll("&quot;", '"')
                                            .replaceAll("&#39;", "'")
                                            .replaceAll("&sbquo;", "‚")
                                            .replaceAll("&#61;", "=")
                                            .replaceAll("&#45;", "-")
                                            .replaceAll("&hellip;", "…")
                                            .replaceAll("&commat;", "@")
                                            .replaceAll("&copy;", "©")
                                            .replaceAll("&#35;", "#")
                                            .replaceAll("&ldquo;", "“")
                                            .replaceAll("&rsquo;", "’")
                                            .replaceAll("&lsquo;", "‘")
                                            .replaceAll("&trade;", "™")
                                            .replaceAll("&reg;", "®")
                                            .replaceAll("&ndash;", "–")
                                            .replaceAll("&eacute;", "é")
                                            .replaceAll("&euro;", "€")
                                            .replaceAll("&pound;", "£")
                                            .replace(/<[^>]+>/g, ""),
                                          }}
                                        ></div>
                                      </p>
                                      <a href="">View more</a>
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            </div>

                            {/* <img src={imageUrl+"?path="+data.imagePath+"&name="+data.image+"&width=200&height=200"} alt="martfury"/> */}
                          </>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return state.post;
// };
// export default connect(mapStateToProps)(BlogGridplugin);

export default BlogGridplugin
