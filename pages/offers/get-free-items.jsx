import Head from "next/head";
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import { freeProductapi, getProductsByIdsApi } from "../../api/freeProduct/freeProduct";
import { imageUrl } from "../../api/url";
import Slider from 'react-slick';
import Product from "../../components/elements/products/Product";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { encrptData,decrptData } from '../../utilities/common-helpers';



function GetFreeItems(boxed) {
    const [data, setData] = useState();

    const breadCrumb = [
        {
            text: 'Product Offer',
        },
    ];
    const router = useRouter()
   

    useEffect(() => {
        const params = router.query
        coupen(params);
       
    }, [router.query])


    const coupen = (params) => {
        console.log(params, "Nero Params")
        if (params.cartValue) {
            freeProductapi(params).then(res => {
                setData(res)
            }).catch(error => {
                console.log("error", error)
            })
        }
        console.log(params.productids)
        if(params.productids){
            console.log(params.productids)
            getProductsByIdsApi(params).then(res => {
                setData(res)
            }).catch(error => {
                console.log("error", error)
            })
        }

    }
    const carouselStandard1 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 50,
        slidesToShow: 5,
        slidesToScroll: 1,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    let viewcurrentColor = useSelector((s) => s.palette.viewcurrentColor);

     
   
    const checkValue = (e) => {
        console.log(e)
        setRangeSliderVaalue(e)
      }

      const checkDiscountPercent = (e, value) => {
        console.log("value",value);
        setDiscountPercentFilter(value.discount);
      }
    

    const ApplyFilter = () => {

    }







    return (
        <div className="site-content">
            <Head>
                <title>Offer Products</title>
            </Head>
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />

            <div className="ps-page--shop mainBg">
                <div style={{ backgroundColor: "#f1f3f6" }}>
                    <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                </div>
                {/* <div style={{ marginTop: "16px" }}> */}

               

                {data && data.length !== 0 ? <>

                    <div
                        className={`${boxed === true ? 'boxed' : ''
                            }`}>
                        <div>

                            {/* <h3>{t('products.RelatedProducts')}</h3> */}
                        </div>
                        <div className="ps-section__content">
                            
                            <div className="row">
                                {data && data.map(item => {
                                    return (
<div className="col-md-3">
                                        <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </> : <>

                </>
                }
              

                {/* </div> */}

            </div>
            <FooterFullwidth />

        </div>
    )
}

export default GetFreeItems;