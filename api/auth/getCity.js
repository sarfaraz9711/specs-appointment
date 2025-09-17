
import APIServices from '../../services'

export async function getCityListApi(stateCode, setDistrictList) {
    const result =  await APIServices.getAll('store_state_city_master/get-store-city-by-state?stateCode='+stateCode)
        if(result && result.data){
                setDistrictList(result.data.data)
        }
    }



    export async function getSubDistrictListApi(districtcode,setSubDistList) {
        const result =  await APIServices.getAll('pincode-master/sub-district-list?districtcode='+districtcode)
        if(result && result.data){
                setSubDistList(result.data.data)
        }
        }


export async function getPincodeApi(pincode, setDistrictList, setSubDistList, setState, setCity, setSubDist){
        const result = await APIServices.get('pincode-master/pincodelist?pincode='+pincode)
        if(result && result.data){
                const data =result.data.data.data
                setDistrictList(data.districtdata)
                setSubDistList(data.subdistrictdata)
                setState(data.pincodedata.state_code)
                setCity(data.pincodedata.district_code)
                setSubDist(data.pincodedata.taluka_name)
        }

}
