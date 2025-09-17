import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { modalWarning } from "../../../../../api/intercept";
import Router from "next/router";
import { useState } from "react";
import { productCompareApi } from "../../../../../api";
import { getCompareList } from "../../../../../store/compare/action";
import { formatCurrency } from "../../../../../utilities/product-helper";
import { useTranslation } from "../../../../../i18n";
import { priceHelpFunc } from "../../../../helper/priceHelper";

function InformationQuickView({ product,compareCheckFunction,handleAddItemToCompare }) {
  const dispatch = useDispatch();
  const [compareStatus, setCompareStatus] = useState(0);
  const [loadings, setloadings] = useState(false);
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);
  const crumbArray = useSelector((s) => s.product.crumbarrcate);
  let currency = useSelector((s) => s.setting).currency;
  console.log(crumbArray,'crumbArray')

//   const handleAddItemToCompare = (e, productId) => {
//     let data = 0;
//     let dummy = "";
//     if (localStorage.getItem("compareId") !== null) {
//       let idArray = JSON.parse(localStorage.getItem("compareId"));
//       var index = idArray.indexOf(product.productId);

//       if (index !== -1) {
//         let localCompareId = JSON.parse(localStorage.getItem("compareId"));
//         localCompareId.splice(index, 1);
//         localStorage.setItem("compareId", JSON.stringify(localCompareId));
//         setCompareStatus(1);
//         dispatch(getCompareList(1));
//         modalWarning("success");
//       } else {
//         idArray.push(productId);
//         e.preventDefault();
//         if (idArray && idArray.length > 3) {
//           modalWarning("warning");
//         } else {
//           productCompareApi(
//             idArray,
//             data,
//             dummy,
//             dispatch,
//             setCompareStatus,
//             setloadings
//           );
//         }
//       }
//     } else {
//       let idArray = [];
//       let dummy = "";
//       idArray.push(productId);
//       e.preventDefault();

//       if (idArray && idArray.length > 3) {
//         modalWarning("warning");
//       } else {
//         productCompareApi(
//           idArray,
//           data,
//           dummy,
//           dispatch,
//           setCompareStatus,
//           setloadings
//         );
//       }
//     }
//   };

  const ProductRoute = (productSlug) => {
    Router.push("/product/[pid]", `/product/${productSlug}`);
  };

//   function compareCheckFunction() {
//     let idArray = JSON.parse(localStorage.getItem("compareId"));

//     if (idArray && idArray.length !== 0) {
//       let compareCheck = idArray.some((value) => value === product.productId);
//       console.log(compareCheck,'compareCheck');
//       return compareCheck;
   
//     }
    
//   }

  return (
    <div className="ps-product__info" style={{ paddingRight: "20px" }}>
      <h1 style={{ fontWeight: 600 }}>{product.name}</h1>
      <div className="qp-cat-container">
        <p>
          <span>
     
            {t("filter.categories")} :{" "}
            {crumbArray&&crumbArray.length !==0?<>
             {crumbArray &&
              crumbArray[crumbArray.length - 1].categoryName != undefined ? (
                <>{crumbArray[crumbArray.length - 1].categoryName}</>
              ) : (
                ""
              )}
            </>:<>
            <span>
                 
                  {product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}</span>
            </>}
           
          </span>
        </p>
      </div>
     
      <div className="qp-content-container">
        <a>
          <h1 style={{ fontSize: "26px", color: "#000", fontWeight: "600" }}>
          {currency ? currency.symbol + " " : "₹ "}
            {product.price === null ? (
              <>0</>
            ) : (
              <>
                {formatCurrency(
                  priceHelpFunc(
                    product.price,
                    product.taxType,
                    product.taxValue,
                    ""
                  )
                )}
              </>
            )}
          </h1>
        </a>
        {/* <a
          data-toggle="tooltip"
          data-placement="top"
          title="Compare"
          onClick={(e) => handleAddItemToCompare(e, product.productId)}
        >
          {compareCheckFunction() ? (
            <img
              src="/static/img/compare-icon.svg"
              alt=""
              style={{ width: "32px", height: "32px" }}
            />
          ) : (
            <img
              src="/static/img/compare-arrows.svg"
              alt=""
              style={{ width: "32px", height: "32px" }}
            />
          )}
        </a> */}
        <a
          data-toggle="tooltip"
          data-placement="top"
          className={`add-to-cart-btn ${currentColor}`}
          style={{ backgroundColor: "blue" }}
          title="Add to cart"
          onClick={(e) => ProductRoute(product.productSlug)}
        >
          {t("Shared.AddToCart")}
        </a>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.cart;
};
export default connect(mapStateToProps)(InformationQuickView);
