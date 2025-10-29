import React from "react";
import Router from "next/router";
import { logOut } from "../../../store/auth/action";
//import {ConnectPlugin} from '../../connectPlugins';
import NavigationDefault from "../navigation/NavigationDefault";
import HeaderActions from "./modules/HeaderActions";
import Link from "next/link";
import SearchHeader from "./modules/SearchHeader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "../../../i18n";
import { categoryListApi } from "../../../api";
import { getServiceApi } from "../../../api";
import LanguageSwicher from "./modules/LanguageSwicher";
import { useRouter } from "next/router";
import Logo from "./modules/Logo";
import Script from "next/script";
import { useState } from "react";
import { setResponseData } from "../../../store/responsiveData/action";
import Head from "next/head";
import { siteUrl } from "../../../api/url";
import LanguageSwicherProcess9 from "./modules/LanguageSwicherProcess9";

function HeaderDefault() {
  const router = useRouter();
  const canonicalURL = siteUrl + "" + router.asPath;
  const [getSearchBarActive, setSearchBarActive] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  let category = useSelector((s) => s.product);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [logoAction, setLogoAction] = useState("");
  let currentColor = useSelector((s) => s.palette.currentColor);
  let responsiveData = useSelector((s) => s.responsiveData);
  let menuExpand = responsiveData.menuExpand;
  useEffect(() => {
    categoryListApi(dispatch, 2);
    updateLogo();
  }, []);

  // useEffect(() => {
  //   updateLogo()
  // }, [sessionStorage.getItem("parentCategorySlug")]);

  const updateLogo = () => {
    if (
      router.asPath != "/" &&
      (router.asPath == "/rc-sports/home" ||
        sessionStorage.getItem("parentCategorySlug") == "rc-sports")
    ) {
      setLogoAction("furo");
    } else {
      setLogoAction("redchief");
    }
  };

  useEffect(() => {
    setMobileMenu(menuExpand);
  }, [menuExpand]);
  const searchBarToggle = () => {
    const checkActive = getSearchBarActive ? false : true;

    console.log(getSearchBarActive, checkActive);
    setSearchBarActive(checkActive);
    //   if ($(e.target).parents(".dropdown").length === 0) {
    //     $(".dropdown").hide();
    // }

    window.addEventListener("click", function (e) {
      let _except = [
        "ps-form--quick-search",
        "list-inline-item",
        "",
        "anticon anticon-search bluecolor",
      ];
      if (!_except.includes(e.target.parentNode.className) && checkActive) {
        document.getElementById("search-from-me").value = "";
        checkActive = false;
        setSearchBarActive(checkActive);
      }
    });
  };

  const handleClickOutside = (e) => {
    if (mobileMenu && !e.target.closest(".navbar-collapse")) {
      dispatch(setResponseData(false));
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenu]);
  const routeNavigate = (val) => {
    Router.push(val);
  };
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const userData = useSelector((s) => s.auth.userData);
  const [getUserLogin, setUserLogin] = useState(isLoggedIn);
  const [getShowMenu, setShowMenu] = useState(false);
  const [getUserDetails, setUserDetails] = useState({});

  useEffect(() => {
    console.log(userData, "userData");
    if (Object.keys(userData).length > 0) {
      setUserDetails(userData);
    } else {
      setUserDetails(JSON.parse(localStorage.getItem("spurtUser")));
    }
    if (localStorage.getItem("spurtToken") || isLoggedIn) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
  }, [isLoggedIn]);

  const logOutHandler = () => {
    dispatch(logOut());
    setUserLogin(false);
    localStorage.removeItem("spurtToken");
    routeNavigate("/");
  };
  return (
    <>
      <header className="d-flex justify-content-between specs-hedaer">
        <div className="company-name" onClick={(e) => routeNavigate("/")}>
          V-Specs
        </div>
        <div className="action-button d-flex  ">
          {getUserDetails.customerType == 1 ? (
            <input
              onClick={(e) => routeNavigate("/appointment/view-appointments")}
              type="button"
              className="btn btn-primary mr-3"
              value="View Appointments"
            />
          ) : (
            <>
              <input
                onClick={(e) => routeNavigate("/products/view-products")}
                type="button"
                className="btn btn-primary mr-3"
                value="View Products"
              />
              <input
                onClick={(e) => routeNavigate("/appointment/book-appointment")}
                type="button"
                className="btn btn-primary mr-3"
                value="Book Appointment"
              />
            </>
          )}
          {/* {!getUserLogin? <><input onClick={(e)=>routeNavigate('/account/login')} type="button" className="btn btn-primary mr-3" value="Login"/>
      <input onClick={(e)=>routeNavigate('/account/register')} type="button" className="btn btn-primary" value="Signup"/>
      </>: */}

          {getUserLogin && (
            <div className="profile-section">
              <button
                onClick={() => setShowMenu(!getShowMenu)}
                className="profile-btn"
              >
                👤 {`${getUserDetails.firstName} ${getUserDetails.lastName}`}
              </button>
              {getShowMenu && (
                <div className="dropdown">
                  <button className="menu-item">📅 My Appointment</button>
                  <button className="menu-item">👤 My Profile</button>
                  <button className="menu-item" onClick={() => logOutHandler()}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <div className="stickyHeader">
        <Head>
          <link rel="canonical" href={canonicalURL} />
          <script src="https://static-cdn.trackier.com/js/trackier-web-sdk.js"></script>
          <script>window.TrackierWebSDK.init();</script>
          <script src="https://static-cdn.trackier.com/rtg/66e918d4e52a8164b41c58e4.js"></script>
        </Head>
        <div className="topBar">
          <div className="container">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between">
                  <ul
                    className="list-inline helplineSec"
                    style={{
                      display: getSearchBarActive ? "none" : "inline-block",
                    }}
                  >
                    <li
                      className="list-inline-item marquee"
                      style={{ color: "red" }}
                    >
                      <div className="helpLine marqueeInner">
                        <span>
                          Sign Up And Get Add. 200 Off On Your First Order Above
                          1499 | Rs.100 Off On All Prepaid Orders Above 999 |
                          Free Shipping On Order Above 999 | Shop And Earn
                          Loyalty Rewards | T&C Applied
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div
                    className="search-hidden flex-grow-1"
                    id="search-bar"
                    style={{ display: getSearchBarActive ? "block" : "none" }}
                  >
                    <SearchHeader />
                  </div>
                  <ul className="list-inline text-right">
                    <li
                      className="list-inline-item franchise-btn"
                      style={{
                        display: getSearchBarActive ? "none" : "inline-block",
                      }}
                    >
                      <Link href="/franchise">
                        <a className="btn btn-primary">Franchise</a>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <a
                        onClick={(e) => searchBarToggle(getSearchBarActive)}
                        href="javascript:void(0)"
                        title="Click to Search"
                      >
                        <i
                          className={
                            getSearchBarActive ? "fa fa-times" : "fa fa-search"
                          }
                          aria-hidden="true"
                        ></i>{" "}
                      </a>
                    </li>
                    <HeaderActions />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid navSec">
          <header>
            <div className="row">
              <div className="col-md-1 col-sm-2">
                {/* <div className="logo">
                  {logoAction != "furo" ? (
                    <Link href="/">
                      <a title="Redchief">
                        <img src="/static/img/red-chief-logo.png" />
                      </a>
                    </Link>
                  ) : (
                    <Link href="/">
                      <a title="Redchief">
                        <img src="/static/img/rc-sports-logo.png" />
                      </a>
                    </Link>
                  )}
                </div> */}
              </div>
              <div className="col-md-11 col-sm-10">
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                  <div>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsibleNavbar"
                      onClick={() => {
                        dispatch(setResponseData(!mobileMenu));
                      }}
                    >
                      {!mobileMenu && (
                        <span className="navbar-toggler-icon"></span>
                      )}
                      {mobileMenu && <img src="/static/img/close-icon.png" />}
                    </button>
                    <div
                      className={`collapse navbar-collapse ${
                        mobileMenu
                          ? "mobile-menu-active"
                          : "mobile-menu-deactive"
                      }`}
                      id="collapsibleNavbar"
                    >
                      <ul className="navbar-nav">
                        <NavigationDefault />
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
  // }
}

export default HeaderDefault;
