import React from 'react';
import moment from 'moment'

export default function OrderDate({dateCarry}){

    // console

    let date = moment(dateCarry).format('DD MMM, YYYY');


    return(
    <p>date: {date}</p>
    )
}