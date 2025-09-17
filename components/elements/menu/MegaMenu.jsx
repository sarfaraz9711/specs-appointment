import { useState, useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import {
    CaretRightFilled
} from '@ant-design/icons';
import Link from 'next/link';
import {useSelector, useDispatch } from "react-redux";
import Router from 'next/router'
import { getProductVariants } from '../../../api/filter/getVariants';
import { setResponseData } from '../../../store/responsiveData/action';


const Menu = ({ menuData, categoryId, viewcurrentColor}) => {
    
    const dispatch = useDispatch();
    const [expandMenu, setexpandMenu] = useState(false);
    const [defaluremove, setdefaluremove] = useState(true)
    const [menuOpen, setMenuOpen] = useState("")
    let responsiveData = useSelector((s) => s.responsiveData);
  let menuExpand = responsiveData.menuExpand;

   useEffect(()=> {
    if(!menuExpand){
        setexpandMenu(false);
    }
  },[menuExpand])
    const mouseOverFunc = () => {
        document.body.classList.add("scroll-block-home")
        setdefaluremove(true)
    }

    const apiCallToGetProductVarients = (categoryName) => {
        getProductVariants(dispatch, categoryName)
    }

    const clickHandleOfChildCategory = (parentCategory, childCategory) => {

        dispatch(setResponseData(false));
        setexpandMenu(false);
        //Reset
        const checkBox = document.getElementsByClassName("filterCheckBox")
      for (var i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = false;
      }
        setdefaluremove(false)
        sessionStorage.setItem("parentCategorySlug", parentCategory.categorySlug);
          if(parentCategory.name == "RC Sports"){
            apiCallToGetProductVarients(`${parentCategory.name} ${childCategory.name}`);
          }else{
           apiCallToGetProductVarients(parentCategory.name);
          }
         sessionStorage.setItem("selectedMenuItem", parentCategory.name);
    }

    const mouseOutFunc = () => {

        document.body.classList.remove("scroll-block-home")
    }


    const parentClickhandle = (parentCategory) => {
        //Reset
        const checkBox = document.getElementsByClassName("filterCheckBox")
      for (var i = 0; i < checkBox.length; i++) {
        checkBox[i].checked = false;
      }
      sessionStorage.setItem("parentCategorySlug", parentCategory.categorySlug);
        apiCallToGetProductVarients(parentCategory.name);
         sessionStorage.setItem("selectedMenuItem", parentCategory.name);
    }

    const expandParentCatHandle = (data) => {
        console.log("datadatadatadatadatadata",data)
        setexpandMenu(true);
        setMenuOpen(data.categoryId)
        console.log(data.categoryId)
        if((data.name).toUpperCase()=="NEW ARRIVALS"){
            dispatch(setResponseData(false));
            Router.push(data.categorySlug)
        }else if((data.name).toUpperCase()=="OFFER"){
            dispatch(setResponseData(false));
            Router.push(data.categorySlug)
        }else if((data.name).toUpperCase()=="RC SPORTS"){
            dispatch(setResponseData(false));
            Router.push('rc-sports/home')
        }else{
            parentClickhandle(data)
        }
    }

const titleCaseFuncation = (value)=>{
    const text = value.substring(1,0).toUpperCase()
    const text1 = value.substring(1).toLowerCase()
    return text+text1
}
const [catIdForChildDisplay, setCatIdForChildDisplay] = useState();

const showChildMenu = (menuData) => {
    console.log("Hello Togle");
    setCatIdForChildDisplay(menuData.categoryId);
}

    return (
        <>
    <li className={((menuData.name).toUpperCase()=='NEW ARRIVALS'?'nav-item highlight':(menuData.name).toUpperCase()=='RC SPORTS'?'nav-item':'nav-item')} onMouseOver={e => mouseOverFunc()} onMouseOut={e => mouseOutFunc()}>
                {(menuData.name).toUpperCase() == "OFFER"? 
                
                <Link href="/offer">
                    <a className='nav-link desktop-menu-div'>
                        <span>{menuData.name}</span>
                        </a>
                </Link>
                 :
                <>{(menuData.name).toUpperCase() == "RC SPORTS" ? <Link href='/rc-sports/home'>
                <a className='nav-link desktop-menu-div'>
                    <span>{menuData.name}</span>
                    </a>
            </Link>: <Link href={{pathname: `/[...sid]`,}} as={{pathname: `/${menuData.categorySlug}`,}}>
                    <a className='nav-link desktop-menu-div' onClick={e => parentClickhandle(menuData)}>
                        <span>{menuData.name}</span>
                        </a>
                </Link>}
                </>
}
                {/* <Link href="#" as={{pathname: `/${menuData.categorySlug}`,}}>
                    <a className='nav-link' onClick={e => parentClickhandle(menuData)}>
                        <span>{menuData.name}</span>
                        </a>
                </Link> */}
                     <div className='mobile-menu-div' onClick={(e)=>expandParentCatHandle(menuData)}>

                <div className='menu-mob d-flex'>
                                {(menuData.name).toUpperCase() == "RC SPORTS" ? <Link href='/rc-sports/home'>
                <a className='nav-link'>
                    <span>{menuData.name}</span>
                    </a>
            </Link>:<Link href={{ pathname: `/[...sid]`, }} as={{ pathname: `/${menuData.categorySlug}` }}>
                                    <a className="nav-link"><div><span onClick={e => parentClickhandle(menuData)}>{menuData.name}</span></div>
                                    </a>
                                </Link>}
                                {(menuData.name).toUpperCase() == "RC SPORTS" || !menuData.children ? <></> :
                                    <i class="fa fa-angle-down" onClick={e => showChildMenu(menuData)} aria-hidden="true" style={{ marginTop: "12px", color: "#fff" }} ></i>}
                            </div>
                            </div>
                <div className={`gw-sidebar subMenu ${menuData.categoryId == catIdForChildDisplay ? 'sub-menu-active' : ''}`} onMouseOver={e => mouseOverFunc()} onMouseOut={e => mouseOutFunc()}>
                    <div className="subNavWrapper"  >
                        <div className="nano-content">
                        <ul className="gw-nav gw-nav-list"
                                key={menuData.name}>
                                {menuData && menuData && menuData?.children && menuData?.children?.map(megaItemChild => {
                                    return <li className='init-arrow-down down-arrow-menu' key={megaItemChild.name}>
                                        <Link href={{pathname: `/[...sid]`,}} as={{pathname: `/${megaItemChild.categorySlug}`,}}>
                                            <a onClick={e => clickHandleOfChildCategory(menuData, megaItemChild)}>
                                                {megaItemChild.name}
                                                {megaItemChild?.children && <i class="icon-chevron-right"></i>}
                                            </a> 
                                        </Link>
                                        {!megaItemChild?.children ? <></> :
                                    <i class="fa fa-angle-down" aria-hidden="true" style={{ marginTop: "12px", color: "#000" }} ></i>}

<div className='gw-sidebar subMenuSec menu-second' onMouseOver={e => mouseOverFunc()} onMouseOut={e => mouseOutFunc()}>
<div className="subNavWrapper"  >
    <div className='nano-content'>
    <ul className="gw-nav gw-nav-list"
            key={megaItemChild.name}>
            {megaItemChild && megaItemChild && megaItemChild?.children && megaItemChild?.children?.map(leafNode => {
                return <li className='init-arrow-down down-arrow-menu' key={leafNode.name}>
                    <Link href={{pathname: `/[...sid]`,}} as={{pathname: `/${leafNode.categorySlug}`,}}>
                        <a style={{ color: "black" }} onClick={e => clickHandleOfChildCategory(menuData, leafNode)}>
                            {leafNode.name}
                            {leafNode?.children && <i class="icon-chevron-right"></i>}
                        </a>
                    </Link>
                    {!leafNode?.children ? <></> :
                                    <i class="fa fa-angle-down" aria-hidden="true" style={{ marginTop: "12px", color: "#000" }} ></i>}
                    <div className='gw-sidebar subMenuSecThird menu-third' onMouseOver={e => mouseOverFunc()} onMouseOut={e => mouseOutFunc()}>
<div className="subNavWrapper"  >
    <div className='nano-content'>
    <ul className="gw-nav gw-nav-list"
            key={leafNode.name}>
            {leafNode && leafNode && leafNode?.children && leafNode?.children?.map(leafNodeSub => {
                return <li className='init-arrow-down  down-arrow-menu' key={leafNodeSub.name}>
                    <Link href={{pathname: `/[...sid]`,}} as={{pathname: `/${leafNodeSub.categorySlug}`,}}>
                        <a style={{ color: "black" }} onClick={e => clickHandleOfChildCategory(menuData, leafNode)}>
                            {leafNodeSub.name}
                        </a>
                    </Link>
                </li>
            })}
    </ul>
    </div>
</div>
</div>
                </li>
            })}
    </ul>
    </div>
</div>
</div>
                                    </li>
                                })}
                            </ul>
                            </div>
                    </div>
                </div>

            </li>
      
	
   

           
        </>
    );
}


export default Menu;
