import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Link } from "../i18n";
import HeaderDefault from "../components/shared/headers/HeaderDefault";
import FooterFullwidth from "../components/shared/footers/FooterFullwidth";
import APIServices from '../services';
import * as ga from '../utilities/common-helpers';
import {facebookGtm} from '../api/data/facebook'

const ThankYouPage = () => {
    const router = useRouter();
    const queryData = JSON.parse(Buffer.from(router.query.queryData, 'base64').toString());

    useEffect(()=>{
        if(queryData){
          console.log(queryData, "Neeraj Product View payttfffffffffffffffffffffffffffffff")
          let fbItems=[]
          const items = queryData && queryData.orderData.productDetail.map(item=> {
            fbItems.push({
                "currency": "INR",
                "content_ids": item.skuName,
                "content_name": item.name,
                "price": item.productSellingPrice,
                'value': queryData.orderData.total
            })
            return {
                item_id: item.skuName,
                item_name: item.name
            }
          })
          // ga.event({
          //   action: "purchase",
          //   params : {
          //     transaction_id: queryData.orderData.orderPrefixId,
          //     value: queryData.orderData.total,
          //     currency: "INR",
              
          //     items: items 
          //   }
          // })

          let data = {
            event: "purchase",
            ecommerce: {
                transaction_id: queryData.orderData.orderPrefixId,
                value: queryData.orderData.total,
                currency: "INR",
                items: items
            },
            properties: {
                customer: {
                    email: queryData.orderData.email,
                    phone: queryData.orderData.telephone
                }
            }
          }
          ga.pushToDataLayer(data);
          facebookGtm(fbItems, 'Purchase')
          let payment = {
            event: "add_payment_info",
            ecommerce: {
                transaction_id: queryData.orderData.orderPrefixId,
                value: queryData.orderData.total,
                currency: "INR",
                items: items,
                payment_type: queryData.orderData.paymentMethod==2?'COD':'Online'
            }
          }
          facebookGtm(fbItems, 'AddPaymentInfo')
          ga.pushToDataLayer(payment);

      }
      },[]);
    
    return (
        <div className="layout--product">
            {/* <script strategy="afterInteractive" dangerouslySetInnerHTML={{__html:`
gtag('event', 'conversion', {
'send_to': 'AW-622583353/6y2ECIGh8YACELm876gC',
'value': '${queryData.orderAmount}',
'currency': 'INR',
'transaction_id': '${queryData.orderPrefixId}'
});`
}}>
</script> */}
            <HeaderDefault />
            <div className="thanku-page">
                <div>
                    <img src="data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS5kYTRhN2U1ZWYsIDIwMjIvMTEvMjItMTM6NTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNC4xIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMTAzQTcxMEIyODMxMUVEOEI3NkNCMjFCMTBFRkRDMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMTAzQTcxMUIyODMxMUVEOEI3NkNCMjFCMTBFRkRDMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYxMDNBNzBFQjI4MzExRUQ4Qjc2Q0IyMUIxMEVGREMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYxMDNBNzBGQjI4MzExRUQ4Qjc2Q0IyMUIxMEVGREMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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" />
                </div>
                Your order placed successfully. Thankyou for shopping.
                <div className="my-orders"><Link href="/account/customer-orders"><a><button>My Orders</button></a></Link></div>
            </div>
            <FooterFullwidth />
            <iframe src={`https://tracking.icubeswire.co/aff_a?offer_id=482&order_id=${queryData.orderData.orderPrefixId}&sale_amount=${queryData.orderData.total}`} width='1' height='1' id='pixelcodeurl' ></iframe>
            <iframe src={`https://mobilogi.gotrackier.com/pixel?adid=66e91685b8d1f801de70c95d&txn_id=${queryData.orderData.orderPrefixId}&sale_amount=${queryData.orderData.total}`} frameborder="0" width="1" height="1"></iframe>
        </div>
    )
}

export default ThankYouPage;