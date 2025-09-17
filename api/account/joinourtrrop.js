import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import  Router  from "next/router";

export async function careerApi(name,email,phone,address,functionalarea,link1,link2) {

    const data = JSON.stringify({
        Name: name,
        Email: email,
        Mobile_no: phone,
        Address: address,
        Functional_area: functionalarea,
        External_link_1: link1,
        External_link_2: link2
    })

    console.log(data, "datatatta");
    const result =await APIServices.create('career/create-career',data)
    if(result&&result.data&&result.data.status===200){
                Router.push('/join-our-troop')
                modalSuccess('success',result?.data?.message)
                
            }
            else{
                modalWarning('error',result?.data?.message);
            }
}

