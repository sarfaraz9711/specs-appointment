// import React, { useEffect, useState } from "react";
// import { getListOfAppointments } from "../../api/appointment/appointment";
// import moment from "moment";
// import Router from "next/router";

// export default function ViewAppointments() {
//   const [allAppointments, setAllAppointments] = useState([]); // store all data
//   const [filteredAppointments, setFilteredAppointments] = useState([]); // filtered list
//   const [getFilterDate, setFilterDate] = useState(
//     moment().format("YYYY-MM-DD")
//   );
//   const [isAuthorized, setIsAuthorized] = useState(true);
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     const user =
//       JSON.parse(localStorage.getItem("getUserDetails")) ||
//       JSON.parse(localStorage.getItem("spurtUser"));

//     if (!user || user.customerType !== 2) {
//       setIsAuthorized(false);
//       return;
//     }

//     setUserDetails(user);
//     fetchAppointments(moment().format("YYYY-MM-DD"), user.id);
//   }, []);

//   // ✅ Fetch data from API
//   const fetchAppointments = async (date, agentId) => {
//     setFilterDate(moment(date).format("YYYY-MM-DD"));
//     const json = {
//       appointmentDate: moment(date).format("YYYY-MM-DD"),
//       agentId: agentId,
//     };

//     try {
//       const result = await getListOfAppointments(json);

//       if (result?.status === 200) {
//         const data = result.data || [];
//         setAllAppointments(data);

//         // ✅ Local filter by date (in case API doesn’t filter)
//         const filtered = data.filter(
//           (item) =>
//             moment(item.appointmentDate).format("YYYY-MM-DD") ===
//             moment(date).format("YYYY-MM-DD")
//         );
//         setFilteredAppointments(filtered);
//       } else {
//         console.error("Unexpected response:", result);
//         setAllAppointments([]);
//         setFilteredAppointments([]);
//       }
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//       alert("Failed to fetch appointments. Check console/network.");
//       setAllAppointments([]);
//       setFilteredAppointments([]);
//     }
//   };

//   // ✅ On date change → filter locally first, then optionally refetch
//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setFilterDate(selectedDate);

//     // Local filter
//     const filtered = allAppointments.filter(
//       (item) =>
//         moment(item.appointmentDate).format("YYYY-MM-DD") === selectedDate
//     );
//     setFilteredAppointments(filtered);

//     // Also fetch again from API (to stay updated)
//     if (userDetails) {
//       fetchAppointments(selectedDate, userDetails.id);
//     }
//   };

//   // ✅ Open appointment page
//   const openAppointment = (data) => {
//     Router.push({
//       pathname: "/appointment/eye-checkup",
//       query: {
//         id: data.id || data.appointmentId,
//         name: data.fullName,
//         mobile: data.mobile,
//         address: data.address,
//         agentId: data.agentId,
//       },
//     });
//   };

//   if (!isAuthorized) {
//     return (
//       <div
//         style={{
//           height: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "#333",
//         }}
//       >
//         <h1>404 - Page Not Found</h1>
//         <p>You are not authorized to view this page.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-3">
//       {/* Header Section */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <h4>Appointments List</h4>

//         {/* 📅 Date Picker */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <label htmlFor="appointment-date" style={{ fontWeight: "500" }}>
//             Select Date:
//           </label>
//           <input
//             id="appointment-date"
//             type="date"
//             value={getFilterDate}
//             onChange={handleDateChange}
//             style={{
//               padding: "6px 10px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               cursor: "pointer",
//             }}
//           />
//         </div>
//       </div>

//       {/* Appointment List */}
//       {filteredAppointments.length > 0 ? (
//         filteredAppointments.map((item) => (
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
//         ))
//       ) : (
//         <p>No appointments found for this date.</p>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { getListOfAppointments } from "../../api/appointment/appointment";
import moment from "moment";
import Router from "next/router";

export default function ViewAppointments() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [getFilterDate, setFilterDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("getUserDetails")) ||
      JSON.parse(localStorage.getItem("spurtUser"));

    if (!user || user.customerType !== 2) {
      setIsAuthorized(false);
      return;
    }

    setUserDetails(user);
    fetchAppointments(moment().format("YYYY-MM-DD"), user.id);
  }, []);

  // ✅ Fetch appointments from API
  const fetchAppointments = async (date, agentId) => {
    const json = {
      appointmentDate: moment(date).format("YYYY-MM-DD"),
      // agentId: agentId,
    };

    try {
      const token =
        "U2FsdGVkX1/CEtWCDe/RBo3+FGw46izsCkIMOBE7mUom1RCcFfzBQe4NRNaSOcn2tSIBn13majolRkj248TI0bijjsLgRMuqA/iiAw4KnHTOEAHLROpLhxWkyv7hbt71feoKGzXk2ZZdKjUEzIyEzYQpkYmb6B8Ny3cr7dJoeV+cgwurY6VoHo0BjL48y5Az";

      const result = await getListOfAppointments(json, token);

      if (result?.status === 200) {
        const data = result.data || [];
        setAllAppointments(data);

        // Filter by selected date
        const filtered = data.filter(
          (item) =>
            moment(item.appointmentDate).format("YYYY-MM-DD") ===
            moment(date).format("YYYY-MM-DD")
        );
        setFilteredAppointments(filtered);
      } else {
        console.error("Unexpected response:", result);
        setAllAppointments([]);
        setFilteredAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments. Check console/network.");
      setAllAppointments([]);
      setFilteredAppointments([]);
    }
  };

  // ✅ Handle date filter change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    // Local filter first
    const filtered = allAppointments.filter(
      (item) =>
        moment(item.appointmentDate).format("YYYY-MM-DD") === selectedDate
    );
    setFilteredAppointments(filtered);

    // Also fetch latest from API
    if (userDetails) {
      fetchAppointments(selectedDate, userDetails.id);
    }
  };

  // ✅ Open Eye Checkup form
  const openAppointment = (data) => {
    Router.push({
      pathname: "/appointment/eye-checkup",
      query: {
        id: data.id || data.appointmentId,
        name: data.fullName,
        mobile: data.mobile,
        address: data.address,
        agentId: data.agentId,
      },
    });
  };

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

  return (
    <div className="container mt-3">
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h4>Appointments List</h4>

        {/* 📅 Date Picker */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="appointment-date" style={{ fontWeight: "500" }}>
            Select Date:
          </label>
          <input
            id="appointment-date"
            type="date"
            value={getFilterDate}
            onChange={handleDateChange}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Appointment List */}
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((item) => (
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
        <p>No appointments found for this date.</p>
      )}
    </div>
  );
}
