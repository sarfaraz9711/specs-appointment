import React, { Component } from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect, useSelector, useDispatch } from 'react-redux';
import AccountQuickLinks from './AccountQuickLinks';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { useState } from 'react';
import { useEffect } from 'react';
import { cartCountApi } from '../../../../api/cart/cartCount';
import { Drawer } from 'antd';
import PanelMenu from '../../panel/PanelMenu';
// import MiniCart from '../../../../addOns/MiniCart';
/*import { Drawer } from 'antd';
import PanelCartMobile from '../../panel/PanelCartMobile';*/

function MobileHeaderActions({ auth, cartTotal }) {
    let reloadCart = useSelector(s => s.cart.addproduct)
    let category = useSelector(s => s.product.categories)
    let auths = useSelector(s => s.auth)
   

    const [menuDrawer, setMenuDrawer] = useState(false)
    const [cartDrawer, setCartDrawer] = useState(false)
    const [searchDrawer, setSearchDrawer] = useState(false)
    const [categoriesDrawer, setCategoriesDrawer] = useState(false)
    const [cartData, setCartData] = useState([])
    let cartLocal = []
    const dispatch = useDispatch()



    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem("cartItem")))
        cartLocal = JSON.parse(localStorage.getItem("cartItem"))
        cartGet()

    }, [reloadCart])

    const cartGet = () => {
      
        if (cartLocal === null || cartLocal.length === 0) {
            // localStorage.getItem("spurtToken")&&cartCountApi(dispatch)
        }
    }

    const handleDrawerClose = () => {
        setMenuDrawer(false)
       

    };
    
    return (
        <div className="navigation__right">
           
            <Drawer
                className="ps-panel--mobile"
                placement="left"
                closable={false}
                onClose={e => setMenuDrawer(false)}
                visible={menuDrawer}>
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3></h3>
                        <span
                            className="ps-panel__close"
                            onClick={e => setMenuDrawer(false)}>
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        {category &&
                            category.map((item,i) => {

                                
                                return <PanelMenu key={i} menuData={item} setMenuDrawer={setMenuDrawer} />;


                            })}
                           
                       
                    </div>
                </div>
            </Drawer>
            
            {/* <Link href="/account/compare">
            <a class="header__extra" >
               
                <img src="/static/img/compare.svg" alt="" /><span><i>0</i></span>
            </a>
            </Link>
            <Link href="/account/wishlist">
            <a class="header__extra" >
                <img src="/static/img/heart.svg" alt="" /><span><i>0</i></span>
            </a>
            </Link> */}
           
            {/* <Link href=""> */}
            {/* <a class="header__extra" >
                <img src="/static/img/shopping-cart.svg" alt="" /><span><i>0</i></span>
            </a> */}
            {/* </Link> */}

            {/* {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (
                <a className="header__extra">
                    <Link href="/account/login">
                        <i className="icon-user"></i>
                    </Link>
                </a>
            )}

            <a
                
                className="header__extra"
                onClick={e => setMenuDrawer(true)}
            >
                <i className="icon-menu"></i>
              
            </a> */}
        </div>
    );
    // }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(MobileHeaderActions);
