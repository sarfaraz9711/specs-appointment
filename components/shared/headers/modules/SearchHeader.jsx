import React, {useRef,useState,useEffect, useCallback } from "react";
//import {ConnectPlugin} from '../../../connectPlugins';
import { SearchOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import { useTranslation } from "../../../../i18n";
import { searchListApi } from "../../../../api/account/productSearchList";
import { imageUrl } from "../../../../api/url";
import { getProductVariants } from '../../../../api/filter/getVariants';
import {useDispatch } from "react-redux";

function SearchHeader() {
  const dispatch = useDispatch();
  let viewcurrentColor = useSelector((s) => s.palette.viewcurrentColor);
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchClick, setSearchClick] = useState(true);
  const [empyt, setempty] = useState([]);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState();
  const router = useRouter();
  const inputRef = useRef(null);
  const listInnerRef = useRef();
  const [scrall, setscrall] = useState(false);
  const [muscles,setmuscles]=useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  
const[routerproductvalue,setRouterproductValue]=useState("")

  let reloadKey = router.query.keyword;
  const { t } = useTranslation("common");


  const handleSearch = (e) => {
    setscrall(false);
    setSearchClick(true);
    setKeyword(e.target.value);
    setSearchKeywords(e.target.value);
  
    const add=0;
    setOffset(add);
  
    
    setempty([]);
    searchListApi(e.target.value, setSearchList, add);
   
    
    
    setRouterproductValue(e.target.value)
  }

  useEffect(() => {
    if (scrall === false ) {
    
      setempty(searchList);
      // setSearchList([])
     
    }
    // if(searchList.length===0&&muscles===true){ 
    //     setempty([])
 
    // }
    
  }, [scrall,searchList]);

  
 
  useEffect(() => {
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  }, []);
  

  const ProductRoute = (product) => {
    console.log(product, "Nero prodssss++++++++++++++++");
    // Router.push("/product/[pid]", `/product/${product.productSlug}`);
    // router.push({
    //   pathname: '/product/[pid]',
    //   query: { pid: product.productSlug, productname:product.name  },
    // })
    // setKeyword(product.name)
    // setSearchClick(false);
    getProductVariants(dispatch, product.parentCategoryName);
    sessionStorage.setItem("parentCategorySlug", product.parentCategorySlug.toLowerCase());
    sessionStorage.setItem("selectedMenuItem", product.parentCategoryName);
    router.push({
      pathname: '/[...sid]',
      query: { sid: product.categorySlug, attribute: searchKeywords, priceFrom:0, priceTo: 100000, categorySlug:product.categorySlug},
    })
    setKeyword(product.name)
    setSearchClick(false);
  };

  useEffect(()=>{
    
    if(router.query.productname !=undefined){
      setRouterproductValue(router.query.productname)
    }else{
      setRouterproductValue(router.query.keyword)
    }
    
    
  },[router.query.productname,router.query.keyword])
 
  const onsetSearchClick = () => {
    setSearchClick(false);
    setKeyword("");
  };

  const onScroll = () => {
    // setmuscles(true)
    if (listInnerRef.current) {
    
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    
     
      let scrollTops = Math.round(scrollTop);
      if(scrall==false&&keyword.length>1){
        setempty([])
        // setOffset(0)
      }
     
      if (scrollTops + clientHeight ===scrollHeight) {
       
        let val=[]
        let res = [];
        setSearchList([]);
        let add = offset + 10;

        setOffset(add);
             if(add !=0){
                searchListApi(keyword, setSearchList, add);
             }
        if (searchList.length > 0) {
          setscrall(true);
          val = empyt.concat(searchList.length>0 ? searchList : []);

          if (val.length > 0) {
            res = val;
            let newArr= []
            res.forEach((item, index) => {
            if (newArr.findIndex(i => i.productId == item.productId) === -1)
            {
            newArr.push(item)
            }
            
            });
            if(scrall===false){
              setempty([]);
              setSearchList([])
             
            }
           setempty(newArr);
          
          }
        }
      }
    }
  };
  const enterKeyEvent = (e) => {
    
    if (e.key === "Enter") {

      
      e.preventDefault();
      e.stopPropagation();
      if(empyt && empyt.length > 0){
        
        ProductRoute(empyt[0]);
      }
     
    }
  };
  const onsearchclick = (e) => {
    //e.preventDefault();

    if (keyword) {
      Router.push("/shop/[sid]", `/shop/${keyword}`);
    }

    setSearchClick(false);
    setKeyword("");
  };

  

  return (
    <div className="ps-form--quick-search">
     
      <input
        ref={inputRef}
        name="search-from-me"
        id='search-from-me'
        value={routerproductvalue}
        className="form-control"
        autoFocus
        type="text"
        placeholder="Search by product / category / article"
        onChange={(e) => handleSearch(e)}
        onKeyPress={(e) => enterKeyEvent(e)}
        defaultValue={reloadKey !== undefined ? reloadKey : ""}
        // onClick={(e)=>hanleclick(e)}
        // onInputChange
      />

      <a className="search-anchor-contain" onClick={(e) => onsetSearchClick()}>
        <SearchOutlined
          className={viewcurrentColor}
          onClick={(e) => onsearchclick()}
        />
      </a>

      {searchList && keyword.length >= 1 && searchClick && (
        <div
          // id="scrollableDiv"
          className="search-auto-container"
          // onScroll={onScroll}
          ref={listInnerRef}
        >
          

          {empyt && empyt.length > 0 ? (
            <>
              
                 
              {empyt.map((product) => (
                <div
                  className="search-auto-maincontainer"
                  key={product.productId}
                  onClick={(e) => ProductRoute(product)}
                >
                  {/* <div className="search-auto-imgconatiner">
                    {product && product.productImage && (
                      <img
                        src={
                          imageUrl +
                          "?path=" +
                          product.productImage.containerName +
                          "&name=" +
                          product.productImage.image +
                          "&width=200&height=400"
                        }
                      />
                    )}
                  </div> */}
                  <div className="search-auto-content-container">
                    <h5 style={{ fontSize: "14px !important" }}>
                      {searchKeywords}
                    </h5>
                    <p>
                    in {product &&
                        product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="search-auto-content-container" >
              <span
                style={{
                  display: "flex",
                  marginTop: "10rem",
                  fontSize: "2.5rem",
                  justifyContent: "center",
                  color: "#000",
                }}
              >
                {searchList&&searchList.length == 0 ? <>No Data Found</> : ""}
              </span>
            </div>
          )}
          
        </div>
      )}
     
    </div>
  );
  // }
}

export default connect((state) => state.product)(SearchHeader);
