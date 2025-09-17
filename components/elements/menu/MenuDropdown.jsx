import React, { Component } from 'react';
import Link from 'next/link';
//import {ConnectPlugin} from '../../connectPlugins';


class MenuDropdown extends Component {
    constructor(props) {
        super(props);
    } 

    render() {
        const { menuData } = this.props;
        return (
            // <li className={menuData.subMenu ? 'menu-item-has-children dropdown' : ''}>
            menuData.title!=="Services"?<li className=''>
                
                <Link href={menuData.link}>
                    <a>{menuData.title}</a>
                </Link>
                
                
               {/* <Link href='/'>
                    <a>Home</a>
                </Link>
                <Link href="/blog">

                  <a>Blog</a>
                </Link>
                <Link href="/page/contact-us">
                <a>Contact</a>
                </Link> */}
                {/* {menuData.type === 'dynamic' ? (
                    <Link href={`${menuData.url}/[pid]`} as={`${menuData.url}/${menuData.endPoint}`}>
                        <a>{menuData.text}</a>
                    </Link>
                ) : (
                    <Link href={menuData.url} as={menuData.alias}>
                        <a>{menuData.text}</a>
                    </Link>
                )} */}
                {/* {menuData.subMenu ? (
                    <ul className={menuData.subClass}>
                        {menuData.subMenu.map((subMenuItem, index) => (
                            <MenuDropdown menuData={subMenuItem} key={index} />
                        ))}
                    </ul>
                ) : (
                    ''
                )} */}
                </li>:
                <li className="menu-item-has-children dropdown">
                    {/* <Link href={menuData.url} as={menuData.alias}> */}
                    
                        <a>{menuData.title}</a>
                        <ul className="sub-menu">
                            <li><Link href="/services"><a>All Services</a></Link></li>
                           {menuData&&menuData.serviceArray.map((subMenuItem, index) => (
                            //  <MenuDropdown menuData={subMenuItem} key={index} />
                            <li key={subMenuItem.serviceCategoryId}>
                                <Link href={{pathname:"/services/list/[sid]",query:{category:subMenuItem.name}}} as={{pathname: `/services/list/${subMenuItem.serviceCategoryId}`,query:{category:subMenuItem.name}}}><a>{subMenuItem.name}</a></Link>
                            </li>
                            ))}
                        </ul>
                    {/* </Link> */}

                </li>


            
        );
    }
}

export default MenuDropdown;
