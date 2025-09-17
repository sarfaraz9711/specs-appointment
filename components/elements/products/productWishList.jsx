import React, { useState } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { AddWishlist } from '../../../api/wishlist/addWishlist';
import { addItemToWishlist } from '../../../store/wishlist/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { delWishApi } from '../../../api/wishlist/deleteProduct';
import  Router  from 'next/router';

function ProductWishList({productId,wishListStatus}){
    const [wishListStatusInfo,setWishListStatusInfo]=useState(wishListStatus)
    const [likeAnimate, setLikeAnimate] = useState()
    const [delStatus,setDelStatus]=useState(0)

    const dispatch=useDispatch()
 
    const handleAddItemToWishlist = (e,productId) => {
        e.preventDefault();

        let AuthCheck=localStorage.getItem("spurtToken")
        if(AuthCheck){
            
            setLikeAnimate(i => !i)
            AddWishlist(productId,dispatch)
            //dispatch(addItemToWishlist(1))
        }
        else{
            Router.push('/account/login')
        }
        
    };

    const handleRemoveWishlist=(e, productId)=>{
        e.preventDefault();
        delWishApi(productId,setDelStatus)
        setLikeAnimate(i => !i)
        dispatch(addItemToWishlist(1))
    }

    useEffect(()=>{
        setLikeAnimate(wishListStatus===1?true:false)
    },[wishListStatus])
    
    return(
        <a
            href=""
            data-toggle="tooltip"
            data-placement="top"
            style={{zIndex:"5"}}
            title="Add to wishlist"
            onClick={e =>likeAnimate===false?handleAddItemToWishlist(e, productId):handleRemoveWishlist(e, productId)}>
            {likeAnimate===false?<i className="icon-heart"></i>:<i className="fa fa-heart" style={{color:"red"}}></i>}
        </a>
    )


}
export default ProductWishList