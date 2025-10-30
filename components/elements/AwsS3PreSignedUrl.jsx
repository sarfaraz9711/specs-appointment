import React from "react";

const DisplayImageWithS3PreSignedUrl = ({
  imageKey,
  style,
  resizeRequired = "NO",
  styleClass,
  alt = "Red chief",
}) => {
  return resizeRequired == "YES" ? (
    <img
      className={styleClass}
      src={process.env.NEXT_PUBLIC_S3_BUCKET_CF_URL + "/" + imageKey}
      alt={alt}
      style={style}
    />
  ) : (
    <img
      className={styleClass}
      src={process.env.NEXT_PUBLIC_S3_BUCKET_CF_URL + "/" + imageKey}
      alt={alt}
      style={style}
    />
  );
  // <img src='static/img/mans_bags.jpg'/>
};

export default DisplayImageWithS3PreSignedUrl;
