import BreadCrumb from "../elements/BreadCrumb";
import { Tabs } from "antd";
import { useEffect, useState } from 'react';
import { getOfferData } from "../../api";
import { imageUrl } from "../../api/url";
import Router from "next/router";
import DisplayImageWithS3PreSignedUrl from "../../components/elements/AwsS3PreSignedUrl";
const { TabPane } = Tabs;
function OfferComponentsData() {
    const [tabInfo, setTabInfo] = useState([]);

const breadCrumb = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Offer',
    },
];

useEffect(() => {
    getOfferData(setTabInfo)
}, [])

const goToUrl = async (url) => {
        
    Router.push(url);
  }


return (

    <div className="">
        <BreadCrumb breacrumb={breadCrumb} />
        <h1 className="offerTitle">IT'S NOW OR NEVER</h1>
        <div className="offer-Wrapper">
        {tabInfo && tabInfo?.map(da=> {
            return <div className="offerPage">
                <div className="offerItem">{da.title}</div>
                <a onClick={(e) => goToUrl(da.link)} href="javascript:void(0);">
                <DisplayImageWithS3PreSignedUrl imageKey={da.imagePath} resizeRequired="NO" />
                </a>
                <div className="offerBuyNow"><button onClick={(e) => goToUrl(da.link)}>BUY NOW</button></div>
            </div>
            


        })}
    </div>
    </div>

)
    }

export default OfferComponentsData;