import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
//import {ConnectPlugin} from '../../connectPlugins';
import {
  addItemToWishlist,
  wishListLoading,
} from "../../../store/wishlist/action";
import Link from "next/link";
import { useEffect } from "react";
import { wishListApi } from "../../../api";
import { delWishApi } from "../../../api";
import { imageUrl } from "../../../api/url";
import Router from "next/router";
import { priceHelpFunc } from "../../helper/priceHelper";
import Head from "next/head";
import { useTranslation } from "../../../i18n";
import CompareRatingReviews from "../../elements/detail/modules/description/CompareRatingReview";
import DisplayImageWithS3PreSignedUrl from "../../../components/elements/AwsS3PreSignedUrl";

function Wishlist(props) {
  const [wishlistData, setWishListApi] = useState([]);
  const [delstatus, setDelStatus] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  let currency = useSelector((s) => s.setting).currency;


  const wishApiCall = () => {
    dispatch(wishListLoading(true));
    wishListApi(setWishListApi, dispatch, setInitialLoad);
  };

  useEffect(() => {
    setDelStatus(0);
    wishApiCall();
  }, [delstatus]);



  const handleRemoveWishListItem = (e, productId) => {
    e.preventDefault();
    delWishApi(productId, setDelStatus);
    dispatch(addItemToWishlist(1));
  };

  const handleCartAddRedirect = (e, productSlug) => {
    Router.push("/product/[pid]", `/product/${productSlug}`);
  };

  const handleClick = () => {
    Router.push('/')
  }

  return (
    <div className="compare-container-main">
      <Head>
        <title>Wishlist</title>
      </Head>


      {initialLoad ? (
        <div className="ps-page--product">
          <div className="ps-container">
            <div style={{ paddingTop: "100px", paddingBottom: "200px" }}>
              <center><img src="/static/img/spurt-original-loader.gif" style={{ height: "100px", width: "100px" }} /></center>
            </div>
          </div>

        </div>
      ) : (
        <>
          {wishlistData && wishlistData.length === 0 ? (
            <div className="wishlist-subcontainer-custom">
              <div className="wishList-load-contain">
                <div className="wishList-load-subcontainer">
                  <img src="/static/img/wishlist-empty-img.svg" />
                  <h3>{t("Wishlist.EmptyWishlist")}</h3>
                  <p>{t("Wishlist.item")}</p>
                  <div className=" wishlist-place-order text-align-left">
                    <button onClick={handleClick}>Start Shopping Now</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {wishlistData &&
                wishlistData.map((product) => (
                  <div className="col-md-3 mb-5">
                    <div className="wish-box">
                      <DisplayImageWithS3PreSignedUrl imageKey={product.containerName+product.image} resizeRequired="NO" />
                    <div className="wish-text">
                          <div className="wish-text-wrap">
                            <Link
                              href="/product/[pid]"
                              as={`/product/${product.productSlug}`}
                            >
                              <a>{product.name}</a>
                            </Link>
                          </div>
                        <CompareRatingReviews product={product} />


                          <div className="wish-price mb-3">
                            {currency ? currency.symbol + " " : "₹ "}
                            {product.pricerefer !== ""
                              ? priceHelpFunc(
                                product.pricerefer,
                                product.taxType,
                                product.taxValue,
                                ""
                              )
                              : priceHelpFunc(
                                product.price,
                                product.taxType,
                                product.taxValue,
                                ""
                              )}{" "}
                          </div>
                      </div>
                      <div className="wish-card-button justify-content-between">
                        <button
                          onClick={(e) =>
                            handleCartAddRedirect(e, product.productSlug)
                          }
                        >
                          {/* <img
                            src="/static/img/cart-blue.svg"
                            style={{ marginRight: "10px" }}
                          /> */}
                          {t("Wishlist.View Detail")}
                        </button>
                        <button
                          onClick={(e) =>
                            handleRemoveWishListItem(e, product.productId)
                          }
                        >
                          <img
                            src="/static/img/trash.svg"
                            style={{ marginRight: "10px" }}
                          />
                          {t("Wishlist.Clear")}
                        </button>
                      </div>
                  </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return state.wishlist;
};
export default connect(mapStateToProps)(Wishlist);
