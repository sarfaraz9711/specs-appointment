import React, { useEffect, useRef } from "react";
import { facebookGtm } from "../../api/data/facebook";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import ProductDetailFullwidth from "../../components/elements/detail/ProductDetailFullwidth";
import NavigationList from "../../components/shared/navigation/NavigationList";
import HeaderMobileProduct from "../../components/shared/header-mobile/HeaderMobileProduct";
import {
  getProductsById,
  getProductByLoading,
  getvarientproducthidefun,
  getsliderimageclicks,
  getQuantymin,
} from "../../store/product/action";
import { getProductDetApi } from "../../api";
// import { relatedProductListApi } from "../../api";
import { productRatingApi } from "../../api";
import { useState } from "react";

// import { questionsApi } from '../../api/product/question';
import ThemeChanger from "../../components/elements/color/themeControl";
import useNetwork from "../../components/reusable/NetworkCheck";
import InformationDefault from "../../components/elements/detail/modules/information/InformationDefault";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Link from "next/link";
import { apiUrl } from "../../api/url";
import { useTranslation } from "../../i18n";
import SpurtRelatedProduct from "../../components/partials/RelatedProduct/RelatedProduct";
import * as ga from "../../utilities/common-helpers";

const ProductDefaultPage = ({ query }) => {
  const [ratingInfo, setRatingInfo] = useState();
  const [banner, setBanner] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceChartInfo, setPriceChartInfo] = useState([]);
  const [questionInfo, setQuestionInfo] = useState([]);
  const [breadCategory, setBreadCategory] = useState([]);
  const [varientdefultid, setvarientdefultid] = useState([]);
  const [starcoutid, setstarcoutid] = useState("");
  const [breadCrumbarray, setbreadCrumbarray] = useState([]);
  var getTagManagerCheck = true;
  // const [relateClick,setRelateClick]=useState(0)
  const scrollToRef = (ref) => {
    const yOffset = -50;
    window.scrollTo(0, ref.current.offsetTop);
  };
  const authSelect = useSelector((s) => s.auth);
  const myRef = useRef(null);
  const scrollTo = () => scrollToRef(myRef);

  const dispatch = useDispatch();
  let productDetail = useSelector((s) => s.product);
  let productLoadInitiate = useSelector((s) => s.product.productLoading);
  const [count, setCount] = useState(0);
  const { t } = useTranslation("common");
  const network = useNetwork();
  let serveUdweu = apiUrl;

  useEffect(() => {
    dispatch(getsliderimageclicks([]));

    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  const router = useRouter();
  const pid = router.query.pid;

  useEffect(() => {
    dispatch(getProductByLoading(true));
    dispatch(getvarientproducthidefun(false));
    // const { query } = this.props;
    if (pid === undefined) {
      Router.push("/page/page-404");
    }

    if (pid) {
      const collectionsParams = [
        "customer_bought",
        "shop-recommend-items",
        "widget_same_brand",
      ];

      getProductDetApi(
        pid,
        pid.categorySlug,
        dispatch,
        setPriceChartInfo,
        setQuestionInfo,
        setBreadCategory,
        setstarcoutid
      );

      dispatch(getProductsById(pid));
      // dispatch(getCollections(collectionsParams));
      // relatedProductListApi(pid, setRelatedProduct);
      productRatingApi(pid, setRatingInfo, dispatch);
      // homeBannerApi(setBanner);
    }

    Router.events.on("routeChangeStart", (url) => {
      const nextPid = url.split("/").pop();
      if (nextPid !== "" && isNaN(parseInt(nextPid)) === false) {
        dispatch(getProductByLoading(true));
        dispatch(getvarientproducthidefun(false));
        getProductDetApi(
          nextPid,
          dispatch,
          setPriceChartInfo,
          setQuestionInfo,
          setBreadCategory,
          setstarcoutid
        );
        dispatch(getProductsById(nextPid));

        // relatedProductListApi(nextPid, setRelatedProduct);
        productRatingApi(nextPid, setRatingInfo, dispatch);
        // homeBannerApi(setBanner);
      }
    });
  }, [pid]);

  // render() {
  const singleProduct = useSelector((s) => s.product.singleProduct);

  const breadCrumb = [
    {
      text: breadCategory && breadCategory.length !== 0 && breadCrumbarray,
      href: {
        pathname: `/shop/[sid]`,
        query: {
          attribute: "",
          priceTo: 30000,
          brand: "",
          variantValue: "",
          defaultCallValue: "ASC",
          offset: 0,
          index: 0,
          categorySlug:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categorySlug,
          categoryId:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categoryId,
        },
      },

      as: {
        pathname: `/shop/${
          breadCategory &&
          breadCategory.length !== 0 &&
          breadCategory[0].categorySlug
        }`,
        query: {
          attribute: "",
          priceTo: 30000,
          brand: "",
          variantValue: "",
          defaultCallValue: "ASC",
          offset: 0,
          index: 0,
          categorySlug:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categorySlug,
          categoryId:
            breadCategory &&
            breadCategory.length !== 0 &&
            breadCategory[0].categoryId,
        },
      },
    },
  ];

  function valuePass() {
    let mainArray = [];
    let local = breadCategory;
    let IterObj = {};
    IterObj.categoryName = singleProduct && singleProduct.name;
    local.push(IterObj);
    setbreadCrumbarray(local);
  }
  useEffect(() => {
    if (breadCategory.length > 0) {
      valuePass();
    }
  }, [breadCategory]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("scroll-block-home");
    } else {
      document.body.classList.remove("scroll-block-home");
    }
  }, [showModal]);

  useEffect(() => {
    if (
      productDetail &&
      productDetail.singleProduct &&
      productDetail.singleProduct.productSellingPrice
    ) {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount == 1) {
          let fbData = [
            {
              currency: "INR",
              content_ids: productDetail.singleProduct.skuName,
              content_name: productDetail.singleProduct.name,
              price: productDetail.singleProduct.productSellingPrice,
            },
          ];
          facebookGtm(fbData, "ViewContent");
          ga.pushToDataLayer({
            event: "view_item",
            ecommerce: {
              currency: "INR",
              value: productDetail.singleProduct.productSellingPrice,
              items: [
                {
                  item_id: productDetail.singleProduct.skuName,
                  item_name: productDetail.singleProduct.name,
                  index: 0,
                  price: productDetail.singleProduct.productSellingPrice,
                  quantity: 1,
                },
              ],
            },
          });
        }
        return newCount;
      });
    }
    getTagManagerCheck = false;
  }, [productDetail]);

  return (
    <div className="layout--product">
      {/* <HeaderDefault /> */}
      <HeaderMobileProduct />
      <NavigationList />
      <ThemeChanger />
      {/* <QuotationPop
        showModal={showModal}
        setShowModal={setShowModal}
        
      /> */}
      {/* {
        ga.event({
          action: "view_item",
          params : {
            currency: "INR",
            value: productDetail.singleProduct.productSellingPrice,
            items: [
              {
                item_id: productDetail.singleProduct.skuName,
                item_name: productDetail.singleProduct.name,
                
        //         index: 0,
                
                //item_category: productDetail.singleProduct.Category[0].categoryName, 
                price: productDetail.singleProduct.productSellingPrice,
                quantity: 1
              }
            ]
          }
        })        
      } */}

      {/* {

ga.pushToDataLayer({
  event: "view_item",
  ecommerce: {
    currency: "INR",
    value: productDetail.singleProduct.productSellingPrice,
    items: [
      {
        item_id: productDetail.singleProduct.skuName,
        item_name: productDetail.singleProduct.name,
        
        index: 0,
        
        //item_category: productDetail.singleProduct.Category[0].categoryName, 
        price: productDetail.singleProduct.productSellingPrice,
        quantity: 1
      }
    ]
  }
})

} */}
      <div style={{ backgroundColor: "#f1f3f6", padding: "16px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            paddingLeft: "10px",
            marginBottom: "16px",
          }}
        >
          <div className="ps-breadcrumb">
            {breadCrumb[0].text === false ? (
              <ul className="breadcrumb">
                <li>{singleProduct.name}</li>
              </ul>
            ) : (
              <>
                {breadCrumb &&
                  breadCrumb.map((value, index) => (
                    <div className="fullwidth">
                      {console.log("value---->", value)}
                      {/* <Link href={value.href} as={value.as}> */}
                      <ul className="productDetail breadcrumb">
                        <li>
                          <Link href={"/"}>Home</Link>
                        </li>
                        {value.text &&
                          value.text?.map((val, index) => (
                            <React.Fragment>
                              <li key={index}>
                                {value && value.text.length == index + 1 ? (
                                  val.categoryName
                                ) : (
                                  <Link href={"/" + val.categorySlug}>
                                    {val.categoryName}
                                  </Link>
                                )}
                                {/* <a>{val.categoryName}</a> */}
                              </li>
                            </React.Fragment>
                          ))}
                      </ul>
                      {/* </Link> */}
                    </div>
                  ))}
                {/* <div className="fullwidth">
                    <ul className="breadcrumb">
                      <li style={{color: "#0276a0"}}>{productDetail.singleProduct.name}</li>
                    </ul>
                  
                  </div> */}
              </>
            )}
          </div>
        </div>
        {productDetail.productLoading === false ? (
          <div className="ps-page--product">
            <div className="ps-container">
              <div className="ps-page__container">
                <div className="ps-page__left">
                  <ProductDetailFullwidth
                    ratingInfo={ratingInfo}
                    setShowModal={setShowModal}
                    setShowPriceModal={setShowPriceModal}
                    questionInfo={questionInfo}
                    setvarientdefultid={setvarientdefultid}
                    varientdefultid={varientdefultid}
                    forwardedRef={myRef}
                  />
                </div>

                <div className="ps-page__right">
                  <InformationDefault
                    showModal={showModal}
                    product={singleProduct}
                    setShowModal={setShowModal}
                    setShowPriceModal={setShowPriceModal}
                    priceChartInfo={priceChartInfo}
                    showPriceModal={showPriceModal}
                    isLoggedIn={authSelect.isLoggedIn}
                    setvarientdefultid={setvarientdefultid}
                    varientdefultid={varientdefultid}
                    scrollTo={scrollTo}
                    starcoutid={starcoutid}
                    Productslug={pid}
                    productdata={productDetail && productDetail.singleProduct}
                  />
                </div>
              </div>
              {/* {relatedProduct && relatedProduct.length === 0 ? (
                <div>
                  <div className="ps-section__header">
                    <h3>{t("products.RelatedProducts")}</h3>
                  </div>
                  <div className="ps-section__content">
                    <p style={{ padding: "10em" }}>
                      {t("products.NoRelatedProductFound")}
                    </p>
                  </div>
                </div>
              ) : ( */}
              {/* <SpurtRelatedProduct /> */}
              <SpurtRelatedProduct
                productId={productDetail.singleProduct.productId}
              />
            </div>
          </div>
        ) : (
          <div className="ps-page--product">
            <div className="ps-container">
              <div style={{ paddingTop: "100px", paddingBottom: "200px" }}>
                <center>
                  <img
                    src="/static/img/spurt-original-loader.gif"
                    style={{ height: "100px", width: "100px" }}
                  />
                </center>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterFullwidth />
    </div>
  );
  // }
};

export default ProductDefaultPage;
