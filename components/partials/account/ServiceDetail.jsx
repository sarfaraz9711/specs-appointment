import React, { useEffect, useState } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect, useDispatch, useSelector } from 'react-redux';
import  Router, { useRouter }  from 'next/router';
import { Menu } from 'antd';
import {getServiceApi} from '../../../api';
import EnquiryPopUp from '../../shared/modal/EnquiryPop';
import { imageUrl } from '../../../api/url';

function ServiceDetailComp(setting){
    const dispatch=useDispatch()
    const { SubMenu } = Menu;
    const router=useRouter()
    let CatName=router.query.category
    let currentColor=useSelector(s=>s.palette.currentColor)
    const [showModal,setShowModal]=useState(false)


    useEffect(()=>{
        getServiceApi(dispatch)
    },[])

    const forceServiceRoute=(service)=>{
        Router.push(`/services/list/[sid]?category=${service.name}`,`/services/list/${service.serviceCategoryId}?category=${service.name}`,{query:{category:service.name}})


    }

    return(
        <div className="service-det-custom">
        <div className="service-row">
           <div className="col-lg-3 col-md-2">
           <aside className="widget widget_shop">
           <h4 className="widget-title">Services</h4>

                        {/* <div className="ps-widget__content"> */}
                                {setting.servicelist.length > 0 ? (
                        <Menu
                        // onClick={e=>handleClick(e)}
                        style={{ width: 256 }}
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        mode="inline" 
                      >
                           
                           

                            {setting.servicelist.map((service) => {
                                if(service.children){
                                    return(
                                       <SubMenu key={service.categoryId} title={service.name}>
                                       {service&&service.children&&service.children.map((subservice,i) =>  (<Menu.Item key={subservice.categoryId} onClick={e=>forceServiceRoute(subservice)}>{subservice.name}</Menu.Item>))}
                                    </SubMenu>)
                                    }
                                else{
                                return(<Menu.Item key={service.categoryId} onClick={e=>forceServiceRoute(service)}>{service.name}</Menu.Item>)
                                }
                                    }

                                    )
                                }
                                
                                
                            
          
                       
                      </Menu>
                        
                    ) : (
                        'No Category'
                    )}
                        {/* </div> */}
                       
                </aside>

           </div>
           <div className="col-lg-9 col-md-10">
               <div className="service-page-content">
                   <div className="service-header-ps">
                    <h3>{CatName} </h3>

                   </div>
                        <div className="service-content-right">
                        {setting.servelistLoader === false ? <div>

                            <div className="service-conin">
                                {/* {setting.servicelist.map((service) => (
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"> <div className="service-alig-content"><div className="service-image-contain" onClick={e=>forceServiceRoute(service)}><img src={service.imagePath !== null ? imageUrl + "?path=" + service.imagePath + "&name=" + service.image : "/static/img/no-image.png"} alt="" /></div><p>{service.name}</p></div></div>
                                ))} */}
                                {setting.seviceInfo.map((info)=>(
                                    <div>
                                    <div className="img-detail-service">
                                    <EnquiryPopUp showModal={showModal} setShowModal={setShowModal} serviceId={info.serviceId}/>

                                    <img src={info.serviceImage ? imageUrl + "?path=" + info.serviceImage.containerName + "&name=" + info.serviceImage.image : "/static/img/no-image.png"} />
    
                                    </div>
                                    <div className="title-detail-service">
                                        <h3>{info.title}</h3>
                                        <p>{info.description}</p>
                                    </div>
                                    <div className="phone-serv-egtvr">
                                        <div className="phone-internal-feild"><h4>Phone Number</h4><p>{info.mobile}</p></div>
                                        <div className="phone-internal-feild"><h4>Status</h4><p>{info.isActive===1?"Active":"Inactive"}</p></div>
    
                                    </div>
                                    <div className="service-detail-submt-enquiry">
                                            <button className={currentColor} onClick={e=>setShowModal(true)}>Enquire now</button>
    
                                    </div>
                                    </div>
                                ))}
                                 
                            </div>
                            </div> :
                        <div className="servlist-content-store" style={{border:"none"}}>
                            <center><img src="/static/img/spurt-original-loader.gif" style={{margin:"50px 0px"}}/></center>
                        </div>
                    }

                        </div> 



               </div>

           </div>

        </div>

    </div>
        
    )
}

export default connect(state=>state.setting)(ServiceDetailComp)