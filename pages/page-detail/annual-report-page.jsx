import React, { useState } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import { useEffect } from 'react';
import { annualReportApi,fileDownload } from '../../api';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Router, { useRouter } from 'next/router';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import ContentLeftMenu from '../../components/ContentLeftMenu';

const AnnualReportPage = () => {
  const [postLoading, setPostLoading] = useState(true)
  const [getTotalList, setTotalList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    annualReportApi().then((res) => {
      console.log(">>>>>>>>>>>>>>",window.location.href)
      //console.log("res", res);
      setTotalList(res);
    }).catch((err) => {
      console.log("err", err);
    });
  }, []);


  const getFileDownload = (fileUrl) => {
    console.log("fileUrl",fileUrl);
    let _bufferBase = Buffer.from(fileUrl,"utf8").toString('base64');
    fileDownload(_bufferBase);
  }
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',

    },
    {
      text: 'Annual Return Report',

    }
  ];


  var  pdid  = router.query.pdid;
  let _url = typeof window !== "undefined" && window.location.href.split("/").includes('annual-report-page');
  if(_url){
      pdid  = "annual-report-page";
  }else{
      pdid  = pdid
  }
  console.log("pdid",pdid);
  useEffect(()=>{
      if (pdid) {
        annualReportApi()
      }
  },[pdid])

  return (
    <div className="site-content">

      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <ThemeChanger />
      <div className='mainBg'>

      <BreadCrumb breacrumb={breadCrumb} />
      <div>
      <div className='ps-page--simple staticPages'>
                    <div className='row'>
      <div className='col-md-3 col-sm-12'>
                        <div className='leftNav'>
                            <ContentLeftMenu pid={pdid} />
                        </div>
                    </div>
      <div className='col-md-9 col-sm-12'>
        <div className='bgWhite'>
        <h3>Annual Return Report  </h3>
        {getTotalList && getTotalList.map((_rowData)=>{
       return <div>
          <a href="javascript:void(0)" className='link-text' onClick={e=>getFileDownload(_rowData?.file_url)}><i style={{color:"red"}} class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;{_rowData?.name}</a>
        </div>})}
        

          {!getTotalList && <div className='error'>No Record Available</div>}
      </div>
      </div>
      </div></div>
      </div>
      </div>
      <FooterFullwidth />
      
    </div>
  )
}

export default AnnualReportPage;