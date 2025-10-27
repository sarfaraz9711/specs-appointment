import APIServices from '../../services'

export async function appointmentDetails(data) {
    const result = await APIServices.create('appointment/appointment-list',data)
    return result.data
}
export async function bookAppointment(data) {
    const result = await APIServices.create('book-appointment/save', data)
    return result.data
}
export async function getAppointmentByUser(data) {
    const result = await APIServices.create('book-appointment/get-appointment', data)
    return result.data
}
export async function checkAppointment(data) {
    const result = await APIServices.create('book-appointment/check-appointment', data)
    return result.data
}
export async function updateAppointment(data) {
    const result = await APIServices.create('book-appointment/update-appointment', data)
    return result.data
}
export async function getListOfAppointments(data) {
    const result = await APIServices.create('book-appointment/get-all-appointment', data)
    return result.data
}
export async function getProductList(){
const result = await APIServices.get('list/custom-product-list?limit=16&offset=0&productDiscountPercent=&discountOfferId=&priceFrom=0&priceTo=20000&price=DESC&keyword=&count=&categoryslug=eyeglasses&manufacturerId=&sizeValueFilter=&colorsValueFilter=&catIds=&&')
return result.data
}