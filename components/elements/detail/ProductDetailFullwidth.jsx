import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ThumbnailDefault from './modules/thumbnail/ThumbnailDefault';
import DefaultDescription from './modules/description/DefaultDescription';
//import {ConnectPlugin} from '../../connectPlugins'
import QuestionandAnswer from '../../partials/QuestionAndAnswer/QuestionandAnswer';
import { getRecentViewProducts } from '../../../api';
import NextArrow from "../../../components/elements/carousel/NextArrow";
import PrevArrow from "../../../components/elements/carousel/PrevArrow";
import Slider from "react-slick";
import Product from "../../../components/elements/products/Product";
import { imageUrl } from '../../../api/url';


const ProductDetailFullwidth = (props) => {
  

  const [recentViewProducts, setRecentViewProducts] = useState([]);
  const { singleProduct } = props.singleProduct;
  const productId = props.singleProduct.productId
  const [getActionValue, setActionValue] = useState({})
  const [sendActionValue, sendAction] = useState({})

  
  const carouselSetting1 = {
    dots: false,
    infinite: true,
    speed:2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow setActionValue={setActionValue} sendActionValue={sendActionValue} />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            arrows: true,

        },
    },

      {
          breakpoint: 1366,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
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


  useEffect(()=>{
    getRecentViewProducts(setRecentViewProducts);
  },[])

  return (
    <div>
      {singleProduct !== null && typeof singleProduct !== 'Array' ?
        <div className="ps-product--detail ps-product--fullwidth">
          <>

            <div className="ps-product__header desktop-active" style={{ maxHeight: "575px" }}>

              <ThumbnailDefault product={props.singleProduct} setvarientdefultid={props.setvarientdefultid} varientdefultid={props.varientdefultid} />

            </div>
            <DefaultDescription ratingInfo={props.ratingInfo} product={props.singleProduct} forwardedRef={props.forwardedRef} />


            <QuestionandAnswer productId={productId} />
          </>

        </div>

        : <p>No Data</p>}

<div className="recent-viewed-products">

{(recentViewProducts.length > 0) ? <>
<h3 className='ml-3'>Your recent viewed products</h3>
<Slider {...carouselSetting1} className="ps-carousel">{recentViewProducts.map((item,i) => {
  return <>
    <div key={i}>
    <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
</div>
  </>
})}</Slider></> : ""

}

</div>

    </div>
  )
}

const mapStateToProps = state => {
  return state.product;
};

export default connect(mapStateToProps)(ProductDetailFullwidth);
