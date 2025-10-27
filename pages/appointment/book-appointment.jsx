import React, { useState, useEffect } from "react";
import { appointmentDetails, bookAppointment, getAppointmentByUser, checkAppointment, updateAppointment } from "../../api/appointment/appointment";
import moment from "moment";
import { useSelector } from "react-redux";
import { Modal } from 'react-bootstrap'
export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({show:false, message:'', class:''});
  const [getSlotAvailableMsg, setSlotAvailableMsg] = useState(false);
  const [days, setDays] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [allSlots, setAllSlots] = useState([]);
  const [getNextAppointment, setNextAppointment] = useState({});
  const [getSlotAavailableData, setSlotAavailableData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [getPreviousTimeSlot, setPreviousTimeSlot] = useState(false)
    const userData = useSelector((s) => s.auth.userData);
  const [getUserDetails, setUserDetails]=useState({})
  const [getAppointmentRegister, setAppointmentRegister]=useState(false)
  const [getMobileNo, setMobileNo]=useState('')
  const [sentOtp, setSentOtp]=useState(false)
  const [getOtp, setOtp]=useState('')
  const [getInvalidOtp, setInvalidOtp]=useState(false)
  const [getOtpResendTime, setOtpResendTime]=useState(60)
  const [getResendTimeActive, setResendTimeActive]=useState(false)
  const [getAddAddressPopup, setAddAddressPopup]=useState(false)
  const [getAddressName, setAddressName]=useState('')
  const [getAddressMobile, setAddressMobile]=useState('')
  const [getAddAddress, setAddAddress]=useState('')
  useEffect(() => {
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    getCalenderData(todayDate);
    let userDetails = {}
    if(Object.keys(userData).length >0){
      setUserDetails(userData)
      userDetails=userData
    }else{
      setUserDetails(JSON.parse(localStorage.getItem('spurtUser')))
      userDetails=JSON.parse(localStorage.getItem('spurtUser'))
    }
    getAppointment(userDetails)
  }, []);


  const getAppointment = async (userDetails)=>{
    console.log(userDetails)
    const json= {mobile: userDetails.mobileNumber}
    const result = await getAppointmentByUser(json)
    if(result.status==200){
    setNextAppointment(result.data)
    }else{
        setNextAppointment(null)
    }
console.log(result)
  }
  const getCalenderData = async (date) => {
    const json = { findDate: date };
    const result = await appointmentDetails(json);
    if (result.status == 200) {
      const calendarData = result.data;
      const arr = [];
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const bookedDates =
        calendarData.bookingNotAllowedDays &&
        calendarData.bookingNotAllowedDays.split(",");

      setAllSlots(buildSlots(calendarData.startTime, calendarData.endTime));
      setSelectedDate(date);

      setBookedSlots({
        [calendarData.bookedDate]:
          calendarData.bookedSlot &&
          calendarData.bookedSlot.split(","),
      });

      for (let i = 0; i < calendarData.calendarPeriod; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        const iso = toYMD(d);

        let label;
        if (i === 0) label = "Today";
        else if (i === 1) label = "Tomorrow";
        else label = d.toLocaleDateString(undefined, { weekday: "short" });

        const formattedDate = formatDMY(d);
        const isBooked = bookedDates && bookedDates.includes(iso);

        arr.push({ iso, label, formattedDate, isBooked });
      }
      setDays(arr);
    }
  };

  // Helpers
  const toYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const formatDMY = (d) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Build slots
  const buildSlots = (startTime, endTime) => {
    const slots = [];
    let start = new Date();
    start.setHours(startTime, 0, 0, 0);
    const end = new Date();
    end.setHours(endTime, 0, 0, 0);

    while (start < end) {
      const h = start.getHours();
      const m = start.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const label = `${String(hour12).padStart(2, "0")}:${m === 0 ? "00" : m} ${ampm}`;
      slots.push(label);
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  };
  const isPastSlot = (slot, slotDate) => {
    // slotDate = date of that slot (e.g. "2025-09-12")
    const now = new Date();
  
    // Check if slotDate is today
    const today = now.toISOString().split("T")[0];
    if (slotDate !== today) {
      return false; // future/past days -> never disable
    }
  
    // Parse "hh:mm AM/PM"
    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    const slotMinutes = hours * 60 + minutes;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
    return slotMinutes < currentMinutes; // disable only strictly past slots
  };
  
  

  const handleDateClick = (iso, isBooked) => {
    if (isBooked) return;
    setSelectedDate(iso);
    getCalenderData(iso);
    setSelectedSlot(null);
    setMessage({show:false, message:'', class:''});
    setSlotAvailableMsg(false)
  };

const openMobileEnter = async ()=>{
  if(!localStorage.getItem('spurtToken')){
        
    setAppointmentRegister(true)
    setSentOtp(false)
    setInvalidOtp(false)
    setOtp('')
    return
  }else{
    handleBook()
  }
}

const sendOtp = async ()=>{
setSentOtp(true)
let a = 60
const b = 1
setResendTimeActive(true)
const x = setInterval(() => {
  const  c = a-b
    a=c
    if (a == 0) {
        clearInterval(x);
        setResendTimeActive(false)
      }
      setOtpResendTime(a)
}, 1000);
}

const VerifyOtp = async ()=>{
  if(getOtp==111111){
    setAddAddressPopup(true)
    setSentOtp(false)
    setAppointmentRegister(false)
  }else{

    setInvalidOtp(true)
  }
}

const enterOtp = async (value)=>{
  setOtp(value)
}

const enterMobile = async(value)=>{
  if(value.length<=10){
  setMobileNo(value)
  }else{
    return false
  }
  
}

const setDetails = (key, val)=>{
  console.log(key, val)
  if(key=='name'){
    setAddressName(val)
  }
  if(key=='mobile'){
    setAddressMobile(val)
  }
  if(key=='address'){
    setAddAddress(val)
  }
  
}

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) return;
    setLoading(true);
    setMessage({show:false, message:'', class:''});

    try {
      const json = {
        appointmentDate: selectedDate,
        appointmentTime: selectedSlot,
        mobile: getUserDetails.mobileNumber,
        fullName:`${getUserDetails.firstName} ${getUserDetails.lastName}`,
        address: `${getAddressName} ${getAddressMobile} ${getAddAddress}`,
        appointmentStatus: "Pending",
        isActive: 1,
        userId: getUserDetails.id,
        remarks: "submit by user",
      };

       await bookAppointment(json);

      const displayDate = formatDMY(new Date(selectedDate));
      getCalenderData(selectedDate);
      setSelectedSlot(null);
      setMessage({show:true, message:`✅ Appointment booked for ${displayDate} at ${selectedSlot}`, class:'alert alert-success'});
      getAppointment(getUserDetails)
      setAddAddressPopup(false)
    } catch (err) {
        
      setMessage({show:true, message:`❌ Failed to book appointment. Try again.`, class:'alert alert-danger'});
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectAppointmentTime = async (slot)=>{
    const checkPastSlot = isPastSlot(slot, selectedDate)
    console.log(checkPastSlot)
    
    setMessage({show:false, message:``, class:''});
    if(!checkPastSlot){
    const json = {appointmentDate:selectedDate, mobile:getUserDetails.mobileNumber}
    const result = await checkAppointment(json)
    console.log(result)
    setSelectedSlot(slot)
    if(result.status==200){
    setSlotAvailableMsg(false)
    }else{
        setSlotAvailableMsg(true)
        setSlotAavailableData(result.data)
    }
    setPreviousTimeSlot(false)
}else{
    setPreviousTimeSlot(true)
}
  }

  const updateAppointmentFun = async (val)=>{
    getSlotAavailableData.appointmentTime=selectedSlot
    let json={};
    const displayDate = formatDMY(new Date(selectedDate));
    if(val==1){
        json.appointmentTime=selectedSlot
        json.id=getSlotAavailableData.id
        setMessage({show:true, message:`✅ Your appointment has been updated to ${displayDate} at ${selectedSlot}`, class:'alert alert-success'});
    }else{
        json.isActive=0
        json.id=getNextAppointment.id
        setMessage({show:true, message:'✅ Your appointment has been Cancelled', class:'alert alert-success'});
    }
    console.log(json)
    const result = await updateAppointment(json)
    await getAppointment(getUserDetails)
    setModalOpen(false)
    setCancelModalOpen(false)
    getCalenderData(getSlotAavailableData.appointmentDate);
    setSlotAvailableMsg(false)
    setSelectedSlot(null);
    
  }
  return (
   <> <div className="appointment-container">

{getNextAppointment && <div className="appointment-alert">
Hi {getUserDetails.firstName}, Your next appointment is on { moment(getNextAppointment?.appointmentDate).format('DD-MM-YYYY')} at {getNextAppointment?.appointmentTime}.
<input type="button" value='Cancel Appointment' className="btn btn-primary" onClick={()=>{setCancelModalOpen(true)}}/>
</div>}
      {/* Dates */}
      <h3>Select Appointment Date</h3>
      <div className="date-grid">
        {days.map((d) => {
          const isSelected = selectedDate === d.iso;
          return (
            <button
              key={d.iso}
              onClick={() => handleDateClick(d.iso, d.isBooked)}
              disabled={d.isBooked}
              className={`date-block ${isSelected ? "selected" : ""} ${
                d.isBooked ? "booked" : ""
              }`}
            >
              <div className="label">{d.label}</div>
              <div className="date">{d.formattedDate}</div>
              {d.isBooked && (
                <div className="booked-tag">Booking not allowed</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Slots */}
      {selectedDate && (
        <div className="slots-container">
          <h3>
            Available Slots for{" "}
            {days.find((d) => d.iso === selectedDate)?.label} (
            {formatDMY(new Date(selectedDate))})
          </h3>
          <div className="slots">
            {allSlots.map((slot) => {
              const isTaken =
                bookedSlots[selectedDate]?.includes(slot) ?? false;
              const isChosen = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  disabled={isTaken || isPastSlot(slot, selectedDate)}
                  onClick={() => selectAppointmentTime(slot)}
                  className={`slot-btn ${isTaken || isPastSlot(slot, selectedDate) ? "slot-booked" : ""} ${
                    isChosen ? "slot-selected" : ""
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

{getSlotAvailableMsg && <div className="alert alert-warning d-flex justify-content-between mt-3">You have already an appointment on this date {moment(getSlotAavailableData.appointmentDate).format('DD-MM-YYYY')} at {getSlotAavailableData.appointmentTime} <input type="button" value='Update Appointment' onClick={()=>{setModalOpen(true)}} className="btn btn-primary" /></div>}


{getPreviousTimeSlot && <div className="alert alert-danger mt-3">Selected time cannot be earlier than the current time.</div>}

      {/* Book Button */}
      {!message.show && !getSlotAvailableMsg && selectedDate && selectedSlot && (
        <div className="book-section">
          <button
            onClick={openMobileEnter}
            disabled={loading}
            className="book-btn"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      )}

      {/* Status message */}
      {message.show && <p className={`${message.class} mt-5`}>{message.message}</p>}
    </div>
    <Modal className='order-confirm-box' show={isModalOpen}>
            <Modal.Header>
            <h4>Update Appointment</h4>
            </Modal.Header>
            <Modal.Body>
            <div className='order-confirm-body'>
            <p>Your appointment is currently scheduled for {getSlotAavailableData.appointmentTime}. Do you want to reschedule it to {selectedSlot}?</p>
            <div className='action-btns'>
                <button  className='cancel-btn' onClick={()=>setModalOpen(false)}>Close</button>
                <button className='proceed-btn' onClick={()=>updateAppointmentFun(1)}>Update</button>
            </div>
            </div>
            </Modal.Body>
            </Modal>
            
    <Modal className='order-confirm-box' show={cancelModalOpen}>
            <Modal.Header>
            <h4>Cancel Appointment</h4>
            </Modal.Header>
            <Modal.Body>
            <div className='order-confirm-body'>
            <p>Are you sure you want to cancel your appointment on {moment(getNextAppointment?.appointmentDate).format('DD-MM-YYYY')} at {getNextAppointment?.appointmentTime}?</p>
            <div className='action-btns'>
                <button  className='cancel-btn' onClick={()=>setCancelModalOpen(false)}>Close</button>
                <button className='proceed-btn' onClick={()=>updateAppointmentFun(2)}>Submit</button>
            </div>
            </div>
            </Modal.Body>
            </Modal>

            <Modal className='order-confirm-box' show={getAppointmentRegister}>
            <Modal.Header>
            <h4>Appointment Confirmation</h4>
            </Modal.Header>
            <Modal.Body>
            <div className='order-confirm-body'>
            <p>
<label>Mobile No</label>
<div className="p-relative">
<div><input disabled={sentOtp} type="number" value={getMobileNo} placeholder="Enter Mobile Number" className="form-control" onChange={(e)=>enterMobile(e.target.value)}/>
{sentOtp &&<div className="otp-color">OTP Sent on above number</div>}
</div>
{sentOtp && <i className="fa fa-edit edit-icon" onClick={()=>setSentOtp(false)}/>}
</div>
{sentOtp && <div className="p-relative"><input type="number" value={getOtp} placeholder="Enter OTP" className="form-control mt-3" onChange={(e)=>enterOtp(e.target.value)}/>
{(sentOtp) && <input className={`resend-otp ${getResendTimeActive?'':'btn btn-primary'}`} disabled={getResendTimeActive} type="button" value={`OTP Resend${getResendTimeActive?`(${getOtpResendTime})`:''}`}/>}</div>
}
{getInvalidOtp && <div className="alert alert-danger">OTP is invalid. Please try again!</div>}
            </p>
            <div className='action-btns'>
                <button  className='cancel-btn' onClick={()=>{setAppointmentRegister(false); setMobileNo('')}}>Close</button>
                {!sentOtp && <button className='proceed-btn' onClick={()=>sendOtp()}>Send OTP</button>}
                {sentOtp && <button className='proceed-btn' onClick={()=>VerifyOtp()}>Verify OTP</button>}
            </div>
            </div>
            </Modal.Body>
            </Modal>

            <Modal className='order-confirm-box' show={getAddAddressPopup}>
            <Modal.Header>
            <h4>Add Address for appointment</h4>
            </Modal.Header>
            <Modal.Body>
            <div className='order-confirm-body'>
              <div className="alert alert-success text-center">OTP verified successfully for mobile number {getMobileNo}</div>
              <div className="row">
            <div className="col-md-6 mb-3">
            <label>Name</label>
            <input className="form-control" type="text" onChange={e=>(setDetails('name',e.target.value))}/>
            </div>
            <div className="col-md-6 mb-3">
            <label>Mobile</label>
            <input className="form-control" type="number" onChange={e=>(setDetails('mobile',e.target.value))}/>
            </div>
            <div className="col-md-12 mb-3">
            <label>Address</label>
            <textarea className="form-control" onChange={e=>(setDetails('address',e.target.value))}></textarea>
            </div>
            </div>
            <div className='action-btns'>
                <button  className='cancel-btn' onClick={()=>setAddAddressPopup(false)}>Close</button>
                <button className='proceed-btn' onClick={()=>handleBook()}>Submit</button>
            </div>
            </div>
            </Modal.Body>
            </Modal>
         </>
  );
}
