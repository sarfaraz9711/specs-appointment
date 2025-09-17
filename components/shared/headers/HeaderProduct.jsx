import React, { Component, useEffect, useState } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { addItem } from '../../../store/cart/action';
import { imageUrl } from '../../../api/url';
import { cartAdd } from '../../helper/cartHelper';
import { addToCartApi } from '../../../api/cart/addToCart';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import Slider from 'react-slick';
import { categoryListApi } from '../../../api/product/categoryListTree';
import { colorThemeShow } from '../../helper/colorTheme';
// import {getServiceApi} from '../../../api';
import LanguageSwicher from './modules/LanguageSwicher';


function HeaderProduct({productData,productSlug,productImage}){

    const dispatch=useDispatch()
    let category=useSelector(s=>s.product)
    let currentColor=useSelector(s=>s.palette.currentColor)


// class HeaderProduct extends Component {
//     constructor(props) {
//         super(props);
//     }
// var rv = {};
//     for (var i = 0; i < productData.productImage.length; ++i)
//       rv[i] = arr[i];
//     return rv;
let image=""
let imageArray=productData&&productData.productImage
let imageObject=  {...imageArray}
// productData&&productData.productImage[0]

// function toObject(arr) {
    
//   }




const carouselSetting = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow:<PrevArrow/>,
    arrows:false
};

useEffect(()=>{
    
    categoryListApi(dispatch,2)
    // getServiceApi(dispatch)


},[])



    // useEffect(()=>{
    //     //  image=imageUrl+"?path="+productData.productImage[0].containerName+"&name="+productData.productImage[0].image 

    //     if (process.browser) {
    //         window.addEventListener('scroll', stickyHeader);
    //     }
        
    // },[])

    const handleAddItemToCart = (e,id,price,product) => {
        e.preventDefault();
      
        addToCartApi(id,price)
        // const { product } = this.props;
        
        cartAdd(product)
        dispatch(addItem(1));
    };

    const handleScroll = () => {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (number >= 300) {
            document
                .getElementById('headerSticky')
                .classList.add('header--sticky');
        } else {
            document
                .getElementById('headerSticky')
                .classList.remove('header--sticky');
        }
    };

    // render() {
        // const { productData } = "this.props";
        // const  singleProduct  = props.productData;
        return (
            <header
                className="header header--1 header--product"
                data-sticky="true"
                id="headerSticky">
                     
                   
                <div className={`header__top ${currentColor}`}>
                    <div className="ps-container">
                        <div className="header__left">
                            <Link href="/">
                                <a className="ps-logo">
                                <div className="logo-div">
                                    {/* <img
                                       src={imageUrl+"?path=storeLogo/&name=Img_1622556897722.png&width=220&height=50"}
                                        alt=""
                                    /> */}
                                    </div>
                                </a>
                            </Link>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories category={category.categories}/>
                                </div>
                            </div>
                        </div>
                        <div className="header__center">
                            {/* <SearchHeader /> */}
                        </div>
                        {/* <div className="header__newtheme_language" style={{paddingLeft:"20px",height:"30px",maxWidth: "240px"}}><LanguageSwicher/></div> */}
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                <NavigationDefault />
                
            </header>
        );

}
export default connect((state) => state.product)(HeaderProduct);
