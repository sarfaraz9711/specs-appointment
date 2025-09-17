import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCollections } from "../store/collection/action";
import { useState, useEffect } from "react";
import { dealOfDayApi, frontPageOfferAll, getTopSellingProduct, getSettingsFlag } from "../api";
import { homeBannerApi } from "../api";
import { featuredApi } from "../api";
import { categoryListApi, getProductByCategory, getOfferImages } from "../api";
import useNetwork from "../components/reusable/NetworkCheck";
import Router from "next/router";
import getPageApi from "../api/home/getPage";
import HeaderDefault from "../components/shared/headers/HeaderDefault";
import HeaderMobile from "../components/shared/headers/HeaderMobile";
import NavigationList from "../components/shared/navigation/NavigationList";
import ThemeChanger from "../components/elements/color/themeControl";
import SubscribePopup from "../components/shared/modal/SubscribePopup";
import HomeBanner from "../components/partials/homepage/home-default/HomeBanner";
import HomeDefaultDealOfDay from "../components/partials/homepage/home-default/HomeDefaultDealOfDay";
import ConumerElectronics from "../components/partials/homepage/home-default/ConumerElectronics";
import FooterFullwidth from "../components/shared/footers/FooterFullwidth";
import { imageUrl } from '../api/url';
import Link from 'next/link';
import { encrptData } from "../utilities/common-helpers";
import NextArrow from "../components/elements/carousel/NextArrow";
import PrevArrow from "../components/elements/carousel/PrevArrow";
import Slider from "react-slick";
import { Rate, Tabs } from "antd";
import getProfileApi from '../api/home/getProfile';
import HomeBanner2 from "../components/partials/homepage/home-default/HomeBanner2";
import { priceHelpFunc } from '../components/helper/priceHelper';
import Product from "../components/elements/products/Product";
import { getProductVariants } from "../api/filter/getVariants";
import DisplayImageWithS3PreSignedUrl from "../components/elements/AwsS3PreSignedUrl";
const { TabPane } = Tabs;


