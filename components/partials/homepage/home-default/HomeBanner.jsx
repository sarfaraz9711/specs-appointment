import React, { Component } from "react";

import Slider from "react-slick";
import NextArrow from "../../../elements/carousel/NextArrow";
import PrevArrow from "../../../elements/carousel/PrevArrow";
import Link from "next/link";
import { imageUrl } from "../../../../api/url";
import Router from "next/router";
import { hitVisitor } from "../../../../api";
import DisplayImageWithS3PreSignedUrl from "../../../elements/AwsS3PreSignedUrl";

function HomeBanner(data) {
  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const clickForCounter = async (url, bannerId) => {
    let _js = {
      "visitorType": "banner",
      "userId": null,
      "bannerId": bannerId
    }
    await hitVisitor(_js);
    Router.push(url);
  }








  return (
    <div className="ps-home-banner ps-home-banner--1">
      <div className="ps-container">
        <div className="ps-section__left">
          <Slider {...carouselSetting} className="ps-carousel">
            {data.data.length>0 && data.data.map((product) => (
              
              <div className="ps-banner" key={product.bannerId}>
                <a onClick={(e) => clickForCounter(product.link, product.bannerId)} href="javascript:void(0);" title={product.title}>
                  <div className="home-banner-custom-img-contain">
                    {/* <img
                      src={
                        imageUrl +
                        "?path=" +
                        product.imagePath +
                        "&name=" +
                        product.image +
                        "&width=1366&height=506"
                      }
                      // "/static/img/slider/home-1/slide-1.jpg"
                      alt="martfury"
                    // height="400px"
                    // width= "802px"
                    // style={{height:"400px",width:"802px"}}
                    ></img> */}
                    <DisplayImageWithS3PreSignedUrl imageKey={product.imagePath+product.image} resizeRequired="NO" />
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
        {/* <div className="ps-section__right">
                        <Link href={{ pathname: '/shop', query: { name: 'leangchhean' }}}>
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-1.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                        <Link href="/shop">
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-2.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                    </div> */}
      </div>
    </div>
  );
}

export default HomeBanner;