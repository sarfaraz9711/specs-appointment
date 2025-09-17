import React, { Component } from "react";

import { connect, useSelector, useDispatch } from "react-redux";
import {
  increaseItemQty,
  decreaseItemQty,
  removeItem,
  addItem,
} from "../../../store/cart/action";

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { imageUrl } from "../../../api/url";
import {
  cartRemove,
  incrementQuantity,
  decrementQuantity,
} from "../../helper/cartHelper";
import { addToCartApi, removeFromCartApi } from "../../../api";
import { useTranslation } from "../../../i18n";
import { priceHelpFunc } from "../../helper/priceHelper";
import { modalSuccess } from "../../../api/intercept";
import { formatCurrency } from "../../../utilities/product-helper";

function ShoppingCart({ currency }) {
  const [data, setData] = useState();
  const [dummy, setDummy] = useState();
  const [totalData, setTotalData] = useState("");
  const [cartLoader, setCartLoader] = useState(true);
  let removeFromCart = useSelector((s) => s.cart.removeproduct);
  let reloadCart = useSelector((s) => s.cart.addproduct);
  let incrementLoad = useSelector((s) => s.cart.increment);
  let decrementLoad = useSelector((s) => s.cart.decrement);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("cartItem")));
    setCartLoader(false);

    GrandTotal();
  }, [reloadCart, removeFromCart, incrementLoad, decrementLoad]);

