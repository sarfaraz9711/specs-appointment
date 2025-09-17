import React from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import ThumbnailImage from '../elements/ThumbnailImage';
import { useState } from 'react';
import { useEffect } from 'react';
import { imageUrl } from '../../../../../api/url';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { videoUrl } from '../../../../../api/url';
import axios from 'axios';
import { Router } from '../../../../../i18n';
import { getProductDetApi } from '../../../../../api';
import { any } from 'prop-types';
import { promotionFlagData } from '../../../../../utilities/common-helpers';
import ProductWishList from '../../../products/productWishList';
import DisplayImageWithS3PreSignedUrl from '../../../AwsS3PreSignedUrl';
// import ProductDetailQuickView from '../../ProductDetailQuickView';

function ThumbnailDefault({ product, setvarientdefultid }) {
    const varientdefultid = useSelector((s) => s.product.sliderdataimage);
    const [galleryCarousel, setGalleryCarousel] = useState(null)
    const [variantCarousel, setVariantCarousel] = useState(null)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [playerVideo, setPlayerVideo] = useState(true)
    const [imagesliders, setimagesliders] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [offer, setOffer] = useState("")
    const [getItemActive, setItemActive]=useState(0)
    const [getVideoPlay, setVideoPlay] = useState(false)
    
    let wishListData = useSelector(s => s.wishlist)
    let slider1 = ""
    let slider2 = ""
    let arrarpus = []


    useEffect(() => {
        setPlayerVideo(true)
        setimagesliders([])
        setimagesliders(varientdefultid)
    }, [varientdefultid])


    const handleOpenLightbox = (e, imageIndex) => {
        e.preventDefault();
        setIsOpen(true)
        setPhotoIndex(imageIndex)


    };

    useEffect(() => {
        setVariantCarousel(slider2)
        setGalleryCarousel(slider1)

    }, [slider1, slider2])


    const gallerySetting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <></>,
        prevArrow: <></>,
    };

    const variantSetting = {
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
        ],
    };
    // console.log(varientdefultid,'varientdefultid')
    const productImages = [];
    const varientdefultidtt = []
    // if(varientdefultid.length>0){


    //     varientdefultidtt.push(varientdefultid[varientdefultid.length - 1])
    //        varientdefultidtt.push(product.productImage[product.productImage.length - 1])


    // }
    if (varientdefultid && varientdefultid.length > 0) {

        varientdefultid && varientdefultid.map(variant => {
            console.log("variant",variant)
            {console.log("2222",`${process.env.NEXT_PUBLIC_S3_BUCKET_CF_URL}/${variant.containerName}${variant.image}`)}
            productImages.push(`${process.env.NEXT_PUBLIC_S3_BUCKET_CF_URL}/${variant.containerName}${variant.image}`);
        })

    }




    // product&&product.productImage&&product.productImage.map(variant => {



    //         if(varientdefultid.length>0){


    //         }else{
    //             productImages.push(imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=500&height=500");

    //         }






    // });

    const tamnailmethods = (variant, i) => {

        setimagesliders([])
        setItemActive(i)


        arrarpus.push(variant)


        console.log(arrarpus, 'variant423413', i);
        if (arrarpus) {
            setVideoPlay(false)
            setimagesliders(arrarpus)
        }



        setPlayerVideo(true)
    }

    // const store = [..._REACT_DEVTOOLS_GLOBAL_HOOK.reactDevtoolsAgent.internalInstancesById.values()].find(e=>e.elementType.name==="Provider").pendingProps.store
    const offerProduct = useSelector((s) => s.product.singleProduct);
    

    const getOfferProduct = (product) =>{
        
        Router.push("/product/[pid]", `/product/${product.promotionProductSlug}`);
        // Router.push("/product/")
    
        
    }

    const wishListFunction = () => {
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value) => value.productId === product.productId)

            return wishListStatus ? 1 : 0;
        }
    }

    const sliderImageMove = (data, action)=>{
        const getNumber=getItemActive
        const check=false
        setVideoPlay(false)
        if(action==1 && getNumber<(data.length-1)){
            setimagesliders([])
            getNumber++
            arrarpus.push(data[getNumber])
            setItemActive(getNumber)
            check=true
        }else if(action==2 && getItemActive!=0){
            setimagesliders([])
            getNumber--
            arrarpus.push(data[getNumber])
            setItemActive(getNumber)
            check=true
        }else{
            if(!getVideoPlay && action==1 && product.productVideo && product.productVideo.path){
            setVideoPlay(true)
            }else{
                setimagesliders([])
                arrarpus.push(data[0])
                setItemActive(0)
                check=true
            }
        }

        if (check) {
            setimagesliders(arrarpus)
        }
        setPlayerVideo(true)
    }
    return (
        <div className="ps-product__thumbnail" data-vertical="true">
            <div className="heart-icon hide-eve-icon-popup">
                <ProductWishList productId={product.productId} wishListStatus={wishListFunction()} />
            </div>
            {/* {offerProduct.promotionFlag == 1 && offerProduct.promotionProductYid == 573 && offerProduct.promotionType == "buy_x_and_get_y_free" &&
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>By one get one free</div>  } */}

            {offerProduct.promotionFlag == 1 &&
                <div className='promotion-text_thumbnail'>
                {promotionFlagData(offerProduct.promotionType)}</div>
            }
            <figure><>


                <div className="ps-wrapper " >
                    {playerVideo === true ? <>
                        <h4 className='mt-3 mb-0 mobile-active'>{product.name}</h4>
                        <Slider {...gallerySetting} className="ps-product__gallery ps-carousel inside">
                            <div className="item" >
                                <div className='product-slider-image product-slider-image-left' onClick={e=>sliderImageMove(varientdefultid,1)}><i class="icon-chevron-right" aria-hidden="true"></i></div>
                                <div className='product-slider-image product-slider-image-right' onClick={e=>sliderImageMove(varientdefultid,2)}><i class="icon-chevron-left" aria-hidden="true"></i></div>
                                <a
                                    href="#"
                                    className="product-detail-image-anchor nero"
                                    onClick={e =>
                                        handleOpenLightbox(e, getItemActive)
                                    }>

                                    {(imagesliders && imagesliders[0] && !getVideoPlay) ? <>

                                        <DisplayImageWithS3PreSignedUrl 
                                imageKey={imagesliders[0].containerName+imagesliders[0].image} 
                                resizeRequired="NO" 
                                alt={imagesliders[0].image && imagesliders[0].image.length < 40 ? imagesliders[0].image : imagesliders[0].image && imagesliders[0].image.substring(0, 40) + "..."}
                                />
                                    </>:<div className='videorapper'>
                            {product && product.productVideo && product.productVideo.type === 1 ? <><ReactPlayer width="100%"
                                height="400px" url={`${videoUrl}/${product.productVideo.path}${product.productVideo.name}`} controls={true} /></> : <>

                                {product && product.productVideo && product.productVideo.path && <iframe width="320" height="240" frameborder="0" allowfullscreen="allowfullscreen" src={product.productVideo.path} title="description"></iframe>}

                            </>}
                        </div>}
                                </a>
                            </div>
                        </Slider></> :
                        <><div className='videorapper'>
                            {product.productVideo.type === 1 ? <><ReactPlayer width="100%"
                                height="400px" url={`${videoUrl}/${product.productVideo.path}${product.productVideo.name}`} controls={true} /></> : <>

                                <iframe width="320" height="240" frameborder="0" allowfullscreen="allowfullscreen" src={product.productVideo.path} title="description"></iframe>

                            </>}
                        </div></>}

                </div>

            </>
            </figure>
            <>

                {/* {(galleryCarousel !==null && galleryCarousel!=="")} */}

                <div className='slllld'>
                    <div className='video1'> <>

                        <Slider
                            // asNavFor={galleryCarousel}
                            // ref={slider => (setVariantCarousel(slider))}
                            // swipeToSlide={true}
                            // arrows={false}
                            slidesToShow={productImages.length}
                            vertical={true}
                            focusOnSelect={false}
                            {...variantSetting}
                            className="ps-product__variants"
                        >

                            {varientdefultid && varientdefultid.map((variant, i) => (
                                <div className={getItemActive==i?"item active":"item"} key={variant.productId} onClick={e => tamnailmethods(variant, i)} >

                                    <ThumbnailImage containerName={variant.containerName} image={variant.image} type={"small"} />
                                    {/* <DisplayImageWithS3PreSignedUrl
                                        imageKey={variant.containerName + variant.image}
                                        resizeRequired="NO"
                                        style={{ height: "100%", width: "100%"}}
                                    
                                    /> */}
                                </div>

                            ))}

                        </Slider>
                    </>
                    </div>
                    {product && product.productVideo && product.productVideo.type !== null && product && product.productVideo && product.productVideo.path !== null && <div className='video2'>  <img src="/static/img/vp (1).png" onClick={e => setPlayerVideo(false)} /></div>}

                </div>
                {/* <a onClick={e=>setPlayerVideo(false)}>chanfeview</a> */}

            </>

            {isOpen && (

                <Lightbox
                    mainSrc={productImages[photoIndex]}
                    nextSrc={
                        productImages[
                        (photoIndex + 1) % productImages.length
                        ]
                    }
                    prevSrc={
                        productImages[
                        (photoIndex + productImages.length - 1) %
                        productImages.length
                        ]
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + productImages.length - 1) %
                            productImages.length,)
                        // this.setState({
                        //     photoIndex:
                        //         (photoIndex + productImages.length - 1) %
                        //         productImages.length,
                        // })
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % productImages.length)
                        // this.setState({
                        //     photoIndex:
                        //         (photoIndex + 1) % productImages.length,
                        // })
                    }
                />
            )}


        </div>

    );
    // }
}

export default ThumbnailDefault;