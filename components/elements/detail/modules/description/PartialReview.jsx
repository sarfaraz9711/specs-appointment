import React from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';
import { useEffect , useRef} from 'react';
import { useState } from 'react';
import DateRev from '../../../../partials/account/modules/DateReview';
import { imageUrl } from '../../../../../api/url';
import { useTranslation } from '../../../../../i18n'
import { Rate } from 'antd';
import {Modal} from 'antd';
import Slider from 'react-slick';
import NextArrow from '../../../carousel/NextArrow';
import PrevArrow from '../../../carousel/PrevArrow';
import DisplayImageWithS3PreSignedUrl from "../../../../../components/elements/AwsS3PreSignedUrl";
function PartialReview({ ratingInfo}) {
    
const { t } = useTranslation('common');
const [isQuickView, setIsQuickView] = useState(false)
const [data, setdata] = useState("")

const handleShowQuickView = async (e, reviewImageItem) => {
    e.preventDefault();
    setdata(reviewImageItem)
    console.log(reviewImageItem, "review image")
    setIsQuickView(true)
};

const handleHideQuickView = (e) => {
    e.preventDefault();
    setIsQuickView(false)
};
const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    autoplaySpeed: 4000,
  };
    return (
        <>
        { ratingInfo && ratingInfo.length !== 0 ?
             <div className="row">
                 
                 
                 <div className=" "  >
                     <form className="ps-form--review reviewsides" action="/" method="get">
                        
                         {ratingInfo && ratingInfo.map((customer, index) => {
                             return (
 
                                 <div key={index} className='review-list-item-content flex'>
                                    
                                     <div className='rlic-img'>
                                         {customer.avatar !==null?<>
                                             <img src={imageUrl + "?path=" + customer.avatarPath + "&name=" + customer.avatar + "&width=1900&height=1000"} />
                                         </>:<>
                                         {
                                             <h1 className='profileImage'>
                                                 {customer.firstName.charAt(0)}
                                             </h1>
                                         }
                                                                         </>
                                         }
                                         
                                     </div>
                                     <div className='rlic-content'>
                                         <h4>{customer.firstName}</h4><h5 ><DateRev dateCarry={customer && customer.createdDate}  /></h5>
                                         {/* <div className="custom-product-rate-rev-subcontainer">
                                             <p>{customer.rating}</p>
                                             <i className="fa fa-star">{customer.rating}</i>
                                         </div> */}
                                          <div className="flex star-count">
                                      <div className="strlist flex">
                                        <Rate
                                          allowHalf
                                          defaultValue={customer.rating}
                                          disabled={true}
                                        />
                                      
                                      </div>
                                      </div>
                                        
                                         {customer.review !== null && <div>
                                            {console.log("customer data>>>>",customer)}
                                            {customer.isCommentApproved == 1 &&
                                             <p className='rlic-msg'>{customer.review}</p>
                                            }
                                            <div class="product-details-review-images">
                                             {customer.reviewImages.map((reviewImageItem, index)=>{
                                                return<>{index < 3 && 
                                                 <div  onClick={(e) => handleShowQuickView(e, customer)} key={index} className='img-div'>
                                                    <DisplayImageWithS3PreSignedUrl styleClass = "categoryimage" imageKey={reviewImageItem.containerName+reviewImageItem.image} resizeRequired="NO" />
                                                    {/* <img src={imageUrl+"?path="+reviewImageItem.containerName+"&name="+reviewImageItem.image+"&width=100&height=80"}/> */}
                                                </div>
                                                }
                                                </>
                                             })}
                                               {customer.reviewImages.length>3 && <span   onClick={(e) => handleShowQuickView(e, customer)} className='reviewmore-image'>{customer.reviewImages.length>3 && customer.reviewImages.length-3+'+'}</span>}
                                            </div>
                                             
                                    
                            </div>}
                                 </div>
                     </div>
                     )})}
              
             </form>
             </div >
         </div >
         : <div className=" "><p>{t('products.NoReviewFound')}</p></div>
                                         }
                                         
         <Modal
                // title={product.title}
          centered
          footer={null}
          width={900}
          onCancel={handleHideQuickView}
          visible={isQuickView}>
          <div>
             <div className='d-flex' style={{width:"100%", height:"520px"}}>
                <div style={{width:"75%",margin:"10px", backgroundColor:"#979da3"}}>
                {data.review !== null && <div className='reviewimageslider'>
                    
                    <Slider {...carouselSetting} className="ps-carousel">
                       {data.reviewImages?.map((reviewImageItem, index)=>{
                           return <div  className='review-img'>
                            <DisplayImageWithS3PreSignedUrl styleClass = "categoryimage" imageKey={reviewImageItem.containerName+reviewImageItem.image} resizeRequired="NO" />
                                                    
                            {/* <img  key={index} src={imageUrl+"?path="+reviewImageItem.containerName+"&name="+reviewImageItem.image+"&width=150&height=150&resize_required=NO"}/> */}
                           </div>
                        })}
                   </Slider>
                   </div>
                   }
                </div>
                <div style={{width:"25%", margin:"10px"}}>
                {data.reviewImages?.length >= 1 &&
                    <div>
                         <div className="strlist flex">
                                        <Rate
                                          allowHalf
                                          defaultValue={data.rating}
                                          disabled={true}
                                        />
                                      
                                      </div>
                    <p className='rlic-msg' >{data.review}</p>
                    </div>}
                
                </div>
                </div> 
          </div>
        </Modal>
        </>
 )
}

export default PartialReview;