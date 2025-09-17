import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
//import {ConnectPlugin} from '../../connectPlugins';
import { getCompareList } from '../../../store/compare/action';
import { formatCurrency } from '../../../utilities/product-helper';
import {productCompareApi} from '../../../api';
import {notification } from 'antd';
import { Modal } from 'antd';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import {imageUrl} from '../../../api/url';
import  Router  from 'next/router';
import ProductWishList from './productWishList';
import toast from '../../../api/toast/index'
import { priceHelpFunc } from '../../helper/priceHelper';


function ProductWide({product,key ,image,currency,crumbArray}){
    const [isQuickView,setIsQuickView]=useState(false)
    const [checkWishList,setCheckWishList] = useState(0)
    const [compareStatus,setCompareStatus] = useState(0)
    const [loadings, setloadings] = useState(false)
    const [compareTrues, setTrues] = useState(true)
    const dispatch=useDispatch()
    let currentColor=useSelector(s=>s.palette.currentColor)
    let wishListData =useSelector(s => s.wishlist)

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true)
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false) 
    };

    const modalWarnings = (type,message) => {
       
        toast({ type: type, message:"Cannot add more than 3 product" });
      
    };

    function compareCheckFunction(){
        let idArray=JSON.parse(localStorage.getItem("compareId")) ;
      
        if(idArray && idArray.length !== 0) {
            let compareCheck = idArray.some((value) => value === product.productId)
            return compareCheck
        }
    }

    const wishListFunction = () => {
        if(wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus=wishListData.wishlistItems.some((value) => value.productId === product.productId)
          
            return wishListStatus ? 1 : 0 ;
        }
    }

    useEffect(()=>{
        if(wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus=wishListData.wishlistItems.some((value) => value.productId === product.productId)
            setCheckWishList(wishListStatus ? 1 : 0)
        }
    },[wishListData])

    useEffect(()=>{
        setCompareStatus(0)
    },[compareStatus])

    const handleAddItemToCompare = (e,productId) => {
        dispatch(getCompareList(0))
        
        let data=0
        let dummy=""
        if(localStorage.getItem("compareId")!==null){
            let idArray=JSON.parse(localStorage.getItem("compareId")) 
      
        var index = idArray.indexOf(product.productId);
        
        if(index!==-1){
            let localCompareId = JSON.parse(localStorage.getItem("compareId"))
            localCompareId.splice(index,1);
            localStorage.setItem("compareId",JSON.stringify(localCompareId));
            setCompareStatus(1)
            dispatch(getCompareList(1))
            
            modalWarning('success')


        }
        else{
            idArray.push(productId)
            e.preventDefault();
           
            if(idArray&&idArray.length>3){
                modalWarnings('warning');
            }
            else{
                productCompareApi(idArray,data,dummy,dispatch,setCompareStatus,setloadings,compareTrues, setTrues)
            }
           

        }

      
        }
        else{ 
            let idArray=[]
            let dummy=""
            idArray.push(productId)
            e.preventDefault();

           
           
            if(idArray&&idArray.length>3){
                modalWarning('warning');
            }
            else{
            productCompareApi(idArray,data,dummy,dispatch,setCompareStatus,setloadings,compareTrues, setTrues)
            }

 
        }
    };

    const modalWarning = (type) => {
        // notification[type]({
        //     message: "Successfully removed a product from compare",
        //     // description: 'Please select another product',
        //     duration: 2,
        // });
        toast({ type: type, message:"Successfully removed a product from compare" });
    };

    // render() {
    //     const { product, image , currency } = this.props;
    //     let productRating = null;
    //     if (product.badge) {
    //         product.badge.map(badge => {
    //             if (badge.type === 'sale') {
    //                 return (productRating = (
    //                     <div className="ps-product__badge">{badge.value}</div>
    //                 ));
    //             } else if (badge.type === 'outStock') {
    //                 return (productRating = (
    //                     <div className="ps-product__badge.out-stock">
    //                         {badge.value}
    //                     </div>
    //                 ));
    //             } else {
    //                 return (productRating = (
    //                     <div className="ps-product__badge.hot">
    //                         {badge.value}
    //                     </div>
    //                 ));
    //             }
    //         });
    //     }

    const handleAddItemToCart = (e,id,price,product) => {
        Router.push("/product/[pid]",`/product/${product.productSlug}`)

    };
    
        return (
            <div className="ps-product ps-product--wide">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>
                        <a>
                            <img
                                src={image}
                                alt="martfury" style={{}}
                            />
                        </a>
                    </Link>
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.productSlug}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        
                        {product.rating >0?<div className="custom-product-rate-rev">
                        <div className="custom-product-rate-rev-container">
                            <div className="custom-product-rate-rev-subcontainer">
                            <p>{Math.round(product.rating)}</p>
                                <i className="fa fa-star"></i>
                            </div>
                            <span>{product.ratingCount} Ratings & {product.reviewCount}  Reviews</span>
                            </div>
                        </div>:""}
                        {product.is_sale === true ? (
                            // <p className="ps-product__price sale">
                            //     {currency ? currency.symbol+" " : '₹ '}
                            //     {product.price}
                            //     <del className="ml-1">
                            //         {currency ? currency.symbol+" " : '₹ '}
                            //         {product.sale_price}{' '}
                            //     </del>
                            // </p>
                            <p className="ps-product__price sale">
                            {currency ? currency.symbol : '₹'}
                            {formatCurrency(product.price)}
                            <del className="ml-2">
                                {currency ? currency.symbol : '₹'}
                                {formatCurrency(product.sale_price)}
                            </del>
                        </p>
                        ) : (
                            // <p className="ps-product__price">
                            //     {currency ? currency.symbol+" " : '₹ '}
                            //     {product.sale_price}
                            // </p>
                            <div>
                            {product && product.flag === "" ? <p className="ps-product__price">
                                {currency ? currency.symbol  : '₹ '}
                               
                                {/* {formatCurrency(JSON.parse(product.price)+JSON.parse(product.taxValue))} */}
                                {product.pricerefer !== "" ?formatCurrency( priceHelpFunc(JSON.parse(product.pricerefer), JSON.parse(product.taxType),product.taxValue, "")) :formatCurrency(priceHelpFunc(JSON.parse(product.price), JSON.parse(product.taxType), product.taxValue, ""))}

                            </p> : <p className="ps-product__price">
                                {/* { '₹'} */}
                                {product && product.flag === 1 && <span style={{ color: "grey", marginRight: "10px" }}><del>{currency ? currency.symbol : '₹'} {product.price}</del></span>}
                                {currency ? currency.symbol : '₹'}{product.pricerefer !== "" ? priceHelpFunc(product.pricerefer, product.taxType, product.taxValue, "") : priceHelpFunc(product.price, product.taxType, product.taxValue, "")}
                            </p>}
                        </div>
                        )}
                      
                        <div className="product-wide-desc" dangerouslySetInnerHTML={{__html: product.description.replaceAll("&amp;", "&")
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
                            .replaceAll("&pound;", "£"),}} />
                        
                        
                       
                    </div>
                    
