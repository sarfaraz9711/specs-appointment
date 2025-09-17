import Link from 'next/link'
//import {ConnectPlugin} from '../../../connectPlugins';
import React from 'react'
import { useSelector } from 'react-redux';

 function WishlistItems({wishlistData}) {
  let reloadCart=useSelector(s=>s.wishlist.wishlistItems)
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);

  return (
    <>
    {isLoggedIn === true?
    <Link href="/account/wishlist">
                    <a className="header__extra">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                        {/* <img src="/static/img/heart.svg" alt=""/> */}
                         
                            <i>{reloadCart&&reloadCart.length!==0? wishlistData&&wishlistData.length==0?<span>{reloadCart.length}</span>:<span>{wishlistData.length}</span>:""}</i>
                    </a>
                </Link>:<Link href="/account/login">
                <a className="header__extra">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    </a>
                  </Link>}
    </>
  )
}
export default WishlistItems