import React, {useState,useEffect } from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect} from 'react-redux';
import Link from 'next/link';
import { useTranslation } from '../../../../i18n'
import AccountPopUp from '../../modal/AccountPop';


function AccountQuickLinks(props){
const [showPop,setShowPop]=useState(false)
const { t } = useTranslation('common');


  
    useEffect(()=>{
        if(showPop) {
            document.body.classList.add("scroll-block-home")
        } else {
            document.body.classList.remove("scroll-block-home")
        }
    },[showPop])

   
       
        const { isLoggedIn } = props;
        if (isLoggedIn === true) {
            return (
                <div className="ps-block--user-account">
               
                <AccountPopUp showPop={showPop} setShowPop={setShowPop}/>
                <div className="account-looginin-view">
                <a onClick={e=>setShowPop(!showPop)}> <i className="icon-user mr-3" style={{color:"white"}}></i> Account <i className="fa fa-angle-down ml-3" aria-hidden="true"></i></a>   
                </div>
                    
                </div>
            );
        } else {
            return (
                <div className="ps-block--user-header">

                    <div className="ps-block__left">
                        <i className="icon-user"></i>
                    </div>
                    <div className="ps-block__right">
                        <Link href="/account/login">
                            <a>Login</a>
                        </Link>
                        <Link href="/account/register">
                            <a>Register</a>
                        </Link>
                    </div>
                </div>
            );
        }
    
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
