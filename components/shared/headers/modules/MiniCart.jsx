import React from "react";
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "../../../../i18n";
import CartPopup from "./CartPopUp";
import { displayWhenclose } from "../../../../store/colorPalette/action";
import Link from "next/link";
import Router from "next/router";
function MiniCart({ currency }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((s) => s.cart);

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [optionIdValArray, setOptionIdValArray] = useState([]);
  let reloadCart = useSelector((s) => s.cart.addproduct);
  let cartArray = data && data;
  const [changeData, setChangeData] = useState();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [newCartCount, setNewCartCount] = useState(0);
  const [accepted, setAccepted] = useState(1);
  let removeFromCart = useSelector((s) => s.cart.removeproduct);

  const { t } = useTranslation("common");
  useEffect(() => {
   
    setData(JSON.parse(localStorage.getItem("cartItem")));
    quantityTotal();

  }, [reloadCart,removeFromCart]);

  useEffect(() => {
    setData(cartItem.cartItems);
    quantityTotal();
  }, [cartItem]);


  useEffect(() => {
    if (showMiniCart) {
      document.body.classList.add("scroll-block-home");
    } else {
      document.body.classList.remove("scroll-block-home");
    }
  }, [showMiniCart]);

  const quantityTotal = () => {
    let locale = JSON.parse(localStorage.getItem("cartItem"));
    let tempValue = 0;
    let currentValue = 0;

    locale &&
      locale.map((current) => {
        currentValue = tempValue + current.quantity;
        tempValue = currentValue;
      });
    setNewCartCount(locale && locale.length);
  };
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);

const goToCheckoutPage = () => {
  // window.location = "/account/checkout"
  Router.push('/account/checkout')
}
  return (
    <>
     {true ? 
     <div className="ps-cart--mini">
     <CartPopup
      showMiniCart={showMiniCart}
      setShowMiniCart={setShowMiniCart}
      cartData={data}
    />
  
    <a
      className="header__extra"
      href="#"
      onClick = {() => goToCheckoutPage()}
      // onClick={(e) => {
      //   setShowMiniCart(!showMiniCart, dispatch(displayWhenclose("none")));
      //   e.preventDefault();
      // }}
    >
      {/* <img src="/static/img/shopping-cart.svg" alt="" /> */}

      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      {newCartCount && newCartCount != 0 ? <i><span> {newCartCount}</span></i> : ""}
    </a>
  </div>:<Link href="/account/login">
<a className="header__extra">
<i className="fa fa-shopping-cart" aria-hidden="true"></i>
</a>
      </Link>}
     </>
    
  );
}
const mapStateToProps = (state) => {
  return state.cart, state.setting;
};
export default connect(mapStateToProps)(MiniCart);
