import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../scss/components/eyeCheckupForm.module.scss";

export default function EyeCheckupForm() {
  const router = useRouter();
  const { id, name, mobile, address } = router.query;

  const [formData, setFormData] = useState({
    id: "",
    patientName: "",
    mobile: "",
    address: "",
    visionLeft: "",
    visionRight: "",
    eyePressure: "",
    lensType: "",
    remarks: "",
  });

  useEffect(() => {
    if (id || name || mobile || address) {
      setFormData((prev) => ({
        ...prev,
        id: id || "",
        patientName: name || "",
        mobile: mobile || "",
        address: address || "",
      }));
    }
  }, [id, name, mobile, address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Eye Checkup Data:", formData);

    // ✅ Example: send data to your backend API
    try {
      const res = await fetch(
        "http://192.168.100.59:4200/api/eye-checkup/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      console.log("Response:", result);
      alert("Eye checkup form submitted successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className={styles.eyeCheckupForm}>
      <h2>Eye Checkup Form</h2>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />

        <div className={styles.formGroup}>
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Other Eye Checkup Fields */}
        {/* <div className={styles.formGroup}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div> */}

        <div className={styles.formGroup}>
          <label>Left Eye Vision</label>
          <input
            type="text"
            name="visionLeft"
            value={formData.visionLeft}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Right Eye Vision</label>
          <input
            type="text"
            name="visionRight"
            value={formData.visionRight}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Eye Pressure</label>
          <input
            type="text"
            name="eyePressure"
            value={formData.eyePressure}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Lens Type</label>
          <input
            type="text"
            name="lensType"
            value={formData.lensType}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.formActions}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
