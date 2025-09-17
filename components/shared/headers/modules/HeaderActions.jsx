import React,{useState,useEffect} from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect, useSelector, useDispatch } from 'react-redux';
import MiniCart from './MiniCart';
import { login } from '../../../../store/auth/action';
import { cartListApi, wishListApi } from '../../../../api';
import { addItemToWishlist } from '../../../../store/wishlist/action';
import { getCompareList } from '../../../../store/compare/action';
import { useTranslation } from '../../../../i18n';
import CompardItems from './CompardItems';
import WishlistItems from './wishlistItems';
import AuthSignIN from './AuthSignIN';
import getProfileInfoApi from '../../../../api/home/getInfo';





function HeaderActions({auth,compare}){
   
    const { t } = useTranslation('common');
    const [wishlistData,setWishListApi]=useState([])
    const [compareCount,setCompareCount]=useState([])
    const [dummy,setDummy]=useState([])
    let reloadCart=useSelector(s=>s.wishlist.addwishlist)
    let compareSet=useSelector(s=>s.compare.compareCount)
    let checkOutLogin = useSelector(s=>s.auth)
     const [newAuth, setAuth]=useState(auth)
    const dispatch=useDispatch()
    const wishlist=""
    let TokenAuth=""
    let cartLocal=[]

    const authFunc=()=>{
        if(TokenAuth!==null){
            dispatch(login())
           
        }
    }
   
    

    useEffect(()=>{
        TokenAuth=localStorage.getItem("spurtToken")
        cartLocal=JSON.parse(localStorage.getItem("cartItem")) 
        authFunc()
    },[])

    useEffect(()=>{

        dispatch(addItemToWishlist(0))
        localStorage.getItem("spurtToken")&&wishListApi(setWishListApi,dispatch,setDummy)
    },[reloadCart])
    useEffect(()=>{
        if(localStorage.getItem("spurtToken")!==null){
            getProfileInfoApi(dispatch)
            cartListApi(dispatch)
        }
       
    },[])

    useEffect(()=>{
        dispatch(getCompareList(0))
        setCompareCount(JSON.parse(localStorage.getItem("compareId")))
    },[compareSet])

  useEffect(()=>{
    setAuth(auth)
  },[auth])

 
  

   
        return (
            <>
                <li className="list-inline-item bdrNone topNavBar">
	{!newAuth.isLoggedIn && <a href="javascript:void(0)"><i className="fa fa-bars" aria-hidden="true"></i></a>}
	<ul className={newAuth.isLoggedIn?'d-block list-inline':'login-drop-down list-inline'}>
    <AuthSignIN auth={newAuth} />
	</ul>
	</li>
              <li className="list-inline-item bdrNone"><WishlistItems wishlistData={wishlistData} /></li>
              <li className="list-inline-item bdrNone"><MiniCart /></li>

</>
   
           
        );
    
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(HeaderActions);
