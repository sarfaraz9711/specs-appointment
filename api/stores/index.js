import APIServices from '../../services'
export async function getStoresByPinCode(pinCode, setStoreData) {
    const result = await APIServices.get(`maps/secure/get-locations/${pinCode}`)
    if (result && result.data.status == 200){
        console.log(result.data, "Nerosdfsfsdfsfs")
        setStoreData(result.data.data)
    }
}

export async function getStoresByCity(cityCode, setStoreData) {
    const result = await APIServices.get(`maps/secure/get-stores-by-city?city=${cityCode}`)
    if (result && result.data.status == 200){
        console.log(result.data, "Nerosdfsfsdfsfs")
        setStoreData(result.data.data)
    }
}

