import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect } from 'react';
import { addressListApi } from '../../../api';
import { useState } from 'react';
import { delAddressApi } from '../../../api';
import { useDispatch, connect, useSelector } from 'react-redux';
import { editDetail } from '../../../store/setting/action';
import { orderListApi } from '../../../api';
import { imageUrl } from '../../../api/url';
import { orderExportApi } from '../../../api';
import  Router  from 'next/router';
import { logOut } from '../../../store/auth/action';
import CancelPopup from'../../shared/modal/CancelPopup';
import { cancelReasonApi } from '../../../api';
import OrderDate from './modules/DateOrder';
import { colorThemeShow } from '../../helper/colorTheme';
import { Pagination } from 'antd';



function MyOrder({currency}){
    const [orderData,setOrderData]=useState([])
    const [loadImg,setLoadImg]=useState(false)
    const [searchVal,setSearchVal]=useState("")
    const [imgLoadId,setImgLoadId]=useState("")
    const [fname,setFname]=useState("")
    const [orderLoader,setOrderLoader]=useState(true)
    const dispatch=useDispatch()
    const [cancel,setCancel]=useState(false)
    const [cancelReason,setCancelReason]=useState([])
    const [cancelId,setCancelId]=useState("")
    const [reload,setReload]=useState(0)
    const [limit,setLimit]=useState(5)
    const [currentPage,setCurrentPage]=useState(1)
    const [count,setCount]=useState(0)
    const [offset,setOffset]=useState(0)

    let currentColor=useSelector(s=>s.palette.currentColor)

    
    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            

        }
        
    },[])
 

    useEffect(()=>{
       setOrderLoader(true)
       setReload(0)
       orderListApi(limit,offset,setOrderData,searchVal,"",setOrderLoader,setCount)
       orderListApi(limit,offset,setOrderData,searchVal,1,setOrderLoader,setCount)
    },[searchVal,reload,offset,limit])

    const getPdfData=(id, e)=>{
        e.preventDefault()
        setLoadImg(true)
        orderExportApi(id,setLoadImg)
        setImgLoadId(id)
    }

    const handleTrackOrder=(e,orderProductId)=>{
        
        Router.push("/order/[orderid]","/order/"+orderProductId)
 
    } 

    const handleOrderDetails=(e,orderProductId)=>{
       
        Router.push("/account/order/[orderdetail]","/account/order/"+orderProductId)
    }

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear()
        dispatch(logOut())
        Router.push("/account/login")
    }

    const handleCancel=(e,orderProductId)=>{
        e.preventDefault()
        setCancel(true)
        cancelReasonApi(setCancelReason)
        setCancelId(orderProductId)
        
    }

    const onShowSizeChange=(current, pageSize)=> {
        
        setLimit(pageSize)
        // setInitialLoad(true)

      }

      const handlePagination=(value)=> {
        // let selected = page.selected;
        // const offsets = Math.ceil(value * 12);     
        setOffset(Math.ceil((value-1) * 5))
        // setInitialLoad(true)
        // executeScroll()
        setCurrentPage(value)


        // setoffset(prev=>prev+offsets)
        
		// setoffset(Math.ceil(selected * 12))

    }

   

        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            {
                text: 'My Order',
                url: '/account/orders',
                icon: 'icon-bag2',
                active: true,

            },
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];  
        return (
            <section className="ps-my-account ps-page--account">
                <CancelPopup activate={cancel} setCancel={setCancel} cancelReason={cancelReason} cancelId={cancelId} setReload={setReload}/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{fname}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? `active ${currentColor}`
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                    <a onClick={e=>handleLogout(e)} href="">
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-section--account-setting">
                            <div className="ps-section__header">
                                        <h3>My Orders</h3>
                                    </div>
                                <div className="ps-section__content">
                                    <div className="row">
                                        <div className="col-md-12 col-24">
                                            <div className="custom-search-container">
                                                <input className="custom-order-search" placeholder="Search orders" type="text" value={searchVal} onChange={e=>setSearchVal(e.target.value)}/>    
                                                {searchVal!==""&&<button className="custom-order-search-button-exit" onClick={e=>setSearchVal("")}>X</button>}
                                                <button className={`custom-order-search-button ${currentColor}`} type="submit">Search</button>
                                            </div>
                                            {orderLoader===false?<div>
                                                {orderData&&orderData.length!==0? <div>
                                                {orderData&&orderData.map((order,index)=>{
                                                return(
                                                    <div className="overall-custom-div" key={order.orderProductId}>
                                                <div className="custom-div-container">
                                                    <div className="first-custom-div">
                                                        <h5>Orders placed</h5>
                                                        <OrderDate dateCarry={order&&order.createdDate}/>
                                                    </div>
                                                    <div className="second-custom-div">
                                                        <h5>Total</h5>
                                                        <p>{currency ? currency.symbol : '₹'}{order&&order.productPrice}</p>
                                                    </div>
                                                    <div className="third-custom-div">
                                                        <p>ORDER {order&&order.orderProductPrefixId}</p>
                                                <a href="#"  onClick={e=>getPdfData(order.orderProductId)}>{loadImg&&imgLoadId===order.orderProductId?<img src="/static/img/loading.gif" style={{height:"20px",width:"20px"}}/>:""}Invoice</a>

                                                    </div>
                                                </div>
                                                <div className="sub-div-container">
                                                    <div className="first-custom-div">
                                                        <img src={imageUrl+"?path="+order.containerName+"&name="+order.image+"&width=200&height=100"} alt="" />
                                                    </div>
                                                    <div className="second-custom-div">
                                                        <h5>{order&&order.name}</h5>
                                                        <p>{currency ? currency.symbol : '₹'}{order&&order.productPrice}</p>
                                                    </div>
                                                  
                                                    <div className="third-custom-div">
                                                        <button onClick={e=>handleTrackOrder(e,order.orderProductId)}>Track order</button>
                                                        <button onClick={e=>handleOrderDetails(e,order.orderProductId)}>Order details</button>
                                                        <div className="cancel-anchor">{order.cancelRequest===0?<a href="" onClick={e=>handleCancel(e,order.orderProductId)}>Cancel order</a>:order.cancelRequest===1?<p>Cancel request is accepted</p>:order.cancelRequest===2?<p>Cancel request is rejected</p>:""}</div>
                                                        
                                                    </div>
 
                                                </div>


                                            </div>)
                                            })} 
                                            <div className="ps-shopping__footer text-center pt-40">
                        <Pagination
                            current={currentPage}
                            total={count}
                            pageSize={limit}
                            pageSizeOptions={['5','10','15','20']}
                            showSizeChanger={true}
                            responsive={true}
                            defaultCurrent={1}
                            onChange={handlePagination}
                            onShowSizeChange={onShowSizeChange}

                        /></div>
                                                </div>:
                                                <div>No results found</div>}
                                                 

                                            </div>:<div className="ps-section__content">
                                    <center><img src="/static/img/spurt-original-loader.gif"/></center>
                                    </div>}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    
}

const mapStateToProps=state=>{
    return state.setting;

}

export default connect(mapStateToProps) (MyOrder);