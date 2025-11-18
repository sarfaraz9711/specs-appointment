// import React, { useState } from "react";
// import styles from "./PatientStories.module.scss";

// export default function PatientStories() {
//   const testimonials = [
//     {
//       quote:
//         "The LASIK procedure was quick, and my vision has never been better. It’s truly transformed my daily life!",
//       name: "Kevin Schuster",
//       location: "Westwood Park",
//     },
//     {
//       quote:
//         "Amazing staff and exceptional service! I finally found eyewear that fits perfectly.",
//       name: "Riya Sharma",
//       location: "Delhi",
//     },
//     {
//       quote:
//         "Their eye checkup was accurate and professional. Highly recommended!",
//       name: "Amit Verma",
//       location: "Bangalore",
//     },
//   ];

//   const [index, setIndex] = useState(0);

//   const prev = () => {
//     setIndex(index === 0 ? testimonials.length - 1 : index - 1);
//   };

//   const next = () => {
//     setIndex(index === testimonials.length - 1 ? 0 : index + 1);
//   };

//   const current = testimonials[index];

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <div className={styles.left}>
//           <h2>Patient Stories</h2>
//         </div>

//         <div className={styles.right}>
//           <div className={styles.reviewBox}>
//             <span className={styles.leftArrow} onClick={prev}>
//               &#10094;
//             </span>

//             <div className={styles.textContent}>
//               <p className={styles.quote}>"{current.quote}"</p>
//               <p className={styles.author}>
//                 {current.name}, {current.location}
//               </p>
//             </div>

//             <span className={styles.rightArrow} onClick={next}>
//               &#10095;
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import styles from "./PatientStories.module.scss";

export default function PatientStories() {
  const testimonials = [
    {
      quote:
        "The LASIK procedure was quick, and my vision has never been better. It’s truly transformed my daily life!",
      name: "Kevin Schuster",
      location: "Westwood Park",
    },
    {
      quote:
        "Amazing staff and exceptional service! I finally found eyewear that fits perfectly.",
      name: "Riya Sharma",
      location: "Delhi",
    },
    {
      quote:
        "Their eye checkup was accurate and professional. Highly recommended!",
      name: "Amit Verma",
      location: "Bangalore",
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

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

  const current = testimonials[index];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT TITLE SECTION */}
        <div className={styles.left}>
          <h2>Patient Stories</h2>
        </div>

        {/* RIGHT CAROUSEL SECTION */}
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

          {/* Slider Dots */}
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