function Index(props) {
  const [subscribe, setSubscribe] = useState(false);
  // const [banner, setBanner] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeIndex1, setActiveIndex1] = useState(0)
  const [wightdata, setDeals] = useState([])
  const [getProductList, setProductList] = useState([])
  const [getProductList1, setProductList1] = useState([])
  const [selectCategoryName, setSelectCategoryName] = useState("")
  const [selectCategoryName1, setSelectCategoryName1] = useState("")
  const [offset, setOffset] = useState(0)
  const [getLeftImage, setLeftImage] = useState({})
  const [getRightImage, setRightImage] = useState({})
  const [hideRightImage, setHideRightImage] = useState(true)
  const [getBrandImage, setBrandImage] = useState([])
  const [homeClass, setHomeClass] = useState("")
  const [getItemLoader, setItemLoader] = useState(true)
  const [getItemLoader1, setItemLoader1] = useState(true)
  const dispatch = useDispatch();
  let deals = useSelector((s) => s.collection);
  let banner = useSelector(s => s.wishlist.banners);
  let featured = useSelector(s => s.collection.collection)
  console.log("dattatattatat", featured)


  let allCategories = useSelector(c => c.product.categories)
  //const todayDeals = useSelector(t=>t.collection.collection)
  const [getActionValue, setActionValue] = useState({})
  const [getActionValue1, setActionValue1] = useState({})
  const [sendActionValue, sendAction] = useState({})
  const [sendActionValue1, sendAction1] = useState({})
  const [banner1, setBanner1] = useState([])
  const [banner2, setBanner2] = useState(false)
  const [banner3, setBanner3] = useState([])
  const [categoriesImage,setCategoriesImage] = useState([])
  const [garmentImage,setGarmentImage] = useState([])
  const [parentcategory, setParentcategory] = useState([])
  const [sellingData, setSellingData]= useState("")
  const [newArrivaldata, setnewArrivaldata] = useState("")
  


  const carouselSetting1 = {
    dots: false,
    infinite: true,
    speed:500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
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

  const carouselSetting2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
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

  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };


  const [footwearActionCount, setFootwearActionCount] = useState(0)
  let catgetoryName = ""
  let catgetoryApparel = ""
  let footwearCategories = []
  let apparelCategories = []
  let arrivalcategory = ""
  allCategories.forEach((element) => {
    if ((element.name).toUpperCase() == "NEW ARRIVALS") {
      arrivalcategory = element.categoryId
    }
  });
  const network = useNetwork();

const updateNewArrivals = async ()=>{
  const result1 = await getProductByCategory(arrivalcategory, offset)
  if (result1 && result1.status == 1) {
    setnewArrivaldata(result1.data)
    }
}
  useEffect(() => {
    if (window.location.pathname == '/') {
      setHomeClass("home-page-container")
    }
    if (network === false) {
      Router.push("/network-error");
    }

    // getProfileApi(dispatch);

    // window.addEventListener("scroll", () => {
    //   if (window.scrollY > 200) {
    //     document.getElementsByClassName("stickyHeader")[0].classList.add("fixedHeader")
    //   } else {
    //     document.getElementsByClassName("stickyHeader")[0].classList.remove("fixedHeader")
    //   }
    // })

  }, []);

  useEffect(() => {
    if (Object.keys(getActionValue).length > 0) {
      selectCategory({ categoryId: getActionValue.categoryId }, activeIndex, getActionValue.key, getActionValue.offset)
    }
  }, [getActionValue])

  useEffect(() => {
    if (Object.keys(getActionValue1).length > 0) {
      selectCategory({ categoryId: getActionValue1.categoryId }, activeIndex1, getActionValue1.key, getActionValue1.offset)
    }
  }, [getActionValue1])


  useEffect(() => {
    if (footwearCategories[0]) {
      selectCategory(footwearCategories[0], 0, 1, 0)
    }
  }, [footwearCategories.length > 0])
  useEffect(() => {
    if (apparelCategories[0]) {
      selectCategory(apparelCategories[0], 0, 2, 0)
    }
  }, [apparelCategories.length > 0])

  useEffect(() => {
    
    //dealOfDayApi(dispatch);
    getTopSellingProduct(setSellingData)
    getOffer()
    const { querys } = props;
    if (querys) {
      const collectionsSlug = [
        "deal_of_the_day",
        "consumer_electronics",
        "clothings",
        "garden_and_kitchen",
        "new_arrivals_products",
      ];
      dispatch(getCollections(collectionsSlug));
    }
  }, []);

  const getOffer = async () => {
    let getLeftOfferImage
    let getRightOfferImage
    // const getBrandImage = await getOfferImages("brand-logo")
    let getBrandImage2
    let getBrandImage3
    let getCategoryImage
    let getGarmentImages
    let getParentcategoryImage

    const getSettings= await getSettingsFlag()
    if(getSettings && getSettings.bannerFlag!=localStorage.getItem("bannerFlag")){
    homeBannerApi(dispatch, 1);
    localStorage.setItem("bannerFlag",getSettings.bannerFlag)
    }else{
      homeBannerApi(dispatch, 2);
    }
    let result
    if(getSettings && getSettings.frontImagesFlag!=localStorage.getItem("frontImagesFlag")){
      result = await frontPageOfferAll('redchief')
      localStorage.setItem("frontImagesFlag",getSettings.frontImagesFlag)
      localStorage.setItem("frontImagesData",JSON.stringify(result))
    }else{
      result = JSON.parse(localStorage.getItem("frontImagesData"))
    }
    if(getSettings && getSettings.categoryFlag!=localStorage.getItem("categoryFlag")){
      categoryListApi(dispatch, 1);
      localStorage.setItem("categoryFlag",getSettings.categoryFlag)
      }else{
        categoryListApi(dispatch, 2);
      }
    

    
result && result.forEach((item) => {
      if(item['right']){
      getRightOfferImage = item['right']
      }
      if(item['left']){
        getLeftOfferImage = item['left']
      }
      if(item['banner2']){
        getBrandImage2 = item['banner2']
      }
      if(item['banner3']){
        getBrandImage3 = item['banner3']
      }
      if(item['category']){
        getParentcategoryImage = item['category']
      }
      if(item['footwear']){
        getCategoryImage = item['footwear']
      }
      if(item['garments']){
        getGarmentImages = item['garments']
      }
      
    }) 


    

    if (getLeftOfferImage) {
      setLeftImage(getLeftOfferImage)
    }
    if (getRightOfferImage) {
      setRightImage(getRightOfferImage)
    }else if(getRightOfferImage){
      setHideRightImage(false)
    }
    // if (getBrandImage?.status == 1) {
    //   localStorage.setItem("getBrandImage",JSON.stringify(getBrandImage.data))
    //   setBrandImage(getBrandImage.data)
    // }
    if (getBrandImage2 )  {
      setBanner1([getBrandImage2])
    }
    if (getBrandImage3 )  {
      setBanner3([getBrandImage3])
    }
    if(getCategoryImage){
      setCategoriesImage(getCategoryImage)
    }
    if(getGarmentImages){
      setGarmentImage(getGarmentImages)
    }
    if(getParentcategoryImage ){
      setParentcategory(getParentcategoryImage)
    }

  }

 
  const selectCategory = async (item, index, key, action) => {
    if (key == 1) {
      setItemLoader(true)
    } else {
      setItemLoader1(true)
    }
    if (action == 0) {
      offset = action
      setFootwearActionCount(action)
    } else {
      setFootwearActionCount(footwearActionCount + (action))
      offset = footwearActionCount + (action)
    }
    if (offset < 0) {
      offset = 0
      setFootwearActionCount(0)
    }


    const result = await getProductByCategory(item.categoryId, offset)
    if (result && result.status == 200) {
      let data = result.data
      data = data.map(item => {
        return Object.assign(item, { productImageUrl: imageUrl + "?path="+item.imagePath+"&name=" + item.productImage + "&width=240&height=300", productRatingList: new Array(item.productRating).fill('rating') })
      })
      if (key == 1) {
        sendAction({ categoryId: item.categoryId, key: key })
        setSelectCategoryName(item.name)
        setActiveIndex(index)
        console.log(activeIndex, index)
        if (activeIndex == index) {
          setProductList(getProductList.concat(data))
        } else {
          setProductList(data)
        }
        setItemLoader(false)
      } else {
        sendAction1({ categoryId: item.categoryId, key: key })
        setSelectCategoryName1(item.name)
        setActiveIndex1(index)
        if (activeIndex1 == index) {
          setProductList1(getProductList1.concat(data))
        } else {
          setProductList1(data)
        }
        setItemLoader1(false)
      }
      setItemLoader(false)
    } else {
      setItemLoader(false)
      setItemLoader1(false)
      if (action == 0 && key == 1) {
        setProductList([])
        setActiveIndex(index)
      }
      if (action == 0 && key == 2) {
        setProductList1([])
        setActiveIndex1(index)

      }
      setItemLoader(false)
    }
  }
const  replaceImage = (error) => {
    //replacement of broken Image
    console.log(error)
    error.target.src = '/static/img/red-chief-logo.png';
}
const [status, setStatus] = useState("")
const tabChangeScroll = (current) => {
  setStatus(current);
  if(current=="newArriavals"){
    updateNewArrivals()
  }
  if(current=="topTrending"){
    featuredApi(dispatch);
  }
  
};


const carouselSetting3 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: false,
  autoplaySpeed: 100,
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

const getVariant = (categoryName) => {
  getProductVariants(dispatch, categoryName)
}

const preventDefaultLink = (e, link) =>{
  console.log("link",link)
  Router.push(link)
}




  return (
    <>

    <img src="static/img/index.png" className="index-img"/>

    <div className={`d-none site-content ${homeClass}`}>
      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      {/* <ThemeChanger /> */}


      <SubscribePopup active={subscribe} />

      <main id="homepage-1">
      <div className="mainCategory container-fluid">
        <div className="row">

        {parentcategory && parentcategory.map((item)=>{
          return <div className="col-md-4">
            <Link href={item.link}>
            <a onClick={e => getVariant((item.showOn).toUpperCase())}>
            <DisplayImageWithS3PreSignedUrl styleClass = "categoryimage" imageKey={item.imagePath} resizeRequired="NO" />
          <span>{item.showOn}</span>
          </a>
          </Link>
       </div>
        })}
        </div>
       </div>
        <HomeBanner data={banner} />

        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-12">
            <Slider {...carouselSetting} className="ps-carousel">
                    { banner1 != "" && banner1.length > 0 && banner1.map(item => {
                      return <a href={item.link}>
                        <div className="image-style" style={{padding: "0", width: "100%", height: "auto" }}>
                        {/* <img src={imageUrl + "?path=&name=" + item.imagePath + "&width=1366&height=506&resize_required=NO"}  /> */}
                        <DisplayImageWithS3PreSignedUrl imageKey={item.imagePath} resizeRequired="NO" />
                        </div>
                      </a>
                    })}
          </Slider>
          <h2 className="barHead">
              <div className="barLine mr-3">
                <span className="red"></span>
                <span className="blue"></span></div>
              Shop By Category
              <div className="barLine ml-3">
                <span className="red"></span>
                <span className="blue"></span>
              </div></h2>
              </div>
          </div>
          <div className="row home-page-category categorybanner">
            {categoriesImage && categoriesImage.map((item)=>{

                return <div className="col-md-3 mb-4 categorybox">
                  <div className="categorySubBox">
                  <Link href={item.link}>
                  <a onClick={e => getVariant(item.content)}>
                    <DisplayImageWithS3PreSignedUrl styleClass = "categoryimage" imageKey={item.imagePath} resizeRequired="NO" />
                  {/* <img  className="categoryimage" src={imageUrl + "?path=&name=" + item.imagePath + "&width=300&height=300&resize_required=NO"}  />   */}
                  </a>
                  </Link>
                  {/* <div className="categorytitle">{item.showOn}</div>
                  <div className="categorylink"><a href={item.link}><button>SHOP NOW</button></a></div> */}
</div>
                  </div>
            })}
          </div>
          {/* <div className="footwearWrapper">


            <h2 className="barHead">
              <div className="barLine mr-3">
                <span className="red"></span>
                <span className="blue"></span></div>
              {catgetoryName}
              <div className="barLine ml-3">
                <span className="red"></span>
                <span className="blue"></span>
              </div></h2>
            <div className="footwearSec mb-5">
              <div className="tabBar">
                <ul className="mb-0">
                  {footwearCategories && footwearCategories.map((item, i) => {
                    return <li><a href="javascript:void(0)" onClick={e => { selectCategory(item, i, 1, 0) }} key={item.categoryId} title={item.name} className={i == activeIndex ? 'active' : ""}>{item.name}</a></li>
                  })}
                </ul>
              </div>
              <div className="sliderBar">
                <div className="">

                  {(getProductList.length > 0) ? <><Slider {...carouselSetting1} className="ps-carousel">{getProductList.map(item => {
                    return <>
                      <Link href="/product/[pid]" as={`/product/${item.productSlug}`}>
                        <div className={getItemLoader ? 'animated-background itemList' : 'itemList'}>
                          {item.promotionFlag == 1 && <div className="cus-dis-tag">
                            <><img src="/static/img/discount-tag.png" /><span>Offer</span></></div>}
                          <div className="itemImg"><img src={item.productImageUrl} alt={item.productName}   onError={(e)=>replaceImage(e)}/></div>
                          <div className="itemDetails">
                            <div className="itemInfo">
                              <div className="itemName">{selectCategoryName}</div>
                              <div className="itemDes">{item.productName}</div>
                              
                              <div className="itemPrice">Rs {item.discountPrice ? <span>{priceHelpFunc(item.discountPrice, item.taxType, item.taxValue, 0).toFixed(0)}</span> : <span>{priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0).toFixed(0)}</span>} {item.discountPrice && <><span className="discount-product-price">{priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0).toFixed(0)}</span>
                                <span className='dicount-off-price'>{(((priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0) - priceHelpFunc(item.discountPrice, item.taxType, item.taxValue, 0)) * 100) / priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0)).toFixed(0)} % off</span></>} </div>

                                
                            </div>
                            {item.productRating != 0 && <div className="itemRating">
                              <div className="flex star-count">
                                <div className="strlist flex">
                                  <Rate
                                    className="rateus"
                                    allowHalf
                                    defaultValue={Number(item.productRating)}
                                    disabled={true}
                                  />

                                </div>
                              </div>

                            </div>}
                          </div>
                        </div>
                      </Link>
                    </>
                  })}</Slider></> : <p className="not-found">No Product Found</p>}

                </div>
              </div>
            </div>
            <Slider {...carouselSetting} className="ps-carousel">
                    { banner1 != "" && banner1.length > 0 && banner1.map(item => {
                      return <a href={item.link}>
                        <div className="image-style" style={{padding: "0", width: "100%", height: "auto" }}>
                        <img src={imageUrl + "?path=&name=" + item.imagePath + "&width=1366&height=506"}  />
                        </div>
                      </a>
                    })}
                  </Slider>
        
          </div> */}
          <div className="footwearWrapper apparelsWrapper">
            <h2 className="barHead d-none">
              <div className="barLine mr-3">
                <span className="red"></span>
                <span className="blue"></span></div>
              Garments
              <div className="barLine ml-3">
                <span className="red"></span>
                <span className="blue"></span>
              </div></h2>

              <div className="row home-page-category categorybanner">
            {garmentImage && garmentImage.map((item)=>{

                return <div className="col-md-3 mb-4 categorybox">
                  <div className="categorySubBox">
                  <Link href={item.link}>
                  <a onClick={e => getVariant(item.content)}>
                  <DisplayImageWithS3PreSignedUrl styleClass = "categoryimage" imageKey={item.imagePath} resizeRequired="NO" />
                  {/* <img  className="categoryimage" src={imageUrl + "?path=&name=" + item.imagePath + "&width=300&height=300&resize_required=NO"}  />   */}
                </a>
                  </Link>
                  {/* <div className="categorytitle">{item.showOn}</div>
                  <div className="categorylink"><a href={item.link}><button>SHOP NOW</button></a></div> */}

                  </div>
                  </div>
            })}
          </div>
            {/* <div className="footwearSec mb-5">
              <div className="sliderBar">
                <div className="">
                  {(getProductList1.length > 0) ? <><Slider {...carouselSetting2} className="ps-carousel">{getProductList1.map(item => {
                    return <>
                      <Link href="/product/[pid]" as={`/product/${item.productSlug}`}>
                        <div className={getItemLoader1 ? 'animated-background itemList' : 'itemList'}>
                          {item.promotionFlag == 1 && <div className="cus-dis-tag">
                            <><img src="/static/img/discount-tag.png" alt={item.productName} /><span>Offer</span></></div>}
                          <div className="itemImg"><img src={item.productImageUrl} alt={item.productName}  onError={(e)=>replaceImage(e)}/></div>
                          <div className="itemDetails">
                            <div className="itemInfo">
                              <div className="itemName">{selectCategoryName1}</div>
                              <div className="itemDes">{item.productName}</div>
                              <div className="itemPrice">Rs {item.discountPrice ? <span>{priceHelpFunc(item.discountPrice, item.taxType, item.taxValue, 0).toFixed(0)}</span> : <span>{priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0).toFixed(0)}</span>} {item.discountPrice && <><span className="discount-product-price">{priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0).toFixed(0)}</span>
                                <span className='dicount-off-price'>{(((priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0) - priceHelpFunc(item.discountPrice, item.taxType, item.taxValue, 0)) * 100) / priceHelpFunc(item.productPrice, item.taxType, item.taxValue, 0)).toFixed(0)} % off</span></>} </div>
                            </div>
                            {item.productRating != 0 && <div className="itemRating">
                              <div className="flex star-count">
                                <div className="strlist flex">
                                  <Rate
                                    className="rateus"
                                    allowHalf
                                    defaultValue={item.productRating}
                                    disabled={true}
                                  />

                                </div>
                              </div>

                              {item && item.productRatingList && item.productRatingList.length>0 && item.productRatingList.map(it=>{
    return <i className="fa fa-star" aria-hidden="true"></i>
  }) }
                            </div>}
                          </div>
                        </div>
                      </Link>
                    </>
                  })}</Slider></> : <p className="not-found">No Product Found</p>}
                </div>
              </div>
              <div className="tabBar">
                <ul className="mb-0">
                  {apparelCategories && apparelCategories.map((item, i) => {
                    return <li><a href="javascript:void(0)" onClick={e => { selectCategory(item, i, 2, 0) }} key={item.categoryId} title={item.name} className={i == activeIndex1 ? 'active' : ""}>{item.name}</a></li>
                  })}
                </ul>
              </div>
            </div> */}
            <Slider {...carouselSetting} className="ps-carousel banner2">
                    {banner3 != "" && banner3.length > 0 && banner3.map(item => {
                      return <a className="image-style" href={item.link}>
                        {/* <img src={imageUrl + "?path=&name=" + item.imagePath + "&width=1366&height=506&resize_required=NO"} alt={item.productName} /> */}
                        <DisplayImageWithS3PreSignedUrl imageKey={item.imagePath} resizeRequired="NO" />
                      </a>
                    })}
                  </Slider>

</div>
{/* {banner3 && 
<HomeBanner2 data={banner}/>} */}
<div className="offerWrapper">
<div className="row">
<div className="col-md-6">
<div className="newCollectionBox">
{console.log(getLeftImage, "Nero sfsfsf get left image")}
{getLeftImage && getLeftImage.link && getLeftImage.status==1 &&<>
<span onClick={(e)=>{preventDefaultLink(e, getLeftImage.link)}}>
<DisplayImageWithS3PreSignedUrl imageKey={getLeftImage.imagePath} resizeRequired="NO" />
</span>
<Link href={getLeftImage?.link}>
<a title="Explore New Collection">Explore <span>New Collection</span></a>
</Link>
</>
}
</div>
</div>
<div className="col-md-6">
<div className="flatOffBox">
{getRightImage && getRightImage.link && getRightImage.status==1 && <>
  <span onClick={(e)=>{preventDefaultLink(e, getRightImage.link)}}>
<DisplayImageWithS3PreSignedUrl imageKey={getRightImage.imagePath} resizeRequired="NO" />
</span>
<div className="flatOffBox-data">
<div className="saleDetails">
<Link href={getRightImage.link}>
<button className="btn btn-primary">SHOP NOW <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
</Link>
</div>
</div>
</>
 }
</div>
</div>
</div>


          </div>


        </div>

<div className="container-fluid">
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
                {(newArrivaldata.length > 0) ? <><Slider {...carouselSetting2} className="ps-carousel">{newArrivaldata.map((item,i) => {
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
             {(featured.length > 0) ? <><Slider {...carouselSetting3} className="ps-carousel">
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

        <div className="logoWrapper d-none">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <div className="logo-header">
                  Our Brands
                </div>
              </div>
              <div className="col-md-9 col-sm-12">
                <div className="imgBox row">
                  <div className="col-md-4">
                  <a href="https://comfortwalk.co.in/ " target="_blank">
                    <img src="static/img/logo02.jpg" alt="brand logo" />
                  </a>
                  </div>
                  <div className="col-md-4">
                  <a href="https://www.furosports.com/ " target="_blank"  >
                    <img src="static/img/logo01.jpg" alt="brand logo" />
                  </a>
                  </div>
                  <div className="col-md-4">
                  <a href="https://www.topbrass.co.in/" target="_blank"  >
                    <img src="static/img/top-brass.png" alt="brand logo" />
                  </a>
                  </div>
                  {/* {getBrandImage && getBrandImage.map(item=>{
              return <a href={item.link} target="_blank">
               <img src={imageUrl+"?path=&name="+item.imagePath+"&width=120&height=180"} />
              </a>
              
            })} */}


                </div>
              </div>
            </div>
          </div>
        </div>


      </main>







      <FooterFullwidth />



    </div>
    </>
  );
}

export default connect((state) => state.collection)(Index);
