import APIServices from "../../services";

export async function appointmentDetails(data) {
  const result = await APIServices.create("appointment/appointment-list", data);
  return result.data;
}
export async function bookAppointment(data) {
  const result = await APIServices.create("book-appointment/save", data);
  return result.data;
}
export async function getAppointmentByUser(data) {
  const result = await APIServices.create(
    "book-appointment/get-appointment",
    data
  );
  return result.data;
}
export async function checkAppointment(data) {
  const result = await APIServices.create(
    "book-appointment/check-appointment",
    data
  );
  return result.data;
}
export async function updateAppointment(data) {
  const result = await APIServices.create(
    "book-appointment/update-appointment",
    data
  );
  return result.data;
}
// export async function getListOfAppointments(data) {
//     const result = await APIServices.create('book-appointment/get-all-appointment', data)
//     return result.data
// }
// export async function getListOfAppointments(data) {
//   const { agentId } = data; // extract agentId from passed data
//   const result = await APIServices.get(
//     `book-appointment/list?agentId=${agentId}`
//   );
//   return result.data;
// }
// export async function getListOfAppointments(data) {
//   const result = await APIServices.get("book-appointment/get-agent-list", data);
//   return result.data;
// }
export async function getListOfAppointments(data, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const result = await APIServices.create(
    "book-appointment/get-agent-list",
    data,
    headers
  );
  return result.data;
}
