import React, { useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { SocialIcon } from "react-social-icons";
import { Container, Segment } from "semantic-ui-react";
import { facebookGtm } from "../../../../../api/data/facebook";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  EmailShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import ThumbnailDefault from "../../modules/thumbnail/ThumbnailDefault";

import {
  addItem,
  increaseItemQty,
  decreaseItemQty,
} from "../../../../../store/cart/action";
import { useState } from "react";
import {
  addToCartApi,
  getParentCategory,
} from "../../../../../api/cart/addToCart";
import { cartAdd } from "../../../../helper/cartHelper";
import { pinCodeApi } from "../../../../../api/product/pincodeAvail";
import { priceHelpFunc } from "../../../../helper/priceHelper";
import { useEffect } from "react";
import Router from "next/router";
import { useTranslation } from "../../../../../i18n";
import { modalSuccess } from "../../../../../api/intercept";
import toast from "../../../../../api/toast/index";
import Head from "next/head";
import { displayWhenclose } from "../../../../../store/colorPalette/action";
import { formatCurrency } from "../../../../../utilities/product-helper";
import CartPopup from "../../../../shared/headers/modules/CartPopUp";
import {
  getHomeRevies,
  getOptionRevies,
  getQuantymin,
  getsliderimageclicks,
} from "../../../../../store/product/action";
import SpurtQuotationPop from "../../../../partials/Quotation/QuoteModal";
import ProductReviewRatingviews from "../description/ProductReviewRating";
import SpurtVarientComponent from "../../../../partials/product/VarientComponent";
import {
  CheckCircleOutlined,
  CheckOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Image, Popover, Radio } from "antd";
import { siteUrl } from "../../../../../api/url";
import * as ga from "../../../../../utilities/common-helpers";

function InformationDefault({
  showModal,
  product,
  setShowModal,
  setShowPriceModal,
  priceChartInfo,
  showPriceModal,
  isLoggedIn,
  // varientdefultid,
  scrollTo,
  starcoutid,
  Productslug,
  productdata,
}) {
  //  let product=useSelector((s) => s.setting).currency;
  const varproduct = useSelector((s) => s.product.singleProduct);

  const availableProductStatus = useSelector((s) => s.product.hidefunavailable);
  const quantity = useSelector((s) => s.product.qut);
  const getCartVarient = useSelector((v) => v.cart.varientItem);

  const [colorTheme, setColorTheme] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  // const [quantity, setQuantity] = useState(1);
  const [pin, setPin] = useState("");
  const [pinInfo, setPinInfo] = useState("");
  const [checkStatus, setCheckStatus] = useState("");
  const [availValue, setAvailValue] = useState("");
  const [priceAdded, setPriceAdded] = useState("");
  const [productsPrice, setProductsPrice] = useState(product.price);
  const [samplePriceRefer] = useState(product.pricerefer);
  const [optionStateArray, setOptionStateArray] = useState([]);
  const [arrayReload, setArrayReload] = useState(0);
  const [optionName, setOptionName] = useState();
  const [productOptionValueId, setProductOptionId] = useState([]);
  const [productOptionIdRefer, setProductOptionIdRefer] = useState([]);
  const [productVarientDetail, setProductVarientDetail] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);
  const [variantNameArray, setVariantNameArray] = useState([]);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [skuNumber, setSkuNumber] = useState("");
  const [opentlet, setopentlet] = useState("");
  // const [availableProductStatus, SetavailableProductStatus] = useState(false);
  // product.skuName=skuNumber
  const [varName, setVarName] = useState("");
  const [imagedataload, setalldataload] = useState([]);
  const [productExistsInCart, setProductExistsInCart] = useState([]);
  const [varId, setVarId] = useState("");
  const [addedInCart, SetAddedInCart] = useState(false);

  let currentColor = useSelector((s) => s.palette.currentColor);
  let authCheck = useSelector((s) => s.auth);
  let removeFromCart = useSelector((s) => s.cart.removeproduct);
  let reloadCart = useSelector((s) => s.cart.addproduct);
  let currency = useSelector((s) => s.setting).currency;
  product.initialPrice = productsPrice;
  const varientdefultid = useSelector((s) => s.product.sliderdataimage);
  const [urls] = useState(`${siteUrl}/product/${product.productSlug}`);

  // product.skuName=skuNumber
  let optionArray = [];
  const myReview = useRef();
  const tirevalue = product;
  const res = {};
  product &&
    product.productImage &&
    product.productImage.forEach((obj) => {
      res["name"] = obj.image;
      res["containerName"] = obj.containerName;
    });

  useEffect(() => {
    console.log("shareurl", urls);
    dispatch(getQuantymin(1));
    varproduct.processImage = product.productImage;
    if (product.minQuantityAllowedCart !== null && product.hasStock !== 0) {
      if (
        varproduct.productvarientList &&
        varproduct.productvarientList.length !== 0
      ) {
        if (varproduct.minQuantityAllowedCart !== null) {
          dispatch(getQuantymin(varproduct.minQuantityAllowedCart));
        } else {
          dispatch(getQuantymin(1));
        }

        // setQuantity(varproduct.minQuantityAllowedCart);
      } else {
        dispatch(getQuantymin(product.minQuantityAllowedCart));

        // setQuantity(product.minQuantityAllowedCart);
      }
    }
    localStorage.removeItem("signUpPopupProductPage");
  }, [varproduct]);

  useEffect(() => {
    dispatch(getsliderimageclicks(product && product.productImage));
  }, []);

  // useEffect(() => {
  //   if(varproduct.productvarientList &&
  //     varproduct.productvarientList.length !== 0){
  //       console.log(product.skuName,'product.skuName')
  //       setQuantity(qutmin)
  //       // product.skuName=varproduct.skuName
  //     }

  // }, [qutmin]);

  useEffect(() => {
    if (
      varproduct.productvarientList &&
      varproduct.productvarientList.length !== 0
    ) {
      setSkuNumber(varproduct.skuName);
      // product.skuName=varproduct.skuName
    } else {
      setSkuNumber(product.skuName);
    }
  }, [varproduct.skuName]);

  useEffect(() => {
    // setSkuNumber(product.skuName)
    dispatch(getHomeRevies(varproduct.vendorId));
  }, []);

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cartItem")));
  }, [reloadCart, removeFromCart]);

  useEffect(() => {
    if (showMiniCart) {
      document.body.classList.add("scroll-block-home");
    } else {
      document.body.classList.remove("scroll-block-home");
    }
  }, [showMiniCart]);

  useEffect(() => {
    setalldataload(product.productImage);
    const cartItems = JSON.parse(localStorage.getItem("cartItem"));
    if (cartItems) {
      const variantName = varproduct.variantName;
      setProductExistsInCart(cartItems);
    }
  }, [buttonLoader, reloadCart]);

  const quantityTier = () => {
    product.productTirePrices.sort(function (a, b) {
      return a.quantity - b.quantity;
    });

    var min = product.productTirePrices[0];
    var min2 = product.productTirePrices[1];
    var min3 = product.productTirePrices[2];
    var min4 = product.productTirePrices[3];
    dispatch(getQuantymin(quantity + 1));
    // setQuantity(quantity + 1);

    if (product && product.productTirePrices.length === 4) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        product.price = min2.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min3.quantity && quantity + 1 < min4.quantity) {
        product.price = min3.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min4.quantity) {
        product.price = min4.price;
        product.pricerefer = min.price;
      }
    }
    if (product && product.productTirePrices.length === 3) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        product.price = min2.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min3.quantity) {
        product.price = min3.price;
      }
    }
    if (product && product.productTirePrices.length === 2) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity) {
        product.price = min2.price;
        product.pricerefer = min.price;
      }
    }
    if (product && product.productTirePrices.length === 1) {
      if (quantity + 1 >= min.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }
    }
  };

  const quantityDecrementTier = () => {
    product.productTirePrices.sort(function (a, b) {
      return a.quantity - b.quantity;
    });

    var min = product.productTirePrices[0];
    var min2 = product.productTirePrices[1];
    var min3 = product.productTirePrices[2];
    var min4 = product.productTirePrices[3];
    dispatch(getQuantymin(quantity - 1));
    // setQuantity(quantity - 1);

    if (product && product.productTirePrices.length === 4) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        product.price = min2.price;
        product.pricerefer = min2.price;
      }

      if (quantity + 1 >= min3.quantity && quantity + 1 < min4.quantity) {
        product.price = min3.price;
        product.pricerefer = min3.price;
      }

      if (quantity + 1 >= min4.quantity) {
        product.price = min4.price;
        product.pricerefer = min4.price;
      }

      if (quantity + 1 >= min3.quantity) {
        product.price = min3.price;
        product.pricerefer = min3.price;
      }

      if (quantity - 1 >= min.quantity && quantity - 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity - 1 >= min2.quantity) {
        product.price = min2.price;
        product.pricerefer = min2.price;
      }
      if (quantity - 1 < min.quantity) {
        product.price = productsPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
    if (product && product.productTirePrices.length === 3) {
      if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
        // product.price=productsPrice
        product.price = min2.price;
        product.pricerefer = min2.price;
      }

      if (quantity + 1 >= min3.quantity) {
        product.price = min3.price;
        product.pricerefer = min3.price;
      }

      if (quantity - 1 >= min.quantity && quantity - 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity - 1 >= min2.quantity) {
        // product.price=productsPrice
        product.price = min2.price;
        product.pricerefer = min2.price;
      }
      if (quantity - 1 < min.quantity) {
        product.price = productsPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
    if (product && product.productTirePrices.length === 2) {
      if (quantity - 1 >= min.quantity && quantity - 1 < min2.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      }

      if (quantity - 1 >= min2.quantity) {
        // product.price=productsPrice
        product.price = min2.price;
        product.pricerefer = min2.price;
      }
      if (quantity - 1 < min.quantity) {
        product.price = productsPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
    if (product && product.productTirePrices.length === 1) {
      if (quantity - 1 >= min.quantity) {
        product.price = min.price;
        product.pricerefer = min.price;
      } else {
        product.price = product.initialPrice;
        product.pricerefer = samplePriceRefer;
      }
    }
  };

  const modalWarningLimit = (type) => {
    toast({ type: type, message: "You have reached maximum quantity limit" });
  };

  const sendAddtoCartStatsToGA4 = (product) => {
    let fbData = [
      {
        currency: "INR",
        content_ids: product.skuName,
        content_name: product.name,
        price: product.productSellingPrice,
      },
    ];
    facebookGtm(fbData, "AddToCart");
    ga.pushToDataLayer({
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value: product.productSellingPrice,
        items: [
          {
            item_id: product.skuName,
            item_name: product.name,
            index: 0,
            price: product.productSellingPrice,
            quantity: 1,
          },
        ],
      },
    });
  };

  const handleAddItemToCart = async (e, id, price, product) => {
    sendAddtoCartStatsToGA4(product);
    const category = product?.Category[0];
    const parentCategory = await getParentCategory(category.categoryId);
    let parentCategoryName = category.categoryName;
    if (parentCategory.category_id != null) {
      parentCategoryName = parentCategory.name;
    }
    e.preventDefault();
    setButtonLoader(true);
    dispatch(displayWhenclose("none"));

    if (varproduct.skuName !== undefined) {
      product.skuName = skuNumber;
      product.productImage = [];
    }
    if (authCheck.isLoggedIn) {
      if (product.flag === "") {
        addToCartApi(
          id,
          priceHelpFunc(
            JSON.parse(product.price),
            product.taxType,
            product.taxValue,
            availValue
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName,
          parentCategoryName
        );
      } else {
        let upPrice = parseFloat(price) + parseFloat(availValue);
        addToCartApi(
          id,
          priceHelpFunc(
            product.price,
            product.taxType,
            product.taxValue,
            availValue
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName
        );
      }
    } else {
      modalSuccess("success", `Thank you ${product.name} is added to cart`);
    }
    product.availValue = availValue;
    product.initialPrice = varproduct.price;
    product.productImage = varproduct.processImage;
    // product.productImage=res
    product.optionIdArrayValue = productOptionValueId;
    product.optionName = JSON.stringify(optionName);
    product.variantName = varproduct.variantName;
    if (varproduct.skuName !== undefined) {
      product.price = parseFloat(varproduct.price);
    }
    //

    // product.skuName=varproduct.skuName
    // product.skuName=varproduct.skuName
    // console.log(optionName, "availValueavailValue");
    // console.log(res,'availValueavailValue')
    // console.log(product, quantity, availValue, "availValueavailValue");
    cartAdd(product, quantity, availValue, parentCategoryName);
    SetAddedInCart(true);
    dispatch(addItem(1));

    // setShowMiniCart(true);
  };

  const handleBuyAddItemToCart = async (e, id, price, product) => {
    console.log(product, "Nero added in buy ow");
    sendAddtoCartStatsToGA4(product);
    const category = product?.Category[0];
    const parentCategory = await getParentCategory(category.categoryId);
    let parentCategoryName = category.categoryName;
    if (parentCategory.category_id != null) {
      parentCategoryName = parentCategory.name;
    }
    e.preventDefault();
    setButtonLoader(true);
    dispatch(displayWhenclose("none"));
    if (varproduct.skuName !== undefined) {
      product.skuName = skuNumber;
    }
    if (authCheck.isLoggedIn) {
      if (product.flag === "") {
        addToCartApi(
          id,
          priceHelpFunc(
            product.price,
            product.taxType,
            product.taxValue,
            availValue
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName,
          parentCategoryName
        );
      } else {
        let upPrice = parseFloat(price) + parseFloat(availValue);
        addToCartApi(
          id,
          priceHelpFunc(
            product.pricerefer,
            product.taxType,
            product.taxValue,
            ""
          ),
          quantity,
          optionName,
          productOptionValueId,
          setButtonLoader,
          product.skuName,
          "new",
          product.variantId,
          product.variantName
        );
      }
    } else {
      modalSuccess("success", ` ${product.name} is added to cart`);
    }

    product.availValue = availValue;
    product.initialPrice = productsPrice;
    product.productImage = varproduct.processImage;
    // product.processImage = res;
    // product.skuName=varproduct.skuName
    product.optionIdArrayValue = productOptionValueId;
    product.selectedOption = optionStateArray;
    product.optionName = JSON.stringify(optionName);
    product.variantName = varproduct.variantName;
    if (varproduct.skuName !== undefined) {
      product.price = varproduct.price;
      product.skuName = skuNumber;
    }

    cartAdd(product, quantity, availValue);
    // if(varproduct.skuName !==undefined){
    //   product.skuName=skuNumber
    // }

    dispatch(addItem(1));
    // setAvailValue(0)
    product.price = parseFloat(productsPrice);
    window.location.href = "/account/checkout";
    //Router.push("/account/checkout");
  };

  const handleIncreaseItemQty = (e, product) => {
    if (
      varproduct.productvarientList &&
      varproduct.productvarientList.length !== 0
    ) {
      const filterSku = varproduct.productvarientList.filter(
        (item) => item.skuName == skuNumber
      );
      product.maxQuantityAllowedCart =
        filterSku[0].quantity > varproduct.maxQuantityAllowedCart
          ? varproduct.maxQuantityAllowedCart
          : filterSku[0].quantity;
    }
    if (product.hasStock === 1) {
      if (product.hasTirePrice === 1) {
        product.productTirePrices.map((tieres, index) => {
          if (tieres.quantity <= quantity + 1) {
            // console.log(tieres.quantity,'tieres');
            setopentlet(tieres);
            product.price = priceHelpFunc(
              JSON.parse(tieres.price),
              product.taxType,
              product.taxValue,
              ""
            );
          }
        });

        if (product.maxQuantityAllowedCart !== null) {
          if (product.maxQuantityAllowedCart >= quantity + 1) {
            quantityTier();
          } else {
            modalWarningLimit("error");
          }
        } else {
          quantityTier();
        }
      } else {
        if (product.maxQuantityAllowedCart !== null) {
          if (product.maxQuantityAllowedCart >= quantity + 1) {
            quantityTier();
          } else {
            modalWarningLimit("error");
          }
        } else {
          quantityTier();
        }
      }
    } else {
      if (product.hasTirePrice === 1) {
        //  product.productvarientList.map(()=>{

        //  })
        product.productTirePrices.map((tieres, index) => {
          if (tieres.quantity <= quantity + 1) {
            // console.log(tieres.quantity,'tieres');
            setopentlet(tieres);
            product.price = priceHelpFunc(
              JSON.parse(tieres.price),
              product.taxType,
              product.taxValue,
              ""
            );
          }
        });
        if (product.maxQuantityAllowedCart !== null) {
          if (
            product.maxQuantityAllowedCart >= quantity + 1 ||
            product.hasStock != 1
          ) {
            dispatch(increaseItemQty(product));
            dispatch(addItem(1));
            dispatch(getQuantymin(quantity + 1));
            // setQuantity(quantity + 1);
          } else {
            modalWarningLimit("error");
          }
        } else {
          dispatch(increaseItemQty(product));
          dispatch(addItem(1));
          dispatch(getQuantymin(quantity + 1));
          // setQuantity(quantity + 1);
        }
      } else {
        if (product.maxQuantityAllowedCart !== null) {
          console.log(varproduct.productvarientList);
          console.log("quantityquantityquantityquantity", quantity);
          const checkVarient = varproduct.productvarientList.filter(
            (item) => item.id == product.variantId
          );
          if (
            checkVarient[0].maxQuantityAllowedCart >= quantity + 1 &&
            checkVarient[0].quantity >= quantity + 1
          ) {
            dispatch(increaseItemQty(product));
            dispatch(addItem(1));
            // setQuantity(quantity + 1);
            dispatch(getQuantymin(quantity + 1));
          } else {
            modalWarningLimit("error");
          }
        } else {
          dispatch(increaseItemQty(product));
          dispatch(addItem(1));
          // setQuantity(quantity + 1);
          dispatch(getQuantymin(quantity + 1));
        }
      }
    }
  };

  const handleDecreaseItemQty = (e) => {
    if (
      varproduct.productvarientList &&
      varproduct.productvarientList.length !== 0
    ) {
      product.minQuantityAllowedCart = varproduct.minQuantityAllowedCart;
    }

    if (product.hasStock === 1) {
      if (product.minQuantityAllowedCart === null) {
        quantity > 1 && quantityDecrementTier();
      } else {
        if (quantity - 1 >= product.minQuantityAllowedCart) {
          quantity > 1 && quantityDecrementTier();
        }
      }
    } else {
      if (product.minQuantityAllowedCart !== null && product.hasStock !== 0) {
        if (quantity - 1 >= product.minQuantityAllowedCart) {
          quantity > 1 && dispatch(getQuantymin(quantity - 1));
          // setQuantity(quantity - 1);
          dispatch(decreaseItemQty(product));
          dispatch(addItem(1));
        } else {
        }
      } else {
        quantity > 1 && dispatch(getQuantymin(quantity - 1));
        // setQuantity(quantity - 1);
        dispatch(decreaseItemQty(product));
        dispatch(addItem(1));
      }
    }
  };

  const pinCodeCheck = (id) => {
    if (pin.length !== 0) {
      pinCodeApi(id, pin, setPinInfo, setCheckStatus);
    }
  };

  useEffect(() => {
    setArrayReload(0);

    const len = optionStateArray && optionStateArray.length;

    let detailArray = [];
    let valueArray = [];
    for (var i = 0; i < len; i++) {
      detailArray.push(parseFloat(optionStateArray[i].price));
      valueArray.push(optionStateArray[i].optionValueName);
    }
    var sum = detailArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    setAvailValue(sum);
    const productTransApi = {
      totalOptions: sum,
      options: product.productOption,
      optionValueArray: valueArray,
    };
    setOptionName(productTransApi);
    dispatch(getOptionRevies(productTransApi));
  }, [arrayReload]);

  const handleBackOrder = (product) => {
    let productUpdated = product;

    product.quantity = quantity;
    productUpdated.quantityUpdated = quantity;
    product.productOptions = optionStateArray;

    localStorage.setItem("backOrderLocal", JSON.stringify(productUpdated));
    Router.push("/account/stock-checkout");
  };

  const handleChartClick = (e) => {
    e.preventDefault();
    setShowPriceModal(!showPriceModal);
  };

  const Seeallcustomer = () => {
    const yOffset = -50;
    const y =
      myReview.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const text = (
    <div className="info-heading">
      <span className="heading">
        <b>REDCHIEF STORES NEAR YOU</b>
      </span>
    </div>
  );

  const content = () => {
    const body = useSelector((state) => state.auth.storeData);

    const [value, setValue] = useState("1");

    const onchange = (e) => {
      setValue(e.target.value);
    };
    return (
      <div className="main-dev">
        <div className="middle-dev">
          <div className="bottom-dev">
            <table className="table" style={{ border: "none" }}>
              <tbody>
                {body &&
                  body?.map((b) => (
                    <Radio value="1" onChange={onchange}>
                      <>
                        <h4 className="box-heading">{b.shopName}</h4>
                        <tr>
                          <td> {b.address} </td>
                          <td>:</td>
                          <td>
                            <strong className="available">Available</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Order Online & pickup</td>
                          <td>:</td>
                          <td>
                            <strong>Ready to pickup in 2 hours</strong>
                          </td>
                        </tr>
                        <ul className="ul-heading">
                          <li>
                            <strong>
                              Time :{" "}
                              <span>
                                {b.storeOpeningTime} - {b.storeClosingTime}
                              </span>{" "}
                            </strong>
                          </li>
                          <li>
                            <strong>
                              Phone : <span>{b.contactNo}</span>{" "}
                            </strong>
                          </li>
                        </ul>

                        {/* <a className="direction-heading" href="https://maps.google.com/?q=12.81839,77.690889">
              <Image src="https://3.imimg.com/data3/SH/UO/MY-2521105/directional-sign-500x500.jpg" width={35} className="img-tag" />
              Direction</a> */}
                      </>
                    </Radio>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-sticky-detail">
      {/* <div style={{ display: "flex", flexDirection: "row-reverse"}}>hello</div> */}
      <Head>
        <title>{product.metaTagTitle}</title>
        <meta name="keywords" content={product.metaTagKeyword} />
        <meta name="description" content={product.metaTagDescription} />
        <meta name="title" content={`Buy ${product.metaTagTitle} Online`} />
      </Head>

      <CartPopup
        showMiniCart={showMiniCart}
        setShowMiniCart={setShowMiniCart}
        cartData={cartData}
      />
      {console.log("productproduct", product)}
      <div className="ps-product__header mobile-active">
        <ThumbnailDefault
          product={product}
          setvarientdefultid={product.variantId}
          varientdefultid={product.variantId}
        />
      </div>
      {availableProductStatus === false || true ? (
        <>
          <p>Article No: {product.upc}</p>
        </>
      ) : (
        <>
          <p>Article No:</p>
        </>
      )}

      <h1 className="desktop-active">{product.name}</h1>

      <div className="product-quant-price-container d-block">
        <div className="product-quant-price-subcontainer">
          {product.isActive == 1 && availableProductStatus === false ? (
            <p className="is-available">
              <img
                src="/static/img/tick-green.svg"
                className="product-avail-out"
              />
              {t("products.Available")}
            </p>
          ) : (
            <p className="is-not-available">Not Available</p>
          )}
          <div className="product-quant-price-maincontainer mb-0">
            <div className="custom-product-price mr-80">
              {varproduct.productvarientList &&
              varproduct.productvarientList.length !== 0 ? (
                <>
                  {availableProductStatus === false || true ? (
                    <>
                      {/* {console.log(Object.keys(varproduct.selectedVariant).length,'2323varproduct')} */}
                      {varproduct.productvarientList.map((produt) => (
                        <>
                          {varproduct.variantName == produt.varientName ? (
                            <>
                              <h3>
                                {product.hasTirePrice === 1 ? (
                                  <>
                                    {
                                      // product.productTirePrices.map(
                                      //   (tieres, index) =>

                                      opentlet.quantity <= quantity ? (
                                        <>
                                          {currency
                                            ? currency.symbol + " "
                                            : "₹ "}
                                          {priceHelpFunc(
                                            JSON.parse(opentlet.price),
                                            product.taxType,
                                            product.taxValue,
                                            ""
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {currency
                                            ? currency.symbol + " "
                                            : "₹ "}

                                          {produt.pricerefer ? (
                                            <>
                                              {produt.pricerefer !== ""
                                                ? formatCurrency(
                                                    priceHelpFunc(
                                                      produt.pricerefer,
                                                      product.taxType,
                                                      product.taxValue,
                                                      availValue
                                                    )
                                                  )
                                                : formatCurrency(
                                                    priceHelpFunc(
                                                      produt.price,
                                                      product.taxType,
                                                      product.taxValue,
                                                      availValue
                                                    )
                                                  )}
                                            </>
                                          ) : (
                                            <>
                                              {formatCurrency(
                                                priceHelpFunc(
                                                  produt.price,
                                                  product.taxType,
                                                  product.taxValue,
                                                  availValue
                                                )
                                              )}
                                            </>
                                          )}
                                        </>
                                      )
                                      // )
                                    }
                                  </>
                                ) : (
                                  <>
                                    {currency ? currency.symbol + " " : "₹ "}
                                    {/* sfdsdasd */}
                                    {produt.pricerefer ? (
                                      <>
                                        {produt.pricerefer !== ""
                                          ? formatCurrency(
                                              priceHelpFunc(
                                                produt.pricerefer,
                                                product.taxType,
                                                product.taxValue,
                                                availValue
                                              )
                                            )
                                          : formatCurrency(
                                              priceHelpFunc(
                                                produt.price,
                                                product.taxType,
                                                product.taxValue,
                                                availValue
                                              )
                                            )}
                                      </>
                                    ) : (
                                      <>
                                        {formatCurrency(
                                          priceHelpFunc(
                                            produt.price,
                                            product.taxType,
                                            product.taxValue,
                                            availValue
                                          )
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </h3>

                              {produt.pricerefer && (
                                <>
                                  {produt.pricerefer !== "" && (
                                    <span className="mb-0">
                                      {currency ? currency.symbol + " " : "₹ "}{" "}
                                      {priceHelpFunc(
                                        produt.price,
                                        product.taxType,
                                        product.taxValue,
                                        ""
                                      )}
                                    </span>
                                  )}
                                </>
                              )}

                              {produt.pricerefer ? (
                                <>
                                  {produt.pricerefer !== "" && (
                                    <p className="mb-0">
                                      {Math.abs(
                                        Math.round(
                                          ((produt.price - produt.pricerefer) *
                                            100) /
                                            produt.price
                                        )
                                      )}
                                      % off
                                    </p>
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    // sfsdfsdfsdfsdfsd
                    ""
                  )}
                </>
              ) : (
                <>
                  {product.hasTirePrice === 1 ? (
                    <>
                      {opentlet.quantity <= quantity ? (
                        <>
                          <h3>
                            {currency ? currency.symbol + " " : "₹ "}
                            {priceHelpFunc(
                              JSON.parse(opentlet.price),
                              product.taxType,
                              product.taxValue,
                              ""
                            )}
                          </h3>
                        </>
                      ) : (
                        <>
                          <h3>
                            {currency ? currency.symbol + " " : "₹ "}
                            {product.pricerefer
                              ? formatCurrency(
                                  priceHelpFunc(
                                    product.pricerefer,
                                    product.taxType,
                                    product.taxValue,
                                    availValue
                                  )
                                )
                              : formatCurrency(
                                  priceHelpFunc(
                                    product.price,
                                    product.taxType,
                                    product.taxValue,
                                    availValue
                                  )
                                )}
                          </h3>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h3>
                        {currency ? currency.symbol + " " : "₹ "}

                        {product.pricerefer !== ""
                          ? formatCurrency(
                              priceHelpFunc(
                                product.pricerefer,
                                product.taxType,
                                product.taxValue,
                                availValue
                              )
                            )
                          : formatCurrency(
                              priceHelpFunc(
                                product.initialPrice,
                                product.taxType,
                                product.taxValue,
                                availValue
                              )
                            )}
                      </h3>
                      {product.initialPrice && product.pricerefer !== "" && (
                        <span className="mb-0">
                          {currency ? currency.symbol + " " : "₹ "}{" "}
                          {priceHelpFunc(
                            product.initialPrice,
                            product.taxType,
                            product.taxValue,
                            availValue
                          )}
                        </span>
                      )}

                      {product.flag !== "" && (
                        <p className="mb-0">
                          {Math.abs(
                            Math.round(
                              ((product.initialPrice - product.pricerefer) *
                                100) /
                                product.initialPrice
                            )
                          )}
                          % off
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {availableProductStatus === false || true ? (
              <>
                <div className="custom-product-quant mb-0 justify-content-center">
                  <span className="mr-0">{t("account.Quantity")}:</span>
                  <div className="custom-product-box">
                    <button onClick={(e) => handleDecreaseItemQty(e, product)}>
                      -
                    </button>

                    <span>{quantity}</span>
                    <button onClick={(e) => handleIncreaseItemQty(e, product)}>
                      +
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <p className="pr-mrp-text">
            MRP:(Inclusive of all taxes)
            <br />
            Country Origin - INDIA
          </p>
        </div>
      </div>
      {availableProductStatus === false ? (
        <>
          <ProductReviewRatingviews product={product} starcout={starcoutid} />
        </>
      ) : (
        ""
      )}

      {/* {availableProductStatus === false ? (
        <>
          {product.hasTirePrice === 1 &&
            product.productTirePrices.length !== 0 && (
              <>
                <div className="custom-tier-proddet">
                  <a onClick={(e) => handleChartClick(e)}>
                    {t("products.TirePriceChart")}
                  </a>
                </div>
                {showPriceModal && (
                  <table className="custom-tier-price-table product-table-underline">
                    <tr>
                      <th style={{ width: "100px" }}>
                        {t("account.Quantity")}
                      </th>
                      <th>per unit</th>
                      <th>price</th>
                    </tr>
                    {product.productTirePrices.map((price, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td style={{ width: "100px" }}>{price.quantity}</td>
                            <td> */}
      {/* ( */}
      {/* per unit ={" "} */}
      {/* {currency ? currency.symbol + " " : "₹ "}
                              {price.price} */}
      {/* ) */}
      {/* </td>
                            <td>
                              {currency ? currency.symbol + " " : "₹ "}
                              {price.quantity * price.price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                )}
              </>
            )}
        </>
      ) : (
        ""
      )} */}

      {product.pincodeBasedDelivery === 1 && (
        <div className="custom-shipping-input-container">
          <p>{t("products.CheckLocation")}</p>
          <div className="custom-shipping-input-subcontainer">
            <input
              placeholder="Enter a pin-code eg. 600034"
              type="number"
              value={pin}
              onChange={(e) =>
                e.target.value.length < 8 && setPin(e.target.value)
              }
            />
            <button onClick={(e) => pinCodeCheck(product.productId)}>
              Check
            </button>
          </div>
          {checkStatus === "success" && (
            <div className="delivery-truck-container">
              <img src="/static/img/delivery-truck.svg" alt="" />
              Delivery Available
            </div>
          )}
        </div>
      )}
      <>
        <SpurtVarientComponent />
      </>
      {product.isActive == 1 && availableProductStatus === false ? (
        <>
          {product.pincodeBasedDelivery === 1 && checkStatus === "success" && (
            <div className="">
              {product.hasStock === 1 &&
                product.stockStatus === "outOfStock" && <h2>Out of Stock</h2>}
              {product.stockStatus !== "outOfStock" && (
                <>
                  <button
                    // className="custom-product-addToCart"
                    className={`custom-product-addToCart ${currentColor}`}
                    onClick={(e) =>
                      handleAddItemToCart(
                        e,
                        product.productId,
                        product.price,
                        product
                      )
                    }
                    // disabled={buttonLoader === true ? "disabled" : ""}
                  >
                    <img src="/static/img/cart-icon.svg" />
                    {t("products.AddToCart")}
                  </button>
                  <button
                    className="custom-product-buynow"
                    onClick={(e) =>
                      handleBuyAddItemToCart(
                        e,
                        product.productId,
                        product.price,
                        product
                      )
                    }
                  >
                    <img src="/static/img/power.svg" />
                    {t("products.BuyNow")}
                  </button>
                </>
              )}
              {/* {product.enableBackOrders !== 1 && (
                <button
                  className="custom-product-buynow"
                  onClick={(e) =>
                    handleBuyAddItemToCart(
                      e,
                      product.productId,
                      product.price,
                      product
                    )
                  }
                >
                  <img src="/static/img/power.svg" />
                  {t("products.BuyNow")}
                </button>
              )} */}
              {product.hasStock === 1 &&
                product.stockStatus === "outOfStock" &&
                product.enableBackOrders === 1 && (
                  <button
                    className="custom-product-buynow"
                    onClick={(e) => handleBackOrder(product)}
                  >
                    {t("products.OrderNow")}
                  </button>
                )}
            </div>
          )}

          {product.pincodeBasedDelivery !== 1 && (
            <div className="custom-product-detail-btn">
              {product.stockStatus === "outOfStock" && (
                <h2>{t("products.OutofStock")}</h2>
              )}

              {productExistsInCart.length > 0 &&
                productExistsInCart.filter(
                  (item) => item.variantId == product.variantId
                ).length > 0 && (
                  // <button
                  //   // className="custom-product-addToCart"
                  //   className={`custom-product-addToCart ${currentColor}`}
                  //   onClick={(e) => {
                  //     window.location = "/account/checkout";
                  //     //Router.push("/account/shopping-cart");
                  //   }}
                  //   // disabled={buttonLoader === true ? "disabled" : ""}
                  // >
                  //   <img src="/static/img/cart-icon.svg" />
                  //   {t("products.GoToCart")}
                  // </button>
                  <>
                    <button
                      className={`custom-product-addToCart ${currentColor}`}
                      onClick={(e) => {
                        window.location = "/account/checkout";
                      }}
                    >
                      <img src="/static/img/cart-icon.svg" />
                      {t("products.GoToCart")}
                    </button>

                    <button
                      className={`custom-product-addToCart ${currentColor}`}
                      onClick={(e) => {
                        window.location = "/appointment/camera";
                      }}
                    >
                      <i
                        className="fa fa-camera"
                        style={{ marginRight: "8px" }}
                      ></i>
                      TRY FRAME
                      {/* {t("products.TryFrame")} */}
                    </button>
                  </>
                )}
              {/* 
        {addedInCart && productExistsInCart && productExistsInCart.length < 1 && (
                <button
                  // className="custom-product-addToCart"
                  className={`custom-product-addToCart ${currentColor}`}
                  onClick={(e) =>{
                    window.location = "/account/checkout";
                    //Router.push("/account/shopping-cart");
                  }}
                // disabled={buttonLoader === true ? "disabled" : ""}
                >
                  <img src="/static/img/cart-icon.svg" />
                  {t("products.GoToCart")}
                </button>
              )} */}
              {console.log(product.variantId)}
              {console.log("getCartVarient.skuName", getCartVarient.skuName)}
              {console.log(productExistsInCart)}

              {(productExistsInCart.length == 0 ||
                productExistsInCart.filter(
                  (item) => item.variantId == product.variantId
                ).length == 0) && (
                <>
                  {" "}
                  <button
                    // className="custom-product-addToCart"
                    className={`custom-product-addToCart ${currentColor}`}
                    onClick={(e) =>
                      handleAddItemToCart(
                        e,
                        product.productId,
                        product.price,
                        product
                      )
                    }
                    // disabled={buttonLoader === true ? "disabled" : ""}
                  >
                    <img src="/static/img/cart-icon.svg" />
                    {t("products.AddToCart")}
                  </button>
                  <button
                    className="custom-product-buynow"
                    onClick={(e) =>
                      handleBuyAddItemToCart(
                        e,
                        product.productId,
                        product.price,
                        product
                      )
                    }
                  >
                    <img src="/static/img/power.svg" />
                    {t("products.BuyNow")}
                  </button>
                </>
              )}

              {product.enableBackOrders === 1 &&
                product.stockStatus === "outOfStock" && (
                  <button
                    className="custom-product-buynow"
                    onClick={(e) => handleBackOrder(product)}
                  >
                    {t("products.OrderNow")}
                  </button>
                )}
            </div>
          )}
          {/* <br /> */}

          {/* <div className="pin-check">
            <h5> <EnvironmentOutlined className="pin-heading" /> Delivery & Services  </h5>


            <div className="location-pin">


              <div className="area-pin">

                <div className="cus-pin">
                  <span>110096</span>

                  <div className="pin-icon">
                    <CheckOutlined className="icon-val" />
                  </div>
                </div>

                <div className="change">
                  <button className="pin-change">Change</button>
                </div>

              </div>

              <div>
                <Popover placement="topRight" title={text} content={content} trigger="click">
                  <Button className="popover">View all store Stock</Button>
                </Popover> </div>
            </div>

            <div className="home-cus">

              <HomeOutlined className="outline-icon" />

              <div className="store-dev">Free pickup available in store</div>

            </div>
          </div> */}
          <SpurtQuotationPop product={product} />
          <div style={{ display: "flex" }} className="product-share">
            {/* <div style={{marginTop:'4px' , fontSize:'12px' ,padding:'2px'}}>SHARE THIS </div> */}
            <span className="mr-2 social-share">
              <i class="fa fa-share" />
              Share
            </span>
            <Segment style={{ margin: "2px" }}>
              <FacebookShareButton
                title="facebook"
                appId="581792929406650"
                url={urls}
              >
                <FacebookIcon size={20} round={true} />
              </FacebookShareButton>
            </Segment>
            <Segment title="Whatsapp" style={{ margin: "2px" }}>
              <WhatsappShareButton url={urls}>
                <WhatsappIcon size={20} round={true} />
              </WhatsappShareButton>
            </Segment>
            <Segment style={{ margin: "2px" }}></Segment>
            <Segment title="Twiter" style={{ margin: "2px" }}>
              <TwitterShareButton url={urls}>
                <TwitterIcon size={20} round={true} />
              </TwitterShareButton>
            </Segment>
            {/* <Segment>
              <SocialIcon target="_blank" title="Instagram" style={{ height: 18, width: 18, margin: "4px" }} url="https://instagram.com" />

            </Segment> */}
          </div>
        </>
      ) : (
        " "
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.setting;
};

export default connect(mapStateToProps)(InformationDefault);
