import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import FormEditAddress from './modules/FormEditAddress';
import { connect, useDispatch } from 'react-redux';
import { logOut } from '../../../store/auth/action';
import  Router  from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';

function EditAddress(props){
    const [names,setNames]=useState("")
    const dispatch=useDispatch()
// class EditAddress extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { names:""};
//         // const dispatch=useDispatch() 

        
//     }
    
    // let names=""
    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setNames(JSON.parse(localStorage.getItem("spurtUser")).firstName)
        }


    },[])

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear() 
        dispatch(logOut())
        Router.push("/account/login")
    }
 

    // render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            {
                text: 'My orders',
                url: '/account/orders',
                icon: 'icon-bag2',
            }, 
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
                active: true,
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];
        return (
            <section className="ps-my-account ps-page--account">
               
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{names}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? 'active'
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                    <a onClick={e=>handleLogout(e)} href="">
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <FormEditAddress id={props.id} type="edit" details={props.editDetail}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    // }
}

// export default EditAddress;

const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(EditAddress);
