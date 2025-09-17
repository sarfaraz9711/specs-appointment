import React from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { subscribeApi } from '../../../../api/account/subscribe';
import DisplayImageWithS3PreSignedUrl from "../../../../components/elements/AwsS3PreSignedUrl";


import { hitVisitor, getVisitor, getSingupOfferData } from "../../../../api";
import { useEffect } from 'react';
import { Button, notification } from 'antd';
import { Modal } from 'react-bootstrap'
import Router from 'next/router';
const FooterWidgets = ({ footerDet, footerPage }) => {
    const router = useRouter();
    const [visitorCounter, setVisitorCounter] = useState(0);
    const [subsrciber, setSubscribe] = useState("");
    const [openSignupPopup, setOpenSignupPopup] = useState(false)
    const [signUpOfferData, setSignupOfferData] = useState();

    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //     //checkCounter();
        // }
        getSingupOfferData(setSignupOfferData);
        let openedSignUpPopupCount = sessionStorage.getItem("openedSignUpPopupCount");
        const forProductPage = localStorage.getItem("signUpPopupProductPage");
        const spurtUser = localStorage.getItem("spurtUser");
        if (forProductPage || spurtUser || (openedSignUpPopupCount && openedSignUpPopupCount > 0)) {
            setOpenSignupPopup(false);
            sessionStorage.setItem("openedSignUpPopupCount", 1);
        } else {
            setOpenSignupPopup(true);
        }
    }, [])


    const checkCounter = async () => {
        let _sessionCounter = localStorage.getItem("isCounter");

        if (_sessionCounter != "1") {
            let _js = {
                "visitorType": "site",
                "userId": null,
                "bannerId": null
            }
            await hitVisitor(_js);

            let _counter = [];
            let _originalAray = await getVisitor();
            console.log("_originalAray", _originalAray);
            if (_originalAray.status == 200) {
                _counter = _originalAray.data;
                if (_counter.length > 0) {
                    let _realData = _counter.filter((x) => {
                        return (x.type == 'all-visitor' && x.visitorType == 'site')
                    });
                    if (_realData.length > 0) {
                        setVisitorCounter(_realData[0].counter);
                    }
                }
                localStorage.setItem("isCounter", "1");
            }
        } else {
            let _counter = [];
            let _originalAray = await getVisitor();
            console.log("_originalAray", _originalAray);
            if (_originalAray.status == 200) {
                _counter = _originalAray.data;
                if (_counter.length > 0) {
                    let _realData = _counter.filter((x) => {
                        return (x.type == 'all-visitor' && x.visitorType == 'site')
                    });
                    if (_realData.length > 0) {
                        setVisitorCounter(_realData[0].counter);
                    }
                }
            }
        }
    }


    const goToSignUpPage = () => {
        sessionStorage.setItem("openedSignUpPopupCount", 1);
        Router.push('/account/register');
    }







    let footerData = [
        // {
        //     "FooterColumnName": "SHOP",
        //     active: true,
        //     "linkedPages": [
        //         { title: "Footwear", redirectUrl: "/footwear" },
        //         { title: "Apparel", redirectUrl: "/apparels" },
        //         { title: "Accessories", redirectUrl: "/accessories-" }
        //     ]
        // },
        {
            "FooterColumnName": "Find a Store",
            active: true,
            "linkedPages": [
                { title: "Find a Store", redirectUrl: "/location-of-store" },
                { title: "Links", redirectUrl: "#" },
                { title: "Redchief Club", redirectUrl: "https://redchief.mloyalretail.com/microsite/" },
                // { title: "Lookbook", redirectUrl: "/lookbook" }
            ]
        },
        {
            "FooterColumnName": "Our Story",
            active: true,
            "linkedPages": [
                { title: "About Us", redirectUrl: "/page-detail/about-us1" },
                // { title: "Annual Return Report", redirectUrl: "/page-detail/annual-report-page" },
                { title: "Design", redirectUrl: "/page-detail/design" },
                // { title: "What are we upto", redirectUrl: "/page-detail/what-are-we-upto" },
                { title: "Franchise", redirectUrl: "/franchise" },
                { title: "News & Events", redirectUrl: "/page-detail/news-and-events" },
                // { title: "Innovations", redirectUrl: "/page-detail/innovations" },
                // { title: "Blogs", redirectUrl: "/page-detail/blog" },
                { title: "Blogs", redirectUrl: "/blogs/blog-list" },
                // { title: "Store Locator", redirectUrl: "/page-detail/store-locator--pick-and-drop" }
            ]
        },
        // {
        //     "FooterColumnName": "LINKS",
        //     active: true,
        //     "linkedPages": [
        //         { title: "Lookbook", redirectUrl: "/page-detail/lookbook" },
        //         { title: "Casual", redirectUrl: "/page-detail/casual" },
        //         { title: "Formal", redirectUrl: "/page-detail/formal" },
        //         { title: "Ethics", redirectUrl: "/page-detail/ethics" }

        //     ]
        // },
        {
            "FooterColumnName": "Customer Service",
            active: true,
            "linkedPages": [
                { title: "Feedback", redirectUrl: "/feedback" },
                { title: "Contact Us", redirectUrl: "/contact" },
                { title: "Loyalty", redirectUrl: "/page-detail/loyality" },
                // { title: "Shoes", redirectUrl: "/page-detail/shoes" },
                { title: "Corporate Gifting", redirectUrl: "/corporate-gifting" },
            ]
        },
        {
            "FooterColumnName": "Customer Policy",
            active: true,
            "linkedPages": [
                // { title: "Questions", redirectUrl: "/page-detail/questions" },
                // { title: "Order status", redirectUrl: "/page-detail/order-status" },
                { title: "Return Policy", redirectUrl: "/page-detail/return-policy" },
                { title: "Unboxing Policy", redirectUrl: "/page-detail/unboxing-policy" },
                { title: "Privacy Policy", redirectUrl: "/page-detail/privacy" },
                { title: "Sizing Chart", redirectUrl: "/page-detail/sizing-chart" },
                { title: "FAQ", redirectUrl: "/page-detail/faq" },
                { title: "Customer Care", redirectUrl: "/page-detail/customer-care" },
                { title: "Site Map", redirectUrl: "/site-map" },
                { title: "Terms and Conditions", redirectUrl: "/page-detail/terms-and-conditions" },
                { title: "Disclaimer", redirectUrl: "/page-detail/disclaimer" },

            ]
        },
        // {
        //     "FooterColumnName": "LINKS",
        //     active: true,
        //     "linkedPages": [
        //         { title: "Redchief club", redirectUrl: "/page-detail/redchief-club" },
        //         { title: "Lookbook", redirectUrl: "/page-detail/lookbook" }

        //     ]
        // }
        // {
        //     "FooterColumnName": "CAREER",
        //     active: true,
        //     "linkedPages": [
        //         // { title: "Join our troop", redirectUrl: "/join-our-troop" },
        //         { title: "Lookbook", redirectUrl: "/page-detail/lookbook" }


        //     ]
        // }
    ]

    const imageClick = async () => {
        if (subsrciber !== "") {
            subscribeApi(subsrciber)

        } else {
            modalWarning('warning')

        }
        setSubscribe("")
    }

    const modalWarning = (type) => {
        notification[type]({
            message: 'Email is required',
            description: 'Enter the email for subscription',
            duration: 3,
        });
    };

    function handleChangeSubscibe(event) {
        setSubscribe(event.target.value);

        // console.log("event value<<<<<******",event.target.value);
        //console.log("jyoti subscribe************************",subsrciber);
    }




    return (

        <>
            <div className="col-md-9">
                <div className="row">
                    {footerData.map((item, i) => {
                        return item.active && <div key={i} className="col-md-3 col-sm-6">
                            <h4>{item.FooterColumnName}</h4>
                            <ul>
                                {item.linkedPages.map((el,i) => {
                                    //return     <li><a href={el.redirectUrl} title={el.title}>{el.title}</a></li>
                                    return <li key={i}><Link href={el.redirectUrl} ><a target={el.title == 'Redchief Club' ? '_blank' : '_self'}>{el.title}</a></Link></li>
                                })}
                            </ul>
                        </div>
                    })}

                </div>
            </div>
            <div className="col-md-3">
                <div className="position-relative f-Search">
                    <div className="w-45 ">
                        <h4>Follow Us</h4>
                        <div className="socialIcon d-flex justify-content-start">
                            <a href="https://www.facebook.com/redchiefofficial/" target="_blank" className="facebook"><i className="fa fa-facebook"></i></a>
                            <a href="https://www.instagram.com/redchiefofficial/" target="_blank" className="instagram"><i className="fa fa-instagram"></i></a>
                            <a href="https://www.youtube.com/channel/UChFoFRM4HlK5b3esQvNnhUw" target="_blank" className="youtube"><i className="fa fa-youtube-play"></i></a>
                            <a href="https://twitter.com/Red_Chieftians" target="_blank" className="twitter"><i className="fa fa-twitter"></i></a>
                            <a href="https://in.pinterest.com/redchief1997/" target="_blank" className="pinterest-p"><i className="fa fa-pinterest-p"></i></a>
                        </div>
                    </div>
                    <div className="fEmail-Wrapper">
                        <h5>Subscribe</h5>

                        <div className="input-group mb-3 emailSub">
                            <input type="text" className="form-control" placeholder="Your email address" value={subsrciber} onChange={handleChangeSubscibe} />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2" onClick={(e) => imageClick()}><i className="fa fa-arrow-right" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className='d-none'>
                <div className="ps-footer__widgets" style={{ paddingBottom: "0px" }}>
                    <div className="ftr-top">
                        <div className="flex ftrtop-lft">
                            <aside className="widget widget_footer">
                                <div className="ps-custom-footer-container">
                                    {footerData && footerData.map((page, i) => (
                                        <div key={i} className="footer-column-container">
                                            <h4 className="">{page.FooterColumnName}</h4>



                                            {page && page.linkedPages.map(pagedet => (
                                                //  <Link href="/page-detail/[pdid]" as={`/page-detail/${pagedet.slugName}`} key={pagedet.pageId}>

                                                // <p onClick={() => router.push('/page-detail/[pdid]')}  as={`/page-detail/${pagedet.pageId}`} key={pagedet.pageId}>{pagedet.title}</p>

                                                //   </Link>S

                                                <>
                                                    <Link href={pagedet.redirectUrl} ><p>{pagedet.title}</p></Link>
                                                </>
                                            ))}
                                        </div>
                                    ))}

                                </div>


                            </aside>
                        </div>


                    </div>

                </div>
                <div className="visitor-count">
                    Total Visitor - {visitorCounter}
                </div>
            </div>
            {signUpOfferData && signUpOfferData.isSettingActive && <Modal show={openSignupPopup} className='signup-popup'>
                {/* closeButton onClick={initModal} */}
                <Modal.Header>
                    <Modal.Title>Sign up Offer</Modal.Title>
                    <button type="button" class="close" data-dismiss="modal" onClick={() => {
                        sessionStorage.setItem("openedSignUpPopupCount", 1);
                        setOpenSignupPopup(false);
                    }} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        {signUpOfferData?.isSettingActive == 1 ?
                            <DisplayImageWithS3PreSignedUrl
                                imageKey={signUpOfferData?.signupPopupImage}
                                resizeRequired="NO"
                                alt='Sign Up pop Up Image'
                            /> : ''
                        }
                        {/* <h5>{signUpOfferData && atob(signUpOfferData?.signUpPopUp)}</h5> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { goToSignUpPage() }} style={{ backgroundColor: "green", color: "white" }}>
                        Ok, Sign up
                    </Button>
                    {/* <Button variant="danger" >
                        Close
                    </Button> */}

                </Modal.Footer>
            </Modal>}
        </>
    )

}
const mapStateToProps = state => {
    return state = state.setting
}


export default connect(mapStateToProps)(FooterWidgets);