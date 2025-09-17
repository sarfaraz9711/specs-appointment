import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FooterDefault from '../../components/shared/footers/FooterDefault';
import ReactPlayer from 'react-player';
import { videoUrl } from '../../api/url';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import Link from 'next/link';
import HomeBanner from "../../components/partials/homepage/home-default/HomeBanner";
import { FurofeaturedApi, imageUrl, furoHomeBannerApi, frontPageOfferAll, getFuroProductNewArrival, getTopSellingFuroProduct } from "../../api";
import DisplayImageWithS3PreSignedUrl from "../../components/elements/AwsS3PreSignedUrl";
import { getProductVariants } from "../../api/filter/getVariants";
import { Tabs } from "antd";
import Slider from "react-slick";
import NextArrow from "../../components/elements/carousel/NextArrow";
import PrevArrow from "../../components/elements/carousel/PrevArrow";
import Product from "../../components/elements/products/Product";
const { TabPane } = Tabs;
const FuroHomePage = () => {
    const [status, setStatus] = useState("")
    const [getBanner, setBanner] = useState([])
    const [getBanner2, setBanner2] = useState({})
    const [getBanner3, setBanner3] = useState({})
    const [getFuroMen, setFuroMen] = useState([])
    const [getVideo, setVideo] = useState({})
    const [getFuroWomen, setFuroWomen] = useState([])
    const [getLeftImage, setLeftImage] = useState({})
    const [getRightImage, setRightImage] = useState({})
    const [getSubCategory, setSubCategory] = useState([])
    const [getMobileCategory, setMobileCategory] = useState([])
    const [sellingData, setSellingData]= useState("")
    const [newArrivaldata, setnewArrivaldata] = useState("")
    const [getActionValue, setActionValue] = useState({})
    const [sendActionValue, sendAction] = useState({})
    const [offset, setOffset] = useState(0)
    const carouselSetting1 = {
        dots: false,
        infinite: true,
        speed:500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <NextArrow setActionValue={setActionValue} sendActionValue={sendActionValue} />,
        prevArrow: <PrevArrow />,
        autoplay: false,
        autoplaySpeed: 1000,
        responsive: [
          {
            breakpoint: 1920,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                arrows: true,
    
            },
        },
    
          {
              breakpoint: 1366,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  infinite: false,
                  arrows: true,
    
              },
          },
          {
              breakpoint: 767,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: false,
                  arrows: true,
    
    
              },
          },
          {
              breakpoint: 578,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: false,
                  arrows: true,
              },
          },
          
      ],
      };
      
    let allCategories = useSelector(c => c.product.categories)
    let featured = useSelector(s => s.collection.collection)
    const dispatch = useDispatch();
    const getFuroBanner = async () => {
        let banner
        if (localStorage.getItem("bannerListFuro")) {
            banner = await furoHomeBannerApi(1);
        } else {
            banner = await furoHomeBannerApi(1);
        }
        setBanner(banner)
    }
    const tabChangeScroll = (current) => {
        setStatus(current);
        if(current=="newArriavals"){
          updateNewArrivals()
        }
        if(current=="topTrending"){
            FurofeaturedApi(dispatch);
        }
      };
      let arrivalcategory = ""
      allCategories.forEach((element) => {
        if ((element.name).toUpperCase() == "NEW ARRIVALS") {
          arrivalcategory = element.categoryId
        }
      });
      const updateNewArrivals = async ()=>{
        const result1 = await getFuroProductNewArrival(arrivalcategory, offset)
        if (result1 && result1.status == 1) {
          setnewArrivaldata(result1.data)
          }
      }

    const frontPageOfferFuro = async () => {
        let result
        // if(!localStorage.getItem("frontImagesDataFuro")){
        //   result = await frontPageOfferAll('furo')
        //   localStorage.setItem("frontImagesData",JSON.stringify(result))
        // }else{
        //   result = JSON.parse(localStorage.getItem("frontImagesDataFuro"))
        // }
        result = await frontPageOfferAll('furo')
        console.log("resultresult", result)
        result.forEach(element => {
            if (element.banner2) {
                setBanner2(element.banner2)
            }
            if (element.banner3) {
                setBanner3(element.banner3)
            }
            if (element.furoMen) {
                setFuroMen(element.furoMen)
            }
            if (element.video) {
                setVideo(element.video)
            }
            if (element.furoWomen) {
                setFuroWomen(element.furoWomen)
            }
            if (element.left) {
                setLeftImage(element.left)
            }
            if (element.right) {
                setRightImage(element.right)
            }
            if (element.subCategory) {
                setSubCategory(element.subCategory)
            }
            if (element.category) {
                setMobileCategory(element.category)
            }
        });
    }

    const getVariant = (categoryName) => {
        console.log("categoryNamecategoryNamecategoryName",categoryName)
        getProductVariants(dispatch, `RC Sports ${categoryName}`)
        sessionStorage.setItem("parentCategorySlug", "rc-sports");
       sessionStorage.setItem("selectedMenuItem", "RC Sports");
       sessionStorage.setItem("selectedchildCategory",categoryName);
      }
    useEffect(() => {
        getFuroBanner()
        frontPageOfferFuro()
        getTopSellingFuroProduct(setSellingData)
    }, [])

    return (
        <div className="site-content furo-home-page">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className='container-fluid mainCategory'>
                <div className='row margin-row'>
                    {getMobileCategory.length > 0 && getMobileCategory.map(item => {
                        return <div className='col-3 col-padding'>
                            <Link href={item.link}>
                                <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                    <DisplayImageWithS3PreSignedUrl styleClass="categoryimage" imageKey={item.imagePath} resizeRequired="NO" />
                                    <span>{item.showOn}</span>
                                </a>
                            </Link>
                        </div>
                    })
                    }
                </div>
            </div>
            <div className='container-fluid p-0'>
                <div className='row margin-row  mb-4'>
                    <div className='col-md-12 col-padding'>
                        <div className='home-banner'>
                            <HomeBanner data={getBanner} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row margin-row  mb-4'>
                    <div className='col-md-12 col-padding'>
                        <div className='men-banner'>
                            {getBanner2.link && <Link href={getBanner2.link}>
                            <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                <DisplayImageWithS3PreSignedUrl imageKey={getBanner2.imagePath} resizeRequired="NO" />
                                </a>
                            </Link>}
                        </div>
                    </div>
                </div>
                <div className='row margin-row '>
                    {getFuroMen.length > 0 && getFuroMen.map(item => {
                        return <div className='col-md-4 col-4 mb-4 col-padding'>
                            <div className='men-category footwear'>
                                {item.link && <Link href={item.link}>
                                <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                    <DisplayImageWithS3PreSignedUrl imageKey={item.imagePath} resizeRequired="NO" />
                                    </a>
                                </Link>}
                            </div>
                        </div>
                    })}
                </div>

                {getVideo.imagePath && <div className='row margin-row  mb-4'>
                    <div className='col-md-12 col-padding'>
                        <div className='furo-video'>
                        <ReactPlayer url={`${videoUrl}/video/${getVideo.imagePath}`} playing={true} muted={true} controls={true} autoplay loop/>
                        </div>
                    </div>
                </div>}
                <div className='row margin-row  mb-4'>
                    <div className='col-md-12 col-padding'>
                        <div className='women-banner'>
                            {getBanner3.link && <Link href={getBanner3.link}>
                            <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                <DisplayImageWithS3PreSignedUrl imageKey={getBanner3.imagePath} resizeRequired="NO" />
                                </a>
                            </Link>}
                        </div>
                    </div>
                </div>
                <div className='row margin-row '>
                    {getFuroWomen.length > 0 && getFuroWomen.map(item => {
                        return <div className='col-md-4 col-4 mb-4 col-padding'>
                            <div className='women-category footwear'>
                                {item.link && <Link href={item.link}>
                                <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                    <DisplayImageWithS3PreSignedUrl imageKey={item.imagePath} resizeRequired="NO" />
                                    </a>
                                </Link>}
                            </div>
                        </div>
                    })}
                </div>
                <div className='row margin-row '>
                    <div className='col-md-12 col-12 mb-4 col-padding'>
                        <div className='offer-image left'>
                            {getLeftImage.link && <Link href={getLeftImage.link}>
                            <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                <DisplayImageWithS3PreSignedUrl imageKey={getLeftImage.imagePath} resizeRequired="NO" />
                                </a>
                            </Link>}
                        </div>
                    </div>
                </div>
                <div className='row margin-row '>
                    {getSubCategory.length > 0 && getSubCategory.map(item => {
                        return <div className='col-md-3 col-6 mb-4 col-padding'>
                            <div className='furo-categories'>
                                {item.link && <Link href={item.link}>
                                <a onClick={e => getVariant((item.showOn).toUpperCase())}>
                                    <DisplayImageWithS3PreSignedUrl imageKey={item.imagePath} resizeRequired="NO" />
                                    </a>
                                </Link>}
                            </div>
                        </div>
                    })
                    }
                </div>
        <div className="Homepageproducts">
        <Tabs
          defaultActiveKey={status}
          onTabClick={(e) => tabChangeScroll(e)} className="homepagetabs">
          <TabPane
            tab="Best Selling"
            key="bestSelling"
            children={
              <div className="">

                {(sellingData.length > 0) ? <><Slider {...carouselSetting1} className="ps-carousel">{sellingData.map((item,i) => {
                  return <>
                    <div key={i}>
                    <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
                </div>
                  </>
                })}</Slider></> : <p className="not-found">No Product Found</p>}

            </div>
            }
            ></TabPane>
          <TabPane
            tab="New Arrivals"
            key="newArriavals"
            children={
              <div className="">

                {(newArrivaldata.length > 0) ? <><Slider {...carouselSetting1} className="ps-carousel">{newArrivaldata.map((item,i) => {
                  return <>
                  <div key={i}>
                    <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
                    </div>
                  </>
                })}</Slider></> : <p className="not-found">No Product Found</p>}

            </div>
            }
          ></TabPane>
           <TabPane
            tab="Top Trending"
            key="topTrending"
            children={
              <div className="">
             {(featured.length > 0) ? <><Slider {...carouselSetting1} className="ps-carousel">
             {featured.map((item, i) => {
            return (
                <div key={i}>
                    <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
                </div>
            );
        })}
        </Slider></> : <p className="not-found">No Product Found</p>}
        </div>

            }
            ></TabPane>
                </Tabs>
        </div>
        </div>
            <FooterDefault />
        </div>
    );
};

export default FuroHomePage;
