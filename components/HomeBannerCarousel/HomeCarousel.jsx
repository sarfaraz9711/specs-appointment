import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./HomeCarousel.module.scss";
import DisplayImageWithS3PreSignedUrl from "../elements/AwsS3PreSignedUrl";

export default function HomeCarousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch(
      "http://192.168.100.59:4200/api/banner/bannerList?limit=50&offset=0&keyword=&bannerFor=redchief",
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer U2FsdGVkX18NJn3kgDxQNO3BbuXeeL8OKSWKlVZwWNoHBLeyQFoUZ3/rgEFpzVKEejppQJRoF0Z227UrqqRDjWZMk9VEF5LwviEqc1hoHuEfFXy+RtsSMzPgFgiTVbu+Pre6gHtovHYQzmRchnzRQWE8DQhqBUPki8225SeqouVqaBGwEAkgeresnnpt9Hrx1PwLZlkUTVUXp513y2G09w==",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBanners(data?.data || []);
      })
      .catch((err) => console.error("Banner API Error:", err));
  }, []);

  const getImageUrl = (item) => {
    return `${item.imagePath}${item.image}`;
  };

  return (
    <div className={styles.carouselWrapper}>
      {console.log("banners---->>>>>>>", banners[0]?.image)}
      {banners.length > 0 ? (
        <Carousel fade interval={3000} controls indicators>
          {banners.map((item, i) => (
            <Carousel.Item key={i}>
              <div className={styles.imageContainer}>
                {/* <img
                  className="d-block w-100"
                  src={getImageUrl(item)}
                  alt={`banner-${i}`}
                /> */}
                <DisplayImageWithS3PreSignedUrl
                  styleClass="categoryimage"
                  imageKey={getImageUrl(item)}
                  resizeRequired="NO"
                />

                {/* <div className={styles.overlay}>
                  <h2>{item.title || "Vira Opticals"}</h2>
                  <p>{item.content || "Premium Eyewear Collection"}</p>

                  {item.link ? (
                    <a href={item.link}>
                      <button>Explore</button>
                    </a>
                  ) : null}
                </div> */}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
