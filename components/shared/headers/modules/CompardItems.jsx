import Link from "next/link";
//import {ConnectPlugin} from '../../../connectPlugins';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompareListcompare } from "../../../../store/compare/action";

function CompardItems({compareCount}) {
  let reloadCart=useSelector(s=>s.compare.comparecompare)
  const dispatch=useDispatch()
 
  useEffect(()=>{
    dispatch(getCompareListcompare(compareCount))
  },[compareCount])
  return (
    <>
      <Link href="/account/compare">
        <a className="header__extra d-none">
          <img src="/static/img/compare.svg" alt="" />

          <span>
          <i>{reloadCart&&reloadCart.length!==0? compareCount&&compareCount.length==0?<>{reloadCart.length}</>:<>{compareCount&&compareCount.length}</>:0}</i>
            {/* <i>
              {compareCount && compareCount.length !== 0
                ? compareCount && compareCount.length
                : 0}
            </i> */}
          </span>
        </a>
      </Link>
    </>
  );
}

export default CompardItems
