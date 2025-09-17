import React, { Component, useEffect, useRef } from "react";

import { connect, useSelector, useDispatch } from "react-redux";
import Product from "../../elements/products/Product";
import ProductWide from "../../elements/products/ProductWide";
import { Pagination, Skeleton, Collapse, Checkbox } from "antd";
// import { } from 'antd';
import "antd/dist/antd.css";
import { useTranslation } from "../../../i18n";
import {
  getProducts,
  getOrderBy,
  getProductBycurrentpage,
} from "../../../store/product/action";
import { useState } from "react";
import { imageUrl } from "../../../api/url";
import Router, { useRouter } from "next/router";
import { Tabs } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import DisplayImageWithS3PreSignedUrl from "../../../components/elements/AwsS3PreSignedUrl";
import { productListApi, productListScroll, getCategoryImage } from "../../../api";
import ReactHtmlParser from 'react-html-parser';
const { TabPane } = Tabs;

const { Panel } = Collapse;
function LayoutShop({
  data,
  count,
  setOffset,
  setInitialLoad,
  loader,
  setLimit,
  limit,
  categoryInitial,
  specificCat,
  defaultCallValueInitial,
  priceMin,
  maxPrice,
  orderBy,
  setProductData,
  offset,
  setLoader,
  priceToInitial,
  setCrumbArray,
  setSelectedCategoryId,
  priceFromInitial,
  manuId,
  crumbArray,
  currentvaluesof,
  reloadKey,
  ankleInitialValue,
  searchKeywords,
  productDiscountPercent,
  discountOfferId
}) {
  const dispatch = useDispatch();

  const router = useRouter();
  let viewcurrentColor = useSelector((s) => s.palette.viewcurrentColor);
  let currentColor = useSelector((s) => s.palette.currentColor);
  const [listView, setListView] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [metrailOpen, setmetrailOpen] = useState(false);
  const [getAttribute, setgetAttribute] = useState([]);
  const [checkeds, setchecked] = useState(false);
  const [attmanuIdArray, setAttManuIdArray] = useState([]);
  const [attmanuIdArr, setattmanuIdArr] = useState([]);
  const [triger, setTrigger] = useState(0);
  const [description, setdescription] = useState([]);
  const [isLoading, setIsLoading]=useState(false)
  const [state3, setState3] = useState([]);
  const [state4, setState4] = useState("");
  const [triggerss, settriggerss] = useState("");
const [offsetLimit, setOffsetLimit] = useState(37)
const [exploreMoreActive, setExploreMoreActive]=useState(true)
const [getCategoryImageText, setCategoryImageText] = useState({})
const [noDataCategoryImageText, setNoDataCategoryImageText]=useState(false)
  useEffect(() => {
    setAttManuIdArray([]);
  }, []);

  const products = data;
  const total = "";
  const viewMode = listView;
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  let pageSizeCustom = Math.ceil(count / 18);
  const { t } = useTranslation("common");

  const handleChangeViewMode = (event) => {
    event.preventDefault();
    setListView(!listView);
  };

  const [scrollLimit, setScrollLimit] = useState(700);
  const [scrollCheck, setScrollCheck]=useState(0)
  const [offsetProduct, setOffsetProduct]=useState(16)
  useEffect(() => {
    console.log("specificCat",specificCat)
    if(specificCat){
    getCategoryImageData(specificCat?.searchCategoryId)
    }
    setScrollLimit(700)
    setOffsetProduct(16)
    setOffsetLimit(37)
    setExploreMoreActive(true)
      const onScroll = () => setScrollCheck(window.pageYOffset);
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, [products, specificCat]);
  
  const getProduct =async ()=>{
    const getDataRequest1 = sessionStorage.getItem("productList1")
    const getDataRequest2 = sessionStorage.getItem("productList2")
    const result = await productListScroll(getDataRequest1+offsetProduct+getDataRequest2)
    console.log("resulttttttttttttttttttttttttttttttttt",result)
     result.forEach(element => {
      console.log(products.some(item=>item.productId!=element.productId));
      if(!products.some(item=>item.productId===element.productId)){
       products.push(element)  
      }
     });
     setIsLoading(false)
  }
  if(scrollCheck>scrollLimit && offsetProduct<offsetLimit){
    setScrollLimit(scrollLimit+300)
    setOffsetProduct(offsetProduct+4)
    setIsLoading(true)
    getProduct()
  }


  useEffect(() => {
    setCurrentPage(offset / limit + 1);
  }, [triger, offset]);

  const getCategoryImageData = async (categoryId)=>{
    const result = await getCategoryImage(categoryId)
    console.log("result", result)
    if(result.status==200 && result.data && result.data.isActive=='Active'){
      setCategoryImageText(result.data)
      setNoDataCategoryImageText(true)
    }else{
      setExploreMoreActive(false)
      setNoDataCategoryImageText(false)
      setOffsetLimit(10000)
    }
  }


  const handlePagination = (value) => {
    setOffset(Math.ceil((value - 1) * 18));
    setInitialLoad(true);
    executeScroll();

    setCurrentPage(value);
    if (categoryInitial !== "") {
      Router.push(
        {
          pathname: `/shop/[sid]`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            brand: "",
            priceFrom: priceMin,
            variantValue: "",
            defaultCallValue: orderBy,
  
            offset: Math.ceil((value - 1) * 18),
            index: 0,
            categorySlug: categoryInitial,
          },
        },
        {
          pathname: `/shop/${categoryInitial}`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            priceFrom: priceMin,
            brand: "",
            variantValue: "",
            defaultCallValue: orderBy,
            offset: Math.ceil((value - 1) * 18),
            
            index: 0,
            categorySlug: categoryInitial,
          },
        }
        
      );



    }else{
      Router.push(
        {
          pathname: `/shop/[sid]`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            brand: "",
            priceFrom: priceMin,
            variantValue: "",
            defaultCallValue: orderBy,
            keyword: reloadKey,
            offset: Math.ceil((value - 1) * 18),
            index: 0,
            // categorySlug: categoryInitial,
          },
        },
        {
          pathname: `/shop/${reloadKey}`,
          query: {
            attribute: "",
            priceTo: maxPrice,
            priceFrom: priceMin,
            brand: "",
            variantValue: "",
            defaultCallValue: orderBy,
            offset: Math.ceil((value - 1) * 18),
            keyword: reloadKey,
            index: 0,
            // categorySlug: categoryInitial,
          },
        }
      );

    }
    
    window.scroll({ top: 0 });
  };

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const sortFunction = (value) => {
    let filterSelectedCatId = ''
    if(router.query.categoryId){
      filterSelectedCatId = router.query.categoryId;
    }
    let finalFilteredQueryparams = ''
    if(router.query.finalFilteredQueryparams){
      finalFilteredQueryparams = router.query.finalFilteredQueryparams;
    }
    console.log(filterSelectedCatId, "Nero helllssssfilterSelectedCatIdfilterSelectedCatIdfilterSelectedCatIdfilterSelectedCatId");
    setInitialLoad(true);
    dispatch(getOrderBy(value));
    if (categoryInitial !== "") {
      router.push({
        pathname: `/[...sid]`,
        query: {
          sid: categoryInitial,
          attribute: searchKeywords,
          priceTo: maxPrice,
          brand: "",
          priceFrom: priceMin,
          variantValue: "",
          defaultCallValue: value,
          productDiscountPercent,
          discountOfferId,
          offset: offset,
          index: 0,
          categorySlug: categoryInitial,
          categoryId: filterSelectedCatId,
          finalFilteredQueryparams: finalFilteredQueryparams
        },
      });
    } else {
      Router.push(
        {
          pathname: `/[...sid]`,
          query: {
            attribute: searchKeywords,
            priceTo: maxPrice,
            brand: "",
            priceFrom: priceMin,
            variantValue: "",
            defaultCallValue: value,
            keyword: reloadKey,

            offset: offset,
            index: 0,
            // categorySlug: reloadKey,
            
          categoryId: filterSelectedCatId,
          finalFilteredQueryparams: finalFilteredQueryparams
          },
        },
        {
          pathname: `/${reloadKey}`,
          query: {
            attribute: searchKeywords,
            priceTo: maxPrice,
            priceFrom: priceMin,
            brand: "",
            variantValue: "",
            defaultCallValue: value,
            keyword: reloadKey,

            offset: offset,
            index: 0,
            // categorySlug: reloadKey,
          },
        }
      );
    }
  };

  const changesetchecked = (e, itemSlug) => {
    setchecked(true);

    const { name, checked } = e.target;
    setLoader(true);

    const temp =
      description &&
      description.map((value, index) => {
        return (
          value &&
          value.map((val, index) => {
            if (val.itemName === name) {
              return Object.assign({}, val, {
                checked,
              });
            }
            return val;
          })
        );
      });
    setdescription(temp);

    let manuSubArrays = attmanuIdArray;

    if (manuSubArrays.indexOf(e.target.value) !== -1) {
      manuSubArrays = manuSubArrays.filter(
        (manufactureId) => manufactureId != e.target.value
      );
    } else {
      manuSubArrays.push(e.target.value);
    }

    setAttManuIdArray(manuSubArrays);

    let manuSubArr = attmanuIdArr;
    if (manuSubArr.indexOf(itemSlug) !== -1) {
      manuSubArr = manuSubArr.filter((manufactId) => manufactId != itemSlug);
    } else {
      manuSubArr.push(itemSlug);
    }
    setattmanuIdArr(manuSubArr);

    productListApi(
      dispatch,
      setProductData,
      offset,
      setLoader,
      orderBy,
      priceFromInitial,
      searchKeywords,
      categoryInitial,
      manuId,
      limit,
      priceToInitial,
      setSelectedCategoryId,
      setCrumbArray,
      manuSubArr,
      ankleInitialValue
    );

    if (manuSubArr.length == 0) {
      setTrigger(triger + 1);
    }
  };
  const REmoveFUnc = (attit, index) => {
    setLoader(true);
    const temp =
      description &&
      description.map((value, index) => {
        return (
          value &&
          value.map((val, index) => {
            if (val.itemSlug === attit) {
              return Object.assign({}, val, {
                checked: false,
              });
            }
            return val;
          })
        );
      });
    setdescription(temp);
    attmanuIdArray.splice(index, 1);

    let manuSubArr = attmanuIdArr;

    manuSubArr.splice(index, 1);

    productListApi(
      dispatch,
      setProductData,
      offset,
      setLoader,
      orderBy,
      priceFromInitial,
      searchKeywords,
      categoryInitial,
      manuId,
      limit,
      priceToInitial,
      setSelectedCategoryId,
      setCrumbArray,
      manuSubArr,
      ankleInitialValue
    );

    if (manuSubArr.length == 0) {
      setTrigger(triger + 1);
    }
  };

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="pagination-next-change-prev">Prev</a>;
    }
    if (type === "next") {
      return <a className="pagination-next-change">Next</a>;
    }
    return originalElement;
  }

  const Handleclick = () => {
    document.getElementById('sortfilters').classList.toggle("closefilter");
  }

  const exploreMore = () =>{
    setOffsetLimit(10000)
    setExploreMoreActive(false)
  }

  return (
    <div className="ps-shopping" ref={myRef} style={{ padding: "0 1rem" }}>
      {noDataCategoryImageText && <div className="category-thumbnail-image mt-3">
      <DisplayImageWithS3PreSignedUrl styleClass = "categoryimage" imageKey={getCategoryImageText && getCategoryImageText.imagePath} resizeRequired="NO" />
      </div>}
      <div className="ps-shopping__header">
        <div className="flex-tab-contain sortdropdown">
          <div className="d-flex justify-content-end pt-2 pb-2">         
           <p className="mb-0">Sort By</p> 
           <i  onClick={Handleclick} class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
          <div id="sortfilters" className="sortfilter"> 

          <Tabs
            className={` .ant-tabs-tab-btn:focus, .ant-tabs-tab:hover, .ant-tabs-tab-btn:active, .ant-tabs-ink-bar  ${viewcurrentColor}`}
            defaultActiveKey={defaultCallValueInitial}
            onTabClick={sortFunction} 
          >
                        <TabPane tab="" key=""></TabPane>
            <TabPane tab="Price Low To High" key="ASC">
              {" "}
            </TabPane>
            <TabPane tab="Price High To Low" key="DESC">
              {" "}
            </TabPane>
            <TabPane tab="New Arrival" key="NEW">
              {" "}
            </TabPane>
            <TabPane tab="Recommended" key="MAX">
              {" "}
            </TabPane>
            <TabPane tab="Discount" key="DISCOUNT">
              {" "}
            </TabPane>
            <TabPane tab="Popular" key="POPULAR">
              {" "}
            </TabPane>
          </Tabs>
          </div>

        </div>
        <div className="ps-shopping__view d-none">
        <ul className="ps-tab-list">
        <li>
         { /* <a href="#" onClick={handleChangeViewMode}>
             <img
              src={
                viewMode
                  ? "/static/img/list-view.svg"
                  : "/static/img/list-color.svg"
              }
            /> 
            {viewMode ? (
              <MenuOutlined style={{ fontSize: "20px" }} />
            ) : (
              <MenuOutlined
                style={{ fontSize: "20px" }}
                className={viewcurrentColor}
              />
            )}
          </a> */ }
        </li>
        <li>
         { /* <a href="#" onClick={handleChangeViewMode}>
           
            {!viewMode ? (
              <AppstoreOutlined style={{ fontSize: "20px" }} />
            ) : (
              <AppstoreOutlined
                style={{ fontSize: "20px" }}
                className={viewcurrentColor}
              />
            )}
            </a> */}
        </li>
      </ul>
        </div>
      </div>

     
      {loader === false ? (
        <div className="ps-shopping__content">
          {products.length !== 0 ? (
            <div>
              {viewMode === true ? (
                <div className="ps-shopping-product">
                  <div className="row">
                    {products && products.length > 0
                      ? products &&
                        products.map((item) => (
                          <div
                            className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 col-xs-6"
                            key={item.id}
                          >
                            <Product
                              crumbArray={crumbArray}
                              product={item}
                              image={
                                item.image && item.image.containerName !== "/"
                                  ? imageUrl +
                                    "?path=" +
                                    item.containerName +
                                    "&name=" +
                                    item.image +
                                    "&width=1300&height=1300"
                                  : "/static/img/no-image.png"
                              }
                            />
                          </div>
                        ))
                      : ""}
                       {isLoading && <div className="product-loader col-sm-12">
                        <i className="fa fa-spinner fa-spin"></i><br/>
                       Loading Products...
                       </div>}
                  </div>
                </div>
              ) : (
                <div className="ps-shopping-product">
                  {products && products.length > 0
                    ? products &&
                      products.map((item) => (
                        <ProductWide
                          crumbArray={crumbArray}
                          product={item}
                          key={item.productId}
                          image={
                            item.image && item.image.containerName !== "/"
                              ? imageUrl +
                                "?path=" +
                                item.containerName +
                                "&name=" +
                                item.image +
                                "&width=200&height=600"
                              : "/static/img/no-image.png"
                          }
                        />
                      ))
                    : ""}
                </div>
              )}
              {/* className={`shop-product-pagination ${currentColor}` */}
              {false && pageSizeCustom > 1 && (
                <div className="shop-product-pagination">
                  <p>
                    Page {currentPage} of {pageSizeCustom}
                  </p>

                  <Pagination
                    total={count}
                    pageSize={18}
                    current={currentPage}
                    defaultCurrent={1}
                    itemRender={itemRender}
                    onChange={handlePagination}
                  />
                </div>
              )}
              {crumbArray &&
                crumbArray[crumbArray.length - 1].categoryDescription !=
                  null && (
                  <>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={["1"]}
                      expandIconPosition="right"
                    >
                      <Panel
                        header={
                          <h4>
                            More About
                            {crumbArray[crumbArray.length - 1].categoryName}
                          </h4>
                        }
                        key=""
                        className="site-collapse-left-category-opnens"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: crumbArray[
                              crumbArray.length - 1
                            ].categoryDescription
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
                      </Panel>
                    </Collapse>
                  </>
                )}
            </div>
          ) : (
            <center>
              <p>No Results found</p>
            </center>
          )}
          {exploreMoreActive && <div className="text-center mb-3"><input onClick={e=>exploreMore(e)} type="button" className="btn btn-primary" value="Explore More"/></div>}
          <div className="category-text mb-3">
            {getCategoryImageText && ReactHtmlParser(getCategoryImageText.description)}
          </div>
        </div>
      ) : (
        <center>
          <img
            src="/static/img/spurt-original-loader.gif"
            width="100"
            height="100"
          />
        </center>
      )}
    </div>
  );
}

export default connect((state) => state.product)(LayoutShop);