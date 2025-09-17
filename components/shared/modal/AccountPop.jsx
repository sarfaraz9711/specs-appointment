import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useState } from 'react';
import Modal from 'react-modal';
import {imageUrl} from '../../../api/url';
import Link from 'next/link';
import {useTranslation} from '../../../i18n';
import {modalSuccess} from "../../../api/intercept";
import {
    PoweroffOutlined,
    SettingFilled,
    FileTextFilled
  } from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../store/auth/action';
import {getWishlistList} from '../../../store/wishlist/action';
import {useEffect} from 'react';
import  Router  from 'next/router';
import { useSelector } from 'react-redux';

function AccountPopUp({showPop,setShowPop}) {
    const { t } = useTranslation('common');
    const dispatch=useDispatch()
    const [fname,setFname] = useState("")
    const [aimg,setAimg] = useState("")
    const [email,setEmail] = useState("")
    const [accepted, setAccepted] = useState(1);
    let reloadedheader=useSelector(s=>s.cart.addproduct)

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
          },
        content : {
          top                   : '0%',
          left                  : '80%',
          right                 : '0%',
          bottom                : '65%',
          marginRight           : '3%',
          marginTop             : '3%',
          backgroundColor: 'white',
          height: '222px',
          padding: '0',
          overflow: 'hidden',
          width: '232px',
        }
      };

      

    const closeModal=()=>{
        setShowPop(false)
    }

    const handleLogout = e => {
      
        e.preventDefault();
        localStorage.clear()
        // sessionStorage.clear()

        dispatch(logOut());
        dispatch(getWishlistList([]));
        // Router.push("/account/login");
        Router.push("/");
        // modalSuccess('success',"successfully logged out")
    };

    useEffect(()=>{
        let a =  JSON.parse(localStorage.getItem("spurtUser"))
            if(a !=null){

           
            
            
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email)
            JSON.parse(localStorage.getItem("spurtUser")).avatar ? setAimg(imageUrl+"?path="+JSON.parse(localStorage.getItem("spurtUser")).avatarPath+"&name="+JSON.parse(localStorage.getItem("spurtUser")).avatar+"&width=500&height=500") : setAimg("/static/img/no-image.png")
        }
    },[reloadedheader])


return (
    <Modal
    isOpen={showPop}
    onRequestClose={e=>closeModal(e)}
    className="login-details"
    style={customStyles}
    contentLabel="Example Modal"
  >
      <div className="ap-header">
          <img src={aimg}/>
         
          <p className='ap-para'>{fname} <br></br> <small>{email} </small></p>
      </div>
      <div className="ap-divider"></div>
      <Link href="/account/customer-orders"><a className="ap-anchor"><FileTextFilled style={{fontSize: "20px"}}/><span style={{marginLeft:"20px"}}>{t('OrderHistory')}</span></a></Link>
      <Link href="/account/dashboard"><a className="ap-anchor"><SettingFilled style={{fontSize: "20px"}}/><span style={{marginLeft:"20px"}}>{t('AccountSettings')}</span></a></Link>
      <div className="ap-divider"></div>
      <a className="ap-anchor" style={{paddingTop:"12px",paddingBottom:"0px"}} onClick={e => handleLogout(e)}><PoweroffOutlined style={{fontSize: "20px"}}/><span style={{marginLeft:"20px"}} >{t('SignOut')}</span></a>
  </Modal>)
}

export default AccountPopUp