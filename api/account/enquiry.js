
import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import  Router  from "next/router";

export async function corporateGiftingApi(name, email, phone, CompanyName, city, quantity, detail) {

    const data = JSON.stringify({
        Name: name,
        Email: email,
        Mobile_no: phone,
        Company_name: CompanyName,
        City: city,
        Product_quantity: quantity,
        Requirement: detail
    })

    console.log(data, "datatatta");
    const result =await APIServices.create('enquiry/create-enquiry',data)
    if(result&&result.data&&result.data.status===200){
                Router.push('/')
                modalSuccess('success',result.data.message)
                
            }
            else{
                modalWarning('error',result.data.message);
            }
}

