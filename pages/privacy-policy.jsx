import React, { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.100.59:4200/api/pages/get_pagedetails/privacy", {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer U2FsdGVkX19thZAyH8JT67t5babiXOabrmLqxUHZRM8ZHwuJROy8xq2jWq+e20pOjPro1RjNBjRsJ0OyQT+aYNONOZ573Xf5gEFg1W7ecTYPxheRqNXEulQx/mqkSJtd1TAZMqvuj9JlWCXbgOSXpJb509/Ct30duBTC15x+ZOEf70mPMbkrnQMsZ8+5sZqc",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === 1) {
          setTitle(data.data.title);
          setContent(data.data.content);
        }
      })
      .catch((err) => console.error("Privacy Page API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>{title}</h1>

      <div
        style={{ lineHeight: "1.7", fontSize: "16px" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