<div className="wishlist-card">
                <ProductWishList productId={product.productId} wishListStatus={wishListFunction()}/>
                </div>
                    <div className="product-wide-actions">
                            <a
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Compare"
                                onClick={e=>handleAddItemToCompare(e,product.productId)}>
                                {compareCheckFunction() ?<img src="/static/img/compare-icon.svg" alt=""/> :  <img src="/static/img/compare-arrows.svg" alt=""/> }
                            </a>
                            <a
                                // href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                                onClick={handleShowQuickView}
                                >
                                <img src="/static/img/eye.svg" alt=""/>
                            </a>
                            <a 
                                data-toggle="tooltip"
                                data-placement="top"
                                className={`add-to-cart-btn ${currentColor}`}
                                title="Add to cart"
                                onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)}
                                >
                                    Add to cart
                            </a>
                        </div>
                </div>
                <Modal
                    title={product.title}
                    centered
                    footer={null}
                    width={1024}
                    onCancel={handleHideQuickView}
                    visible={isQuickView}>
                    <ProductDetailQuickView crumbArray={crumbArray} product={product} image={product.image&&product.image.containerName!=="/"? imageUrl+"?path="+product.containerName+"&name="+product.image+"&width=573&height=673": "/static/img/no-image.png"} handleAddItemToCompare={handleAddItemToCompare} compareCheckFunction={compareCheckFunction} wishListStatus = {wishListFunction()}/>
                </Modal>
            </div>
        );
    // }
}

const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductWide);
