import React from 'react';
import Link from 'next/link';
import { imageUrl } from '../../../api/url';
import OptionNameDisplay from '../../shared/headers/modules/optionNamePar';
//import {ConnectPlugin} from '../../connectPlugins';


const ProductCart = ({ product,type }) => {
    return ( 
        <div>
        {type==="cart"?<div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>
                    <a>
                        {/* <LazyLoad> */}
                            <div className="ps-product__thumbnail-custom-img">
                            {product.processImage?<img src={ imageUrl+"?path="+product.processImage.containerName+"&name="+product.processImage.name+"&width=200&height=400"}  alt="martfury"/>:<img src={ imageUrl+"?path="+product.containerName+"&name="+product.image+"&width=200&height=400"}  alt="martfury"/>}
                            </div>

                        {/* </LazyLoad> */}
                    </a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
                <OptionNameDisplay optionName={JSON.parse(product&&product.optionName)}/>
            </div>
        </div>:
        <div className="ps-product--cart">
        <div className="ps-product__thumbnail">
            <Link href="/product/[pid]" as={`/product/${product.product.productSlug}`}>
                <a>
                    {/* <LazyLoad>
                    {product.productImage&&product.productImage.containerName!=="/"?<img src={ imageUrl+"?path="+product.productImage.containerName+"&name="+product.productImage.image+"&width=200&height=400"}  alt="martfury"/>:<img src={"/static/img/no-image.png"}  alt="martfury"/>}

                    </LazyLoad> */}
                    <div className="ps-product__thumbnail-custom-img">
                        {product.productImage&&product.productImage.containerName!=="/"?<img src={ imageUrl+"?path="+product.productImage.containerName+"&name="+product.productImage.image+"&width=200&height=400"}  alt="martfury"/>:<img src={"/static/img/no-image.png"}  alt="martfury"/>}
                    </div>
                </a>
            </Link> 
        </div>
        <div className="ps-product__content">
            <Link href="/product/[pid]" as={`/product/${product.product.productSlug}`}>
                <a className="ps-product__title">{product.product.name}</a>
            </Link>
        </div>
    </div>
        }
        </div>
    );
};

export default ProductCart;
