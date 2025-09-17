
import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import Router from "next/router";

export async function feedApi(email, feedback, service, resetForm) {

    const data = JSON.stringify({
        email: email,
        feedMsg: feedback,
        type: service
    })

    console.log(data, "datatatta");
    const result = await APIServices.create('feedback/create-feedback', data)
    console.log(result, "Nero Result")
    if (result && result.data && result.data.status===200) {
        Router.push('/')
        modalSuccess('success', result.data.message)
        resetForm();
    }
    else {
        modalWarning('error', result.data.message);
    }

}

