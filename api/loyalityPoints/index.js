import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function getAllTxnsData(payload) {
    

    const result = await APIServices.create('m-loyal/GET_CUSTOMER_TRANS_INFO', payload)
   
    if (result && result.status === 200) {
        return result.data;

    }
}

export async function registerUser(payload) {
    

    const result = await APIServices.create('m-loyal/INSERT_CUSTOMER_REGISTRATION_ACTION', payload)
   
    if (result && result.status === 200) {
        return result.data;

    }
}