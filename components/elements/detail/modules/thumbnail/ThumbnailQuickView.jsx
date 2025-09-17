import React, { Component } from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';
import NextArrow from '../../../carousel/NextArrow';
import PrevArrow from '../../../carousel/PrevArrow';
import ProductWishList from '../../../products/productWishList';



class ThumbnailQuickView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryCarousel: null,
            variantCarousel: null,
        };
    }

    componentDidMount() {
        this.setState({
            galleryCarousel: this.slider1,
            variantCarousel: this.slider2,
        });
    }

    render() {
        const gallerySetting = {
            dots: false,
            infinite: true,
            speed: 400,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        const { product,image,wishListStatus } = this.props;
        return (
            <div className="ps-product__thumbnail" data-vertical="false">
               
                
                <figure>
                    <div className="ps-wrapper">
                        {/* <Slider
                            {...gallerySetting}
                            className="ps-product__gallery ps-carousel inside">
                                <div className="item">
                                    <a href="#">
                                        <ThumbnailImage url={image}/>
                                    </a>
                                </div>
                        </Slider> */}
                        {/* <figure>
                    <div className="ps-wrapper"> */}
                                <div className="item" style={{maxHeight:"525px"}}>
                                    <a href="#">
                                        <img
                                          src={ `${image}`}
                                          alt=""
                                          style={{margin:"auto",maxHeight:"525px"}}
                                        />
                                    </a>
                                </div>
                    {/* </div>
                </figure> */}
                    </div>
                    <div className="wishlist-card">
                <ProductWishList productId={product.productId} wishListStatus={wishListStatus}/>
            </div>
                </figure>
            </div>
        );
    }
}

export default ThumbnailQuickView;
