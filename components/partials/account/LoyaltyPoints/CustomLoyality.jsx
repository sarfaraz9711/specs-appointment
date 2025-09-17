import React from 'react';
import { useEffect, useState } from 'react';
import AccountNav from '../../../elements/AccountNav';
import Head from 'next/head'
import { Button, Tabs } from 'antd';
import { useTranslation } from "../../../../i18n";
import MyCoupons from './coupons';
import LoyaltyPoint from './LoyaltyPoint'
import Mymembership from './MyMembership';
import MyTransaction from './Transaction';
import { getAllTxnsData } from '../../../../api/loyalityPoints';

function MyLoyality() {
  const [couponHistory, setCouponHistory] = useState([])
  const [loyaltyPoints, setLoyalityPoints] = useState(0)
  const [customerDetail, setCustomerDetail] = useState([])
  const [transdata, setTransData] = useState([]);
  const [loggedUserMobile, setLoggedinUserMobile] = useState();

  const { TabPane } = Tabs;
  const { t } = useTranslation("common");
  const [status, setStatus] = useState("opened");

  useEffect(() => {
    
    // passData();
  }, [])

  const dummyData = async() => {
    const loggedinUserData = window.localStorage.getItem("spurtUser");
    
    const parsedData = JSON.parse(loggedinUserData);
    
    
    let payload ={
      "objClass": 
          {"customer_mobile": parsedData.mobileNumber}
      }
   let data = await getAllTxnsData(payload);
   return data;

  }
  const [phone, setphone] = useState("");

  const passData = async() =>{
    
    const dummyRes = await dummyData();
    if(dummyRes.GET_CUSTOMER_TRANS_INFOResult.Success){
      //data = data;
    
    let loyalityData = dummyRes.GET_CUSTOMER_TRANS_INFOResult.output;
    let parseData = JSON.parse(loyalityData.response)
    

    let loyalitycoupon = dummyRes.GET_CUSTOMER_TRANS_INFOResult.output;
    let parsedHistory = JSON.parse(loyalitycoupon.response)
    let couponHis = parsedHistory.COUPON_HISTORY;
    let loyaltyPoints = parsedHistory.CUSTOMER_DETAILS;
    let membershipData = dummyRes.GET_CUSTOMER_TRANS_INFOResult.output;
    let parseMemberData = JSON.parse(membershipData.response)
    let customerDetail = parseMemberData.CUSTOMER_DETAILS;
    
console.log(customerDetail, "nerewsfdfsfds")
    let transactionData = dummyRes.GET_CUSTOMER_TRANS_INFOResult.output;
    let parseTransacionData = JSON.parse(transactionData.response);
    let transactionHis = parseTransacionData.EARN_BURN_HISTORY;
    

    setCouponHistory(couponHis);
    setLoyalityPoints(loyaltyPoints);
    setCustomerDetail(customerDetail);
    setTransData(transactionHis);
    }
    
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    fixCorsError();
    console.log("fhgdsfhdsbchdsavchfdabcfgffgfvfggi");

  };




  return (
    <section className="cus-account-container">
      <div className="cus-account-subcontainer">
        <Head>
          <title>Timeline</title>
        </Head>
        <div className="cus-position-container">
          <AccountNav keyValue={8} />
          <div className="cus-right-position">
            <div className="adr-subcontainer">
              <div className="adr-main-contain">
                <div className='ml-2 account-heading'>Loyalty Points</div>
                <div className="oh-tabs-container">
                  <Tabs
                    defaultActiveKey={status}
                  >
                    <TabPane
                      tab={t("TIMELINE")}
                      key="opened"
                      children={<LoyaltyPoint props={loyaltyPoints} />
                      }></TabPane>


                    <TabPane
                      tab={t("COUPONS")}
                      key="closed"
                      children={
                        couponHistory.length > 0 ? couponHistory.map(el => {
                          return <MyCoupons props={el} />
                        }) : <div className='alert-danger tab-no-record loyality-box'>No coupon found</div>
                      }

                    ></TabPane>

                    <TabPane
                      tab={t("MY MEMBERSHIP")}
                      key="my membership"
                      children={
                        customerDetail.length > 0 ? customerDetail.map(cd => {
                          return <Mymembership props={cd} />
                        }) : <div className='alert-danger tab-no-record loyality-box'>No record found</div>

                      }
                    ></TabPane>

                    <TabPane className='row pr-4 pl-4 transaction' 
                      tab={t("TRANSACTIONS")}
                      key="transactions"
                      children={
                        transdata.length > 0 ? transdata.map(th => {
                          return <>{th.StoreName=='ONLINE' && <div className='col-md-4'><MyTransaction  props={th}/></div>}</>
                        }) : <div className='alert-danger tab-no-record loyality-box'>No record found</div>
                        

                      }
                    ></TabPane>
                    
                  </Tabs>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default MyLoyality