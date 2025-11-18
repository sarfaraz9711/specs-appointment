import React, { useState, useEffect } from "react";
import styles from "./ExpertiseAccordion.module.scss";

export default function ExpertiseAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [items, setItems] = useState([]);

  // Fetch API Data
  useEffect(() => {
    fetch("http://192.168.100.59:4200/api/services/get-all-item", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Expertise API Data:", data);

        if (data?.data && Array.isArray(data.data)) {
          const formatted = data.data
            .filter((i) => i.isActive === 1)
            .map((item) => ({
              title: item.title,
              content: item.content,
            }));

          setItems(formatted);
        }
      })
      .catch((err) => console.error("Error fetching expertise:", err));
  }, []);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Our Expertise</h3>

        {items.length === 0 ? (
          <p>Loading...</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <div className={styles.titleRow} onClick={() => toggle(index)}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.icon}>
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <div className={styles.content}>{item.content}</div>
              )}

              <div className={styles.underline}></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
