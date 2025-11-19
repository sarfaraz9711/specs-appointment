import React, { useState, useEffect } from "react";
import styles from "./PatientStories.module.scss";

export default function PatientStories() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    fetch("http://192.168.100.59:4200/api/feedback-patient/feedback-list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API data:feedback--->>>>>", data);
        if (data?.data?.length) {
          const formatted = data.data
            .filter((item) => item.isActive === 1)
            .map((item) => ({
              quote: item.feedback,
              name: item.name,
              location: item.address,
            }));

          setTestimonials(formatted);
        }
      })
      .catch((err) => console.error("Feedback API Error:", err));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const autoSlide = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [index, testimonials]);

  const prev = () => {
    setFade(true);
    setTimeout(() => {
      setIndex(index === 0 ? testimonials.length - 1 : index - 1);
      setFade(false);
    }, 300);
  };

  const next = () => {
    setFade(true);
    setTimeout(() => {
      setIndex(index === testimonials.length - 1 ? 0 : index + 1);
      setFade(false);
    }, 300);
  };

  if (testimonials.length === 0) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  const current = testimonials[index];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Patient Stories</h2>
        </div>

        <div className={styles.right}>
          <div className={styles.reviewBox}>
            <span className={styles.leftArrow} onClick={prev}>
              &#10094;
            </span>

            <div
              className={`${styles.textContent} ${
                fade ? styles.fadeOut : styles.fadeIn
              }`}
            >
              <p className={styles.quote}>"{current.quote}"</p>
              <p className={styles.author}>
                {current.name}, {current.location}
              </p>
            </div>

            <span className={styles.rightArrow} onClick={next}>
              &#10095;
            </span>
          </div>

          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === index ? styles.active : ""}`}
                onClick={() => setIndex(i)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
