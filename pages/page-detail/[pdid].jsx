import React, { useState } from 'react';
import Head from "next/head";
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import { useEffect } from 'react';
import { pageDetApi } from '../../api';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Router, { useRouter } from 'next/router';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import ContentLeftMenu from '../../components/ContentLeftMenu'

const pageDetail=()=>{
    const router = useRouter()
    const [det,setDet]=useState("")
    const [val, setval] = useState(false)
    const [postLoading,setPostLoading]=useState(true)
    // Router.events.on('routeChangeStart', (url) => )
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    

    const  pdid  = router.query.pdid;
    console.log(pdid, "pdiddddd")
    useEffect(()=>{
        

        if (pdid===undefined) {
            Router.push('/page/page-404');
        }

        if (pdid) {
            pageDetApi(pdid,setDet,setPostLoading)
        }

       

        

        Router.events.on('routeChangeStart', (url) => {
            
            const nextPid = url.split('/').pop();
            if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
                pageDetApi(nextPid,setDet,setPostLoading)
                setPostLoading(true)
            }
        });

    },[pdid])

    useEffect(()=> {
        if(pdid == "sizing-chart"){
            setval(true)
        }else {
            setval(false)
        }
        console.log(val, "dcbdbc")
    }, [pdid])
    

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',

        },
        {
            text:det.title,
            
        }
        
    ];

    return(
        <div className="site-content">
            <Head>
        <title>{det.metaTagTitle}</title>
        <meta name="keywords" content={det.metaTagKeyword} />
        <meta name="description" content={det.metaTagContent} />
      </Head>
            <HeaderDefault/>
            <HeaderMobile/>
            <NavigationList />
            <ThemeChanger/>
            <div className='mainBg'>
            {postLoading===false? <div>
            <BreadCrumb breacrumb={breadCrumb} />
            

                <div className='ps-page--simple staticPages'>
                    <div className='row'>
                    <div className='col-md-3 col-sm-12'>
                        <div className='leftNav'>
                            <ContentLeftMenu pid={pdid} />
                        </div>
                    </div>
                    
                    <div className='col-md-9 col-sm-12'>
                        <div className='bgWhite'>

                    {det!=="" && <h3>{det.title} </h3>}
                    { val && <img src='/static/img/size-chart.jpg'  style={{marginBottom:"20px"}}/>}
                    { val && <img src='/static/img/Shirt-chart.jpg' />}
                
                    {det!==""&& <div dangerouslySetInnerHTML={{__html: det.content.replaceAll("&amp;", "&")
                            .replaceAll("&lt;", "<")
                            .replaceAll("&gt;", ">")
                            .replaceAll("&quot;", '"')
                            .replaceAll("&#39;", "'")
                            .replaceAll("&sbquo;", "‚")
                            .replaceAll("&#61;", "=")
                            .replaceAll("&#45;", "-")
                            .replaceAll("&hellip;", "…")
                            .replaceAll("&commat;", "@")
                            .replaceAll("&copy;", "©")
                            .replaceAll("&#35;", "#")
                            .replaceAll("&ldquo;", "“")
                            .replaceAll("&rsquo;", "’")
                            .replaceAll("&lsquo;", "‘")
                            .replaceAll("&trade;", "™")
                            .replaceAll("&reg;", "®")
                            .replaceAll("&ndash;", "–")
                            .replaceAll("&eacute;", "é")
                            .replaceAll("&euro;", "€")
                            .replaceAll("&pound;", "£")}}/>}
                             </div>
                    </div>
                    </div>
                    </div>
                </div>:<div className="ps-page--product"> <div className="ps-container">
                <center><img src="/static/img/spurt-original-loader.gif" style={{ height: "100px", width: "100px" }}/></center> 
                </div></div>}
             
                </div>
           
            <FooterFullwidth/>
        </div>
    )
}

export default pageDetail

// pageDetail.getInitialProps=async(ctx)=>({
//     query:ctx.query
// })

