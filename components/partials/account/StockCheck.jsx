import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {ConnectPlugin} from '../../connectPlugins';
import { useState } from 'react';
import { useEffect } from 'react';
import { addressListApi } from '../../../api';
import StockCheckoutMain from './StockCheckoutMain';

function StockCheckout(){
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

        return (
            <div className="ps-checkout ps-section--shopping">
              
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Checkout Information</h1>
                    </div>
                    <div className="ps-section__content">
                       
                        <StockCheckoutMain cartItems={cartItems}
                            productDetail={details}
                            amount={totalData}
                            addressData={addressData}/>
                    </div>
                </div>
            </div>
        );
    
}

const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(StockCheckout);
