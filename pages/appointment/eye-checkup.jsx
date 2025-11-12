import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../scss/components/eyeCheckupForm.module.scss";
import { updateAppointment } from "../../api/appointment/appointment";
import { toast, ToastContainer } from "react-toastify";

export default function EyeCheckupForm() {
  const router = useRouter();
  const { id, name, mobile, address, agentId } = router.query;

  const [formData, setFormData] = useState({
    id: "",
    visionLeft: "",
    visionRight: "",
    eyePressure: "",
    lensType: "",
    remarks: "",
    appointmentStatus: "Visited",
  });

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    mobile: "",
    address: "",
    agentId: "",
  });

  useEffect(() => {
    if (id || name || mobile || address || agentId) {
      setFormData((prev) => ({
        ...prev,
        id: id || "",
      }));

      setPatientDetails({
        name: name || "",
        mobile: mobile || "",
        address: address || "",
        agentId: agentId || "",
      });
    }
  }, [id, name, mobile, address, agentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" || value === null || value === undefined) {
        toast.warn(`⚠️ Please fill out the "${key}" field before submitting.`);
        return;
      }
    }

    const payload = {
      id: formData.id,
      visionLeft: formData.visionLeft,
      visionRight: formData.visionRight,
      eyePressure: formData.eyePressure,
      lensType: formData.lensType,
      remarks: formData.remarks,
      appointmentStatus: formData.appointmentStatus,
    };

    console.log("➡️ Sending Payload:", payload);

    try {
      const result = await updateAppointment(payload);
      console.log("✅ API Response:", result);

      if (result?.status === 200 || result?.status === "success") {
        toast.success("✅ Eye checkup details updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          router.push("/appointment/view-appointments");
        }, 2500);
      } else {
        toast.error("❌ Failed to update appointment.");
      }
    } catch (error) {
      console.error("Error while updating appointment:", error);
      toast.error("⚠️ Error updating appointment. Please try again.");
    }
  };

  return (
    <div className={styles.eyeCheckupForm}>
      <ToastContainer />
      <h2>Eye Checkup Form</h2>

      <form onSubmit={handleSubmit}>
        {/* 🔹 Read-only patient details */}
        <div className={styles.formGroup}>
          <label>Patient Name</label>
          <input type="text" value={patientDetails.name} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input type="text" value={patientDetails.mobile} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label>Address</label>
          <textarea value={patientDetails.address} readOnly></textarea>
        </div>

        {/* 🔹 Editable fields */}
        <div className={styles.formGroup}>
          <label>Left Eye Vision *</label>
          <input
            type="text"
            name="visionLeft"
            value={formData.visionLeft}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Right Eye Vision *</label>
          <input
            type="text"
            name="visionRight"
            value={formData.visionRight}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Eye Pressure *</label>
          <input
            type="text"
            name="eyePressure"
            value={formData.eyePressure}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Lens Type *</label>
          <input
            type="text"
            name="lensType"
            value={formData.lensType}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Remarks *</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Appointment Status *</label>
          <select
            name="appointmentStatus"
            value={formData.appointmentStatus}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="Visited">Visited</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit">Update Appointment</button>
        </div>
      </form>
    </div>
  );
}
