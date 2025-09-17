import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addItemToWishlist } from '../../../store/wishlist/action';
import Link from 'next/link';
import { Modal } from 'antd';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import Rating from '../Rating';

import { formatCurrency } from '../../../utilities/product-helper';
import { imageUrl } from '../../../api/url';
import { useState } from 'react';
import { AddWishlist } from '../../../api/wishlist/addWishlist';
import ProductWishList from './productWishList';
//import {ConnectPlugin} from '../../connectPlugins';

function ProductDealOfDay({product,image,name}){
    const [isQuickView,setIsQuickView]=useState(false)
    const dispatch=useDispatch()
    const currency=""


    const handleAddItemToCompare = e => {                   
        e.preventDefault();
       
    };


    const handleShowQuickView = e => {
        e.preventDefault();
        setIsQuickView(true)
    };

    const handleHideQuickView = e => {
        e.preventDefault();
        setIsQuickView(false)
    };

        return (
            <div className="ps-product ps-product--inner">
               
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>
                        <a>
                            {/* <LazyLoad> */}
                                <img src={product.Images&&product.Images.containerName!=="/"?image:"/static/img/no-image.png"} alt="martfury" style={{height:"200px",width:"195px"}}/>
                            {/* </LazyLoad> */}
                        </a>
                    </Link>
                    {product.badge ? productBadge : ''}
                    <ul className="ps-product__actions">
                        <li>
                        <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>

                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add to cart"
                                // onClick={e=>handleAddItemToCart(e,product)}
                                >
                                <i className="icon-bag2"></i>
                            </a>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                                onClick={e=>handleShowQuickView(e,product)}>
                                <i className="icon-eye"></i>
                            </a>
                        </li>
                        <li>
                            <ProductWishList productId={product.productId} wishListStatus={product.wishListStatus}/>
                            {/* <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add to wishlist"
                                onClick={e=>handleAddItemToWishlist(e,product.productId)}>
                                <i className="icon-heart"></i>

                                <i className="fa fa-heart" style={{color:"yellow"}}></i>
                            </a> */}
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Compare"
                                onClick={e=>handleAddItemToCompare(e)}>
                                <i className="icon-chart-bars"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ps-product__container">
                    {/* <Link href="/shop">
                        <a className="ps-product__vendor">{product&&product.name}</a>
                    </Link> */}
                    <div className="ps-product__content">
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : '₹'}
                                {formatCurrency(product.price)}
                                <del className="ml-2">
                                    {currency ? currency.symbol : '₹'}
                                    {formatCurrency(product.sale_price)}
                                </del>
                                <small>18% off</small>
                            </p>
                        ) : (
                            <p className="ps-product__price">
                                {currency ? currency.symbol : '₹'}
                                {formatCurrency(product.price)}
                            </p>
                        )}
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.productSlug}`}>
                            <a className="ps-product__title">{name}</a>
                        </Link>

                        <div className="ps-product__rating">
                            <Rating rating={product.rating}/>
                            <span>{product.rating}</span>
                        </div>
                        <div
                            className="ps-product__progress-bar ps-progress"
                            data-value={product.inventory}>
                            
                        </div>
                    </div>
                </div>
                <Modal
                    title={product.name}
                    centered
                    footer={null}
                    width={1024}
                    onCancel={handleHideQuickView}
                    visible={isQuickView}>
                    <ProductDetailQuickView product={product} image={product.image&&product.image.containerName!=="/"? imageUrl+"?path="+product.containerName+"&name="+product.image+"&width=200&height=400": "/static/img/no-image.png"}/>
                </Modal>
            </div>
        );
    
}
const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductDealOfDay);
