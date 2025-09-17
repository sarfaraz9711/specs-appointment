import React, { Component } from 'react';
import Router, { useRouter } from 'next/router';
//import {ConnectPlugin}   from "../../../connectPlugins";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import { useTranslation } from '../../../../i18n';
import { Collapse, Checkbox } from 'antd';
import { getProductsByPrice } from '../../../../store/product/action';
import { useEffect } from 'react';
import { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
import { productListApi, getProductDiscount } from '../../../../api';
import { Range } from 'react-range';
import { getProductVariants } from '../../../../api/filter/getVariants';
const { Panel } = Collapse;

function ShopWidget({ type, categoryMain, setInitialLoad, brands, manuId, setManuId, maxPrice, setMaxPrice, setCategoryInitial, setSizeInitial, sizeInitialValue, setColorInitial, colorInitialValue, manuIdArray, setManuIdArray, brandFinal, setBrandFinal, categoryInitial, defaultCallValueInitial, orderBy, priceToInitial, priceMin, setPriceMin, openKeys, setOpenKeys, selectedCategoryId, categoryIdFinal, setCategoryIdFinal, setSelectedCategoryId, categoryIdState, setCategoryIdState, currency, setProductData, setLoader, priceFromInitial, setCrumbArray, offset, limit, reloadKey, searchKeywords }) {
  const [priceMax, setPriceMax] = useState()
  const [getAttribute, setgetAttribute] = useState([])
  const [attmanuIdArr, setattmanuIdArr] = useState([])
  const [triger, setTrigger] = useState(0)
  const [colorsValueFilter, setColorsValueFilter] = useState([])
  const [sizeValueFilter, setSizeValueFilter] = useState([])
  const [typeValueFilter, setTypeValueFilter] = useState([])
  const dispatch = useDispatch()
  const { SubMenu } = Menu;
  const anything = useSelector(s => s.product)
  const { t } = useTranslation('common');
  let filterData = useSelector(s => s.filter)
  const [typeValue, setTypeValue] = useState([])
  const [colorsValue, setColorsValue] = useState([])
  const [rangeSliderVaalue, setRangeSliderVaalue] = useState([0, 10000])
  const [sizeValue, setSizeValue] = useState([]);
  const [variantsTitle, setVarientsTitle] = useState([]);
  const [filtersData, setFiltersData] = useState([]);
  const [ratingMaster, SetRatingMaster] = useState([{ "key": "5", label: "5 Star", checked: false }, { "key": "4", label: "4 Star", checked: false }, { "key": "3", label: "3 Star", checked: false }, { "key": "2", label: "2 Star", checked: false }, { "key": "1", label: "1 Star", checked: false }]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [getDiscountPercentFilter,setDiscountPercentFilter] = useState('');
  const [getproductDiscountPercentMaster,productDiscountPercentMaster] = useState([]);
  const [selectedSubCatId, setSelectedSubCatId] = useState();
  const router = useRouter();
  let selectedCategory = categoryMain?.name;
  const[selectedsubcategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    const querycategory = router.query.selectedCategory;
    const querySubcategory = router.query.selectedsubcategory;
    if(selectedsubcategory =="" ||selectedsubcategory == undefined ){
      setSelectedSubCategory(sessionStorage.getItem("selectedchildCategory"));
    }else{
      setSelectedSubCategory(querySubcategory)
    }
    console.log("selectedsubcategory",querycategory,querySubcategory)

    if(querycategory && querycategory != "RC Sports"){
      getProductVariants(dispatch, querycategory)
    }else if(querySubcategory){
      getProductVariants(dispatch, `${querycategory} ${querySubcategory}`)
    }
  },[])

  useEffect(()=>{
  if (categoryMain) {
    // const checkBox = document.getElementsByClassName("filterCheckBox")
    // for (var i = 0; i < checkBox.length; i++) {
    //   checkBox[i].checked = false;
    // }
    const selectedSubCatDet = categoryMain && categoryMain.children && categoryMain.children.filter(item => item.subCategorySelected)
    setTypeValueFilter([]);
    if (selectedSubCatDet && selectedSubCatDet.length > 0) {
      let collectedCats = [];
      for(let r=0; r<selectedSubCatDet.length;r++){
        collectedCats.push(selectedSubCatDet[r].categoryId);
      }
      setTypeValueFilter(collectedCats);
    }
  }
  let typeFilterArray = [];
  categoryMain && categoryMain.children?.length > 0 && categoryMain.children.forEach(element => {
    typeFilterArray.push({ key: element.categoryId, checked: false });
  });
  setTypeValue(typeFilterArray);

}, [categoryMain])
  // if(sizeInitialValue!=undefined && sizeInitialValue!=null && sizeInitialValue!=""){
  //   console.log(sizeInitialValue)
  //   if(sizeInitialValue.length>0)
  //   sizeInitialValue.forEach(element => {
  //     let index = sizeValue.findIndex(e=>e.key==element)
  //     sizeValue[index]["checked"]=true
  //     setSizeValue(sizeValue)
  //   });
  // }

  // if(colorInitialValue){
  //   colorInitialValue.forEach(element => {
  //     let index = colorsValue.findIndex(e=>e.key==element)
  //     colorsValue[index]["checked"]=true
  //     setColorsValue(colorsValue)
  //   });
  // }

  // const handleChangeRange = (value) => {
  //   setInitialLoad(true)
  //   setPriceMax(value[1])
  //   setPriceMin(value[0])

  //   const params = {
  //     priceMin: value[0],
  //     priceMax: value[1],
  //   };
  //   dispatch(getProductsByPrice(params));
  // }



  // const handleFilterProductsByCategory = (e, slug) => {
  //   e.preventDefault();
  //   if (slug !== null) {
  //     Router.push({ pathname: '/shop', query: { category: slug } });

  //   } else {
  //     const params = {
  //       _start: 1,
  //       _limit: 12,
  //     };

  //   }
  // }

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  

  useEffect(() => {

    let _newOffers = [
      {discount: 0},
      {discount: 10},
      {discount: 20},
      {discount: 30},
      {discount: 40},
      {discount: 50},
      {discount: 60},
      {discount: 70},
      {discount: 80},
    ]
    productDiscountPercentMaster(_newOffers);

    setRangeSliderVaalue([0,10000])
    let selectedMenuItem = sessionStorage.getItem("selectedMenuItem");
    
    let colorFilterArray = [];
    let sizeFilterArray = [];
    let typeFilterArray = [];
    categoryMain && categoryMain.children?.length > 0 && categoryMain.children.forEach(element => {
      typeFilterArray.push({ key: element.categoryId, checked: false });
    });
    setTypeValue(typeFilterArray);

setTimeout(() => {
if(filterData && filterData.productVariants && filterData.productVariants.length==0){
  filterData=JSON.parse(sessionStorage.getItem("filterData"))
}
    for (var i in filterData.productVariants) {
      filterData.productVariants[i].key = filterData.productVariants[i].valueName;
      filterData.productVariants[i].checked = false
    };

    let groupedFilteredData = groupBy(filterData.productVariants, 'name');
    if(Object.keys(groupedFilteredData).length>0){
const sortSize = groupedFilteredData.Size.sort((a,b)=>{
      return a.valueName-b.valueName
    })
    groupedFilteredData.Size=sortSize
  }

    setFiltersData(groupedFilteredData);
    console.log("groupedFilteredData",groupedFilteredData)
    const filtersTitle = Object.keys(groupedFilteredData)
    console.log("filtersTitle",filtersTitle)
    setVarientsTitle(filtersTitle);
  }, 1000);

  }, [filterData])



  // const handleCheck = (e, defaultCallValueInitial) => {

  //   let manuSubArray = manuIdArray;

  //   if (manuSubArray.indexOf(e.target.value) !== -1) {

  //     manuSubArray = manuSubArray.filter((manufactureId) => manufactureId != e.target.value)
  //   }
  //   else {

  //     manuSubArray.push(e.target.value)
  //   }
  //   let manuIdString = manuSubArray.toString()
  //   setManuIdArray(manuSubArray)


  //   Router.push({
  //     pathname: `/[...sid]`, query: {
  //       attribute: "",
  //       priceTo: 30000,
  //       brand: manuIdString,
  //       variantValue: "",
  //       defaultCallValue: orderBy,
  //       offset: 0,
  //       index: 0,
  //       categorySlug: categoryInitial, 
  //       categoryId: categoryIdState,
  //     }
  //   }
  //     , {
  //       pathname: `/${categoryInitial}`,
  //       query: {
  //         attribute: "",
  //         priceTo: 30000,
  //         brand: manuIdString,
  //         variantValue: "",
  //         defaultCallValue: orderBy,
  //         offset: 0,
  //         index: 0,
  //         categorySlug: categoryInitial, 
  //         categoryId: categoryIdState,
  //       },
  //     })

  //   setManuId(manuIdString.toString())

  // }

  // const handleClick = e => {

  // };

  const cookQueryParamsForCheckedVarients = (r) => {
    const entries = Object.entries(r);
console.log("entries",entries)
    let urlString = "";
    const manipulateSizeArray = ["L", "M", "S", "L", "XL", "XXL"];
    for (let i = 0; i < entries.length; i++) {
      //    console.log(entries[i][1])

      urlString = urlString + entries[i][0] + "=";

      for (let j = 0; j < entries[i][1].length; j++) {

        if (entries[i][1][j].checked) {

          if(entries[i][1][j].name == "Size" && manipulateSizeArray.includes(entries[i][1][j].key)){
            urlString = urlString + "1000"+entries[i][1][j].key + ",";
          }else if(entries[i][1][j].name == "Size" && entries[i][1][j].key.includes("*")){
            urlString = urlString + "1000"+entries[i][1][j].key.replaceAll('*', "") + ",";
          }else{
          urlString = urlString + entries[i][1][j].key + ",";
          }
        }
console.log("urlString",urlString)
        if (entries[i][1].length == j + 1) {

          r = urlString.substring(0, urlString.length - 1);
          urlString = r;

          urlString += "&"
        }
      }


    }
    const finalQueryStr = urlString.substring(0, urlString.length - 1);
    return finalQueryStr;
  }

  const cookQueryParamsForRating = (selectedRating) => {
    const checkedRating = selectedRating.filter((rating) => rating.checked);

    let urlString = "rating=";
    if (checkedRating && checkedRating.length > 0) {
      for (let i = 0; i < checkedRating.length; i++) {
        if(i==checkedRating.length-1){
          urlString = urlString+checkedRating[i].key;
        }else{
        urlString = urlString+checkedRating[i].key+",";
        }
      }
    }
    return urlString;
    
  }

  const handleCategoryPush = (action, e, categorySlug, categoryId, sizeValueFilter, colorsValueFilter, filtersDataArg, selectedRating, discountOfferId, selectedCategory,selectedsubcategory) => {
    if (action == "reset") {
      const checkBox = document.getElementsByClassName("filterCheckBox")
      for (var i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = false;
      }
      categoryMain && categoryMain.children && categoryMain.children.map(item=>{
         return item.subCategorySelected=false 
      })
      filtersDataArg = []
      //setRangeSliderVaalue([0, 10000])
      selectedRating = [];
      categoryId = [];
      rangeSliderVaalue[1] = 10000
      rangeSliderVaalue[0] = 0
      filtersData && filtersData.Color && filtersData.Color.map(item=>item.checked=false)
      filtersData && filtersData.Size && filtersData.Size.map(item=>item.checked=false)
      setFiltersData(filtersData)
      setDiscountPercentFilter("");
    }
    
    const finalFilteredQueryparams = cookQueryParamsForCheckedVarients(filtersDataArg);
    console.log("finalFilteredQueryparams",finalFilteredQueryparams)
    setCategoryInitial(categorySlug);
   const paramsForRating = cookQueryParamsForRating(selectedRating);
    // setAnkleInitial(ankleInitial)
    


    let colorFilterString = colorsValueFilter.toString();
    let sizeFilterString = sizeValueFilter.toString();
    console.log(categoryId, 'asdsadasdsa')
    let categoryFilterString = categoryId.toString();
    setInitialLoad(true)
    Router.push({
      pathname: `/[...sid]`, query: {
        attribute: searchKeywords,
        priceFrom: rangeSliderVaalue[0],
        priceTo: rangeSliderVaalue[1],
        brand: manuId,
        variantValue: "",
        defaultCallValue: orderBy,
        offset: 0,
        index: 0,
        categorySlug: categorySlug,
        categoryId: categoryFilterString,
        sizeValueFilter: sizeFilterString,
        colorsValueFilter: colorFilterString,
        finalFilteredQueryparams: finalFilteredQueryparams,
        paramsForRating,
        productDiscountPercent : action == "reset"? "" : getDiscountPercentFilter,
        discountOfferId : discountOfferId,
        selectedCategory :selectedCategory,
        selectedsubcategory:selectedsubcategory
      }
    }
      , {
        pathname: `/${categorySlug}`,
        query: {
          attribute: searchKeywords,
          priceFrom: rangeSliderVaalue[0],
          priceTo: rangeSliderVaalue[1],
          brand: manuId,
          variantValue: "",
          defaultCallValue: orderBy,
          offset: 0,
          index: 0,
          categorySlug: categorySlug,
          categoryId: categoryFilterString,
          sizeValueFilter: sizeFilterString,
          colorsValueFilter: colorFilterString,
          finalFilteredQueryparams: finalFilteredQueryparams,
          paramsForRating,
          productDiscountPercent : action == "reset"? "" : getDiscountPercentFilter,
          discountOfferId : discountOfferId,
          selectedCategory :selectedCategory,
          selectedsubcategory:selectedsubcategory
        },
      })


  }

  // const handleSizePush = (e, ankleValue) => {
  //  console.log(ankleValue)
  //   // setAnkleInitial(ankleValue)
  //   setInitialLoad(true)
  //   Router.push({
  //     pathname: `/shop/[sid]`, query: {
  //       attribute: "",
  //       priceFrom: priceMin,
  //       priceTo: maxPrice,
  //       brand: manuId,
  //       variantValue: "",
  //       defaultCallValue: orderBy,
  //       offset: 0,
  //       index: 0,
  //       categorySlug: categoryInitial, 
  //       categoryId: categoryIdState,
  //     }
  //   }
  //     , {
  //       pathname: `/shop/${{categoryInitial:reloadKey !==undefined&& reloadKey !=""?reloadKey:categoryInitial}}`,
  //       query: {
  //         attribute: "",
  //         priceFrom: priceMin,
  //         priceTo: maxPrice,
  //         brand: manuId,
  //         variantValue: "",
  //         defaultCallValue: orderBy,
  //         offset: 0,
  //         index: 0,
  //         keyword:reloadKey,
  //         categorySlug:categoryInitial, 
  //         categoryId: categoryIdState,
  //       },
  //     })


  // }

  const checkValue = (e) => {
    console.log(e)
    setRangeSliderVaalue(e)
  }

  // const priceChange = (value) => {

  //   setMaxPrice(value)

  //   Router.push({
  //     pathname: `/[...sid]`, query: {
  //       attribute: "",
  //       priceFrom: priceMin,
  //       priceTo: value,
  //       brand: manuId,
  //       variantValue: "",
  //       defaultCallValue: orderBy,
  //       offset: 0,
  //       index: 0,
  //       keyword:reloadKey,
  //       categorySlug: categoryInitial, 
  //       categoryId: categoryIdState,
  //     }
  //   }
  //     , {
  //       pathname: `/${{categoryInitial:reloadKey !==undefined&& reloadKey !=""?reloadKey:categoryInitial}}`,
  //       query: {
  //         attribute: "",
  //         priceFrom: priceMin,
  //         priceTo: value,
  //         brand: manuId,
  //         variantValue: "",
  //         defaultCallValue: orderBy,
  //         offset: 0,
  //         index: 0,
  //         keyword:reloadKey,
  //         categorySlug:categoryInitial, 
  //         categoryId: categoryIdState,
  //       },
  //     })
  // }

  // const priceChangeMin = (value) => {
  //   setPriceMin(value)

  //   Router.push({
  //     pathname: `/[...sid]`, query: {
  //       attribute: "",
  //       priceFrom: value,
  //       priceTo: maxPrice,
  //       brand: manuId,
  //       variantValue: "",
  //       defaultCallValue: orderBy,
  //       offset: 0,
  //       index: 0,
  //       categorySlug: categoryInitial, 
  //       categoryId: categoryIdState,
  //     }
  //   }
  //     , {
  //       pathname: `/${categoryInitial}`,
  //       query: {
  //         attribute: "",
  //         priceFrom: priceMin,
  //         priceFrom: value,
  //         priceTo: maxPrice,
  //         brand: manuId,
  //         variantValue: "",
  //         defaultCallValue: orderBy,
  //         offset: 0,
  //         index: 0,
  //         categorySlug: categoryInitial, 
  //         categoryId: categoryIdState,
  //       },
  //     })
  // }

  // const priceClear = () => {
  //   setPriceMin(0)
  //   setMaxPrice(10000)
  //   Router.push({
  //     pathname: `/[...sid]`, query: {
  //       attribute: "",
  //       priceFrom: 0,
  //       priceTo: 10000,
  //       brand: manuId,
  //       variantValue: "",
  //       defaultCallValue: orderBy,
  //       offset: 0,
  //       index: 0,
  //       categorySlug: categoryInitial, 
  //       categoryId: categoryIdState,
  //     }
  //   }
  //     , {
  //       pathname: `/${categoryInitial}`,
  //       query: {
  //         attribute: "",
  //         priceFrom: 0,
  //         priceTo: 10000,
  //         brand: manuId,
  //         variantValue: "",
  //         defaultCallValue: orderBy,
  //         offset: 0,
  //         index: 0,
  //         categorySlug: categoryInitial,
  //          categoryId: categoryIdState,
  //       },
  //     })
  // }

  // const onOpenChange = keys => {
  //   setOpenKeys(keys)
  // };

  useEffect(() => {
    if (selectedCategoryId.length > 0) {
      let lastIndex = selectedCategoryId.length - 1;
      const selectCat = selectedCategoryId[lastIndex].categoryId;
      setCategoryIdFinal([JSON.stringify(selectCat)])
    }

  }, [selectedCategoryId])

  const checkRating = (e, item, key, index) => {
    if (e.target.checked) {
      
      ratingMaster[index].checked = true;
      setRatingFilter(ratingMaster);

    }else{
      ratingMaster[index].checked = false;
      setRatingFilter(ratingMaster);
    }
  }

  const checkDiscountPercent = (e, value) => {
    console.log("value",value);
    setDiscountPercentFilter(value.discount);
  }
  const getTypeValue = (e, item, filterValue, filterId, funNo, index) => {

    if (e.target.checked) {
      
      if (funNo == 1) {
        
        setTypeValueFilter(arrayValue => [...arrayValue, filterId]);
        if(typeValue[index]){
        typeValue[index]["checked"] = true;
        setTypeValue(typeValue);
        console.log("typeValue",typeValue)
        }
      }
      if (funNo == 2) {

        filtersData[item][index]["checked"] = true
        setFiltersData(filtersData)
        console.log(filtersData)
      }

    } else {
      categoryMain.children.map(item=>{
        if(filterId==item.categoryId){
         return item.subCategorySelected=false 
        }
        setTypeValueFilter(arrayValue=> arrayValue.filter((i)=>(i != filterId)))
      })
      let findIndex = 0
      if (funNo == 1) {
        findIndex = typeValueFilter.findIndex(e => e == filterId);
        console.log(findIndex);
        typeValueFilter.splice(findIndex, 1);
        console.log("typeValueFilter",typeValueFilter);
        typeValue[index]["checked"] = false;
        setTypeValue(typeValue);
      }
      if (funNo == 2) {

        filtersData[item][index]["checked"] = false

        setFiltersData(filtersData)

      }

    }

    

  }


  return (
    <div className="ps-layout__left">
      <div className="ps-left-shop-subcontainer" id='filters'>
        <h2>Filter</h2>
        <div className='filter-button d-flex justify-content-between pr-3'>
        <input type="button" value="Apply" onClick={e => handleCategoryPush("apply", e, sessionStorage.getItem("parentCategorySlug"), typeValueFilter, sizeValueFilter, colorsValueFilter, filtersData, ratingFilter, sessionStorage.getItem("discountOfferId"), selectedCategory,selectedsubcategory)} />
        <input type="button" value="Reset" onClick={e => handleCategoryPush("reset", e, sessionStorage.getItem("parentCategorySlug"), typeValueFilter, sizeValueFilter, colorsValueFilter, filtersData, ratingFilter, sessionStorage.getItem("discountOfferId"))} />
        </div>
        {/* <Collapse defaultActiveKey={['1', '2']} expandIconPosition="right" className="" bordered={false}> */}
        <Collapse expandIconPosition="right" className="" bordered={false}>
         {categoryMain?.children &&
          <Panel header="Type" className="site-collapse-left-category">

            {categoryMain && categoryMain.children && categoryMain.children.length > 0 && categoryMain.children.map((subCat, i) => {
              return <>
                <div className="checkbox mb-3">
                  {subCat.subCategorySelected?
                  <input className='filterCheckBox' checked={subCat.subCategorySelected} onClick={e => getTypeValue(e, null, subCat.categorySlug, subCat.categoryId, 1, i)} type="checkbox" /> 
                  : <input className='filterCheckBox' onClick={e => getTypeValue(e, null, subCat.categorySlug, subCat.categoryId, 1, i)} type="checkbox" /> 
                  }
                  <span> {subCat.name}</span></div>
              </>
            })}





          </Panel>}
          <Panel header="Price" className="site-collapse-left-category">

            <Range
              step={10}
              min={0}
              max={10000}
              values={rangeSliderVaalue}
              onChange={(e) => checkValue(e)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc'
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div className='range-slider'
                  {...props}
                  style={{
                    ...props.style,
                  }}
                />
              )}
            />
            <div className="price-slide-input mt-3">
              <input readOnly value={" ₹ " + rangeSliderVaalue[0]} />
              <span>to</span>
              <input readOnly value={" ₹ " + rangeSliderVaalue[1]} />
            </div>

          </Panel>

          {variantsTitle && variantsTitle.length > 0 && variantsTitle.map((item, index) => {
            return <Panel header={item} className="site-collapse-left-category">

              {filtersData && filtersData[item].length > 0 && filtersData[item].map((subCat, i) => {
                return <>
                  <div className="checkbox mb-3"><input className='filterCheckBox' onClick={e => getTypeValue(e, item, subCat.key, selectedCategoryId, 2, i)} type="checkbox" defaultChecked={subCat.checked} key={i} /> <span> {subCat.key}</span></div>
                </>
              })}






            </Panel>
          })
          }


          {ratingMaster && ratingMaster.length > 0 && <Panel header={"Rating"} className="site-collapse-left-category">

            {
              ratingMaster.map((item, index) => {
                return <div className="checkbox mb-3">
                  <input className='filterCheckBox' onClick={e => checkRating(e, item, item.key, index)} type="checkbox" defaultChecked={item.checked} key={index} /> <span> {item.label}</span></div>
              })
            }
          </Panel>

          }

{getproductDiscountPercentMaster && getproductDiscountPercentMaster.length > 0 && <Panel header="Discount" className="site-collapse-left-category">

{
  getproductDiscountPercentMaster.map((item, index) => {
    return <div className="checkbox mb-3">
      <input className='filterCheckBox' checked={getDiscountPercentFilter===item.discount} onClick={e => checkDiscountPercent(e, item, item.discount, index)} type="radio" name='discountRange' value={item.discount} key={index} />  <span>{item.discount? item.discount+'% or More':'No Discount'}</span></div>
  })
}
</Panel>
}


          {/* <Panel header="BRANDS" key="3" className="site-collapse-left-category">
            {brands && brands.map((brandInner, index) => (
              <div className="brand-main-container" key={index}>
                <Checkbox onClick={e => handleCheck(e, defaultCallValueInitial)} value={brandInner.manufacturerId}>{brandInner.name}</Checkbox>
              </div>
            ))}
         
          </Panel> */}
        </Collapse>
      </div>
    </div>
  );

}

const mapStateToProps = state => {
  return state.product, state.setting;
};
export default connect(mapStateToProps)(ShopWidget);