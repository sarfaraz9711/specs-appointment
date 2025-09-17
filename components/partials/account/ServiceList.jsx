import React, { useEffect, useState } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { imageUrl } from '../../../api/url';
import EnquiryPopUp from '../../shared/modal/EnquiryPop';
import { Slider, Checkbox } from 'antd';
import { Menu } from 'antd';
import  Router  from 'next/router';


function ServiceListInfo(setting){
    const router=useRouter()
    let CatName=router.query.category
    let currentColor=useSelector(s=>s.palette.currentColor)
    const [showModal,setShowModal]=useState(false)
    const { SubMenu } = Menu;

    

    const forceServiceRoute=(service)=>{
        Router.push(`/services/list/[sid]?category=${service.name}`,`/services/list/${service.serviceCategoryId}?category=${service.name}`,{query:{category:service.name}})
    }


 


    return(
        <div className="sl--outer-layout">
          
            <div className="service-row">
                <div className="col-lg-3 col-md-2">
                    
                    <aside className="widget widget_shop">
                    <h4 className="widget-title">All Services</h4>
                    {setting.servicelist.length > 0 ? (
                        <Menu
                        // onClick={e=>handleClick(e)}
                        style={{ width: 256 }}
                        defaultSelectedKeys={[setting.categoryId]}
                        // defaultOpenKeys={['sub1']}
                        mode="inline" 
                      >
                           
                       
                            {setting.servicelist.map((service) => {
                                if(service.children){
                                    return(
                                       <SubMenu key={JSON.stringify(service.serviceCategoryId)} title={service.name}>
                                          
                                       {service&&service.children&&service.children.map((subservice,i) =>  (<Menu.Item key={JSON.stringify(subservice.serviceCategoryId)} onClick={e=>forceServiceRoute(subservice)}>{subservice.name}</Menu.Item>))}
                                    </SubMenu>)
                                    }
                                else{
                                   
                                return(<Menu.Item key={JSON.stringify(service.serviceCategoryId)} onClick={e=>forceServiceRoute(service)}>{service.name}</Menu.Item>)
                                }
                                    }

                                    )
                                }
                                
                            
          
                       
                      </Menu>
                        
                    ) : (
                        'No Category'
                    )}
                </aside>
                

                </div>
                <div className="col-lg-9 col-md-10">
                <div className="service-page-content" style={{padding:"20px 0px"}}>
                   <div className="service-header-ps">
                       <h3>{CatName}</h3>
                   </div>
                </div>
                {setting.servelistLoader===false&&setting.seviceInfo.length===0 ? <div className="servlist-content-store" style={{padding:"20px 20px"}}>
                    <center><img src="/static/img/404.jpg"/></center>
                </div>:""}
                <div className="">
                    {setting.servelistLoader === false ? <div>

                        {setting.seviceInfo.map((info,index) => (
                            <div className="servlist-content-store" key={info.serviceId}>
                                <EnquiryPopUp showModal={showModal} setShowModal={setShowModal} serviceId={info.serviceId}/>
                            <div
                            className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 "
                            key={index}>
                            <div
                                className="ps-block--category-2"
                                data-mh="categories">
                               <Link href={{pathname:"/services/detail/[did]",query:{category:info.title}}} as={{pathname: `/services/detail/${setting.categoryId}`,query:{category:CatName}}}><a>
                                <div className="ps-block__thumbnail ">
                                <img src={info.serviceImage ? imageUrl + "?path=" + info.serviceImage.containerName + "&name=" + info.serviceImage.image : "/static/img/no-image.png"} />
                                </div>
                                </a></Link>

                                <div className="ps-block__content">
                                <Link href={{pathname:"/services/detail/[did]",query:{category:CatName}}} as={{pathname: `/services/detail/${setting.categoryId}`,query:{category:CatName}}}><a><h4>{info.title}</h4></a></Link>
                                    {/* <h5>${info.price}</h5>
                                    <h5>{info.description}</h5> */}
                                    {/* <div style={{display:"block"}}> */}
                                        <h6>${info.price}</h6>
                                        <h6>{info.description}</h6>
                                    {/* </div> */}
                                    

                                    {/* <ul> */}
                                        {/* {category.links &&
                                            category.links.map(link => (
                                                <li key={link}>
                                                    <Link href="/shop" as={`/shop`}>
                                                        <a>{link}</a>
                                                    </Link>
                                                </li>
                                            ))} */}
                                            {/* <li>${info.price}</li>
                                            <li>{info.description}</li> */}
                                    {/* </ul> */}
                                    <div className="service-enq-button">
                                        
                                    <a onClick={e=>setShowModal(true)} className={`${currentColor}`}>Enquiry</a>

                                </div>
                                </div>
                                
                            </div>

                            
                            </div>
                        </div>
                            // <div className="servlist-content-store" key={info.serviceId}>
                            //             <EnquiryPopUp showModal={showModal} setShowModal={setShowModal} serviceId={info.serviceId}/>

                            //     <div className="service-img-list">
                            //         <img src={info.serviceImage ? imageUrl + "?path=" + info.serviceImage.containerName + "&name=" + info.serviceImage.image : "/static/img/no-image.png"} />
 
                            //     </div>
                            //     <div className="serlist-contant">
                            //         <h3>{info.title}</h3>
                            //         <p>${info.price}</p>
                            //         <p>{info.description}</p>

                            //     </div>
                            //     <div className="service-enq-button">
                            //         <a onClick={e=>setShowModal(true)} className={`${currentColor}`}>Enquiry</a>

                            //     </div>
                            // </div>
                            ))}
                    </div> :
                        <div className="servlist-content-store">
                            <center><img src="/static/img/spurt-original-loader.gif" style={{margin:"50px 0px"}}/></center>
                        </div>
                    }
                </div>
          </div>
        </div>

        </div>

    )
}


export default connect(state=>state.setting)(ServiceListInfo)