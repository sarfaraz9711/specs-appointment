
import APIServices from '../../services'
import parseJson from 'parse-json';

export async function loyalPointApi(mobileNo, setLoyaltyPoint, setBalanceLoyaltyPoint) {
    let json = {
        "objClass": {
            "customer_mobile": mobileNo
        }
    }
    const result =await APIServices.create('m-loyal/GET_CUSTOMER_TRANS_INFO',json)
    const resultData = result?.data.GET_CUSTOMER_TRANS_INFOResult
    if(resultData?.Success){
        const loyaltypoint = resultData.output.response
        const parseData = parseJson(loyaltypoint)
        setLoyaltyPoint(parseInt(parseData.CUSTOMER_DETAILS[0].LoyalityPoints));
        setBalanceLoyaltyPoint(parseInt(parseData.CUSTOMER_DETAILS[0].LoyalityPoints));
    }
}
export async function loyalPointValidate(json) {
    const result =await APIServices.create('m-loyal/GET_POINTS_VALIDATION_INFO',json)
    const resultData = result?.data.GET_POINTS_VALIDATION_INFOResult
    if(resultData?.Success){
        return resultData
    }else{
        return false
    }
}
export async function loyalPointRedeem(json) {
    const result =await APIServices.create('m-loyal/REDEEM_LOYALTY_POINTS_ACTION',json)
    const resultData = result?.data.REDEEM_LOYALTY_POINTS_ACTIONResult
    if(resultData?.Success){
        return resultData
    }else{
        return false
    }
}
export async function loyalPointReverse(json) {
    const result =await APIServices.create('m-loyal/REVERSE_POINTS_BY_TRANSACTION_ID',json)
    const resultData = result?.data.REVERSE_POINTS_BY_TRANSACTION_IDResult
    if(resultData?.Success){
        return resultData
    }else{
        return false
    }
}
export async function saveLoyaltyPoint(json) {
    return await APIServices.create('loyalty-point/save-point',json)
}

export async function getLoyaltyPoint(key) {
    return await APIServices.get('loyalty-point/get-point-by-key/'+key)
}

export async function reverseLoyaltyPoint(key) {
    return await APIServices.get('loyalty-point/reverse-point/'+key)
}

export async function checkEmployeeDetails(mobileNo) {
     const result =  await APIServices.get('employee/employee-details-by-mobile?mobileNo='+mobileNo)
     return result.data
}



