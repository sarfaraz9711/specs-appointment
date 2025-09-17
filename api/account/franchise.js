
import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import Router from "next/router";

export async function franchiseApi(setformInputData, formInputData) {

    const data = JSON.stringify({
        Name: formInputData.name,
        Email: formInputData.email,
        Mobile_no: formInputData.phone,
        Occupation: formInputData.occupation,
        Showroom_location: formInputData.store,
        Showroom_frontage: formInputData.frontage,
        Showroom_area: formInputData.area,
        State: formInputData.state,
        City: formInputData.city,
        Comment: formInputData?.comment
    })

    console.log(data, "datatatta");
    const result = await APIServices.create('franchisee/create-franchisee', data)
    console.log(result, "sgdsabdu")
    if (result && result.data && result.data.status === 200) {
        modalSuccess('success', result.data.message)
        setformInputData({
            ...formInputData,
            name: '',
            email: '',
            phone: '',
            occupation: '',
            store: '',
            frontage: '',
            area: '',
            state: '',
            city: '',
            comment: ''
        });

    }
    else {
        modalWarning('error', result.data.message);
    }
}

