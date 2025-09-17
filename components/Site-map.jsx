import { Form } from "antd";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryListApi } from "../api/product/categoryListTree";
import BreadCrumb from "./elements/BreadCrumb";
import ContentLeftMenu from "./ContentLeftMenu";
import { useRouter } from "next/router";





const SiteMap = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        categoryListApi(dispatch,2);
    }, [])

    const category = useSelector(s => s.product.categories)

    const staticSitemapData = [
    {
        "categorySlug": "",
        "name": "Find a Store",
        children: [{
            "categorySlug": "/location-of-store",
            "name": "Find a store"
        },
        // {
        //     "categorySlug": "page-detail/terms-and-conditions",
        //     "name": "Terms and Conditions"
        // },
        // {
        //     "categorySlug": "site-map",
        //     "name": "Site Map"
        // }
        ]
    },
    {
        "categorySlug": "",
        "name": "Our Story",
        children: [{
            "categorySlug": "page-detail/about-us1",
            "name": "About us"
        },
        // {
        //     "categorySlug": "page-detail/annual-report-page",
        //     "name": "Annual Return Report"
        // },
        {
            "categorySlug": "page-detail/design",
            "name": "Design"
        },
        // {
        //     "categorySlug": "page-detail/what-are-we-upto",
        //     "name": "What are we upto"
        // },
        {
            "categorySlug": "franchise",
            "name": "Franchise"
        },
        {
            "categorySlug": "page-detail/news-and-events",
            "name": "News & Events"
        },
        // {
        //     "categorySlug": "page-detail/innovations",
        //     "name": "Innovations"
        // },
        {
            "categorySlug": "page-detail/blog",
            "name": "Blogs"
        },
        // {
        //     "categorySlug": "page-detail/store-locator--pick-and-drop",
        //     "name": "Store Locator"
        // }
        ]
    },
    {
        "categorySlug": "",
        "name": "Links",
        children: [
        //     {
        //     "categorySlug": "page-detail/lookbook",
        //     "name": "Lookbook"
        // },
        // {
        //     "categorySlug": "page-detail/casual",
        //     "name": "Casual"
        // },
        // {
        //     "categorySlug": "page-detail/formal",
        //     "name": "Formal"
        // },
        // {
        //     "categorySlug": "page-detail/ethics",
        //     "name": "Ethics"
        // },
        {
            "categorySlug": "page-detail/redchief-club",
            "name": "Redchief club"
        }
        ]
    },
    {
        "categorySlug": "",
        "name": "Customer Service",
        children: [{
            "categorySlug": "feedback",
            "name": "Feedback"
        },
        {
            "categorySlug": "contact",
            "name": "Contact us"
        },
        {
            "categorySlug": "page-detail/loyality",
            "name": "Loyalty"
        },
        // {
        //     "categorySlug": "page-detail/shoes",
        //     "name": "Shoes"
        // },
        // {
        //     "categorySlug": "page-detail/redchief-club",
        //     "name": "Redchief club"
        // },
        {
            "categorySlug": "corporate-gifting",
            "name": "Corporate Gifting"
        },
        ]
    },
    {
        "categorySlug": "",
        "name": "Customer Policy",
        children: [
        //     {
        //     "categorySlug": "page-detail/questions",
        //     "name": "Questions"
        // },
        // {
        //     "categorySlug": "page-detail/order-status",
        //     "name": "Order status"
        // },
        {
            "categorySlug": "page-detail/return-policy",
            "name": "Return policy"
        },
        {
            "categorySlug": "page-detail/privacy",
            "name": "Privacy policy"
        },
        {
            "categorySlug": "page-detail/sizing-chart",
            "name": "Sizing chart"
        },
        {
            "categorySlug": "page-detail/faq",
            "name": "FAQ"
        },
        {
            "categorySlug": "page-detail/customer-care",
            "name": "Customer Care"
        },
        {
            "categorySlug": "site-map",
            "name": "Site Map"
        },
        {
            "categorySlug": "page-detail/terms-and-conditions",
            "name": "Terms and Conditions"
        },
        {
            "categorySlug": "page-detail/disclaimer",
            "name": "Disclaimer"
        },
        ]
    },
    // {
    //     "categorySlug": "",
    //     "name": "CAREER",
    //     children: [{
    //         "categorySlug": "join-our-troop",
    //         "name": "Join our troop"
    //     }]
    // }
]
const breadCrumb = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Site map',
    },
];

   const router = useRouter();
   var  pdid  = router.query.pdid;
   let _url = typeof window !== "undefined" && window.location.href.split("/").includes('site-map');
   if(_url){
       pdid  = "site-map";
   }else{
       pdid  = pdid
   }

    return (
        <div>
            <div>
                <Form  >

                    <div>
                    <BreadCrumb breacrumb={breadCrumb} />

                       <div className="row">
                        <div className="col-md-3">
                        <div className='leftNav'>
                           <ContentLeftMenu pid={pdid} />
                        </div>
                        </div>
                        <div className="col-md-9">
                        <Form.Item>
                            <div className="bgWhite">
                            <div className="display-data">
                                <div className="xyz site-map-container staticPages" style={{textTransform: "lowercase"}}>
                                    <ul >
                                        <h3>Sitemap</h3>
                                        {/* <h4 style={{textTransform:"uppercase", marginLeft:"12px"}}>Sitemap</h4> */}
                                        {category && category?.map(da => {
                                            return (<li value={da?.categoryId}><Link href={da?.categorySlug}>{da?.name}</Link>
                                                <ul>
                                                    {da.children?.map(c => {
                                                        return (<li value={c?.categoryId}><Link href={c.categorySlug}>{c?.name}</Link>
                                                        </li>)
                                                    }
                                                    )}

                                                </ul>
                                            </li>)
                                        }

                                        )}

                                         {staticSitemapData && staticSitemapData.map( k => {
                                            return (<li><Link href={k.categorySlug}>{k.name}</Link>
                                            <ul>
                                                {k.children?.map(g => {
                                                    return (<li><Link href={g.categorySlug}>{g.name}</Link></li>)
                                                })}
                                            </ul>
                                            
                                            </li>)
                                        }
                                            
                                        )}
                                    </ul>

                                    {/* <ul>
                                      
                                        
                                    </ul> */}


                                </div>

                            </div>

                            </div>
                        </Form.Item>
                        </div>
                       </div>

                    </div>

                </Form>

            </div>






        </div>
    )
}

export default SiteMap