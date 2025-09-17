import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useEffect,useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {imageUrl} from '../../../api/url';
import  Router from 'next/router';
import { Rate } from 'antd';
import {UserAddRating} from '../../../api';
import { useTranslation } from '../../../i18n'
import {modalSuccess, modalWarning} from "../../../api/intercept";
import {FileUploadComponent} from '../../../components/FileUpload'
import DisplayImageWithS3PreSignedUrl from '../../elements/AwsS3PreSignedUrl'
function ReviewComp ({orderDetailInfo,revLoader}){
    const [rateValue,setRateValue]=useState(0)
    const [review,setReview]=useState("")
    const [rateValid,setRateValid] = useState("")
    const [revValid,setRevValid] = useState("")
    const [submit,setSubmit] = useState(0)
    const [filePath, setFilePath] = useState([]);
    const { t } = useTranslation('common');


    useEffect(()=>{
        setRateValue(orderDetailInfo?.rating)
        setReview(orderDetailInfo?.review)
        if(orderDetailInfo && orderDetailInfo.reviewImages && orderDetailInfo.reviewImages.length>0){
           const images =  orderDetailInfo.reviewImages.map((item)=> item.image);
            setFilePath(images);
        }

    },[orderDetailInfo])

    console.log(orderDetailInfo,'234dsfsdfsd')
    const valid = () => {
        let validObj = {rateCheck:true,revCheck:true}
        if(rateValue === 0) {
            setRateValid("Please give rating for this product")
            validObj.rateCheck = false;
        } else {
            setRateValid("")
            validObj.rateCheck = true;
        }

        if(review.length === 0){
            setRevValid("Please type any review about this product")
            validObj.revCheck = false;
        } else {
            setRevValid("")
            validObj.revCheck = true;
        }

        if(validObj.rateCheck && validObj.revCheck) {
            return true
        } else {
            return false
        }
    }


    useEffect(()=>{
        if(submit) {
            valid()
        }
    },[rateValue,review])

    const handleReviewSubmit = (productId,orderProductId) =>{
        console.log(filePath, "Nero Helloosssss");
        setSubmit(1)
        if(valid()) {
            
            UserAddRating(productId,orderProductId,review,rateValue, filePath, "ReviewImages")
            Router.push("/account/customer-orders")
            
        }
        
    }

    const removeImage = (itemToBeRemoved) => {
        console.log(itemToBeRemoved, "sssss");
        console.log(filePath,"dsfsdfsfdsfs");
        const filteredItems =filePath && filePath.filter(item => item != itemToBeRemoved)
        setFilePath(filteredItems)
    }
   

    return(
        <section className="cus-account-container">
        <div className="cus-account-subcontainer">
            <div className="cus-position-container">
                <AccountNav keyValue={4}/>
                <div className="cus-right-position"> 
                <div className="rep-container">
                    <div className="rep-header-container">
                        <h3>{t('account.ReviewthisProduct')}  </h3>
                       
                    </div>
                    <div className="rep-det-container">
                        <div className="rep-main-det-container">
                        <div className="rep-img-container">
                        <DisplayImageWithS3PreSignedUrl imageKey={orderDetailInfo.containerName + orderDetailInfo.productImage}/>
                            <h4>{orderDetailInfo.productName}</h4>
                            {console.log(orderDetailInfo)}
                            <h5>{orderDetailInfo.currencySymbolLeft} {parseFloat(orderDetailInfo.productPrice).toFixed(0)}</h5>
                        </div>
                        <div className="rep-maindet-container">
                            <div className="rep-rate-container">
                                <h3>{t('account.RatethisProduct')} </h3>
                                <Rate value={rateValue} onChange={value=>setRateValue(value)} disabled={orderDetailInfo.isActive == 1}/>
                                {submit===1 && rateValid!=="" && <p className="error-span">{rateValid}</p>}
                            </div>
                            <div className="rep-rev-container">
                                <h3>{t('account.ReviewthisProduct')} </h3>
                                {orderDetailInfo.isActive == 1 }
                                <textarea  disabled={orderDetailInfo.isActive == 1} rows="10" cols="85" placeholder={t('account.Description')} value={review} onChange={e=>setReview(e.target.value)} style={{border:submit===1 && revValid!==""&& "1px solid red"}}/>
                                {submit===1 && revValid!=="" && <span className="error-span">{revValid}</span>}
                            </div>
                            {console.log("hello", orderDetailInfo)}
                            <div className="rep-rev-container">
                                <div className='uploaded-img-container'>
                                    {filePath && filePath.map((imageItem, imgIndex) => {
                                        console.log(imageItem, "Neeessss");
                                        return <div key={imgIndex} className='img-div'><img src={imageUrl+"?path=ReviewImages&name="+imageItem+"&width=200&height=200"}/>{orderDetailInfo.isActive == 1 ? "":
                                            <span className='remove-image' onClick={()=>{ removeImage(imageItem) }}>X</span>}</div>
                                    })}
                                    </div>
                                    {orderDetailInfo.isActive == 1 ? "":

                                <div className='img-upload-container'>
                                <FileUploadComponent setFilePath={setFilePath} fileType={"JPG, PNG"} s3Folder={"ReviewImages"}></FileUploadComponent>
                                <p>Maximum image size is 3MB</p>
                                </div>}
                            </div>
                            <div className="rep-rev-button-container">
                            {orderDetailInfo.isActive == 1 ? "" :
                                <button  className="aa-input-save-button" onClick={e=>handleReviewSubmit(orderDetailInfo.productId,orderDetailInfo.orderProductId)}> {t('account.Submit')} </button>}
                                <button  onClick={() => window.history.back()}>Back</button>

                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
        </section>
    )
}

export default ReviewComp;