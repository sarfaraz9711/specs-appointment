import APIServices from '../../services'



// export async function getPinCodeValue(pinCode, setState, setCity){
//     const result =await APIServices.getAll('pincode-master/pincodelist?pincode='+pinCode)
//     if(result&&result.data&&result.status===200){
//         console.log(result.data.data?.pincodedata, " ssdfsfsdfdsfs")
//         setState(result.data.data.data?.pincodedata.state_code);
//         setCity(result.data.data.data?.pincodedata.district_name);        

//     }
// }

export async function getPincodeApi(pincode, setDistrictList, setState, setCity){
    const result = await APIServices.get('pincode-master/pincodelist?pincode='+pincode)
    if(result && result.data){
            const data =result.data.data.data
            setDistrictList(data?.districtdata)
            setState(data.pincodedata.state_code)
            setCity(data.pincodedata.district_code)
    }

}

export async function getPincodeApiForAddress(pincode, setZoneName,setAddress1, setStateCode){
    const result = await APIServices.get('pincode-master/pincodelist?pincode='+pincode)
    if(result && result.data){
            const data =result.data.data.data
            setZoneName(data?.pincodedata.state_name),
            setAddress1(data?.pincodedata.district_name)
//            setCity(data?.pincodedata.taluka_name),
            setStateCode(data?.pincodedata.state_code)
    }

}