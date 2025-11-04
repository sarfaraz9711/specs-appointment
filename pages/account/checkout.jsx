import React, { useEffect, useState } from "react";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import Checkout from "../../components/partials/account/Checkout";
import HeaderMobile from "../../components/shared/headers/HeaderMobile";
import NavigationList from "../../components/shared/navigation/NavigationList";
import ThemeChanger from "../../components/elements/color/themeControl";
import Router from "next/router";
import useNetwork from "../../components/reusable/NetworkCheck";
import FooterFullwidth from "../../components/shared/footers/FooterFullwidth";
import Script from "next/script";
import Head from "next/head";

const OrderTrackingPage = () => {
  const network = useNetwork();
  useEffect(() => {
    if (network === false) {
      Router.push("/network-error");
    }
  }, []);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shopping Cart",
      url: "/account/shopping-cart",
    },
    {
      text: "Checkout Information",
    },
  ];
  return (
    <div className="site-content">
      <>
        <Script src="https://checkout-staging.pluralonline.com/v1/web-sdk-checkout.js" />
      </>
      {/* <HeaderDefault /> */}
      <HeaderMobile />
      <NavigationList />
      <ThemeChanger />
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: `
                 <script src="https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js"></script>
                <script src="https://www.paynimo.com/paynimocheckout/server/lib/checkout.js"></script> 
                
                `,
          }}
        />
      </div>

      <div className="ps-page--simple">
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}
        <Checkout />
      </div>
      {/* <Newsletters layout="container" /> */}
      <FooterFullwidth />
    </div>
  );
};

export default OrderTrackingPage;
