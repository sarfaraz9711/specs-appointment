import React, {useState,useEffect} from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import StockCheckout from '../../components/partials/account/StockCheck';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import StockCheckoutMain from '../../components/partials/account/StockCheckoutMain';
import {addressListApi} from '../../api';

const OrderTrackingPage = () => {
    const [cartItems,setCartItems]=useState("")
    const [details,setDetail]=useState("")
    const [totalData,setTotalData]=useState("")
    const [addressData,setAddressData]=useState([])
    const [addressLoader,setAddressLoader]=useState(false)

    const totalInCart=()=>{
        const locale=JSON.parse(localStorage.getItem("cartItem"))
        var len = locale&&locale.length;
        let detailArray=[]
        for (var i = 0; i < len; i++) {
            detailArray.push(locale[i].price*locale[i].quantity)
        }
        var sum = detailArray.reduce(function(a, b){
            return a + b;
        }, 0);
        setTotalData(sum)
    
       }

    const addressList=()=>{
        let dummyContent=""
        addressListApi(setAddressData,setAddressLoader)
    }

    useEffect(()=>{
        addressList()
    },[])
    
 
    const arrayCreate=()=>{
        const locale=JSON.parse(localStorage.getItem("cartItem"))
       
        var len = locale&&locale.length;
        
        let detailArray=[]
        for (var i = 0; i < len; i++) {
            
            detailArray.push({
                productId: locale[i].productId,
                quantity: locale[i].quantity,
                price: locale[i].price,
                basePrice:locale[i].price,
                model:locale[i].name,
                name:locale[i].name,
                productOptions:[],
                taxType: null,
                taxValue: null

            });
            
        }
     
        setDetail(detailArray)
       
    }



    useEffect(()=>{
        setCartItems(JSON.parse(localStorage.getItem("backOrderLocal")))
        arrayCreate()
        totalInCart()
        

    },[])

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Checkout Information',
        },
    ];
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            
            <div className="ps-page--simple">
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                {/* <StockCheckout/> */}
                <StockCheckoutMain
                    cartItems={cartItems}
                    productDetail={details}
                    amount={totalData}
                    addressData={addressData}
                />
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterDefault />
        </div>
    );
};

export default OrderTrackingPage;
