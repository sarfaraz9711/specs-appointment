import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../scss/components/eyeCheckupForm.module.scss";

export default function EyeCheckupForm() {
  const router = useRouter();
  const { id, name, mobile, address } = router.query;

  const [formData, setFormData] = useState({
    appointmentId: "",
    patientName: "",
    mobile: "",
    address: "",
    age: "",
    gender: "",
    visionLeft: "",
    visionRight: "",
    eyePressure: "",
    lensType: "",
    remarks: "",
  });

  // Prefill form when appointment data arrives
  useEffect(() => {
    if (id || name || mobile || address) {
      setFormData((prev) => ({
        ...prev,
        appointmentId: id || "",
        patientName: name || "",
        mobile: mobile || "",
        address: address || "",
      }));
    }
  }, [id, name, mobile, address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Eye Checkup Data:", formData);
    // 👉 TODO: Call your API to save form data
  };

  return (
    <div className={styles.eyeCheckupForm}>
      <h2>Eye Checkup Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Hidden appointment ID */}
        <input
          type="hidden"
          name="appointmentId"
          value={formData.appointmentId}
        />

        {/* Patient Name */}
        <div className={styles.formGroup}>
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>

        {/* Mobile Number */}
        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label>Address</label>
          <textarea
            name="address"
            rows="2"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Age */}
        <div className={styles.formGroup}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Left Eye Vision */}
        <div className={styles.formGroup}>
          <label>Left Eye Vision</label>
          <input
            type="text"
            name="visionLeft"
            value={formData.visionLeft}
            onChange={handleChange}
          />
        </div>

        {/* Right Eye Vision */}
        <div className={styles.formGroup}>
          <label>Right Eye Vision</label>
          <input
            type="text"
            name="visionRight"
            value={formData.visionRight}
            onChange={handleChange}
          />
        </div>

        {/* Eye Pressure */}
        <div className={styles.formGroup}>
          <label>Eye Pressure</label>
          <input
            type="text"
            name="eyePressure"
            value={formData.eyePressure}
            onChange={handleChange}
          />
        </div>

        {/* Lens Type */}
        <div className={styles.formGroup}>
          <label>Lens Type</label>
          <input
            type="text"
            name="lensType"
            value={formData.lensType}
            onChange={handleChange}
          />
        </div>

        {/* Doctor Remarks */}
        <div className={styles.formGroup}>
          <label>Doctor Remarks</label>
          <textarea
            name="remarks"
            rows="3"
            value={formData.remarks}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit & Reset */}
        <div className={styles.formActions}>
          <button type="submit">Submit</button>
          <button type="reset" className="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
