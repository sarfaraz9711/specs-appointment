import React, { useEffect, useState } from "react";
import { getListOfAppointments } from "../../api/appointment/appointment";
import moment from "moment";
import Router from "next/router";

export default function ViewAppointments() {
  const [getListData, setListData] = useState([]);
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
    getList(moment().format("YYYY-MM-DD"), user.id);
  }, []);

  const getList = async (date, agentId) => {
    setFilterDate(moment(date).format("YYYY-MM-DD"));
    const json = {
      appointmentDate: moment(date).format("YYYY-MM-DD"),
      agentId: agentId,
    };

    const result = await getListOfAppointments(json);
    if (result?.status === 200) {
      setListData(result.data);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (userDetails) {
      getList(selectedDate, userDetails.id);
    }
  };

  const openAppointment = (data) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h4>Appointments List</h4>

        {/* 📅 Calendar for selecting date */}
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
        <p>No appointments found for this date.</p>
      )}
    </div>
  );
}
