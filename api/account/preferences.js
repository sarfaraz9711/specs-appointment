import APIServices from '../../services'
import { modalSuccess } from '../intercept'



export async function UserPreferencesApi(data) {
    const result = await APIServices.create('customer/create-customer_preference', data)
    if (result && result.data && result.data.status === 1) {
        modalSuccess('sucess', result.data.message)

        return result.data

    }
}

export async function getUserPreferences() {
    const data = JSON.parse(localStorage.getItem("spurtUser")).id
    const result = await APIServices.get(`customer/customer_preference-list-by-customer?customerId=${data}`)
        console.log(result, "preerenecelist")
        return result.data
    
}

export async function UpdateUserPreferences(data) {

    const result = await APIServices.create('customer/customer_preference-update', data)
    if(result && result.data && result.data.status ===1){
        modalSuccess('sucess', result.data.message)
        return result.data
    }
    
}