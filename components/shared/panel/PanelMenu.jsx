import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect } from 'react-redux';
import {
    PieChartOutlined,
    CaretRightFilled
} from '@ant-design/icons';
import { Menu } from 'antd';

import Link from 'next/link';

const { SubMenu } = Menu;

class PanelMenu extends Component {
    constructor(props) {
        super(props);
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        const { menuData } = this.props;
        const {setMenuDrawer}=this.props
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                className="menu--mobile-2">
               
                <SubMenu

                    title={
                        <Link href={{
                            pathname: `/shop/[sid]`, query: {
                                attribute: "",
                                priceTo: 30000,
                                brand: "",
                                variantValue: "",
                                defaultCallValue: "ASC",
                                offset: 0,
                                index: 0,
                                categorySlug: menuData.categorySlug
                            }
                        }}

                            as={{
                                pathname: `/shop/${menuData.categorySlug}`, query: {
                                    attribute: "",
                                    priceTo: 30000,
                                    brand: "",
                                    variantValue: "",
                                    defaultCallValue: "ASC",
                                    offset: 0,
                                    index: 0,
                                    categorySlug: menuData.categorySlug
                                }
                            }}>
                            <a> {menuData.name}</a>
                        </Link>
                    }
                >

                    {menuData && menuData.children.map((megaItemChild) => (



                        <SubMenu key={megaItemChild.name} title={megaItemChild.name}>

                           
                                {megaItemChild && megaItemChild.children && megaItemChild.children.map(megaSubItem => (
                                   megaSubItem.type === 'dynamic' ? (
                                            <Link
                                                href={{
                                                    pathname: `/shop/[sid]`, query: {
                                                        attribute: "",
                                                        priceTo: 30000,
                                                        brand: "",
                                                        variantValue: "",
                                                        defaultCallValue: "ASC",
                                                        offset: 0,
                                                        index: 0,
                                                        categorySlug: megaSubItem.categorySlug,
                                                        categoryId: megaItemChild.categoryId
                                                    }
                                                }}

                                                as={{
                                                    pathname: `/shop/${megaSubItem.categorySlug}`, query: {
                                                        attribute: "",
                                                        priceTo: 30000,
                                                        brand: "",
                                                        variantValue: "",
                                                        defaultCallValue: "ASC",
                                                        offset: 0,
                                                        index: 0,
                                                        categorySlug: megaSubItem.categorySlug,
                                                        categoryId: megaItemChild.categoryId
                                                    }
                                                }}
                                            
                                            >
                                                <a >
                                                <Menu.Item >
                                                    {megaSubItem.name}
                                                    </Menu.Item>
                                                </a>
                                            </Link>
                                        ) : (
                                            <Link
                                                href={{
                                                    pathname: `/shop/[sid]`, query: {
                                                        attribute: "",
                                                        priceTo: 30000,
                                                        brand: "",
                                                        variantValue: "",
                                                        defaultCallValue: "ASC",
                                                        offset: 0,
                                                        index: 0,
                                                        categorySlug: megaSubItem.categorySlug,
                                                        categoryId: megaItemChild.categoryId
                                                    }
                                                }}

                                                as={{
                                                    pathname: `/shop/${megaSubItem.categorySlug}`, query: {
                                                        attribute: "",
                                                        priceTo: 30000,
                                                        brand: "",
                                                        variantValue: "",
                                                        defaultCallValue: "ASC",
                                                        offset: 0,
                                                        index: 0,
                                                        categorySlug: megaSubItem.categorySlug,
                                                        categoryId: megaItemChild.categoryId
                                                    }
                                                }} 
                                                                                                   >
                                                <a  >
                                                <Menu.Item key={megaSubItem.name}
                                                className="menu--mobile-203"
                                                 >
                                                
                                                    <a onClick={e=>setMenuDrawer(false)}
                                                    className="menu--mobile-209"
                                                    >{megaSubItem.name}</a>
                                                   
                                                    
                                                    </Menu.Item>
                                                </a>
                                                
                                            </Link>
                                        )
                                ))}
                            

                        </SubMenu>





                    ))}



                 

                </SubMenu>



            </Menu>

        )
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);



{/* {menuData &&menuData.children.map((megaItemChild) => (
                                <Menu.Item key={megaItemChild.name}>
                                   
                                   <h4>
                                    {megaItemChild.name}
                                <span>
                                    <CaretRightFilled />
                                    </span></h4>
                                    

                                </Menu.Item>
                            ))} */}