import React from 'react';
import moment from 'moment'

export default function DateRev({dateCarry}){

    // console

    let date = moment(dateCarry).format('DD MMM, YYYY  HH:mmA');
  


    return(
    <h5>{date!=="Invalid date"?date:""}</h5>
    )
}