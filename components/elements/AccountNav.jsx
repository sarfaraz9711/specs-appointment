import React from 'react';
import {
    InfoCircleFilled,
    PoweroffOutlined,
    EnvironmentFilled,
    AppstoreFilled,
    ShoppingCartOutlined,
    NotificationOutlined,
    SlidersOutlined,
    GiftOutlined
  } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import Link from 'next/link';
import  Router  from 'next/router';
import QuotationList from '../../pages/account/quotation-list';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/auth/action';
import {getWishlistList} from '../../store/wishlist/action';
import { useRouter } from 'next/router'

function AccountNav({keyValue}){
    
    const router = useRouter()

    const dispatch=useDispatch()

    const AccountInfoRoute = () => {
        Router.push("/account/information")
    }

    const DashboardRoute=()=>{
        Router.push("/account/dashboard")
    }

    const AddressRoute=()=> {
        Router.push("/account/addresses")
    }

    const QuotationRoute = ()=> {
        Router.push("/account/quotation-list")
    }

    const OrderRoute= ()=>{
        Router.push("/account/customer-orders")
    }

    const handleLogout = e => {
        localStorage.clear()
        dispatch(logOut());
        dispatch(getWishlistList([]));
        Router.push("/account/login");
    };

    const OfferRoute = () => {
        Router.push("/account/myoffers")
    }

    const PreferencesRoute = () => {
        Router.push("/account/preferences")
    }

    const LoyalityRoute = () => {
        Router.push("/account/loyalitypoint")
    }
    const creditNote = () => {
        Router.push("/account/credit-note")
    }
    const creditRoute = () => {
        Router.push("/account/creditnote")
    }

    
    

    return(
        <div className="cus-left-position">
            <div className="cus-left-subcontainer">
                <Menu defaultSelectedKeys={[JSON.stringify(keyValue)]}>
                    <Menu.Item key="1" icon={<AppstoreFilled style={{color:"#2874f0",fontSize:"18px"}}/>}  style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e => DashboardRoute()}>Account Dashboard</Menu.Item>
                    <Menu.Item key="2" icon={<InfoCircleFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e =>AccountInfoRoute()}>Account Information</Menu.Item>
                    <Menu.Item key="3" icon={<EnvironmentFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} className={`${router.route==="/account/addaddress"?'hilidtadvalu':''}`} onClick={e=>AddressRoute()}>Address</Menu.Item>
                    <Menu.Item key="4" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OrderRoute()}>Order History</Menu.Item>
                    {/* <Menu.Item key="6" icon={<SlidersOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>PreferencesRoute()}>Preferences</Menu.Item>
                    <Menu.Item key="7" icon={<NotificationOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OfferRoute()}>Notification if Offer</Menu.Item> */}
                    <Menu.Item key="8" icon={<GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>LoyalityRoute()}>My Loyalty Points</Menu.Item>
                    <Menu.Item key="10" icon={<GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>creditNote()}>Coupon</Menu.Item>
                    <Menu.Item key="11" icon={<GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>creditRoute()}>My Credit Notes</Menu.Item>
                    <Menu.Item key="9" icon={<PoweroffOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>handleLogout()}>Logout</Menu.Item>
                </Menu>
            </div>
            <input type="checkbox" id="menu-toggle"></input>
            <label class="hamburger-wrapper" for="menu-toggle">
                <span class="hamburger"></span>
            </label>
            <nav className='leftnav'>
                <Menu defaultSelectedKeys={[JSON.stringify(keyValue)]}>
                    <Menu.Item key="1" icon={<AppstoreFilled style={{color:"#2874f0",fontSize:"18px"}}/>}  style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e => DashboardRoute()}>Account Dashboard</Menu.Item>
                    <Menu.Item key="2" icon={<InfoCircleFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e =>AccountInfoRoute()}>Account Information</Menu.Item>
                    <Menu.Item key="3" icon={<EnvironmentFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>AddressRoute()}>Address</Menu.Item>
                    <Menu.Item key="4" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OrderRoute()}>Order History</Menu.Item>
                    {/* <Menu.Item key="6" icon={<SlidersOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>PreferencesRoute()}>Preferences</Menu.Item> */}
                    {/* <Menu.Item key="7" icon={<NotificationOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OfferRoute()}>Notification if Offer</Menu.Item> */}
                    <Menu.Item key="8" icon={<GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>LoyalityRoute()}>My Loyalty Points</Menu.Item>
                    <Menu.Item key="10" icon={<GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>creditNote()}>Coupon</Menu.Item>
                    <Menu.Item key="11" icon={<GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>creditRoute()}>Credit Note</Menu.Item>
                    <Menu.Item key="9" icon={<PoweroffOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>handleLogout()}>Logout</Menu.Item>
                </Menu>
            </nav>
        </div>
    )
}
export default AccountNav;

