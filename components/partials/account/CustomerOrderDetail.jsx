import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useEffect, useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import { imageUrl } from '../../../api/url';
import Router from 'next/router';
import { orderExportApi, orderCancelApi, returnOrderApi, getPaymentPluginId, migOrderInvoiceApi,fileDownload, returnFullOrder, getOrderHistoryStatus } from '../../../api';
import { useTranslation } from '../../../i18n';
import { trackOrderStatusApi, getReplacementProductOption } from '../../../api';
import { message, Steps } from 'antd';
import Loader from '../../shared/Loader';
import { priceHelpFunc } from '../../helper/priceHelper';
import { modalSuccess, modalWarning } from '../../../api/intercept';
import { Modal} from 'react-bootstrap';
import DisplayImageWithS3PreSignedUrl from '../../elements/AwsS3PreSignedUrl'
const { Step } = Steps


function CustomerOrderDetail({ orderDetailInfo }) {


    const [imgLoadId, setImgLoadId] = useState("");
    const [loadImg, setLoadImg] = useState(false);
    const [itemsBasePriceTotal, setItemsBasePriceTotal] = useState(0);
    const [itemsTotalTax, setitemsTotalTax] = useState(0);
    const [taxAndBasePriceTotal, setTaxAndBasePriceTotal] = useState(0);
    const [wStaxAndBasePriceTotal, setWsTaxAndBasePriceTotal] = useState(0);
    const [productPromotionTotal, setProductPromotionTotal] = useState(0);
    const [cartValuePromotionTotal, setCartValuePromotionTotal] = useState(0);
    const [couponBasedPromotionTotal, setCouponBasedPromotionTotal] = useState(0);
    const [getCreditNoteDiscount, setCreditNoteDiscount] = useState(0);
    const [getPrepaidAmountWithCn, setPrepaidAmountWithCn] = useState(0);
    
    const [getLoyaltyPointDiscount, setLoyaltyPointDiscount] = useState(0);
    const [prepaidOrderDiscount, setPrepaidOrderDiscount] = useState(0);
    const [productDiscountTotal, setProductDiscountTotal] = useState(0);
    const [orderTotalDiscount, setOrderTotalDiscount] = useState(0);
    const [isCancelActive, setIsCancelActive] = useState(false)
    const [isReturnActive, setIsReturnActive] = useState("")
    const [openRemark, setOpenRemark] = useState(false)
    const [cancelReason, sertCancelReason] = useState("")
    const [canceltBtn, setCanceltBtn] = useState(false)
    const [remarktBtn, setRemarktBtn] = useState(false)
    
    const [openReturnRemark, setOpenReturnRemark] = useState(false)
    const [returnReason, setReturnReason] = useState("")
    const [returnRemarkValue, setReturnRemarkValue] = useState("")
    const [actionMessage, setActionMessage] = useState({ 'className': '', 'message': '', 'active': false })
    const [cancelRemarks, setCancelRemarks] = useState("")
    const [isLoaderActive, setLoaderActive] = useState(false)
    const [remark , setRemark] = useState()
    const [isModalOpen, setIsModalOpen]=useState(false)
    const [isreturnModal, setIsreturnModal] = useState(false)
    const [isFullReturnActive, setIsFullReturnActive] = useState(false)
    const [orderHistoryOn, setOrderHistoryOn] = useState(false)
    
    const { t } = useTranslation('common');

    const [currentDelivery, setCurrentDelivery] = useState(0)
    const [orderstatus, setOrderStatus] = useState()
const [checkMigOrder, setCheckMigOrder]=useState(true)
const [returnType, selectReturnType] = useState("");
const [fullOrderCancelFlag, setFullOrderCancelFlag] = useState(false);
const [promoAvailableInOrder, setPromoAvailableInOrder] = useState(false);
const [getReplacementProductData, setReplacementProductData] = useState([])
const [getReplacementProductDetails, setReplacementProductDetails]=useState({})
const [orderHistoryJson, setOrderHistoryJson]=useState([])
const [orderCancelPopup, setOrderCancelPopup]= useState(false)
const [orderReturnPopup, setOrderReturnPopup]= useState(false)
const [getReturnProductList, setReturnProductList]= useState([])
const [getReturnRefundAmountSum, setReturnRefundAmountSum]= useState(0)
const [productList, setProductList]=useState([])
const [refundAmountSum, setRefundAmountSum]=useState(0)
const [getCancelButtonActive, setCancelButtonActive] = useState(false)
const [getReturnButtonActive, setReturnButtonActive] = useState(false)
const [isInvoiceActive, setIsInvoiceActive] = useState(false)
const [getReturnButtonDisabled, setReturnButtonDisabled]=useState(false)
    useEffect(() => {
        // ordertrack();
        // showPaymentDetails();
        setCheckMigOrder(moment(orderDetailInfo.createdDate).isAfter('2023-09-19'))
        setRefundAmountSum(0)
        console.log("orderDetailInfo",orderDetailInfo)
        const filterCreditNote =  orderDetailInfo && orderDetailInfo.appliedDiscounts.length>0 && orderDetailInfo.appliedDiscounts.filter(item=>(item.promotionType=='CreditNote' || item.promotionType=='ProductBased'))
        const todayDate = new Date()
        orderDetailInfo && orderDetailInfo.productList.length>0 && orderDetailInfo.productList.forEach(element => {
            if(element.orderStatusId == 1 || element.orderStatusId == 2 || element.orderStatusId == 3){
                setCancelButtonActive(true)
            }
            console.log('date validation',moment().diff(moment('2024-12-29 12:30:36'), "days") < 10)
            if(element.deliveredDate){
                setIsInvoiceActive(true)
            }
            if(element.orderStatusId == 5 && (moment().diff(moment(element.deliveredDate), "days") < 10)){
                setReturnButtonActive(true)
            }
            if(orderDetailInfo.paymentMethod==2 && element.orderStatusId==5 && false){
                setRefundAmountSum(item=>{
                    console.log("item",item)
                    return item+element.refundAmount
                })
            }
            console.log("filterCreditNote",filterCreditNote)
            if(filterCreditNote.length>0 && element.orderStatusId==5){
                setProductList(item=>{
                    const newItems =   [...item]
                    newItems.push(element)
                    console.log("newItems",newItems)
                    return newItems
                  })
            }
        });

    }, [orderDetailInfo,actionMessage])

    const ordertrack = async () => {
        if (orderDetailInfo?.orderId) {
            let res = await trackOrderStatusApi(orderDetailInfo?.orderId);
            console.log("order", res);


            if (res.length !== 0) {
                let deliveryArray = res.filter((order) => order.transactional_date !== "")
                setCurrentDelivery(deliveryArray.length)
                setOrderStatus(res)

            }
        }
    }


    const showPaymentDetails = async () => {
        let _paymentId = orderDetailInfo?.paymentMethod;
        let payDetails = await getPaymentPluginId(_paymentId);
        console.log("payDetails", payDetails);
    }

    const ProductRoute = (productSlug) => {
        if(productSlug){
        Router.push("/product/[pid]", `/product/${productSlug}`)
        }else{
            Router.push('/')
        }
    }

    const getPdfData = (id, prefixid) => {
        setLoaderActive(true)

        orderExportApi(id, prefixid, setLoaderActive)
        setImgLoadId(id)
    }

const getMigInvoice = async (orderPrefixId)=>{
    setLoaderActive(true)
    const fileUrl = await migOrderInvoiceApi(orderPrefixId)
    console.log("fileUrl",fileUrl);
    if(fileUrl.status==200){
    let _bufferBase = Buffer.from(fileUrl.data.s3FileKey,"utf8").toString('base64');
    fileDownload(_bufferBase)
    }else{
        message.warning("Please contact to Admin for Invoice")
    }
    setLoaderActive(false)
}
    const cancelOption = () => {
        if (isCancelActive) {
            setIsCancelActive(false)
            setCanceltBtn(false)
        } else {
            setIsCancelActive(true)
        }
    }
    const fullReturnOption = () => {
        if (isFullReturnActive) {
            setIsFullReturnActive(false)
            setCanceltBtn(false)
        } else {
            setIsFullReturnActive(true)
        }
    }

    const selectReason = (e) => {
        sertCancelReason(e.target.value)
        if (e.target.value) {
            // setOpenRemark(true)
            setCanceltBtn(true)
        } else {
            setCanceltBtn(false)
        }
    }

    const setCancelRemark = (e) => {
        setCancelRemarks(e.target.value)
        if (e.target.value) {
            setRemarktBtn(true)
        }else{
            setRemarktBtn(false)
        }


    }

const handleCancel = ()=>{
    setIsModalOpen(false)
    setIsreturnModal(false)
}



const handleOk = ()=>{
    cancelOrder()
}
    const cancelOrder = () => {

     console.log("productList",productList)
     let cancelData=[]
     if(productList.length==0 && (getCreditNoteDiscount>0 || productPromotionTotal>0)){
        cancelData=orderDetailInfo.productList
     }else{
        cancelData=productList
     }
     let length=cancelData.length
     const cancelList=[]
     for(let i=0; i<length; i++){
        cancelList.push({
            orderId: orderDetailInfo.orderId,
            orderPrefixId: orderDetailInfo.orderPrefixId,
            orderProductId:cancelData[i].orderProductId,
            productId:cancelData[i].productId,
            customerId:orderDetailInfo.customerId,
            totalAmount:cancelData[i].refundAmount,
            cancelRequestReason: cancelReason,
            cancelRequestRemark: cancelRemarks,
            paymentMethod:orderDetailInfo.paymentMethod,
            itemCode: cancelData[i].itemCode,
            cancelRequestStatus:orderDetailInfo.paymentMethod==2?'CancelledCODOrder':'Pending'
        })
     }

     console.log("cancelList",cancelList)
     
        
        
        if(cancelRemarks.length <= 200){
            setLoaderActive(true)
        orderCancelApi(cancelList, setLoaderActive).then(res => {
            setIsModalOpen(false)
            setOrderCancelPopup(false)
            if (res.status==200) {
                let message
                if(orderDetailInfo.paymentMethod == 2){
                    if(orderDetailInfo.productList.length==length){
                        message = 'Order Cancelled Successfully.'
                    }else{
                        message = `Order Item${length>1?'s':''} Cancelled Successfully.`
                    }
                    
                }else{
                    message = 'Order cancellation request sent successfully and refund is being processed'
                }
                cancelList.forEach(element => {
                    const findIndex = orderDetailInfo.productList.findIndex(item=>item.orderProductId==element.orderProductId)
                    if(orderDetailInfo.paymentMethod == 2){
                        orderDetailInfo.productList[findIndex].orderStatusName='Order Cancelled'
                        orderDetailInfo.productList[findIndex].orderStatusId=9
                    }else{
                        orderDetailInfo.productList[findIndex].orderStatusId=6
                        orderDetailInfo.productList[findIndex].orderStatusName='Order Cancel Applied'
                    }
                });
                setActionMessage({ 'className': 'alert alert-success text-center mb-0 mt-3', 'message': message, 'active': true })
                setIsCancelActive(false)
                setCancelButtonActive(false)

                orderDetailInfo.orderStatusId = 6
                orderDetailInfo.orderStatusName = "Order Cancel Applied"
            } else {
                setActionMessage({ 'className': 'alert alert-danger text-center mb-0 mt-3', 'message': res.message, 'active': true })
            }
            window.scrollTo(0, 0);
        }, err => {
            console.log(err)
            setActionMessage({ 'className': 'alert alert-danger text-center mb-0 mt-3', 'message': 'Something went wrong', 'active': true })
        });
    }else{
        message.warning("Only 200 characters allowed")
    }
    setIsModalOpen(false)
    }

    const handlereturn = () => {
        returnfullorder()

    }

    const returnfullorder = () => {
        console.log(openReturnRemark)
        console.log(returnRemarkValue)
        setReturnButtonDisabled(true)
        if (!openReturnRemark || !returnRemarkValue) {
            setActionMessage({ 'className': 'alert alert-danger text-center', 'message': 'Please enter remark', 'active': true })
            setReturnButtonDisabled(false)
            return false;
        }
        let payload = []
        productList.forEach(element => {
            payload.push({
                    orderPrefixId:orderDetailInfo.orderPrefixId,
                    orderId:  orderDetailInfo.orderId,
                    orderProductId: element.orderProductId,
                    productId: element.productId,
                    orderProductPrefixId:element.orderProductPrefixId,
                    totalAmount:element.refundAmount,
                    quantity:element.quantity,
                    returnType: "REFUND",
                    returnReason: returnReason,
                    returnRemarkValue: returnRemarkValue,
                    returnStatus: 1,
                    customerId: orderDetailInfo.customerId,
                    returnOrderSku:element.skuName
                })
        });

        console.log("payload",payload)
        if(returnRemarkValue.length <= 200){
            setLoaderActive(true)
            returnFullOrder(payload, setLoaderActive).then(res => {
                setOrderReturnPopup(false)
                setReturnButtonActive(false)
                payload.forEach(element => {
                    const findIndex = orderDetailInfo.productList.findIndex(item=>item.orderProductId==element.orderProductId)
                    orderDetailInfo.productList[findIndex].orderStatusName='Return Applied'
                    orderDetailInfo.productList[findIndex].orderStatusId=21
                });
            console.log(res)
            if (res.message == 'Request failed with status code 500') {
                setActionMessage({ 'className': 'alert alert-danger text-center', 'message': 'Something went wrong', 'active': true })
            }else if (res.status == 500) {
                setActionMessage({ 'className': 'alert alert-danger text-center', 'message': res.message, 'active': true })
            } else {
                setActionMessage({ 'className': 'alert alert-success text-center', 'message': 'Order return request sent successfully.', 'active': true })
                setIsFullReturnActive(false)
                setFullOrderCancelFlag(false);
            }
        }, err => {
            setOrderReturnPopup(false)
            console.log(err)
            setActionMessage({ 'className': 'alert alert-danger text-center', 'message': 'Something went wrong', 'active': true })
        });
    }else{
        message.warning("Only 200 characters allowed")
    }
    setIsreturnModal(false)
    setReturnButtonDisabled(false)
    }

    const returnOption = (e) => {
        setIsReturnActive(e)
    }
    const selectReturnReason = (e) => {
        setReturnReason(e.target.value)
        if (e.target.value) {
            setOpenReturnRemark(true)
        } else {
            setOpenReturnRemark(false)
        }
    }
    const setReturnRemark = (e) => {
        setReturnRemarkValue(e.target.value)
    }
    const returnOrder = (product, index) => {
if(((returnType=='REPLACE_PRODUCT' && Object.keys(getReplacementProductDetails).length>0) || (returnType=='REFUND' && returnReason)) && returnRemarkValue){
    console.log(orderDetailInfo)
        if (returnRemarkValue && returnReason) {
            let returnJson = {
                "orderId": orderDetailInfo.orderId,
                "orderProductId": product.orderProductId,
                "customerId": orderDetailInfo.customerId,
                "orderProductPrefixId": product.orderProductPrefixId,
                "orderPrefixId": orderDetailInfo.orderPrefixId,
                "totalAmount": product.total,
                "returnReason": returnReason,
                "returnRemarkValue": returnRemarkValue,
                "productId": product.productId,
                "returnStatus": 1,
                "returnType": returnType,
                ...getReplacementProductDetails
            }
            console.log('returnJson',returnJson)
            if( returnRemarkValue.length <= 200){
                setLoaderActive(true)
            returnOrderApi(returnJson, setLoaderActive).then(res => {
                if (res.status == 200) {
                    setActionMessage({ 'className': 'alert alert-success text-center', 'message': res.message, 'active': true })
                    orderDetailInfo.productList[index].orderStatusName = ""
                    orderDetailInfo.productList[index].orderStatusId = 15
                    setIsReturnActive("")
                    window.scrollTo(0, 0);
                } else {
                    setActionMessage({ 'className': 'alert alert-danger text-center', 'message': res.message, 'active': true })
                }
                console.log(res)
            }, err => {
                console.log(err)
            })}
            else{
                message.warning("Only 200 characters allowed")
            }
        } else {
        }
}else{
    message.warning("Please fill the required field")
}
        
    }

    const ReviewRoute = (orderProductId) => {

        Router.push("/account/review/[rid]", `/account/review/${orderProductId}`)
    }
    useEffect(() => {
        let totalBasePrice = 0;
        let totalTax = 0;
        let productPromotionDiscountTotal = 0;
        let cartValueBasedPromoDiscountTotal = 0;
        let CouponBasedPromoDiscountTotal = 0;
        let loyaltyPointPromoDiscount = 0;
        let prepaidOrderDiscount=0
        let productTotalDiscount = 0;
        let creditNoteDiscount = 0;
        console.log(orderDetailInfo, "Nero Order Details ddd")
        orderDetailInfo && orderDetailInfo.productList.length > 0 && orderDetailInfo.productList.forEach(item => {
            totalBasePrice += item.basePrice * item.quantity;
            totalTax += (priceHelpFunc(item.basePrice,item.taxType,item.taxValue,0) * item.quantity)-(item.basePrice*item.quantity);
            productTotalDiscount += priceHelpFunc(item.discountAmount,item.taxType,item.taxValue,0) * item.quantity
        });
        console.log("productTotalDiscount",productTotalDiscount)
        orderDetailInfo && orderDetailInfo.appliedDiscounts.length > 0 && orderDetailInfo.appliedDiscounts.forEach(item => {
            if (item.promotionType === "ProductBased") {
                productPromotionDiscountTotal += parseInt(item.discountedAmount);
            }
            if (item.promotionType === "CartValueBased") {
                cartValueBasedPromoDiscountTotal += parseInt(item.discountedAmount);
            }
            if (item.promotionType === "CouponBased") {
                CouponBasedPromoDiscountTotal += parseInt(item.discountedAmount);
            }
            if (item.promotionType === "employeeCoupon") {
                CouponBasedPromoDiscountTotal += parseInt(item.discountedAmount);
            }
            if (item.promotionType === "loyaltyPoint") {
                loyaltyPointPromoDiscount += parseInt(item.discountedAmount);
            }
            if (item.promotionType === "100OffOnPrepaidOrder") {
                prepaidOrderDiscount += parseInt(item.discountedAmount);
            }
            if (item.promotionType === "CreditNote") {
                creditNoteDiscount += parseInt(item.discountedAmount);
            }
        });
if(Number(creditNoteDiscount).toFixed(0)>0 && orderDetailInfo.paymentMethod!=2){
    setPrepaidAmountWithCn(Number(orderDetailInfo.total))
}
        setProductPromotionTotal(Number(productPromotionDiscountTotal).toFixed(0));
        setCartValuePromotionTotal(Number(cartValueBasedPromoDiscountTotal).toFixed(0));
        setCouponBasedPromotionTotal(Number(CouponBasedPromoDiscountTotal).toFixed(0))
        setCreditNoteDiscount(Number(creditNoteDiscount))
        setLoyaltyPointDiscount(Number(loyaltyPointPromoDiscount).toFixed(0))
        setPrepaidOrderDiscount(Number(prepaidOrderDiscount).toFixed(0))
        setProductDiscountTotal(Number(productTotalDiscount).toFixed(0))
        setOrderTotalDiscount(Number(productPromotionDiscountTotal) + Number(cartValueBasedPromoDiscountTotal) + Number(CouponBasedPromoDiscountTotal) + Number(productTotalDiscount) + Number(loyaltyPointPromoDiscount) + Number(creditNoteDiscount)+Number(prepaidOrderDiscount));

        setItemsBasePriceTotal(Math.round(totalBasePrice));
        setitemsTotalTax(Math.round(totalTax));
        setWsTaxAndBasePriceTotal(Math.round(totalBasePrice + totalTax));
        setTaxAndBasePriceTotal(Math.round(totalBasePrice + totalTax + orderDetailInfo.shippingCharges));
        

        const appliedPromosCount = orderDetailInfo && orderDetailInfo.appliedDiscounts.length;
        
        if(orderDetailInfo && appliedPromosCount > 0){
            const creditNotes = orderDetailInfo.appliedDiscounts.filter(item=> item.promotionType == "CreditNote");
            if(appliedPromosCount == creditNotes.length){
                setPromoAvailableInOrder(false); 
            }else{
                setPromoAvailableInOrder(true);
            }
        }
    }, [orderDetailInfo])

    const showFullOrderCancelMsg = () => {
        setFullOrderCancelFlag(true);
    }

    const returnTypeFun = async (val, producctId)=>{
        selectReturnType(val)
        if(val=="REPLACE_PRODUCT"){
        const result = await getReplacementProductOption(producctId)
        if(result.status==200){
        setReplacementProductData(result.data)
        setReturnReason("Size/Fit is not as expected")
        }else{
            setReturnReason("")
            setReplacementProductData([])
        }
        }else{
            setReturnReason("")
            setReplacementProductData([])
        }
    }

    const selectvarient = async (data)=>{
        console.log(data)
        setReplacementProductDetails(data)
    }

    const viewOrderHistory = async (orderProductId)=>{
        const result = await getOrderHistoryStatus(orderProductId)
        console.log("result",result)
        if(result.status==200){
        setOrderHistoryJson(result.data)
        }else{
            setOrderHistoryJson([])
        }
        setOrderHistoryOn(true)
    }
    const popUpClose = async ()=>{
        setOrderHistoryOn(false)
    }
    const cancelPopUpClose = async ()=>{
        setOrderCancelPopup(false)
        setOrderReturnPopup(false)
        setReturnButtonDisabled(false)
        setProductList([])
    }
    const cancelPopUpOpen = async ()=>{
        setOrderCancelPopup(true)
        setProductList([])
        setRefundAmountSum(0)
    }
    const returnPopUpOpen = async ()=>{
        setOrderReturnPopup(true)
        setReturnButtonDisabled(false)
        setReturnProductList([])
        setReturnRefundAmountSum(0)
    }
    

    const selectProduct = async (e, product)=>{
        if(e.target.checked){
            if(orderDetailInfo.paymentMethod != 2 || product.orderStatusId==5){
            setRefundAmountSum(item=>{
                console.log("item",item)
                return item+product.refundAmount
            })
        }
            setProductList(item=>{
              const newItems =   [...item]
              newItems.push(product)
              console.log("newItems",newItems)
              return newItems
            })
        }else{
            if(orderDetailInfo.paymentMethod != 2 || product.orderStatusId==5){
            setRefundAmountSum(item=>{
                return item-product.refundAmount
            })
        }
            setProductList(item=>{
                const newItems =   [...item]
                const findIndex = newItems.findIndex(item=>item.orderProductId==product.orderProductId)
                newItems.splice(findIndex, 1)
                return newItems
              })
        }
    }

    const cancelAction = ()=>{
        setIsModalOpen(true)
    }
    return (
        <section className="cus-account-container">

            <div className="cus-account-subcontainer">
                <div className="cus-position-container">
                    <AccountNav keyValue={""} />
                    <div className="cus-right-position">
                        <div className="od-container">
                            <div className="od-subcontainer">
                                <div className="od-header-container">
                                    <h2 className='mb-0 d-flex'>{t('account.OrderDetails')}<p className='mb-0'>{t('account.order')} {moment(orderDetailInfo.createdDate).format("DD/MM/YYYY")} | Order# {orderDetailInfo.orderPrefixId}</p>
                                    </h2>
                                    <div className='oh-content-buyit-again'>
                                        {isInvoiceActive && 
                                        <>{checkMigOrder?<button  onClick={e => getPdfData(orderDetailInfo.orderId, orderDetailInfo.orderPrefixId)}>{loadImg && imgLoadId === orderDetailInfo.orderProductId ? <img src="/static/img/loading.gif" /> : ""} <i className="fa fa-download mr-2" /> {t('account.Invoice')}</button>:<button  onClick={e => getMigInvoice(orderDetailInfo.orderPrefixId)}><i className="fa fa-download mr-2" /> {t('account.Invoice')} </button>}</>}
                                        </div>
                                </div>
                                {actionMessage.active && <div className='row'>
                                    <div className='col-md-12'>
                                        <div className={actionMessage.className}>{actionMessage.message}</div>
                                           
                                    </div>
                                </div>}
                                {fullOrderCancelFlag && <div className='full-order-cancel-msg alert alert-warning'>You have offers on this order. You have to return full order. Please return full order by clicking <b>RETURN</b> button</div>} 
                                 {(orderDetailInfo.orderStatusId==13) &&
                                    <div className='od-content-container row p-0  mb-0'>
                                        <div className='col-md-12 alert alert-danger pt-2 pb-2 mb-0'>
                                        Rest assured that if your order is not confirmed by the payment gateway your money/CN/coupon will be automatically credited to your account within 30 minutes.
                                            </div>
                                            
                                    </div>
                                 }
                                 {(orderDetailInfo.paymentRemark && orderDetailInfo.orderStatusId==11) && <div className='alert alert-danger mt-3 text-center'>{orderDetailInfo.paymentRemark}</div>}
                                 {getCancelButtonActive && <div className='mt-3 cancel-box'>
                                  <button className='cancel-btn' onClick={e=>cancelPopUpOpen(e)}>Cancel Order</button>
                                  </div>}
                                   {getReturnButtonActive && <div className='mt-3 cancel-box'>
                                    <button className='cancel-btn' onClick={e=>returnPopUpOpen(e)}>Return Order</button>
                                    </div>}
                                <div className="od-content-container row pr-3 pt-0 mt-4">
                                    <div className='col-md-9 pr-4'>
                                    <div className="od-product-container">
                                        <div >
                                            {orderDetailInfo && orderDetailInfo.productList.map((product, i) => {
                                                return <div className="od-product-subcontainer">
                                                    <div className="od-main-container">
                                                        <div className="od-det-sdfd">
                                                            <div className="od-pro-img-container">
                                                                {/* {product.image && <img src={imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=400&height=200"} />} */}
                                                                <DisplayImageWithS3PreSignedUrl 
                                imageKey={product.containerName+product.image} 
                                resizeRequired="YES" 
                                style={{width: '100px'}}
                                alt={product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}
                                />
                                                           
                                                            </div>
                                                            <div className="od-product-det-main">
                                                                <div className='d-flex row justify-content-between mb-2' ><div className='col-xl-5 product-name' ><h3 title={product.name}  onClick={e => ProductRoute(product.productSlug)}> {product.name}
                                                                <p className='mt-0 mb-0'>
                                                                {product.varientName == '' ? '' :<>Size: {product.varientName.split(',')[0]}, Color: {product.varientName.split(',')[1]}</>}
                                                                </p>
                                                                </h3><h3 className='font-weight-bold'></h3></div>
                                                                    {/* <div> {product.description}</div> */}
                                                                    {product.upc && <div className='col-xl-4'><h3>Article Code: {product.upc}</h3></div>}
                                                                    <div className='col-xl-3'> <h3>Sku: {product.skuName}</h3></div>
                                                                    {/* <h4>{orderDetailInfo.currencySymbolLeft} {product.productPrice} </h4>
                                                        <h4>* {product.quantity}</h4>
                                                        <h4>= {product.quantity * product.productPrice}</h4> */}

                                                                </div>


                                                                 {/* <p><span>Qty:</span>{product.quantity}</p> */}
                                                                {checkMigOrder  &&
                                                                <div  className='product-price'>
                                                                    <h4>{orderDetailInfo.currencySymbolLeft} {Number(product.productPrice).toFixed(0)} </h4>
                                                                    <h4>&nbsp; x {product.quantity}</h4>
                                                                    <h4>&nbsp;= {(product.quantity * product.productPrice).toFixed(0)}</h4>
                                                                </div>}
                                                                <div className="mt-2 oh-content-buyit-again"><button onClick={e => ProductRoute(product.productSlug)} fdprocessedid="27kh1p">Buy it again</button>
                                                                {(product.trackingNo) && <a className='btn btn-primary trackBtn' href={`${product.trackingUrl}${product.trackingNo}`} target='_blank'>Track Order</a>}
                                                                    { isInvoiceActive && orderDetailInfo.productList[i].rating==0 &&  <button onClick={e => ReviewRoute(product.orderProductId)}> {t('Review')}
                                                                     {/* <RightOutlined style={{ fontSize: "12px", paddingLeft: "10px" }} /> */}
                                                                     </button>}
                                                                     {false && (product.orderStatusId == 5 && product.returnAvailable && !promoAvailableInOrder) &&
                                                                     <button onClick={e => returnOption(product.orderProductId)}> Return Product
                                                            
                                                            </button>
                                                            

                                                        }
                                                                    {(product.orderStatusId == 5 && product.returnAvailable && promoAvailableInOrder && false) && <button onClick={e => showFullOrderCancelMsg()}> Return Product
                                                            
                                                            </button>
                                                            

                                                        }
                                                        {
                                                            <span className='status-btn ml-auto text-center'>{product.orderStatusName}
                                                            {product.orderStatusId!=11 && product.orderStatusId!=13 && <><br/><span className="view-history" onClick={e=>viewOrderHistory(product.orderProductId)}>View Order History</span></>}
                                                            </span>}
                                                                </div>
                                                                <div>{(product.trackingNo) && <><h3>Courier Partner: {product.trackingUrl=='https://t.proship.in/'?'Proship':'Delhivery'}</h3><h3>Tracking (AWB): {product.trackingNo}</h3></>}</div>
                                                                {product.orderProductId == isReturnActive && <div className='row replace-form'>
                                                            <div className='col-md-12'>
                                                            <div className='order-cancel-reason' style={{marginBottom:"10px"}}>
                                                                    <label>What do you want <sup>*</sup></label>
                                                                    <select className='form-control' onChange={e => returnTypeFun(e.target.value, product.productId)}>
                                                                        <option value="">--Select--</option>
                                                                        <option value="REPLACE_PRODUCT">Size/Fit is not as expected</option>
                                                                        <option value="REFUND">Return</option>
                                                                        
                                                                    </select>
                                                                </div>
                                                                {getReplacementProductData.length==0 && returnType=='REPLACE_PRODUCT' && <div className='alert alert-danger'>This product inventory is unavailable. You must select the return option</div>}
                                                                {getReplacementProductData.length>0 && returnType=='REPLACE_PRODUCT' && <div  className='select-varient mb-3'><div>
                                                                <strong>Size:</strong> {getReplacementProductData.map((item, i)=>{
                                                                   return <span className='ml-5' key={i}> 
                                                                   <input type='radio' onClick={(e)=>selectvarient(item)} name='vareint'/> {(item.varientName).split(',')[0]}
                                                                   </span>
                                                                })}
                                                                </div>
                                                                <div><strong>Color:</strong> <span className='ml-5'>{(getReplacementProductData[0].varientName).split(',')[1]}</span></div>
                                                                </div>
                                                                }
                                                                {returnType=='REFUND' && <div className='order-cancel-reason' style={{marginBottom:"10px"}}>
                                                                    <label>Reason of Return <sup>*</sup></label>
                                                                    <select className='form-control' onChange={e => selectReturnReason(e)}>
                                                                        <option value="">--Select--</option>
                                                                        <option value="Visual and Actual Product is Differ">Visual and Actual Product is Differ</option>
                                                                        <option value="Quality or Comfort Not Up To The Mark">Quality or Comfort Not Up To The Mark</option>
                                                                        <option value="Damage or Used Product Recieved">Damage or Used Product Recieved</option>
                                                                        <option value="Wrong Product Recieved">Wrong Product Recieved</option>
                                                                        <option value="Product or Quantity Missing">Product or Quantity Missing</option>
                                                                        <option value="Other">Other</option>
                                                                    </select>
                                                                </div>
                                            }
                                                                <div className='order-cancel-remark'>
                                                                    <label>Remark <sup>*</sup> <small className='remark-message'>(Only 200 characters allowed)</small></label>
                                                                    <textarea  className='form-control' onChange={e => setReturnRemark(e)}></textarea>
                                                                </div>
                                                                {console.log(returnRemarkValue, returnReason, returnType!='REFUND')}
                                                                <div className='oh-content-buyit-again mt-3 justify-content-end'>
                                                                    <button onClick={e => returnOrder(product, i)}> Submit </button>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>}
                                                            </div>
                                                            
                                                        </div>
                                                    </div>

                                                    {/* <div className="od-main-right-container"> */}

                                                        {/* <button onClick={e => ProductRoute(product.productSlug)}> {t('account.BuyItAgain')} <RightOutlined style={{ fontSize: "12px", paddingLeft: "10px" }} /></button> */}
                                                        {/* <button onClick={e => ReviewRoute(product.orderProductId)}> {t('Review')} <RightOutlined style={{ fontSize: "12px", paddingLeft: "10px" }} /></button> */}

                                                        
                                                        {/* {product.returnAvailable == false &&
                                                            <button onClick={e => returnOption(product.orderProductId)}> Replacement Order <RightOutlined /></button>

                                                        }
                                                        {product.orderProductId == isReturnActive && <div className='row'>
                                                            <div className='col-md-12'>
                                                                <div className='order-cancel-reason'>
                                                                    <label>Reason of Return</label>
                                                                    <select className='form-control' onChange={e => selectReturnReason(e)}>
                                                                        <option value="">--Select--</option>
                                                                        <option value="Quality Issue">Quality Issue</option>
                                                                        <option value="Need diffrent size">Need diffrent size</option>
                                                                        <option value="Other">Other</option>
                                                                    </select>
                                                                </div>
                                                                <div className='order-cancel-remark'>
                                                                    <label>Remark</label>
                                                                    <textarea className='form-control' onChange={e => setReturnRemark(e)}></textarea>
                                                                </div>
                                                                <div className='cancel-btn text-right mt-3'>
                                                                    <input type="button" disabled={!returnRemarkValue || !returnReason} onClick={e => returnOrder(product, i)} value="Confirm" className='btn btn-primary btn-lg' />
                                                                </div>
                                                            </div>
                                                        </div>} */}
                                                    {/* </div> */}
                                                 </div>

                                            })


                                            }

                                        </div>
                                        {/* <h3>{t('account.ShippingAddress')}</h3>
                                        <h5>{orderDetailInfo.shippingFirstname}</h5> */}
                                        {/* <div style={{display:"flex"}} ><h4>{orderDetailInfo.shippingAddress1}</h4> */}
                                        {/* <p>{orderDetailInfo.shippingAddress1},{orderDetailInfo.shippingAddress2},{orderDetailInfo.shippingCity},{orderDetailInfo.shippingPostcode}</p> */}
                                        {/* <p>Mobile - {orderDetailInfo.telephone}</p> */}
                                    </div>
                                    </div>
                                    {/* <div className="od-ship-container">
                                        <h3>{t('account.OrderSummary')}</h3>
                                        <p><span>{t('account.Quantity')}:</span> {orderDetailInfo.productQuantity} </p>
                                        <p><span>{t('account.BasePrice')}:</span>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.basePrice} </p>
                                        {orderDetailInfo.discountAmount && <p><span>Discount:</span> {orderDetailInfo.currencySymbolLeft}{orderDetailInfo.discountAmount} </p>}
                                        <p><span>{t('account.Tax')}:</span>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.taxValue} {orderDetailInfo.taxType === 1 ? "" : "%"}</p>
                                        <p><span>{t('account.CouponDiscount')}:</span>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.couponDiscountAmount ? orderDetailInfo.couponDiscountAmount : 0} </p>
                                        <p style={{ fontWeight: "bold" }}><span style={{ fontWeight: "bold" }}>{t('account.GrandTotal')}:</span> {orderDetailInfo.currencySymbolLeft}{orderDetailInfo.total} </p>
                                    </div> */}

                                    <div className="od-ship-container col-md-3">
                                        <h3>{t('account.OrderSummary')}</h3>
                                        {checkMigOrder ? <><p><span>Items Price:</span>{orderDetailInfo.currencySymbolLeft} {itemsBasePriceTotal} </p>
                                        <p><span>Tax:</span>{orderDetailInfo.currencySymbolLeft} {itemsTotalTax} </p>
                                        <p className='bdr-top pt-2'><span>MRP(Inclusive All Taxes):</span>{orderDetailInfo.currencySymbolLeft} {wStaxAndBasePriceTotal} </p>

                                        {orderTotalDiscount && orderTotalDiscount > 0 ?
                                            <div className='bdr-top-2'>
                                                {productDiscountTotal > 0 ? <p><span>Product(s) discount:</span> {orderDetailInfo.currencySymbolLeft} {productDiscountTotal} </p> : ''}
                                                {productPromotionTotal > 0 ? <p><span>Product(s) promotion:</span> {orderDetailInfo.currencySymbolLeft} {productPromotionTotal} </p> : ''}
                                                {cartValuePromotionTotal > 0 ? <p><span>Cart value promotion:</span> {orderDetailInfo.currencySymbolLeft} {cartValuePromotionTotal} </p> : ''}
                                                {couponBasedPromotionTotal > 0 ? <p><span>Coupon promotion:</span> {orderDetailInfo.currencySymbolLeft} {couponBasedPromotionTotal} </p> : ''}
                                                {getCreditNoteDiscount > 0 ? <p><span>Credit Note:</span> {orderDetailInfo.currencySymbolLeft} {getCreditNoteDiscount} </p> : ''}
                                                {getLoyaltyPointDiscount > 0 ? <p><span>Loyalty Point:</span> {orderDetailInfo.currencySymbolLeft} {getLoyaltyPointDiscount} </p> : ''}
                                                {prepaidOrderDiscount > 0 ? <p><span>100 Rs Off on prepaid order:</span> {orderDetailInfo.currencySymbolLeft} {prepaidOrderDiscount} </p> : ''}
                                                <p className='bdr-top'><span>Total Discount:</span>-{orderDetailInfo.currencySymbolLeft} {orderTotalDiscount.toFixed(0)} </p>
                                            </div>
                                            : ''
                                        }
                                        <p className='bdr-top'><span>Shipping:</span>{orderDetailInfo.shippingCharges>0?<>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.shippingCharges}</>:'Free'} </p>
                                        <p className='bdr-top-2 font-weight-bold'><span className='font-weight-bold'>Order Total:</span>{orderDetailInfo.currencySymbolLeft} {(taxAndBasePriceTotal - orderTotalDiscount.toFixed(0)).toFixed(0)} </p></>:<>
                                        <p><span>Total (Items+Tax):</span>{orderDetailInfo.currencySymbolLeft} {+orderDetailInfo.total} </p>
                                        <p className='bdr-top'><span>Total Discount:</span>-{orderDetailInfo.currencySymbolLeft} {orderTotalDiscount.toFixed(0)} </p>
                                        <p className='bdr-top-2 font-weight-bold'><span className='font-weight-bold'>Order Total:</span>{orderDetailInfo.currencySymbolLeft} {(+orderDetailInfo.total - orderTotalDiscount.toFixed(0)).toFixed(0)} </p>
                                        </>}
                                        <p className='bdr-top-2'></p> 
                                        <div className="od-ship-container oh-address-box">
                                    <div>
                                        {checkMigOrder &&<div className='d-flex'>
                                        <p className='font-weight-bold'>{t("Payment Method")} : &nbsp;</p>


                                        <h6 className='mt-2'>
                                            {(() => {
                                                if (orderDetailInfo.paymentMethod == 2) {
                                                    return "COD";
                                                }
                                                else {
                                                    return "Online";
                                                }
                                            })()}
                                        </h6></div>}
                                        <div className="od-shipping-add">
                                            <div className='font-weight-bold'>{t('account.ShippingAddress')}</div>
                                            <div>{orderDetailInfo.shippingFirstname}</div>
                                            {/* <div style={{display:"flex"}} ><h4>{orderDetailInfo.shippingAddress1}</h4> */}
                                            <div>{orderDetailInfo.shippingAddress1},{orderDetailInfo.shippingAddress2},{orderDetailInfo.shippingCity},{orderDetailInfo.shippingPostcode}</div>
                                            <div>Mobile - {orderDetailInfo.telephone}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='oh-content-buyit-again mt-3 justify-content-end'>
                                {false ? <button  className='' onClick={e => cancelOption()}>{loadImg && imgLoadId === orderDetailInfo.orderProductId ? <img src="/static/img/loading.gif" /> : ""} {t('Cancel Order')}</button> : <></>}
                                </div>
                                {isCancelActive &&
                                 <div className='replace-form'>
                                 <div className='order-cancel-reason'>
                                      <label>Reason of Cancellation <sup>*</sup></label>
                                      <select className='form-control' onChange={e => selectReason(e)}>
                                          <option value="">--Select--</option>
                                          <option value="Change My Mind">Change My Mind</option>
                                          <option value="Found product cheaper somewhere">Found product cheaper somewhere</option>
                                          <option value="Other">Other</option>
                                      </select>
                                  </div>
                                  {<div className='order-cancel-remark'>
                                      <label>Remark <sup>*</sup> <small className='remark-message'>(Only 200 characters allowed)</small></label>
                                      <textarea className='form-control' onChange={e => setCancelRemark(e)}></textarea>
                                  </div>}
                                  {canceltBtn && <div className='cancel-btn text-right mt-3'>
                                      <input type="button" onClick={e=>setIsModalOpen(true)} value="Confirm" className='btn btn-primary btn-lg' />
                                  </div>}
                                 </div>
                                 } 

                             <div className='oh-content-buyit-again mt-3 justify-content-end'>
                                {fullOrderCancelFlag? <button  className='' onClick={e => fullReturnOption()}>{loadImg && imgLoadId === orderDetailInfo.orderProductId ? <img src="/static/img/loading.gif" /> : ""} Return Order</button> : <></>}
                                </div>
                                {isFullReturnActive &&
                                 <div className='replace-form'>
                                 <div className='order-cancel-reason'>
                                      <label>Reason of Return <sup>*</sup></label>
                                      <select className='form-control' onChange={e => selectReason(e)}>
                                          <option value="">--Select--</option>
                                          <option value="Visual and Actual Product is Differ">Visual and Actual Product is Differ</option>
                                          <option value="Quality or Comfort Not Up To The Mark">Quality or Comfort Not Up To The Mark</option>
                                          <option value="Damage or Used Product Recieved (Need Video and Photo)">Damage or Used Product Recieved (Need Video and Photo)</option>
                                          <option value="Wrong Product Recieved(Need Video and Photo)">Wrong Product Recieved(Need Video and Photo)</option>
                                          <option value="Product or Quantity Missing(Need Video and Photo)">Product or Quantity Missing(Need Video and Photo)</option>
                                          <option value="Other">Other</option>                                      </select>
                                  </div>
                                  {<div className='order-cancel-remark'>
                                      <label>Remark <sup>*</sup> <small className='remark-message'>(Only 200 characters allowed)</small></label>
                                      <textarea className='form-control' onChange={e => setCancelRemark(e)}></textarea>
                                  </div>}
                                  {canceltBtn && <div className='cancel-btn text-right mt-3'>
                                      <input type="button" onClick={e=>setIsreturnModal(true)} value="Confirm" className='btn btn-primary btn-lg' />
                                  </div>}
                                 </div>
                                 } 


                                    </div>
                                    
                                        

                                </div>
                               

                                

                                <div className="od-product-container d-none">

                                    {orderDetailInfo && orderDetailInfo.productList.map((product, i) => {
                                        return <div className="od-product-subcontainer">
                                            <div className="od-main-container">
                                                <div className="od-det-sdfd">
                                                    <div className="od-pro-img-container">
                                                        <img src={imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=400&height=200"} />
                                                    </div>
                                                    <div className="od-product-det-main">
                                                        <div className='d-flex' style={{ justifyContent: "space-between" }}><h3> {product.name}</h3><br />
                                                            {/* <div> {product.description}</div> */}
                                                            <div><h3>Article Code: {product.upc}</h3></div>
                                                            <div> <h3>Sku: {product.skuName}</h3></div>
                                                            {/* <h4>{orderDetailInfo.currencySymbolLeft} {product.productPrice} </h4>
                                                        <h4>* {product.quantity}</h4>
                                                        <h4>= {product.quantity * product.productPrice}</h4> */}

                                                        </div>


                                                        <p><span>Qty:</span>{product.quantity}</p>
                                                        <p></p>

                                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                                            <h4>{orderDetailInfo.currencySymbolLeft} {product.productPrice} </h4>
                                                            <h4>&nbsp; x {product.quantity}</h4>
                                                            <h4>&nbsp;= {(product.quantity * product.productPrice).toFixed(0)}</h4>
                                                        </div>
                                                        <div className="oh-content-buyit-again" style={{ gap: "5px" }}><button onClick={e => ProductRoute(product.productSlug)} fdprocessedid="27kh1p">Buy it again</button>
                                                            <button onClick={e => ReviewRoute(product.orderProductId)}> {t('Review')} <RightOutlined style={{ fontSize: "12px", paddingLeft: "10px" }} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="od-main-right-container">

                                                {/* <button onClick={e => ProductRoute(product.productSlug)}> {t('account.BuyItAgain')} <RightOutlined style={{ fontSize: "12px", paddingLeft: "10px" }} /></button> */}
                                                {/* <button onClick={e => ReviewRoute(product.orderProductId)}> {t('Review')} <RightOutlined style={{ fontSize: "12px", paddingLeft: "10px" }} /></button> */}

                                                {(product.orderStatusId == 8 || product.orderStatusId == 7 || product.orderStatusId == 6) &&
                                                    <p>{product.orderStatusName}</p>}
                                                {(product.orderStatusId == 5 && product.returnAvailable) &&
                                                    <button onClick={e => returnOption(product.orderProductId)}> Replacement Order <RightOutlined /></button>

                                                }
                                                {product.orderProductId == isReturnActive && <div className='row '>
                                                    <div className='col-md-12'>
                                                        <div className='order-cancel-reason'>
                                                            <label>Reason of Return</label>
                                                            <select className='form-control' onChange={e => selectReturnReason(e)}>
                                                                <option value="">--Select--</option>
                                                                <option value="Quality Issue">Quality Issue</option>
                                                                <option value="Need diffrent size">Need diffrent size</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div className='order-cancel-remark'>
                                                            <label>Remark</label>
                                                            <textarea className='form-control' onChange={e => setReturnRemark(e)}></textarea>
                                                        </div>
                                                        <div className='cancel-btn text-right mt-3'>
                                                            <input type="button" disabled={!returnRemarkValue || !returnReason} onClick={e => returnOrder(product, i)} value="Confirm" className='btn btn-primary btn-lg' />
                                                        </div>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>

                                    })


                                    }


                                </div>
                            </div>
                        </div>
                        {/* {orderDetailInfo.orderStatusId != 6 && orderDetailInfo.orderStatusId != 7 && orderDetailInfo.orderStatusId != 8 ?
                            <div>
                                {
                                    currentDelivery !== 0 ?
                                        <div className="to-content-main">

                                            <Steps current={currentDelivery} labelPlacement="vertical" style={{ marginTop: "20px", flexWrap: "row", marginBottom: "20px", marginLeft: "100px" }}>
                                                {orderstatus && orderstatus.map((item) => {

                                                    return <>

                                                        <Step title={item.action_type} description={item.transactional_date} />

                                                    </>
                                                })}
                                            </Steps>

                                        </div> : <></>
                                }
                            </div> : <></>} */}

                    </div>
                </div>
            </div>
            {isLoaderActive && <Loader />}
<Modal className='order-confirm-box' show={isModalOpen}>
<Modal.Header>
<h4>Order Cancel Confirmation</h4>
</Modal.Header>
<Modal.Body>
<div className='order-confirm-body'>
<p>Do you want to cancel the order ?</p>
<div className='action-btns'>
    <button  className='cancel-btn' onClick={handleCancel}>Cancel</button>
    <button className='proceed-btn' onClick={handleOk}>Proceed</button>
</div>
</div>
</Modal.Body>
</Modal>

<Modal className='order-confirm-box' show={isreturnModal}>
<Modal.Header>
<h4>Order Return Confirmation</h4>
</Modal.Header>
<Modal.Body>
<div className='order-confirm-body'>
<p>Do you want to return the order ?</p>
<div className='action-btns'>
    <button  className='cancel-btn' onClick={handleCancel}>Cancel</button>
    <button className='proceed-btn' onClick={handlereturn}>Proceed</button>
</div>
</div>
</Modal.Body>
</Modal>

<Modal className='order-confirm-box' show={orderHistoryOn}>
<Modal.Header>
<h4 className='m-0'>Order History</h4>
<button type="button" class="btn-close" aria-label="Close" onClick={e=>popUpClose()}>X</button>
</Modal.Header>
<Modal.Body>
<div className='order-confirm-body'>

    {orderHistoryJson.length>0?
<ul className='order-history-list'>
    {orderHistoryJson.map(item=>
    <>{item.active==1 &&
            <li className={item.completed==1?'active':''}><span>{item.orderStatusName} 
            {item.actionDate && <> ({moment(item.actionDate).format(`DD-MM-YYYY${item.orderStatusId!=19?', h:mm A':''}`)})</>}
            {item.statusCodeRemark && <div className="tooltip-wrapper">
  <i className='fa fa-eye ml-2'></i>
  <div className="tooltip bs-tooltip-top" role="tooltip">
    <div className="arrow"></div>
    <div className="tooltip-inner">{item.statusCodeRemark}</div>
  </div>
</div>}
            </span></li>}

            </>
    )
}
</ul>:<div className='w-100 alert alert-danger text-center'>No Data Found</div>}
</div>
</Modal.Body>
</Modal>


<Modal className='order-confirm-box cancel-box' show={orderCancelPopup} size="lg">
    <Modal.Header>
    {isModalOpen && <div className='overlay'></div>}
        <h4 className='m-0'>Cancel Order {(getCreditNoteDiscount==0 && productPromotionTotal==0) && <>(Select the items for Cancellation)</>}</h4>
        <button type="button" class="btn-close" aria-label="Close" onClick={e => cancelPopUpClose()}>X</button>
    </Modal.Header>
    <Modal.Body>
        <div className='order-confirm-body'>
            <div>
                {orderDetailInfo && orderDetailInfo.productList.map((product, i) => 
                     <>{product.orderStatusId==1 &&  <div className="od-product-subcontainer">
                        <div className="od-main-container">
                            <div className="od-det-sdfd align-items-center">
                                <div className='checkbox'>
                                {(getCreditNoteDiscount==0 && productPromotionTotal==0) && <input type='checkbox' onClick={(e)=>selectProduct(e, product)}/>}
                                </div>
                                <div className="od-pro-img-container">
                                    <DisplayImageWithS3PreSignedUrl
                                        imageKey={product.containerName + product.image}
                                        resizeRequired="YES"
                                        style={{ width: '100px' }}
                                        alt={product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}
                                    />

                                </div>
                                <div className="od-product-det-main">
                                    <div className='d-flex row justify-content-betwee' ><div className='col-xl-5 product-name' ><h3 title={product.name}> {product.name}
                                        <p className='mt-0 mb-0'>
                                            {product.varientName == '' ? '' : <>Size: {product.varientName.split(',')[0]}, Color: {product.varientName.split(',')[1]}</>}
                                        </p>
                                    </h3><h3 className='font-weight-bold'></h3></div>
                                        {product.upc && <div className='col-xl-4'><h3>Article Code: {product.upc}</h3></div>}
                                        <div className='col-xl-3'> <h3>Sku: {product.skuName}</h3></div>
                                    </div>
                                </div>
                            </div>
                            <div className='row alert alert-warning m-0 p-1 text-center'>
                            <div className='col-md-4'>
                            <span>Product Price - {orderDetailInfo.currencySymbolLeft} {Number(product.productPrice).toFixed(0)} x {product.quantity} = {Math.round(product.quantity * product.productPrice)}</span>
                            </div>
                            <div className='col-md-4'>
                            <span>Discount Price - {orderDetailInfo.currencySymbolLeft} {Math.round(product.quantity * product.productPrice) - (product.refundAmount)} </span>
                            </div>
                            <div className='col-md-4'>
                            <span>Refundable Amount - {orderDetailInfo.currencySymbolLeft} {product.refundAmount} </span>
                            </div>
                        </div></div>
                    </div>}</>
                )
                }
            </div>
<div className='replace-form'>
<div className='order-cancel-reason'>
    <label>Reason of Cancellation <sup>*</sup></label>
    <select className='form-control' onChange={e => selectReason(e)}>
        <option value="">--Select--</option>
        <option value="Change My Mind">Change My Mind</option>
        <option value="Found product cheaper somewhere">Found product cheaper somewhere</option>
        <option value="Other">Other</option>
    </select>
</div>
{<div className='order-cancel-remark mb-3'>
    <label>Remark <sup>*</sup> <small className='remark-message'>(Only 200 characters allowed)</small></label>
    <textarea className='form-control' onChange={e => setCancelRemark(e)}></textarea>
</div>}
<div className='d-flex'>
<input type='button' onClick={(e)=>cancelAction()} value="Cancel Selected Items" className='btn btn-primary mr-3' disabled={(productList.length<1 || !canceltBtn || !remarktBtn) && ((productPromotionTotal==0 && getCreditNoteDiscount==0) || !canceltBtn || !remarktBtn)} />  {(refundAmountSum>0 || getCreditNoteDiscount>0) && <div className='alert alert-success mb-0 padding-btn'>Refundable Amount : {parseInt(refundAmountSum+getCreditNoteDiscount+getPrepaidAmountWithCn)}</div>}
</div>
</div>
           
        </div>
    </Modal.Body>
</Modal>

{/* partial Return Order Popup Start*/}

<Modal className='order-confirm-box cancel-box' show={orderReturnPopup} size="lg">
    <Modal.Header>
    {isModalOpen && <div className='overlay'></div>}
        <h4 className='m-0'>Return Order {(getCreditNoteDiscount==0 && productPromotionTotal==0) && <>(Select the items for return process)</>}</h4>
        <button type="button" class="btn-close" aria-label="Close" onClick={e => cancelPopUpClose()}>X</button>
    </Modal.Header>
    <Modal.Body>
        <div className='order-confirm-body'>
            <div>
                {orderDetailInfo && orderDetailInfo.productList.map((product, i) => 
                     <>{(product.orderStatusId==5 && product.returnAvailable) &&  <div className="od-product-subcontainer">
                        <div className="od-main-container">
                            <div className="od-det-sdfd align-items-center">
                                <div className='checkbox'>
                                {(getCreditNoteDiscount==0 && productPromotionTotal==0) && <input type='checkbox' onClick={(e)=>selectProduct(e, product)}/>}
                                </div>
                                <div className="od-pro-img-container">
                                    <DisplayImageWithS3PreSignedUrl
                                        imageKey={product.containerName + product.image}
                                        resizeRequired="YES"
                                        style={{ width: '100px' }}
                                        alt={product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}
                                    />

                                </div>
                                <div className="od-product-det-main">
                                    <div className='d-flex row justify-content-betwee' ><div className='col-xl-5 product-name' ><h3 title={product.name}> {product.name}
                                        <p className='mt-0 mb-0'>
                                            {product.varientName == '' ? '' : <>Size: {product.varientName.split(',')[0]}, Color: {product.varientName.split(',')[1]}</>}
                                        </p>
                                    </h3><h3 className='font-weight-bold'></h3></div>
                                        {product.upc && <div className='col-xl-4'><h3>Article Code: {product.upc}</h3></div>}
                                        <div className='col-xl-3'> <h3>Sku: {product.skuName}</h3></div>
                                    </div>
                                </div>
                            </div>
                            <div className='row alert alert-warning m-0 p-1 text-center'>
                            <div className='col-md-4'>
                            <span>Product Price - {orderDetailInfo.currencySymbolLeft} {Number(product.productPrice).toFixed(0)} x {product.quantity} = {(product.quantity * product.productPrice).toFixed(0)}</span>
                            </div>
                            <div className='col-md-4'>
                            <span>Discount Price - {orderDetailInfo.currencySymbolLeft} {(product.quantity * product.productPrice).toFixed(0) - product.refundAmount} </span>
                            </div>
                            <div className='col-md-4'>
                            <span>Refundable Amount - {orderDetailInfo.currencySymbolLeft} {product.refundAmount} </span>
                            </div>
                        </div></div>
                    </div>}</>
                )
                }
            </div>
<div className='replace-form'>
<div className='order-cancel-reason'>
<label>Reason of Return <sup>*</sup></label>
<select className='form-control' onChange={e => selectReturnReason(e)}>
<option value="">--Select--</option>
<option value="Visual and Actual Product is Differ">Visual and Actual Product is Differ</option>
<option value="Quality or Comfort Not Up To The Mark">Quality or Comfort Not Up To The Mark</option>
<option value="Damage or Used Product Recieved">Damage or Used Product Recieved</option>
<option value="Wrong Product Recieved">Wrong Product Recieved</option>
<option value="Product or Quantity Missing">Product or Quantity Missing</option>
<option value="Other">Other</option>
</select>
</div>

<div className='order-cancel-remark mt-3 mb-3'>
<label>Remark <sup>*</sup> <small className='remark-message'>(Only 200 characters allowed)</small></label>
<textarea  className='form-control' onChange={e => setReturnRemark(e)}></textarea>
</div>
<div className='d-flex'>
{!getReturnButtonDisabled?<input type='button' onClick={(e)=>returnfullorder()} value="Return Selected Items" className='btn btn-primary mr-3' disabled={(productList.length<1 || !returnRemarkValue || !openReturnRemark) && (getCreditNoteDiscount==0 || !returnRemarkValue || !openReturnRemark)} />:<input type='button' disabled value="Return Selected Item" className='btn btn-primary mr-3' />}

 {(refundAmountSum>0 || getCreditNoteDiscount>0) && <div className='alert alert-success mb-0 padding-btn'>Refundable Amount : 
   {parseInt(refundAmountSum+getCreditNoteDiscount+getPrepaidAmountWithCn)}</div>}
</div>
</div>
           
        </div>
    </Modal.Body>
</Modal>
</section>
)
}

export default CustomerOrderDetail;