import React, { useEffect, useState } from "react";
import { getListOfAppointments } from "../../api/appointment/appointment";
import moment from "moment";
import Router from "next/router";
export default function viewAppointments(){
const [getListData, setListData]=useState([])
const [getFilterDate, setFilterDate]=useState('')
useEffect(()=>{
    getList(new Date())
},[])
    const getList = async (date)=>{
        setFilterDate(moment(date).format('DD-MM-YYYY'))
        const json = {appointmentDate:moment(date).format('YYYY-MM-DD')}
        const result = await getListOfAppointments(json)

        console.log('resulty',result)
        if(result.status==200){
            setListData(result.data)
        }
    }

    const openAppointment = (data)=>{
        console.log(data)
        Router.push('/appointment/camera')
    }

    return (
        <div className="container mt-3">
        <h4>Appointments List ({getFilterDate})</h4>
        {getListData.length>0 && getListData.map(item=>{

            return <div onClick={()=>openAppointment(item)} className="alert alert-success appointment-list mb-3">
            <div className="row"> 
                <div className="col-md-4">Appointment Id: {item.appointmentId}</div>
                <div className="col-md-4">Appointment Date and Time: <strong>{moment(item.appointmentDate).format('DD-MM-YYYY')}, {item.appointmentTime}</strong></div>
                <div className="col-md-4 text-right">Appointment Status: <strong>{item.appointmentStatus}</strong></div>
                </div>
                <div className="">
                <div>Name: {item.fullName}</div>
                <div>Address: {item.address}</div>
                <div>Mobile: {item.mobile}</div>
                </div>
            </div>
        })
        
        }

     
        </div>
    )
}