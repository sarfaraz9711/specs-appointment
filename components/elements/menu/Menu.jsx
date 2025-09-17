import React from 'react';
import Link from 'next/link';
//import {ConnectPlugin} from '../../connectPlugins';
import {HomeFilled} from '@ant-design/icons';
import {useDispatch, useSelector } from 'react-redux';
import MegaMenu from './MegaMenu';
import { useRouter } from 'next/router'
import { setResponseData } from '../../../store/responsiveData/action';
 
const Menu = ({ data, className,service }) => {
    let viewcurrentColor=useSelector(s=>s.palette.viewcurrentColor)
    const dispatch = useDispatch();
    const close = () => {
        dispatch(setResponseData(false));
    }
   
    const router = useRouter()
    return(
    // <ul className={className }>
    //         {router.route!=="/"? <li style={{verticalAlign:"middle"}}><Link href="/"><a ><HomeFilled  className={viewcurrentColor} /></a></Link></li>:""}
       <>

       
        {data &&
            data.map(item => {
              
                   
                    return <MegaMenu menuData={item} key={item.categoryId} viewcurrentColor={viewcurrentColor} />;

                
            })}
            <li className='nav-item mobile-menu-div' onClick={close()}><Link href="/franchise"><div>FRANCHISE</div></Link></li>
            {/* <li><Link href="/contact"><a>Contact</a></Link></li> */}
           </>

    )
};

export default Menu;
