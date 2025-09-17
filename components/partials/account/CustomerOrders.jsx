import React from "react";
import { useEffect, useState } from "react";
import AccountNav from "../../elements/AccountNav";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { orderExportApi, customerOrderListApi, orderStatusApi } from "../../../api";
import moment from "moment";
import { imageUrl } from "../../../api/url";
import Router from "next/router";
import Head from "next/head";
import { formatCurrency } from "../../../utilities/product-helper";
import { useTranslation } from "../../../i18n";
import Loader from '../../shared/Loader';
import Link from 'next/link'
const { TabPane } = Tabs;

function CustomerOrders() {
  const [orderData, setOrderData] = useState([]);
  const [filtredData, setFiltredData] = useState([])
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
  const [limit, setLimit] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  // const [count,setCount]=useState("")
  const [resetBtnClicked, setResetBtnClicked] = useState(0)
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState("opened");
  const [isLoaderActive, setLoaderActive] = useState(false)
  const { t } = useTranslation("common");
  const [orderStatusData, setOrderStatusData] = useState()

  let currentColor = useSelector((s) => s.palette.currentColor);

  const getPdfData = (id, prefixid) => {
    setLoadImg(true);
    orderExportApi(id, prefixid, setLoaderActive);
    setImgLoadId(id);
  };
  const filteredData = () => {
    var newItem = [...filtredData]
    var values = newItem.filter(item => {
      return Object.keys(item).some(key => {
        console.log(String(item[key]), searchVal)
        return String(item[key]).toLocaleLowerCase().includes(String(searchVal.toLocaleLowerCase()))
      })
    });
    if ([...searchVal].length > 0) {
    }
    setOrderData(values)
  };
  useEffect(() => {
    setOrderLoader(true);
    setReload(0);
    customerOrderListApi(
      limit,
      offset,
      setOrderData,
      searchVal,
      "",
      setOrderLoader,
      setCount,
      status,
      setFiltredData
    );
    customerOrderListApi(
      limit,
      offset,
      setOrderData,
      searchVal,
      1,
      setOrderLoader,
      setCount,
      status,
      setFiltredData
    );
  }, [reload, offset, limit, status, resetBtnClicked]);
  useEffect(() => {
    filteredData()
    orderStatusApi(setOrderStatusData);
  }, [])
  const ProductRoute = (productSlug) => {
    Router.push("/product/[pid]", `/product/${productSlug}`);
  };

  const RouteTrack = (orderProductId) => {
    Router.push("/account/track/[tid]", `/account/track/${orderProductId}`);
  };
  console.log("");

  const RouteDetail = (orderId) => {
    Router.push(
      "/account/customer-order-details/[odid]",
      `/account/customer-order-details/${orderId}`
    );
  };

  const RouteCancel = (orderProductId) => {
    Router.push(
      "/account/cancel-order/[cdid]",
      `/account/cancel-order/${orderProductId}`
    );
  };
  const resetBtnHandler = () => {
    setSearchVal("")
    setOrderData(filtredData)
  }
  const tabChangeScroll = (current) => {
    setStatus(current);
  };
  console.log("orderStatusData>>>", orderStatusData);

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
                <h3 className="ml-2">{t("account.OrderHistory")}</h3>
                <div className="oh-search-container">
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search Order"
                  />
                  <button onClick={filteredData}>{t("account.SearchOrder")}</button>
                  <span>
                    <button
                      className="oh-reset"
                      onClick={resetBtnHandler}
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
                  {/* <TabPane
                    tab={t("account.ClosedOrders")}
                    key="closed"
                  ></TabPane> */}
                  <TabPane
                    tab={t("Orders")}
                    key="opened"
                  ></TabPane>
                  {/* <TabPane
                    tab={t("account.CancelledOrders")}
                    key="cancelled"
                  ></TabPane> */}
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
                              <div onClick={e=>RouteDetail(order.orderId)} className="c-pointer oh-card-header">
                                <div className="oh-card-header-det">
                                  <p>{t("account.OrderId#")} </p>

                                  {/* <h4 onClick={(e) =>
                                    RouteDetail(order.orderId)
                                  }>
                                    
                                    {order.orderPrefixId}
                                  </h4> */}
                                  <a onClick={(e) =>
                                    RouteDetail(order.orderId)
                                  } title="Redchief" >{order.orderPrefixId}</a>
                                </div>
                                <div className="oh-card-header-det">
                                  <p>{t("account.OrderPlaced")} </p>
                                  <h4>
                                    {moment(order.createdDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </h4>
                                </div>
                                <div className="oh-card-header-det">
                                  <p>{t("Qty")} </p>
                                  <h4>
                                    {order.NoOfItems}

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
                                  <p>{order.shippingAddress1},{order.shippingAddress2},</p>
                                  <p>{order.shippingCity}</p>
                                </div>
                                <div className="oh-card-header-det d-none">
                                  <p>{t("account.OrderStatus")}</p>


                                  <h4>
                                    {orderStatusData.map((item) => {
                                      if (item.orderStatusId == order.orderStatusId) {
                                        return item.name
                                      }
                                    }
                                    )}
                                  </h4>


                                </div>


                                <div className="oh-card-header-det">

                                  <div className="oh-search-container">
                                    {order.orderStatusId == 5 &&
                                      <button
                                        onClick={(e) => {
                                          setLoaderActive(true)
                                          getPdfData(order.orderId, order.orderPrefixId)
                                        }
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
                                        <i class="fa fa-download mr-2" />
                                        {t("account.Invoice")}
                                      </button>}

                                  </div>
                                </div>
                              </div>
                              {/* <div className="oh-content-button"> */}
                              {/* {order.orderStatusId != 6 && order.orderStatusId != 7 && order.orderStatusId != 8 && <button
                                  onClick={(e) =>
                                    RouteTrack(order.orderProductId)
                                  }
                                >
                                  {t("account.TrackOrder")}{" "}
                                  <img src="/static/img/arrow-right.svg" />
                                </button>} */}
                              {/* <button>
                                      {t("account.Documents")}
                                      <img src="/static/img/arrow-right.svg" />
                                    </button> */}
                              {/* <button
                                  onClick={(e) =>
                                    RouteDetail(order.orderId)
                                  }
                                >
                                  {t("account.OrderDetails")}{" "}
                                  <img src="/static/img/arrow-right.svg" />
                                </button> */}

                              {/* {(() => {
                                  if (order.orderStatusId == 1) {
                                   return <button
                                    onClick={(e) =>
                                      RouteCancel(order.orderId)
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
                                  }

                                })()} */}


                              {/* </div> */}
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
      {isLoaderActive && <Loader />}
    </section>
  );
}

export default CustomerOrders;
