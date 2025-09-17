import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useEffect } from 'react';
import {getServiceApi} from '../../../api';
import { useDispatch, connect } from 'react-redux';
import { imageUrl } from '../../../api/url';
import Link from 'next/link';
import  Router  from 'next/router';
import { Menu } from 'antd';


function ServiceDetail(setting){
    const dispatch=useDispatch()
    const { SubMenu } = Menu;

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
                       <h3>All Services</h3>

                   </div>
                        <div className="service-content-right">
                            <div className="service-conin">
                                {setting.servicelist.map((service) => (
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"> <div className="service-alig-content"><div className="service-image-contain" onClick={e=>forceServiceRoute(service)}><img src={service.imagePath !== null ? imageUrl + "?path=" + service.imagePath + "&name=" + service.image+"&width=70&height=70" : "/static/img/no-image.png"} alt="" /></div><p>{service.name}</p></div></div>
                                ))}
                            </div>

                        </div> 


               </div>

           </div>

        </div>

    </div>
    )
    

}

export default connect(state=>state.setting) (ServiceDetail)