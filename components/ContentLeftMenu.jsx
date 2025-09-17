import React from "react";
import { useState, useEffect } from "react";
import Link from 'next/link'

function ContentLeftMenu({pid}) {
    console.log(pid, "sfsfds")
    const[pageList, setPageList] = useState([]);
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        const pageList = [
            // { key: "about-us1", title: "About us" },
            // { key: "annual-report-page", title: "Annual Return Report" },
            // { key: "design", title: "Design" },
            // { key: "what-are-we-upto", title: "What are we upto" },
            // { key: "franchise", title: "Franchise" },
            // { key: "news-and-events", title: "News & Events" },
            // { key: "innovations", title: "Innovation" },
            // { key: "blog", title: "Blogs" },
            // { key: "loyality", title: "Loyalty" },
            // { key: "return-policy", title: "Return policy" },
            // { key: "privacy", title: "Privacy policy" },
            // { key: "sizing-chart", title: "Sizing chart" },
            // { key: "faq", title: "FAQ" },
            // { key: "customer-care", title: "Customer Care" },
            // { key: "terms-and-conditions", title: "Terms and Conditions" },
            // { key: "disclaimer", title: "Disclaimer" },
            // { key: "redchief-club", title: "Redchief club" },
            // { key: "lookbook", title: "Lookbook" },

            {
                "heading":"Our Story",
                active: false,
                "tab":[
                  { key: "/page-detail/about-us1", title: "About Us" },
                //   { key: "/page-detail/annual-report-page", title: "Annual Return Report" },
                  { key: "/page-detail/design", title: "Design" },
                  { key: "/franchise", title: "Franchise" },
                //   { key: "what-are-we-upto", title: "What are we upto" },
                  { key: "/page-detail/news-and-events", title: "News & Events" },
                //   { key: "innovations", title: "Innovation" },
                  { key: "/page-detail/blog", title: "Blogs" },
                ]
              },
              {
                 "heading":"Customer Service",
                 active: false,
                 "tab":[
                  { key: "/feedback", title: "Feedback" },
                  { key: "/contact", title: "Contact Us" },
                  { key: "/page-detail/loyality", title: "Loyalty" },
                  { key: "/corporate-gifting", title: "Corporate Gifting" },
                 ]
              },
              {
                  "heading":"Customer Policy",
                  active: false,
                  "tab":[
                      { key: "/page-detail/return-policy", title: "Return Policy" },
                      { title: "Unboxing Policy", key: "/page-detail/unboxing-policy" },
                      { key: "/page-detail/privacy", title: "Privacy Policy" },
                      { key: "/page-detail/sizing-chart", title: "Sizing Chart" },
                      { key: "/page-detail/faq", title: "FAQ" },
                      { key: "/page-detail/customer-care", title: "Customer Care" },
                      { key: "/site-map", title: "Site Map" },
                      { key: "/page-detail/terms-and-conditions", title: "Terms and Conditions" },
                      { key: "/page-detail/disclaimer", title: "Disclaimer" },
                  ]
              },
              {
                
                  "heading":"Links",
                  active: false,
                  "tab":[
                      { key: "https://redchief.mloyalretail.com/microsite/", title: "Redchief Club" },
                    //   { key: "lookbook", title: "Lookbook" },
                  ]
              },


            ];
            setPageList(pageList);

    }, []);
    const handleClick = (e,indexing) => {
        let trying = JSON.parse(JSON.stringify(pageList));
        trying.forEach((element,index) => {
            if(index=== indexing){
                if(trying[index].active){
                    trying[index].active = false;
                }else{
                    trying[index].active = true;
                }

            }else{
                trying[index].active = false;
            }
        });
         setPageList(trying) 
         console.log(trying)
        // setShow(!show);
        // if(show == true){
        //     document.getElementById(indexing).className='block';
        // }
        // else{
        //     document.getElementById(indexing).className='d-none';
        // }
     };



    return (
        <>
            {
                pageList && pageList.map((item, index) => {
                   return <>
                <ul><li onClick={e => handleClick(e,index)} key={item.key}><a> {item.heading} 
                    {!item.active? <i className="fa fa-plus"/>:<i className="fa fa-minus"/>}
                    </a></li>
                      <ul id={index} >  
                    { item.active && item.tab.map(pd=>{
                       return <li className={(pid==pd.key)?"active":""}>{pd.title=="Redchief Club"?<Link href={pd.key}><a target="_blank">{pd.title}</a></Link>:<Link href={pd.key}>{pd.title}</Link>}</li>
                        })
                    }
                    </ul>
                  
                   </ul>
                 
                    </>
                    // <li className={pid==item.key?"active":""}><Link href={item.key}>{item.title}</Link></li>
                })
            }
            
        </>

    )
}

export default ContentLeftMenu;

