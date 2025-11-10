// import React, { useEffect, useState } from "react";
// import { getListOfAppointments } from "../../api/appointment/appointment";
// import moment from "moment";
// import Router from "next/router";

// export default function ViewAppointments() {
//   const [getListData, setListData] = useState([]);
//   const [getFilterDate, setFilterDate] = useState("");

//   useEffect(() => {
//     getList(new Date());
//   }, []);

//   const getList = async (date) => {
//     setFilterDate(moment(date).format("DD-MM-YYYY"));
//     const json = { appointmentDate: moment(date).format("YYYY-MM-DD") };
//     const result = await getListOfAppointments(json);

//     if (result.status == 200) {
//       setListData(result.data);
//     }
//   };

//   //   const openAppointment = (data) => {
//   //     // Save selected appointment in localStorage
//   //     localStorage.setItem("selectedAppointment", JSON.stringify(data));
//   //     // Navigate to the checkup form page
//   //     Router.push("/appointment/eye-checkup");
//   //   };
//   const openAppointment = (data) => {
//     Router.push({
//       pathname: "/appointment/eye-checkup",
//       query: {
//         id: data.id,
//         name: data.fullName,
//         mobile: data.mobile,
//         address: data.address,
//       },
//     });
//   };

//   return (
//     <div className="container mt-3">
//       <h4>Appointments List ({getFilterDate})</h4>
//       {getListData.length > 0 &&
//         getListData.map((item) => (
//           <div
//             key={item.appointmentId}
//             onClick={() => openAppointment(item)}
//             className="alert alert-success appointment-list mb-3"
//             style={{ cursor: "pointer" }}
//           >
//             <div className="row">
//               <div className="col-md-4">
//                 Appointment Id: {item.appointmentId}
//               </div>
//               <div className="col-md-4">
//                 Appointment Date and Time:{" "}
//                 <strong>
//                   {moment(item.appointmentDate).format("DD-MM-YYYY")},{" "}
//                   {item.appointmentTime}
//                 </strong>
//               </div>
//               <div className="col-md-4 text-right">
//                 Appointment Status: <strong>{item.appointmentStatus}</strong>
//               </div>
//             </div>
//             <div>
//               <div>Name: {item.fullName}</div>
//               <div>Address: {item.address}</div>
//               <div>Mobile: {item.mobile}</div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { getListOfAppointments } from "../../api/appointment/appointment";
import moment from "moment";
import Router from "next/router";

export default function ViewAppointments() {
  const [getListData, setListData] = useState([]);
  const [getFilterDate, setFilterDate] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    // ✅ Check if user is logged in and is an agent
    const userDetails =
      JSON.parse(localStorage.getItem("getUserDetails")) ||
      JSON.parse(localStorage.getItem("spurtUser"));

    if (!userDetails || userDetails.customerType !== 2) {
      // 🚫 Not an agent → not authorized
      setIsAuthorized(false);
      return;
    }

    // ✅ Agent allowed → load list
    getList(new Date());
  }, []);

  const getList = async (date) => {
    setFilterDate(moment(date).format("DD-MM-YYYY"));
    const json = { appointmentDate: moment(date).format("YYYY-MM-DD") };
    const result = await getListOfAppointments(json);

    if (result?.status === 200) {
      setListData(result.data);
    }
  };

  const openAppointment = (data) => {
    // ✅ Pass appointment data via URL query to eye-checkup form
    Router.push({
      pathname: "/appointment/eye-checkup",
      query: {
        id: data.id,
        name: data.fullName,
        mobile: data.mobile,
        address: data.address,
      },
    });
  };

  // 🚫 Unauthorized user view
  if (!isAuthorized) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#333",
        }}
      >
        <h1>404 - Page Not Found</h1>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  // ✅ Authorized agent view
  return (
    <div className="container mt-3">
      <h4>Appointments List ({getFilterDate})</h4>
      {getListData.length > 0 ? (
        getListData.map((item) => (
          <div
            key={item.appointmentId}
            onClick={() => openAppointment(item)}
            className="alert alert-success appointment-list mb-3"
            style={{ cursor: "pointer" }}
          >
            <div className="row">
              <div className="col-md-4">
                Appointment Id: {item.appointmentId}
              </div>
              <div className="col-md-4">
                Appointment Date and Time:{" "}
                <strong>
                  {moment(item.appointmentDate).format("DD-MM-YYYY")},{" "}
                  {item.appointmentTime}
                </strong>
              </div>
              <div className="col-md-4 text-right">
                Appointment Status: <strong>{item.appointmentStatus}</strong>
              </div>
            </div>
            <div>
              <div>Name: {item.fullName}</div>
              <div>Address: {item.address}</div>
              <div>Mobile: {item.mobile}</div>
            </div>
          </div>
        ))
      ) : (
        <p>No appointments found for today.</p>
      )}
    </div>
  );
}
