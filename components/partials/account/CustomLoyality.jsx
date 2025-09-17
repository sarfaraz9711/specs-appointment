import React from 'react';
import { useEffect, useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import Head from 'next/head'
import { Button, Tabs } from 'antd';
import { useTranslation } from "../../../i18n";
import MyCoupons from './coupons';


function MyLoyality() {
  const [couponHistory, setCouponHistory] = useState([])
  const { TabPane } = Tabs;
  const { t } = useTranslation("common");
  const [status, setStatus] = useState("opened");

  useEffect(() => {
    passData();
  },[])

  const dummyData = () => {
    let data = {
      "GET_CUSTOMER_TRANS_INFOResult": {
        "Success": true,
        "message": "Record Found for Mobile No : 9555420197",
        "methodname": "GET_CUSTOMER_HISTORY",
        "output": {
          "response": "{\"CUSTOMER_DETAILS\":[{\"Name\":\"SK \",\"EmailId\":\"\",\"LoyalityPoints\":\"7294.1\",\"LoyalityPointsValue\":3647.05,\"BonusPoints\":\"150\",\"Point_Per_Value\":0.5,\"EarningPoints\":0.00,\"BurningPoints\":5167.90,\"PurchaseAmount\":\"0.00\",\"Dob\":\"01-01-1900\",\"Doa\":\"01-01-1900\",\"gender\":\"Male\",\"Slab\":\"Classique\",\"LastVisit\":\"Apr 22 2021  1:07:00\",\"city\":\"Noida\"}],\"EARN_BURN_HISTORY\":[{\"StoreCode\":\"HO-01\",\"StoreId\":39,\"StoreName\":\"HO-01 (QB)\",\"Detail\":\"Burning\",\"BillNo\":\"Test-01\",\"BillDate\":\"22-04-2021\",\"BillAmount\":\"\",\"Points\":\"10\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-01\",\"StoreId\":39,\"StoreName\":\"HO-01 (QB)\",\"Detail\":\"Burning\",\"BillNo\":\"Test-01\",\"BillDate\":\"22-04-2021\",\"BillAmount\":\"\",\"Points\":\"-10\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test-001\",\"BillDate\":\"31-12-2020\",\"BillAmount\":\"\",\"Points\":\"20\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test-001\",\"BillDate\":\"22-06-2020\",\"BillAmount\":\"\",\"Points\":\"235.9\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test-001\",\"BillDate\":\"22-06-2020\",\"BillAmount\":\"\",\"Points\":\"50\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"218\",\"StoreId\":29,\"StoreName\":\"Kettlary Test\",\"Detail\":\"Burning\",\"BillNo\":\"Test-005\",\"BillDate\":\"03-04-2020\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"25-03-2020\",\"BillAmount\":\"\",\"Points\":\"6\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"25-03-2020\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"6\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"2\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"3\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"4\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"11\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"03-03-2020\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"14\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"11\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"32\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"250\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"55\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123456\",\"BillDate\":\"02-03-2020\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"13-09-2019\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"123457\",\"BillDate\":\"12-09-2019\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test12\",\"BillDate\":\"06-05-2019\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test12\",\"BillDate\":\"25-04-2019\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test\",\"BillDate\":\"25-04-2019\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test\",\"BillDate\":\"25-04-2019\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test\",\"BillDate\":\"25-04-2019\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"1235\",\"BillDate\":\"04-11-2018\",\"BillAmount\":\"\",\"Points\":\"-25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"1235\",\"BillDate\":\"04-11-2018\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"10-07-2018\",\"BillAmount\":\"\",\"Points\":\"-100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"10-07-2018\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"06-07-2018\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"27-06-2018\",\"BillAmount\":\"\",\"Points\":\"210\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"27-06-2018\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"27-06-2018\",\"BillAmount\":\"\",\"Points\":\"170\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"27-06-2018\",\"BillAmount\":\"\",\"Points\":\"150\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"27-06-2018\",\"BillAmount\":\"\",\"Points\":\"100\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"Test-01\",\"BillDate\":\"04-05-2018\",\"BillAmount\":\"\",\"Points\":\"10\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"6\",\"StoreId\":9,\"StoreName\":\"Genesis\",\"Detail\":\"Burning\",\"BillNo\":\"5-6-011117155538\",\"BillDate\":\"04-05-2018\",\"BillAmount\":\"\",\"Points\":\"45\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"6\",\"StoreId\":9,\"StoreName\":\"Genesis\",\"Detail\":\"Burning\",\"BillNo\":\"5-6-011117155538\",\"BillDate\":\"04-05-2018\",\"BillAmount\":\"\",\"Points\":\"78\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"6\",\"StoreId\":9,\"StoreName\":\"Genesis\",\"Detail\":\"Burning\",\"BillNo\":\"5-6-011117155538\",\"BillDate\":\"04-05-2018\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"6\",\"StoreId\":9,\"StoreName\":\"Genesis\",\"Detail\":\"Burning\",\"BillNo\":\"5-6-011117155538\",\"BillDate\":\"04-05-2018\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"6\",\"StoreId\":9,\"StoreName\":\"Genesis\",\"Detail\":\"Burning\",\"BillNo\":\"5-6-011117155538\",\"BillDate\":\"18-04-2018\",\"BillAmount\":\"\",\"Points\":\"24\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"ONLINE\",\"StoreId\":5,\"StoreName\":\"ONLINE\",\"Detail\":\"Burning\",\"BillNo\":\"test01\",\"BillDate\":\"12-04-2018\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-01\",\"BillDate\":\"16-02-2018\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-02\",\"BillDate\":\"15-02-2018\",\"BillAmount\":\"\",\"Points\":\"20\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"sho-test\",\"BillDate\":\"14-02-2018\",\"BillAmount\":\"\",\"Points\":\"50\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-sho\",\"BillDate\":\"14-02-2018\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-01\",\"BillDate\":\"12-02-2018\",\"BillAmount\":\"\",\"Points\":\"50\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-10\",\"BillDate\":\"12-02-2018\",\"BillAmount\":\"\",\"Points\":\"50\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test001\",\"BillDate\":\"02-02-2018\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test001\",\"BillDate\":\"02-02-2018\",\"BillAmount\":\"\",\"Points\":\"-25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test09\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"7\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ttt\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"40\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"9\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tes]\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-02\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"30\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"fftest\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"20\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test final\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"20\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ss\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"2\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"aa\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ss\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"11\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tt\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ss\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ss\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"7\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ss\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"4\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"given\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tet\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"jjfresh\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ss\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-fresh-01\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ee\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"2\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tsd\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tes\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"2\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tes\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"1\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-07\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"3\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"2\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"09-11-2017\",\"BillAmount\":\"\",\"Points\":\"34\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"ee\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"45\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"rr\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"21\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tse\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"22\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tt\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"12\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"5\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"21\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test09\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"24\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-02\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"29\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"tes\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"25\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"test-01\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"},{\"StoreCode\":\"HO-001\",\"StoreId\":1,\"StoreName\":\"Head Office\",\"Detail\":\"Burning\",\"BillNo\":\"REDEEM\",\"BillDate\":\"08-11-2017\",\"BillAmount\":\"\",\"Points\":\"23\",\"ExpiredOn\":\"N/A\"}],\"COUPON_HISTORY\":[{\"Status\":\"Redeem\",\"Coupon\":\"0123FSSP12\",\"Store\":\"ONLINE\",\"BillDate\":\"24-09-2019 12:00:40\",\"BillNo\":\"123\",\"Validity\":\"31-12-2019 00:00:00\",\"Send\":\"\",\"FinalCoupon\":\"0123FSSP12\"},{\"Status\":\"Expired\",\"Coupon\":\"0709XNWXA3\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"30-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0709XNWXA3\"},{\"Status\":\"Expired\",\"Coupon\":\"0709VE6YY3\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"30-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0709VE6YY3\"},{\"Status\":\"Expired\",\"Coupon\":\"0721OQQNF3\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-12-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721OQQNF3\"},{\"Status\":\"Expired\",\"Coupon\":\"0721TTEXK3\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-12-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721TTEXK3\"},{\"Status\":\"Expired\",\"Coupon\":\"0721V26IV3\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-12-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721V26IV3\"},{\"Status\":\"Expired\",\"Coupon\":\"0721ERN5G3\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-12-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721ERN5G3\"},{\"Status\":\"Expired\",\"Coupon\":\"0721CLSM73\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-12-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721CLSM73\"},{\"Status\":\"Expired\",\"Coupon\":\"0721AJJL84\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721AJJL84\"},{\"Status\":\"Expired\",\"Coupon\":\"0721M6PUG4\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721M6PUG4\"},{\"Status\":\"Expired\",\"Coupon\":\"0721SUH3G4\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721SUH3G4\"},{\"Status\":\"Expired\",\"Coupon\":\"0721XNWXA4\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721XNWXA4\"},{\"Status\":\"Expired\",\"Coupon\":\"0721VE6YY4\",\"Store\":\"N/A\",\"BillDate\":\"N/A\",\"BillNo\":\"N/A\",\"Validity\":\"31-07-2020 23:59:59\",\"Send\":\"\",\"FinalCoupon\":\"0721VE6YY4\"}]}"
        }
      }
    }
    return data;
  }
  const [phone, setphone] = useState("");

  function passData() {
    const dummyRes = dummyData();
    console.log(dummyRes, "dummyres")
    let loyalityData = dummyRes.GET_CUSTOMER_TRANS_INFOResult.output;
    let parseData = JSON.parse(loyalityData.response)
    console.log(parseData, "loyality data");

    let loyalitycoupon = dummyRes.GET_CUSTOMER_TRANS_INFOResult.output;
    let parsedHistory = JSON.parse(loyalitycoupon.response)
    let couponHis = parsedHistory.COUPON_HISTORY;
    setCouponHistory(couponHis)
    // console.log(JSON.parse(loyalityData.response), "Nero Loyality")
    console.log(couponHis, "couponHis")
    // await fetch(`http://mqst.mloyalpos.com/service.svc/GET_CUSTOMER_TRANS_INFO`, {
    //          method: 'POST',
    //          headers: {
    //              'userid': 'mob_usr',
    //              'pwd': '@pa$$w0rd'
    //            },
    //          body: JSON.stringify({
    //                  "customer_mobile":phone,
    //          })
    //  })
    //  .then(json=>{
    //      if(json){
    //          if(json.status){
    //              setPhone('');
    //             console.log("done")
    //          }
    //          else{
    //             console.log("error")
    //          }
    //      }

    //  })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    passData();
    console.log("fhgdsfhdsbchdsavchfdabcfgffgfvfggi");
  };

  //   const handleSubmit = (url = 'http://mqst.mloyalpos.com/service.svc/GET_CUSTOMER_TRANS_INFO', data = {}) => {
  //     fetch(url, {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     })
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));;
  // }

  return (
    <section className="cus-account-container">
      <div className="cus-account-subcontainer">
        <Head>
          <title>Loyality Points</title>
        </Head>
        <div className="cus-position-container">
          <AccountNav keyValue={3} />
          <div className="cus-right-position">
            <div className="adr-subcontainer">
              <div className="adr-main-contain">
                <div className="oh-tabs-container">
                  <Tabs
                    defaultActiveKey={status}
                  >
                    <TabPane
                      tab={t("Loyality Points")}
                      key="closed"
                      children={
                        <div>
                          <label>Customer Mobile</label>
                          <input
                            type="text"
                            name='mobile'
                            value={phone}
                            maxLength="10"
                            onChange={e => setphone(e.target.value)}
                          />
                          <br /><br />
                          <Button style={{ width: "20%" }} onClick={e => handleSubmit(e)}>Submit</Button>
                        </div>
                      }
                    ></TabPane>

                    <TabPane
                      tab={t("coupons ")}
                      key="opened"
                      children={
                        couponHistory.length > 0 ? couponHistory.map(el => {
                          return <MyCoupons props={el} />
                        }) : "no data"
                      }

                    //   <div className='coupon' style={{ border: "5px dotted #bbb", width: "33%" }}>
                    //   <div className='container'>
                    //     <img src="https://media.istockphoto.com/vectors/code-abstract-vector-modern-bar-code-sample-for-smartphone-scanning-vector-id1095468748?k=20&m=1095468748&s=612x612&w=0&h=QkNgbB839T27QTYllcNKGtTDQj8pgEQ5rjKs62HFXs4=" alt="Avatar" style={{ flex: "1", flexDirection: "column", alignItems: "flex-end", width: "90px" }} />
                    //     <h4>{el.Store}</h4>
                    //   </div>
                    //   <div className='container' >
                    //     <p><b>Vaild till : {el.Validity}</b></p>

                    //   </div>
                    //   <div className='container'>
                    //     <p> <b>Coupon Number :</b> <span className='promo'>{el.Coupon}</span></p>
                    //     <p><b>Status :</b> <span className='status'> {el.Status} </span></p>
                    //     <p>T & C *</p>
                    //   </div>
                    // </div>) : "no data"


                    ></TabPane>

                    {/* <TabPane
                      tab={t("Feedback")}
                      key="feedback"
                      children={
                        <MyFeedback />
                      }
                    ></TabPane> */}
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