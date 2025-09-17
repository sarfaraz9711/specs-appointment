import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import HeaderDefault from "../../components/shared/headers/HeaderDefault";

import LayoutShop from "../../components/partials/shop/LayoutShop";

import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import ShopWidget from "../../components/partials/shop/modules/ShopWidget";
import {
  getProducts,
  getProductsByCategory,
  getOrderBy,

} from "../../store/product/action";
import { getCollections } from "../../store/collection/action";
import { useEffect } from "react";
import { productListApi } from "../../api"
import { useState } from "react";

import { productCountApi } from "../../api";
import { categoryListApi } from "../../api";
import { ManufacturerApi } from "../../api";
import { specificCategoryApi } from "../../api";
import ThemeChanger from "../../components/elements/color/themeControl";
import useNetwork from "../../components/reusable/NetworkCheck";
import { useRouter } from "next/router";
import Link from "next/link";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import Head from 'next/head'

function ShopDefaultPage(props, { query }) {

  const router = useRouter();

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [offset, setOffset] = useState(0);

  const [initialLoad, setInitialLoad] = useState(true);
  const [count, setCount] = useState(0);
  const [categoryInitial, setCategoryInitial] = useState("");
  const [ankleInitialValue, setAnkleInitial] = useState("");
  const [sizeInitialValue, setSizeInitial] = useState("");
  const [colorInitialValue, setColorInitial] = useState("");
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const [manuId, setManuId] = useState("");
  const [limit, setLimit] = useState(18);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [specificCat, setSpecificCat] = useState();
  const [manuIdArray, setManuIdArray] = useState([]);
  const [brandFinal, setBrandFinal] = useState();
  const [priceMin, setPriceMin] = useState(0);
  const [openKeys, setOpenKeys] = useState([]);
  const [categoryIdState, setCategoryIdState] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoryIdFinal, setCategoryIdFinal] = useState("");
  const [crumbArray, setCrumbArray] = useState([]);
  const [variant, setvariant] = useState("");

  let orderBy = props.product.orderBy;

  let price = props.product.price;
  // const router=useRouter();
  let reloadKey = router.query.keyword;

  let filterValue = router.query.filterValue
  let sizeValueFilter=router.query.sizeValueFilter
  let colorsValueFilter=router.query.colorsValueFilter
  let keywords = router.query.sid;
  let categorySlug = router.query.categorySlug;

  let brandInitial = router.query.brand;
  let currentvaluesof = router.query.currentpagevalues
  let attributeInitial = router.query.attribute;
  let priceToInitial = router.query.priceTo;
  let priceFromInitial = router.query.priceFrom;
  let defaultCallValueInitial = router.query.defaultCallValue;

  let offsetInitial = router.query.offset;
  let limitInitial = router.query.limit;
  let categoryIdInitial = router.query.categoryId;
  let logInfo = useSelector((s) => s.auth);

  const network = useNetwork();

  useEffect(() => {
    if (network === false) {
      Router.push("/network-error");
    }
  }, [orderBy]);

  ;


  const productListApiCall = () => {

    if (categorySlug !== undefined && categorySlug !== "") {



      setLoader(true);
      productListApi(
        dispatch,
        setProductData,
        offsetInitial,
        setLoader,
        defaultCallValueInitial,
        priceFromInitial ? priceFromInitial : 0,
        search,
        categorySlug,
        manuId,
        limit,
        priceToInitial,
        setSelectedCategoryId,
        setCrumbArray,
        "",
        "",
        sizeValueFilter,
        colorsValueFilter
      );

      productCountApi(dispatch, setCount,
        props.product.price,
        defaultCallValueInitial,
        search,
        categorySlug,
        manuId,
        limit,
        priceToInitial,
        priceFromInitial
      );



    }
    else {

      setLoader(true);
      productListApi(
        dispatch,
        setProductData,
        offsetInitial,
        setLoader,
        defaultCallValueInitial,
        priceFromInitial ? priceFromInitial : 0,
        reloadKey,
        "",
        "",
        limit,
        priceToInitial,
        setSelectedCategoryId,
        setCrumbArray,
        colorInitialValue,
        sizeInitialValue
      );
      productCountApi(
        dispatch,
        setCount,
        props.product.price,
        defaultCallValueInitial,
        reloadKey,
        "",
        "",
        limit,
        priceToInitial ? priceToInitial : 30000,
        priceFromInitial ? priceFromInitial : 0
      );

    }
  };



  useEffect(() => {


    if (categorySlug) {
      ManufacturerApi(dispatch, setBrands, categorySlug);
    }

  }, [categorySlug]);

  useEffect(() => {
    categoryListApi(dispatch,2);
  }, []);

  useEffect(() => {
    if (selectedCategoryId.length > 0) {
      let lastIndex = selectedCategoryId.length - 1;
      const selectCat = selectedCategoryId[lastIndex].categoryId;

      setCategoryIdFinal(selectCat);
    }
  }, [selectedCategoryId]);


  useEffect(() => {

    if (categorySlug !== undefined && categorySlug !== "") {

      setInitialLoad(true);
      setCategoryInitial(categorySlug);
      setAnkleInitial(filterValue);
      setColorInitial(colorsValueFilter);
      setSizeInitial(sizeValueFilter);
      setMaxPrice(priceToInitial);
      setCategoryIdState(categoryIdInitial);
      setOpenKeys([categoryIdInitial]);
      setOffset(offsetInitial);
      priceFromInitial ? setPriceMin(priceFromInitial) : setPriceMin(0);
      specificCategoryApi(categorySlug, setSpecificCat, setSelectedCategoryId);
      dispatch(getOrderBy(defaultCallValueInitial));
      productListApiCall();

    } else if (reloadKey !== undefined && reloadKey !== "") {


      setInitialLoad(true);
      setCategoryInitial("");
      setAnkleInitial("");
      setColorInitial("");
      setSizeInitial("");
      setMaxPrice(priceToInitial);
      setCategoryIdState(categoryIdInitial);
      setOpenKeys([categoryIdInitial]);
      setOffset(offsetInitial);
      priceFromInitial ? setPriceMin(priceFromInitial) : setPriceMin(0);
      specificCategoryApi(categorySlug, setSpecificCat, setSelectedCategoryId);
      dispatch(getOrderBy(defaultCallValueInitial));
      productListApiCall();


    }
  }, [
    categorySlug,
    defaultCallValueInitial,
    manuId.length,
    priceMin,
    maxPrice,
    priceToInitial,
    priceFromInitial,
    offset,
    offsetInitial,
    reloadKey

  ]);

  useEffect(() => {
    if (!router.isReady) return;

  }, [router.isReady]);



  useEffect(() => {


    if (query) {
      if (query.category) {
        dispatch(getProductsByCategory(query.category));
      } else {
        const params = {
          _start: 1,
          _limit: 12,
        };
        dispatch(getProducts(params));
      }
      const collectionsParams = [
        "shop_best_sale_items",
        "shop-recommend-items",
      ];
      // dispatch(getCollections(collectionsParams));
    }
  }, []);


  const breadCrumb = [

    {
      text: crumbArray && crumbArray.length !== 0 && crumbArray,
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
            crumbArray && crumbArray.length !== 0 && crumbArray[0].categorySlug,
          categoryId:
            crumbArray && crumbArray.length !== 0 && crumbArray[0].categoryId,
        },
      },

      as: {
        pathname: `/shop/${crumbArray && crumbArray.length !== 0 && crumbArray[0].categorySlug
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
            crumbArray && crumbArray.length !== 0 && crumbArray[0].categorySlug,
          categoryId:
            crumbArray && crumbArray.length !== 0 && crumbArray[0].categoryId,
        },
      },
    },

  ];
  const Handleclick = () => {
    document.getElementById('filters').classList.toggle("openfilter");
  }
  return (
    <div className="site-content">




      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <ThemeChanger />

      <div style={{ backgroundColor: "#f1f3f6", padding: "16px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            paddingLeft: "10px",
            marginBottom: "16px",
          }}
        >


          <div className="ps-breadcrumb leftfilter">
            {crumbArray && crumbArray.length !== 0 && (
              <div className="fullwidth">
                {breadCrumb.length >= 1 && (
                  <>
                    {breadCrumb && breadCrumb.map((value, index) => (
                      <>
                        <Link href={value.href} as={value.as}>
                          <ul className="breadcrumb">
                            {value.text && value.text.map((val, index) => (
                              <React.Fragment>
                                <li key={index}>
                                  <a>{val.categoryName}</a>
                                </li>
                                <Head>
                                  <title>{val.metaTagTitle}</title>
                                </Head>
                              </React.Fragment>
                            ))}
                          </ul>
                        </Link>
                      </>
                    ))}
                  </>
                )}
              </div>
            )}
            <div style={{marginLeft:'25px'}} onClick={e => Handleclick()}>
             <i className='fa fa-filter'/>
             </div>
          </div>
        </div>
        <div className="ps-layout--shop">
          <ShopWidget
            type={categorySlug !== "" ? "specific " : "normal"}
            categoryMain={
              categorySlug !== ""
                ? specificCat
                : props.product.categories
            }
            setInitialLoad={setInitialLoad}
            brands={brands}
            manuId={manuId}
            setManuId={setManuId}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            setCategoryInitial={setCategoryInitial}
            setAnkleInitial = {setAnkleInitial}
            setColorInitial = {setColorInitial}
            setSizeInitial = {setSizeInitial}
            manuIdArray={manuIdArray}
            setManuIdArray={setManuIdArray}
            brandFinal={brandFinal}
            setBrandFinal={setBrandFinal}
            categoryInitial={categoryInitial}
            ankleInitialValue={ankleInitialValue}
            colorInitialValue={colorInitialValue}
            sizeInitialValue={sizeInitialValue}
            defaultCallValueInitial={defaultCallValueInitial}
            orderBy={orderBy}
            priceToInitial={priceToInitial}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            openKeys={openKeys}
            setOpenKeys={setOpenKeys}
            selectedCategoryId={selectedCategoryId}
            categoryIdFinal={categoryIdFinal}
            setCategoryIdFinal={setCategoryIdFinal}
            setSelectedCategoryId={setSelectedCategoryId}
            categoryIdState={categoryIdState}
            setCategoryIdState={setCategoryIdState}
            setProductData={setProductData}
            setLoader={setLoader}
            priceFromInitial={priceFromInitial}
            setCrumbArray={setCrumbArray}
            offset={offset}
            limit={limit}
            reloadKey={reloadKey}
          />
          <div className="ps-layout__right">
            {initialLoad ? (
              <LayoutShop
                data={productData}
                count={count}
                setOffset={setOffset}
                setInitialLoad={setInitialLoad}
                loader={loader}
                setLimit={setLimit}
                limit={limit}
                categoryInitial={categoryInitial}
                ankleInitialValue={ankleInitialValue}
                sizeInitialValue={sizeInitialValue}
                colorInitialValue={colorInitialValue}
                defaultCallValueInitial={defaultCallValueInitial}
                priceMin={priceMin}
                maxPrice={maxPrice}
                orderBy={orderBy}
                setProductData={setProductData}
                offset={offset}
                setLoader={setLoader}
                priceToInitial={priceToInitial}
                setSelectedCategoryId={setSelectedCategoryId}
                setCrumbArray={setCrumbArray}
                crumbArray={crumbArray}
                priceFromInitial={priceFromInitial}
                manuId={manuId}
                currentvaluesof={currentvaluesof}
                reloadKey={reloadKey}
              />
            ) : (
              <LayoutShop
                data={[]}
                count={count}
                setOffset={setOffset}
                setInitialLoad={setInitialLoad}
                loader={loader}
                setLimit={setLimit}
                limit={limit}
                categoryInitial={categoryInitial}
                ankleInitialValue={ankleInitialValue}
                sizeInitialValue={sizeInitialValue}
                colorInitialValue={colorInitialValue}
                defaultCallValueInitial={defaultCallValueInitial}
                priceMin={priceMin}
                maxPrice={maxPrice}
                orderBy={orderBy}
                setProductData={setProductData}
                offset={offset}
                setLoader={setLoader}
                priceToInitial={priceToInitial}
                setSelectedCategoryId={setSelectedCategoryId}
                setCrumbArray={setCrumbArray}
                crumbArray={crumbArray}
                priceFromInitial={priceFromInitial}
                manuId={manuId}
                currentvaluesof={currentvaluesof}
                reloadKey={reloadKey}
              />
            )}
          </div>
        </div>

      </div>

      <FooterFullwidth />
    </div>
  );
}
export default connect((state) => state)(ShopDefaultPage);

// ShopDefaultPage.getInitialProps=async(ctx)=>({
//     query:ctx.query
// })

// export async function getStaticProps( ctx) {

//     const productResponse= await axios.get(urlServer + '/list/custom-product-list?limit=12&offset=0&priceFrom=&priceTo=&price=&keyword=', {
//         method: 'GET',
//         headers: {
//             "Content-type": 'application/json',
//             "Accept": 'application/json',
//             "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTczLCJpYXQiOjE1OTI0NjE4MzB9.xbuD6dKuyTJG6lnnny2BT0dfV3wszQWwUJH-rI-U9PQ"
//         }
//     })

//     const productData=await productResponse.data

//     return {props: {productList:productData}};

// }
