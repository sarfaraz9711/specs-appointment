import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";
import APIServices from '../../services'
export async function homeBannerApi(staticBannerList) {
    const staticBannerList = [
        {
            "name": "banner1",
            "imagePath": "",
            "redirect-link": ""



        },
        {
            "name": "banner1",
            "imagePath": "",
            "redirect-link": ""



        },
        {
            "name": "banner2",
            "imagePath": "",
            "redirect-link": ""
        },
        {
            "name": "banner2",
            "imagePath": "",
            "redirect-link": ""



        },
        {
            "name": "banner3",
            "imagePath": "",
            "redirect-link": ""
        },
        {
            "name": "banner3",
            "imagePath": "",
            "redirect-link": ""



        },
    ]

    return staticBannerList;


    // const result = await APIServices.create('', data)
    // if (result.data.status === 1) {
    //     Router.push('/services/enquiry-success')
    //     modalSuccess('success', json.message)
    // }
    // else {
    //     modalWarning('error', json.message);

    // }

}