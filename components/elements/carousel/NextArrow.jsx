import React from 'react';
import { getProductByCategory } from '../../../api';

const NextArrow = props => {
    const { className, onClick, icon,setActionValue,sendActionValue } = props;
  
const getData = async ()=>{
    if(sendActionValue){
        setActionValue({categoryId:sendActionValue.categoryId, key:sendActionValue.key, offset:6})
    }
}
    return (
        <button
            className={`slick-arrow slick-next ${className}`}
            style={{marginRight:"2px"}}
            onClick={onClick}>
              
            {icon ? (
                <i onClick={()=>{getData()}} className={icon}></i>
            ) : (
                <i onClick={()=>{getData()}} className="icon-chevron-right"></i>
            )}
        </button>
    );
};

export default NextArrow;
