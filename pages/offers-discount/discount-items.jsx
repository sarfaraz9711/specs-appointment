import Head from "next/head";
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import { freeProductapi, getProductByDiscount, getProductsByIdsApi } from "../../api/freeProduct/freeProduct";
import { imageUrl } from "../../api/url";
import Slider from 'react-slick';
import Product from "../../components/elements/products/Product";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { encrptData,decrptData } from '../../utilities/common-helpers';
import { useSelector } from "react-redux";
import { Collapse, Tabs } from "antd";
import { Range } from "react-range";
import { TabPane } from "semantic-ui-react";
const { Panel } = Collapse;



function GetDiscountItems(boxed) {
    const [data, setData] = useState();
    const [actData, setActData] = useState([]);
    const [rangeSliderVaalue, setRangeSliderVaalue] = useState([0, 10000])
    const [getproductDiscountPercentMaster,productDiscountPercentMaster] = useState([]);
    const [getDiscountPercentFilter,setDiscountPercentFilter] = useState(0);
    const breadCrumb = [
        {
            text: 'Product Offer',
        },
    ];
    const router = useRouter()
   

    useEffect(() => {
        const params = router.query
        coupen(params);
        let _newOffers = [
            {discount: 0},
            {discount: 10},
            {discount: 20},
            {discount: 30},
            {discount: 40},
            {discount: 50},
            {discount: 60},
            {discount: 70},
            {discount: 80},
          ]
          productDiscountPercentMaster(_newOffers);
        setRangeSliderVaalue([0,10000])

        
    }, [router.query])


    const coupen = (params) => {
        console.log(params, " Params")
        console.log(decrptData(params.productids))
        if(params){
            console.log(params.productids)
            getProductByDiscount(decrptData(params.productids)).then(res => {
                setData(res)
                setActData(res)
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
        setRangeSliderVaalue(e)

      }

      const checkDiscountPercent = (e, value) => {
        console.log("value",value);
        setDiscountPercentFilter(value.discount);
      }
    

    const ApplyFilter = (val) => {
        console.log(val)
        console.log("actData",actData)
        setData([])
        if(val==1){
            console.log(rangeSliderVaalue, getDiscountPercentFilter)
        const result = actData.filter(item=>{
            return (Math.round(item.productSellingPrice)>=rangeSliderVaalue[0] && Math.round(item.productSellingPrice)<=rangeSliderVaalue[1] && item.discount>=getDiscountPercentFilter)
        })
        console.log("result",result)
        setData(result)
    }else{
        setData(actData)
    }
        
    }


    const sortFunction =(value)=>{
        console.log("value",value)
        let result=[]
        if(value=="ASC"){
            result = data.sort((a,b)=>{
                return Math.round(a.productSellingPrice)-Math.round(b.productSellingPrice)
            })
        }else if(value=="DESC"){
            result = data.sort((a,b)=>{
                return Math.round(b.productSellingPrice)-Math.round(a.productSellingPrice)
            })
        }else if(value=="NEW"){
            result = data.sort((a,b)=>{
                const dateA = new Date(a.creadtedDate)
                const dateB = new Date(b.creadtedDate)
                return dateB.getTime()-dateA.getTime()
            })
        }else if(value=="MAX"){
            result = data.sort((a,b)=>{
                return b.quantity-a.quantity
            })
        }else if(value=="DISCOUNT"){
            result = data.sort((a,b)=>{
                return a.discount-b.discount
            })
        }else if(value=="POPULAR"){
            result = data.sort((a,b)=>{
                return b.productId-b.productId
            })
        }
console.log(result)

        setData(result)
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
                <div className="row">
                    <div className="col-md-3">
                            <div className="ps-left-shop-subcontainer" id='filters'>
                                <h2>Filter</h2>
                                <div className='filter-button d-flex justify-content-between pr-3'>
                                <input type="button" value="Apply" onClick={e=>ApplyFilter(1)} />
                                <input type="button" value="Reset" onClick={e=>ApplyFilter(2)} />
                                </div>
                                    <Collapse expandIconPosition="right" className="" bordered={false}>
                                        <Panel header="Type" className="site-collapse-left-category"></Panel>
                                        <Panel header="Price" className="site-collapse-left-category">
                                        <Range
                                          step={10}
                                          min={0}
                                          max={10000}
                                          values={rangeSliderVaalue}
                                          onChange={(e) => checkValue(e)}
                                          renderTrack={({ props, children }) => (
                                          <div
                                           {...props}
                                            style={{
                                             ...props.style,
                                             height: '6px',
                                             width: '100%',
                                             backgroundColor: '#ccc'
                                             }}
                                             >
                                         {children}
                                        </div>
                                         )}
                                        renderThumb={({ props }) => (
                                        <div className='range-slider'
                                         {...props}
                                         style={{
                                         ...props.style,
                                         }}
                                        />
                                         )}
                                        />
                                         <div className="price-slide-input mt-3">
                                         <input readOnly value={" ₹ " + rangeSliderVaalue[0]} />
                                         <span>to</span>
                                         <input readOnly value={" ₹ " + rangeSliderVaalue[1]} />
                                          </div>
                                        </Panel>
                                        <Panel header="Color" className="site-collapse-left-category"></Panel>
                                        <Panel header="Size" className="site-collapse-left-category"></Panel>
                                        {getproductDiscountPercentMaster && getproductDiscountPercentMaster.length > 0 && <Panel header="Discount" className="site-collapse-left-category">

                                        {
                                          getproductDiscountPercentMaster.map((item, index) => {
                                          return <div className="checkbox mb-3">
                                          <input className='filterCheckBox' checked={getDiscountPercentFilter===item.discount} onClick={e => checkDiscountPercent(e, item, item.discount, index)} type="radio" name='discountRange' value={item.discount} key={index} />  <span>{item.discount? item.discount+'% or More':'No Discount'}</span></div>
                                        })
                                        }
                                      </Panel>
                                        }
                                    </Collapse>
                        </div>
                    </div>
                <div className="col-md-9 ps-section--default ps-related-products bgWhite">
                <div className="flex-tab-contain sortdropdown">
                            <div className="d-flex justify-content-end">
                                <p>Sort By</p>
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                            <div id="sortfilters" className="sortfilter">

                                <Tabs
                                    className={` .ant-tabs-tab-btn:focus, .ant-tabs-tab:hover, .ant-tabs-tab-btn:active, .ant-tabs-ink-bar  ${viewcurrentColor}`}
                                onTabClick={sortFunction} 
                                >
                                    <TabPane tab="" key=""></TabPane>
                                    <TabPane tab="Price Low To High" key="ASC">
                                        {" "}
                                    </TabPane>
                                    <TabPane tab="Price High To Low" key="DESC">
                                        {" "}
                                    </TabPane>
                                    <TabPane tab="New Arrival" key="NEW">
                                        {" "}
                                    </TabPane>
                                    <TabPane tab="Max Available" key="MAX">
                                        {" "}
                                    </TabPane>
                                    <TabPane tab="Discount" key="DISCOUNT">
                                        {" "}
                                    </TabPane>
                                    <TabPane tab="Popular" key="POPULAR">
                                        {" "}
                                    </TabPane>
                                </Tabs>
                            </div>

                        </div>

                {data && data.length !== 0 ? <>

                    <div
                        className={`ps-section--default ps-related-products bgWhite ${boxed === true ? 'boxed' : ''
                            }`}>
                        <div className="">

                            {/* <h3>{t('products.RelatedProducts')}</h3> */}
                        </div>
                        <div className="ps-section__content">
                            
                            <div className="row">
                                {data && data.map(item => {
                                    return (
<div className="col-md-4">
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

</div>
</div>
                {/* </div> */}

            </div>
            <FooterFullwidth />

        </div>
    )
}

export default GetDiscountItems;