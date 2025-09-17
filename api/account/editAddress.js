import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
export async function editAddressApi(addressId,address1,address2,city,mobile,mobileAlter,countryId,states,stateCode,postCode,Router,addressType,fname,setFname,setAddress,setAddress1,setCity,setMobile,setCountryId,setZoneName,setStateCode,setPostCode,setAddressType){   

    // fetch(apiUrl+'/CustomerAddress/update-address/'+addressId,{
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         address1:address1,
    //         address2:address2,
    //         city:city,
    //         state:states,
    //         postcode:postCode,
    //         countryId:countryId,
    //         addressType:addressType,
    //         company:fname
    //     })
    // }) 
    // .then((json) =>{
    //             setAddress("")
    //             setAddress1("")
    //             setCity("")
    //             setCountryId("")
    //             setFname("")
    //             setZoneName("")
    //             setPostCode("")
    //             setAddressType(1)
    //     if (json.status === 1) {
    //         Router.push('/account/addresses')
    //         modalSuccess('success',json.message)
    //     } else {
    //         modalWarning('error',json.message);
    //     }       
    //     return json
    // })     

    const data = JSON.stringify({
        address1:address1.trim(),
            address2:address2.trim(),
            city:city.trim(),
            state:states,
            stateCode:stateCode,
            postcode:postCode,
            countryId:countryId,
            addressType:addressType,
            company:fname.trim(),
            phoneNo: mobile,
            phoneNoAlter: mobileAlter
    })

    
    const result =await APIServices.update('CustomerAddress/update-address',addressId,data)

    if(result.data.status===1){
        if(localStorage.getItem("cartItem")){
            Router.push('/account/checkout');
        }else{
            Router.push('/account/addresses');
        }
        modalSuccess('success',result.data.message)

    }else{
        modalWarning('error',result.data.message);
    }
    return result.data
}