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