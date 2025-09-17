import React, {useEffect, useState } from 'react';

import Slider from 'react-slick';
import { connect } from 'react-redux';
import Product from '../../elements/products/Product';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import { imageUrl } from '../../../api/url';
import { useTranslation } from '../../../i18n';
import { RelatedProductApi } from '../../../api/product/RelatedProductApi';

function SpurtRelatedProduct({productId,boxed}){
    const [relatedProduct, setRelatedProduct] = useState([]);
    const { t } = useTranslation("common");


    useEffect(()=>{
        RelatedProductApi(productId,setRelatedProduct)
    },[productId])
    

 
        const carouselStandard1 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 50,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    arrows: true,
        
                },
            },
        
              {
                  breakpoint: 1366,
                  settings: {
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      infinite: false,
                      arrows: true,
        
                  },
              },
              {
                  breakpoint: 767,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: false,
                      arrows: true,
        
        
                  },
              },
              {
                  breakpoint: 578,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: false,
                      arrows: true,
                  },
              },
              
        ],
    };
    //     const { boxed } = this.props;
      
    //    console.log(boxed,'boxed')

       
            
    //     const {t} = this.props
  


            
            return (
               <div className='pl-3 pr-3'>
               {
                relatedProduct&&relatedProduct.length !== 0?<>
              
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}>
                    <div className="ps-section__header">
                       
                        <h3>{t('products.RelatedProducts')}</h3>
                    </div>
                    <div className="ps-section__content sangeeta">
                        <Slider {...carouselStandard1}
                                className="ps-carousel" >
                            {relatedProduct&&relatedProduct.map((item, i) => {
                                return (
                                    <Product key={i} product={item} image={item&&item.containerName!=="/"? imageUrl+"?path="+item.containerName+"&name="+item.image+"&width=300&height=200": "/static/img/no-image.png"}/>
                                );
                            })} 
                        </Slider>
                    </div>
                   
                </div>
                </>:<>
                {/* <div>
                  <div className="ps-section__header">
                    <h3>{t("products.RelatedProducts")}</h3>
                  </div>
                  <div className="ps-section__content">
                    <p style={{ padding: "10em" }}>
                      {t("products.NoRelatedProductFound")}
                    </p>
                  </div>
                </div> */}

                </>
                 }
                </div>
            );
        

    }


export default connect(state => state.collection)(SpurtRelatedProduct);