;

  const GrandTotal = () => {
    const locale = JSON.parse(localStorage.getItem("cartItem"));
    let temp = 0;
    let total = 0;

    locale &&
      locale.forEach((element) => {
        temp = JSON.parse(element.price) * element.quantity + total;
        total = temp;
      });
    setTotalData(total);
  };

  const handleIncreaseItemQty = (product) => {
    incrementQuantity(product);
    dispatch(increaseItemQty(product));
    dispatch(addItem(1));
    const localCart = JSON.parse(localStorage.getItem("cartItem"));

    let currentProduct = localCart.find((current) => {
      return current.productId === product.productId;
    });
    if (product.flag === "") {
      addToCartApi(
        product.productId,
        priceHelpFunc(product.price, product.taxType, product.taxValue, ""),
        currentProduct.quantity,
        "",
        "",
        setDummy,
        product.skuName,
        "",
        product.variantId,
        product.variantName
      );
    } else {
      addToCartApi(
        product.productId,
        priceHelpFunc(
          product.pricerefer,
          product.taxType,
          product.taxValue,
          ""
        ),
        currentProduct.quantity,
        "",
        "",
        setDummy,
        product.skuName,
        "",
        product.variantId,
        product.variantName
      );
    }
    
  };


  const handleDecreaseItemQty = (product) => {
    if (product.quantity !== 1) {
      decrementQuantity(product);
      dispatch(decreaseItemQty(product));
      dispatch(addItem(1));
      const localCart = JSON.parse(localStorage.getItem("cartItem"));
      let currentProduct = localCart.find((current) => {
        return current.productId === product.productId;
      });
      if (product.flag === "") {
        addToCartApi(
          product.productId,
          priceHelpFunc(product.price, product.taxType, product.taxValue, ""),
          currentProduct.quantity,
          "",
          "",
          setDummy,
          product.skuName,
          "",
          product.variantId,
          product.variantName
        );
      } else {
        addToCartApi(
          product.productId,
          priceHelpFunc(
            product.pricerefer,
            product.taxType,
            product.taxValue,
            ""
          ),
          currentProduct.quantity,
          "",
          "",
          setDummy,
          product.skuName,
          "",
          product.variantId,
          product.variantName
        );
      }
    } else {
      removeFromCartApi(product.productId, product.price, "", product.skuName);
      cartRemove(product);
      dispatch(removeItem(product));
    }
  };


  const handleRemoveCartItem = (e, productId, product, optionIdArrayValue) => {
    e.preventDefault();
    removeFromCartApi(
      product.productId,
      product.price,
      "",
      product.skuName,
      product.variantId,
      product.variantName
    );
    cartRemove(product);
    dispatch(removeItem(product));
  };

  function quantityTotal() {
    let tempValue = 0;
    let currentValue = 0;

    data &&
      data.map((current) => {
        currentValue = tempValue + current.quantity;
        tempValue = currentValue;
      });
    return tempValue;
  }

  const ClearAll = () => {
    localStorage.setItem("cartItem", JSON.stringify([]));
    modalSuccess("success", "Successfully cleared your cart");
    dispatch(addItem(1));
  };

  const goToCheckoutPage = () => {
    document.location.href = "/account/checkout";
  }
 
  const { amount, cartTotal, cartItems } = "";
  let currentCartItems = [];
  
  return (
    <div className="cart-container">
      {data && data.length !== 0 ? (
        <div className="cart-container-main">
          <h3>
            {t("ItemsinCart")}- {quantityTotal()}
          </h3>
          <div className="cart-table-container">
            <div className="cart-table-header">
              <div className="cart-table-product-header">{t("product")}</div>
              <div className="cart-table-productName-header"></div>
              <div className="cart-table-price-header">{t("price")}</div>
              <div className="cart-table-quantity-header">{t("quantity")}</div>
              <div className="cart-table-subtotal-header">{t("subtotal")}</div>
              <div className="cart-table-cell-close">
                <div className="cart-close-button-container">
                  <button onClick={(e) => ClearAll()}>{t("ClearAll")}</button>
                </div>
              </div>
            </div>
            {data &&
              data.map((product, index) => (
                <div className="cart-table-row-container" key={index}>
                  <div className="cart-table-product-header">
                    <img
                      src={
                        product.productImage &&
                        product.productImage[0] &&
                        product.productImage[0].containerName !== "/"
                          ? imageUrl +
                            "?path=" +
                            product.productImage[0].containerName +
                            "&name=" +
                            product.productImage[0].image +
                            "&width=400&height=200"
                          : "/static/img/no-image.png"
                      }
                    />
                  </div>

                  <div className="cart-table-productName-header">
                    <a>{product.name}</a>
                    <p>
                      {"SKU " + product.skuName}{" "}
                      <span style={{ marginLeft: "20px" }}>
                        {product.variantName}
                      </span>
                    </p>
                  </div>
                  <div className="cart-table-price-header">
                    {currency ? currency.symbol : "₹"}{" "}
                    {formatCurrency(product.price) } 
                  </div>
                  <div className="cart-table-quantity-header">
                    <div className="custom-product-box">
                      <button onClick={(e) => handleDecreaseItemQty(product)}>
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button onClick={(e) => handleIncreaseItemQty(product)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-table-subtotal-header">
                    {" "}
                    {currency ? currency.symbol : "₹"}{" "}
                    {formatCurrency(product.quantity * product.price)}{" "}
                  </div>
                  <div
                    className="cart-table-cell-close"
                    onClick={(e) =>
                      handleRemoveCartItem(
                        e,
                        product.productId,
                        product,
                        product.optionIdArrayValue
                      )
                    }
                  >
                    <div className="cart-table-close-contain">x</div>
                  </div>
                </div>
              ))}
            <div className="cart-table-footer-button">
              <div className="cart-table-continue-button">
                <Link href="/">
                  <a>{t("Continue")}</a>
                </Link>
              </div>
              <div className="cart-button-hidden-contain"></div>
              <div className="cart-button-hidden-contain">
                <div className="cart-content-grand">
                  {t("GrandTotal")} : {currency ? currency.symbol : "₹ "}{" "}
                  {formatCurrency(totalData)}
                </div>
              </div>
              <div className="cart-table-cell-close">
                {/* <Link href="/account/checkout"> */}
                  <a onClick={(e) => goToCheckoutPage()}>
                    {" "}
                   <span style={{marginRight:"5px"}}><img src="/static/img/checkout.svg" /></span> 
                    {"  "}{t("cart.Checkout")}
                  </a>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sc-noitem-container">
          <h4>{t("YOUHAVENOITEMSCART")}</h4>
          <Link href="/">
            <a>{t("ContinueShopping")} </a>
          </Link>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.cart, state.setting;
};
export default connect(mapStateToProps)(ShoppingCart);
