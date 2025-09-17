import React from "react";
import { useEffect, useState } from "react";
import AccountNav from "../../elements/AccountNav";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { orderExportApi, orderListApi } from "../../../api";
import moment from "moment";
import { imageUrl } from "../../../api/url";
import Router from "next/router";
import Head from "next/head";
import { formatCurrency } from "../../../utilities/product-helper";
import { useTranslation } from "../../../i18n";
const { TabPane } = Tabs;

function MyOrderComp() {
  const [orderData, setOrderData] = useState([]);
  const [loadImg, setLoadImg] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [imgLoadId, setImgLoadId] = useState("");
  const [fname, setFname] = useState("");
  const [orderLoader, setOrderLoader] = useState(true);
  const dispatch = useDispatch();
  const [cancel, setCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState([]);
  const [cancelId, setCancelId] = useState("");
  const [reload, setReload] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const [count,setCount]=useState("")
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState("opened");
  const { t } = useTranslation("common");
  let currentColor = useSelector((s) => s.palette.currentColor);

  const getPdfData = (id) => {
    setLoadImg(true);
    orderExportApi(id, setLoadImg);
    setImgLoadId(id);
  };

  useEffect(() => {
    setOrderLoader(true);
    setReload(0);
    orderListApi(
      limit,
      offset,
      setOrderData,
      searchVal,
      "",
      setOrderLoader,
      setCount,
      status
    );
    orderListApi(
      limit,
      offset,
      setOrderData,
      searchVal,
      1,
      setOrderLoader,
      setCount,
      status
    );
  }, [searchVal, reload, offset, limit, status]);

  const ProductRoute = (productSlug) => {
    Router.push("/product/[pid]", `/product/${productSlug}`);
  };

  const RouteTrack = (orderProductId) => {
    Router.push("/account/track/[tid]", `/account/track/${orderProductId}`);
  };

  const RouteDetail = (orderProductId) => {
    Router.push(
      "/account/order-details/[odid]",
      `/account/order-details/${orderProductId}`
    );
  };

  const RouteCancel = (orderProductId) => {
    Router.push(
      "/account/cancel-order/[cdid]",
      `/account/cancel-order/${orderProductId}`
    );
  };

  const tabChangeScroll = (current) => {
    setStatus(current);
  };

  return (
    <section className="cus-account-container">
      <div className="cus-account-subcontainer">
        <Head>
          <title>Order History</title>
        </Head>
        <div className="cus-position-container">
          <AccountNav keyValue={4} />
          <div className="cus-right-position">
            <div className="oh-container">
              <div className="oh-header-search">
                <h3>{t("account.OrderHistory")}</h3>
                <div className="oh-search-container">
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                  />
                  <button>{t("account.SearchOrder")}</button>
                  <span>
                    <button
                      className="oh-reset"
                      onClick={(e) => setSearchVal("")}
                    >
                      {t("account.Reset")}
                    </button>
                  </span>
                </div>
              </div>
              <div className="oh-tabs-container">
                <Tabs
                  defaultActiveKey={status}
                  onTabClick={(e) => tabChangeScroll(e)}
                >
                  <TabPane
                    tab={t("account.ClosedOrders")}
                    key="closed"
                  ></TabPane>
                  <TabPane
                    tab={t("account.OpenedOrders")}
                    key="opened"
                  ></TabPane>
                  <TabPane
                    tab={t("account.CancelledOrders")}
                    key="cancelled"
                  ></TabPane>
                </Tabs>
                {orderLoader === false ? (
                  <>
                    {orderData && orderData.length === 0 ? (
                      <div className="order-no-data">
                        <p>No Order found</p>
                      </div>
                    ) : (
                      <>
                        {orderData &&
                          orderData.map((order) => (
                            <div className="oh-card-container">
                              <div className="oh-card-header">
                                <div className="oh-card-header-det">
                                  <p>{t("account.OrderPlaced")} </p>
                                  <h4>
                                    {moment(order.createdDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </h4>
                                </div>
                                <div className="oh-card-header-det">
                                  <p>{t("cart.Total")} </p>
                                  <h4>
                                    {order.currencySymbolLeft}
                                    {formatCurrency(
                                      Math.round(order.total)
                                    )}{" "}
                                  </h4>
                                </div>
                                <div className="oh-card-header-det">
                                  <p>{t("account.ShipTo")}</p>
                                  <p>{order.shippingAddress1},</p>
                                  <p>{order.shippingAddress2},</p>
                                  <p>{order.shippingCity}</p>
                                </div>
                                <div className="oh-card-header-det">
                                  <p>{t("account.OrderStatus")}</p>
                                  {status !== "cancelled" && (
                                    <span>
                                      <h4
                                        style={{
                                          color: order.cancelRequest
                                            ? "red"
                                            : "#388e3c",
                                        }}
                                      >
                                        {order.cancelRequest
                                          ? "Your cancel order is pending."
                                          : order.orderStatusName}
                                      </h4>
                                    </span>
                                  )}
                                </div>
                                <div className="oh-card-header-det">
                                  <p>
                                    {t("account.OrderId#")}{" "}
                                    {order.orderProductPrefixId}
                                  </p>
                                  <div className="oh-invoice">
                                    <p style={{ color: "blue" }}>
                                      <a
                                        onClick={(e) =>
                                          getPdfData(order.orderProductId)
                                        }
                                      >
                                        {loadImg &&
                                        imgLoadId === order.orderProductId ? (
                                          <img
                                            src="/static/img/loading.gif"
                                            style={{
                                              height: "20px",
                                              width: "20px",
                                            }}
                                          />
                                        ) : (
                                          ""
                                        )}
                                        {t("account.Invoice")}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="oh-content-container">
                                <div className="oh-content-subcontainer">
                                  <div className="oh-content-img-detail">
                                    <div className="oh-content-img">
                                      <img
                                        src={
                                          imageUrl +
                                          "?path=" +
                                          order.containerName +
                                          "&name=" +
                                          order.image +
                                          "&width=400&height=200"
                                        }
                                      />
                                    </div>
                                    <div className="oh-content-detail-container">
                                      <div className="oh-content-detail-header">
                                        <h3
                                          onClick={(e) =>
                                            ProductRoute(order.productSlug)
                                          }
                                        >
                                          <a>{order.productName}</a>
                                        </h3>
                                      </div>
                                      <div className="oh-content-buyit-again">
                                        <button
                                          onClick={(e) =>
                                            ProductRoute(order.productSlug)
                                          }
                                        >
                                          {t("account.BuyItAgain")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="oh-content-button">
                                    <button
                                      onClick={(e) =>
                                        RouteTrack(order.orderProductId)
                                      }
                                    >
                                      {t("account.TrackOrder")}{" "}
                                      <img src="/static/img/arrow-right.svg" />
                                    </button>
                                    {/* <button>
                                      {t("account.Documents")}
                                      <img src="/static/img/arrow-right.svg" />
                                    </button> */}
                                    <button
                                      onClick={(e) =>
                                        RouteDetail(order.orderProductId)
                                      }
                                    >
                                      {t("account.OrderDetails")}{" "}
                                      <img src="/static/img/arrow-right.svg" />
                                    </button>
                                    {status !== "cancelled" ? (
                                      <button
                                        onClick={(e) =>
                                          RouteCancel(order.orderProductId)
                                        }
                                        disabled={
                                          order.cancelRequest === 1
                                            ? true
                                            : false
                                        }
                                      >
                                        {t("account.CancelOrder")}{" "}
                                        <img src="/static/img/arrow-right.svg" />
                                      </button>
                                    ) : (
                                      <p style={{ color: "red" }}>
                                        Your order is cancelled.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </>
                ) : (
                  <div className="ps-block__content">
                    <center>
                      <img
                        src="/static/img/spurt-original-loader.gif"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyOrderComp;
