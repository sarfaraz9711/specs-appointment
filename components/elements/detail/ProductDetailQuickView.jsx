import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import ThumbnailQuickView from './modules/thumbnail/ThumbnailQuickView';
import InformationQuickView from './modules/information/InformationQuickView';
import InformationDefault from './modules/information/InformationDefault';
import ThumbnailDefault from './modules/thumbnail/ThumbnailDefault';

const ProductDetailQuickView = ({ product,image,wishListStatus,crumbArray,compareCheckFunction,handleAddItemToCompare ,data}) => ( 
    <div className="ps-product--detail ps-product--quickview" style={{height:"370px"}}>
        <div className="ps-product__header">
        <ThumbnailDefault product={data} image={image} wishListStatus={wishListStatus} />
        {/* <ThumbnailDefault product={props.singleProduct} setvarientdefultid={props.setvarientdefultid} varientdefultid={props.varientdefultid} /> */}
        {console.log("jhhhhhhhhhhh",product)}
        <InformationDefault product={product} crumbArray={crumbArray} compareCheckFunction={compareCheckFunction} handleAddItemToCompare={handleAddItemToCompare} /> 
            {/* <ThumbnailQuickView product={product} image={image} wishListStatus={wishListStatus}/>
            <InformationQuickView product={product} crumbArray={crumbArray} compareCheckFunction={compareCheckFunction} handleAddItemToCompare={handleAddItemToCompare}  /> */}
        </div>
    </div>
);

export default ProductDetailQuickView;
