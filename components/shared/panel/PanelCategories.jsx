import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { Menu } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

function PanelCategories(){
    const [openKeys,setOpenKeys]=useState(['sub1'])
    let category=useSelector(s=>s.product)

// class PanelCategories extends Component {
//     constructor(props) {
//         super(props);
//     }

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    // state = {
    //     openKeys: ['sub1'],
    // };
    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => openKeys.indexOf(key) === -1
        );
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            // this.setState({ openKeys });
            setOpenKeys()
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
            // this.setState({
            //     openKeys: latestOpenKey ? [latestOpenKey] : [],
            // });
        }
    };

    // render() {
        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={e=>onOpenChange(openKeys)}>
                  
                {category. categories.map(category => (
                    <Menu.Item key={category.id}>
                        <a href={`/shop?categoryId=${category.categorySlug}`}>
                            {category.name}
                        </a>
                    </Menu.Item>
                ))}
            </Menu>
        );
    // }
}

export default PanelCategories;
