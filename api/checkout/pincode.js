import APIServices from '../../services'
import { modalSuccess, modalWarning } from '../intercept';

export async function pinCodeApi(pin, partner = "DELHIVERY") {

    const data = {
        pinCode:pin,
        deliveryPartner:partner
    };

    const result= await APIServices.create('order-tracking/secure/expected-delivery', data);

    if(result && result.data && result.data.status === 200 ){
        console.log(result.data.data);
       return (result.data)

    }else {
        
        data.deliveryPartner = 'ECOM'
        const result= await APIServices.create('order-tracking/secure/expected-delivery', data);

        if(result && result.data && result.data.status == 200){
            console.log(result.data.data);
            return (result.data)
        }

    }
}



export async function pinCodeApiForDelivery(pin) {

    
    const result= await APIServices.get('order-tracking/check-delivery-time/'+pin);

    
        console.log(result.data.data);
       return (result.data)

    
}