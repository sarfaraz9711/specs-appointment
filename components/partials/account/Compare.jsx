import React, { Component, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { removeCompareItem, getCompareList, compareLoading } from '../../../store/compare/action';
import Link from 'next/link';
import { Rate } from 'antd';
import { productCompareApi } from '../../../api';
import { useState } from 'react';
import { imageUrl } from '../../../api/url';
import  Router  from 'next/router';
import { colorThemeShow } from '../../helper/colorTheme';
import {modalSuccess} from '../../../api/intercept';
import { priceHelpFunc } from '../../helper/priceHelper';
import Head from 'next/head'
import { useTranslation } from '../../../i18n'
// import CompareRatingReviews from '../../../reusableplugins/CompareRatingReview';
//import {ConnectPlugin} from '../../connectPlugins'
import CompareRatingReviews from '../../elements/detail/modules/description/CompareRatingReview';

function Compare(props){
    const [productId,setProductId]=useState()
    const [compareData,setCompareData]=useState([])
    const [compareStatus,setCompareStatus] =useState(0)
    const [loadings,setloadings]=useState(false)
    const dispatch=useDispatch()
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)


    const handleAddItemToCart = (e,product) => {
        e.preventDefault();
        Router.push("/product/[pid]",`/product/${product.productSlug}`)
        
    };

    const handleRemoveCompareItem = (e, product,index) => {
        
        let data=1
        let localstring=""
        e.preventDefault();
        let locale=JSON.parse(localStorage.getItem("compareId"))
        var index = locale.indexOf(product.productId);
        locale.splice(index, 1);
        dispatch(getCompareList(1))
        
        localStorage.setItem("compareId",JSON.stringify(locale))
        modalSuccess('success',"Product removed Successfully")
        if(locale.length===0){
            setCompareData([])
        }
        else{
            if(locale.length===1){
                localstring=locale.toString()
            }
            else{
                localstring=locale
            }
           
            productCompareApi(localstring,data,setCompareData,dispatch,setCompareStatus,setloadings)

        }
        
    };

    useEffect(()=>{
        dispatch(compareLoading(true))
        setProductId(JSON.parse(localStorage.getItem("compareId")))
        let productIdLocale=JSON.parse(localStorage.getItem("compareId"))
        let data=1
       
        if(productIdLocale!==null){

            if(productIdLocale.length !==0){
           
                productCompareApi(productIdLocale,data,setCompareData,dispatch,setCompareStatus,setloadings)
    
            }
            if(productIdLocale.length===0){
                setloadings(true)
            } 

        }else{
            setloadings(true) 
        }
        
      
        

    },[])

    // render() {
        const { compareItems } = "";
        return (
            // <div className="ps-compare ps-section--shopping">
            <>
             <Head>
                <title>Compare</title>
            </Head>
           
            {loadings==true?<>
            
            {compareData && compareData.length === 0?
            <div className="compare-container-main">
            <div className="no-comp-product-contain">
                <p><img src="/static/img/no-compare.png"/></p>
                <p>{t('comapre.NoCompareProducts')}</p>
            </div>
        </div>

            
            :
            <div className="compare-container-main">
           
        <div className="compare-subcontainer-main">
            <table>
                <tr>
                    <td className="compare-table-data" style={{width:"20%"}}><h4>{t('product')}</h4></td>
                    {compareData && compareData.map((image,index)=>(
                        <td className="compare-table-data" key={index}>
                            <div className="compare-data-image-contain">
                                <img 
                                src={imageUrl+"?path="+image.productImage.containerName+"&name="+image.productImage.image+"&width=500&height=500"}
                                
                                />
                                <button onClick={e =>handleRemoveCompareItem(e,image,index)}>
                                    <img src="/static/img/close.svg"/>
                                </button>
                            </div>
                        </td>
                    ))}
                    
                   
                </tr>
                <tr className='higligtale'>
                    <td className="compare-table-data" style={{width:"20%"}}><h4>{t('account.Name')}</h4></td>
                    {compareData && compareData.map((product,index)=>(
                        <td className="compare-table-data" key={index}>{product.name}</td>
                    ))}
                </tr>
                <tr>
                    <td className="compare-table-data" style={{width:"20%"}}><h4>{t('account.Price')}</h4></td>
                    {compareData && compareData.map((product,index)=>(
                        <td className="compare-table-data" key={index}><p> $ {product.pricerefer !== "" ? priceHelpFunc(JSON.parse(product.pricerefer), JSON.parse(product.taxType),product.taxValue, "") : priceHelpFunc(JSON.parse(product.price), JSON.parse(product.taxType), product.taxValue, "")}</p></td>
                    ))}
                </tr>
                <tr className='higligtale'>
                    <td className="compare-table-data" style={{width:"20%"}}><h4>{t('comapre.Rating')}/ {t('comapre.Review')}</h4></td>
                    {compareData && compareData.map((product,index)=>(
                        <>
                        <td className="compare-table-data compare-rate-rev" key={index} >
                 <div className="comp-rev-rate">
                               <CompareRatingReviews product={product} index={index} />
                           
                            
                  
                    </div></td>
                        </>
                    ))}
                  
                   
                </tr>
                <tr>
                    <td className="compare-table-data" style={{width:"20%"}}><h4>{t('comapre.Description')}</h4></td>
                    {compareData && compareData.map((product,index)=>(
                        <td className="compare-table-data" key={index} style={{maxWidth:"400px"}}>
                           
                            <div className='listnone' dangerouslySetInnerHTML={{__html: product.description.replaceAll("&amp;", "&")
                            .replaceAll("&lt;", "<")
                            .replaceAll("&gt;", ">")
                            .replaceAll("&quot;", '"')
                            .replaceAll("&#39;", "'")
                            .replaceAll("&sbquo;", "‚")
                            .replaceAll("&#61;", "=")
                            .replaceAll("&#45;", "-")
                            .replaceAll("&hellip;", "…")
                            .replaceAll("&commat;", "@")
                            .replaceAll("&copy;", "©")
                            .replaceAll("&#35;", "#")
                            .replaceAll("&ldquo;", "“")
                            .replaceAll("&rsquo;", "’")
                            .replaceAll("&lsquo;", "‘")
                            .replaceAll("&trade;", "™")
                            .replaceAll("&reg;", "®")
                            .replaceAll("&ndash;", "–")
                            .replaceAll("&eacute;", "é")
                            .replaceAll("&euro;", "€")
                            .replaceAll("&pound;", "£"),
}}></div>
                        </td>
                    ))}
                    {/* // <td className="compare-table-data">
                    //     <div dangerouslySetInnerHTML={{__html: ""}}></div>
                    // </td> */}
                </tr>
                <tr>
                    <td className="compare-table-data" style={{width:"20%"}}><h4>{t('comapre.Action')}</h4></td>
                    {compareData && compareData.map((product,index)=>(
                        <td className="compare-table-data" key={index}>
                            <Link
                                href="/product/[pid]"
                                as={`/product/${product.productSlug}`}>
                                    <a>{t('comapre.AddToCart')}</a>
                            </Link>
                        </td>
                    ))}
                </tr>
            </table>

        </div>

        </div>
            
            }
                
                
            {/* // </div> */}
            </>:<div className="ps-page--product">
                        <div className="ps-container">
                            <div style={{ paddingTop: "100px", paddingBottom: "200px" }}>
                                <center><img src="/static/img/spurt-original-loader.gif" style={{ height: "100px", width: "100px" }} /></center>
                            </div>
                        </div>

                    </div>}
            </>
        );
    
}

const mapStateToProps = state => {
    return state.compare;
};
export default connect(mapStateToProps)(Compare);
