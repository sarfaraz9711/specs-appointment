import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { apiUrl } from "../../api/url";
import { addToCartApi } from "../../api";
import DisplayImageWithS3PreSignedUrl from "../../components/elements/AwsS3PreSignedUrl";
import { priceHelpFunc } from "../../components/helper/priceHelper";
import { useDispatch } from "react-redux";
import { cartListApi } from "../../api";

const VirtualSpecsTryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const glassesImgRef = useRef(null);
  const dispatch = useDispatch();

  const [availableSpecs, setAvailableSpecs] = useState([]); // fetched from API
  const [glassesSrc, setGlassesSrc] = useState("");
  const [getSelect, setSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const [buttonLoader, setButtonLoader] = useState(false);

  // ✅ Fetch lenses dynamically from your API
  const fetchLenses = async () => {
    setLoading(true);
    try {
      const limit = 18;
      const offset = 0;
      const response = await fetch(
        `${apiUrl}/list/custom-product-list?limit=${limit}&offset=${offset}&keyword=eyeglass`,
        { method: "GET" }
      );

      const data = await response.json();

      if (data?.data && Array.isArray(data.data)) {
        setAvailableSpecs(data.data);
        if (data.data.length > 0) {
          // Set first product image as default
          setGlassesSrc(`${data.data[0].image}`);
        }
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (err) {
      console.error("Error fetching lenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLenses();
  }, []);

  // ✅ Preload selected specs image
  useEffect(() => {
    if (!glassesSrc) return;
    const img = new Image();
    img.src = glassesSrc;
    img.onload = () => {
      glassesImgRef.current = img;
    };
  }, [glassesSrc]);

  // ✅ Setup FaceMesh
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    if (typeof window !== "undefined") {
      const { FaceMesh } = require("@mediapipe/face_mesh");

      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        selfieMode: true,
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks.length > 0 && glassesImgRef.current) {
          const landmarks = results.multiFaceLandmarks[0];
          drawSpecs(ctx, landmarks, glassesImgRef.current);
        }
      });

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });

      camera.start();
      return () => camera.stop();
    }
  }, []);

  // ✅ Draw virtual specs
  const drawSpecs = (ctx, landmarks, img) => {
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    const eyeDist =
      Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y) *
      ctx.canvas.width;

    const centerX = ((leftEye.x + rightEye.x) / 2) * ctx.canvas.width;
    const centerY = ((leftEye.y + rightEye.y) / 2) * ctx.canvas.height;
    const scale = 1.6;

    ctx.drawImage(
      img,
      centerX - eyeDist * scale * 0.5,
      centerY - eyeDist * scale * 0.17,
      eyeDist * scale,
      eyeDist * scale * 0.3
    );
  };

  const handleAddItemToCart = async (e, spec) => {
    e.preventDefault();

    if (!spec?.productId) return alert("Invalid product ID");

    setCartLoading(true);
    setButtonLoader(true);

    try {
      await addToCartApi(
        spec.productId,
        priceHelpFunc(JSON.parse(spec.price), spec.taxType, spec.taxValue, 0),
        1,
        "",
        "",
        setButtonLoader,
        spec.skuName,
        "new",
        spec.variantId || 0,
        spec.variantName || "",
        spec.categoryName || ""
      );

      await cartListApi(dispatch);

      // alert("Item added to cart successfully!");
      window.location.href = "/account/checkout";
    } catch (err) {
      console.error("Add to cart error:", err);
      // alert("Something went wrong while adding to cart.");
    } finally {
      setCartLoading(false);
      setButtonLoader(false);
    }
  };

  // ✅ Add selected frame
  const handleSelect = () => {
    const selectedSpec = availableSpecs.find(
      (s) => `${s.image}` === glassesSrc
    );
    if (selectedSpec) {
      setSelect((prev) => [...prev, selectedSpec]);
    }
  };

  return (
    <div className="virtual-specs-container">
      <div className="content-wrapper">
        {/* Left side: Frames list */}
        <div className="specs-list">
          <h3>Try Frames</h3>
          {loading ? (
            <p>Loading lenses...</p>
          ) : (
            availableSpecs.map((spec) => (
              <div
                key={spec.productId}
                className={`spec-item ${
                  glassesSrc === `/${spec.image}` ? "active-spec" : ""
                }`}
                onClick={() => setGlassesSrc(`${spec.image}`)}
              >
                {/* <DisplayImageWithS3PreSignedUrl
                  imageKey={`${spec.image}`}
                  resizeRequired="NO"
                  style={{
                    width: "90%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                /> */}
                <div style={{ width: "100" }}>
                  <DisplayImageWithS3PreSignedUrl
                    imageKey={spec.image}
                    resizeRequired="NO"
                  />
                </div>
                <p>{spec.name}</p>
                <p>₹{spec.productSellingPrice}</p>
              </div>
            ))
          )}
        </div>

        {/* Right side: Try-on Canvas */}
        <div className="canvas-container">
          <video ref={videoRef} autoPlay playsInline className="hidden-video" />
          <canvas ref={canvasRef} width={640} height={480} />
          <button onClick={handleSelect} className="add-to-cart">
            Select
          </button>
        </div>

        {/* Bottom section: Selected Frames */}
        <div>
          <h3>Selected Frames</h3>
          {getSelect.length === 0 && <p>No frames selected yet.</p>}

          {getSelect.map((spec) => (
            <div key={spec.productId} className="spec-item">
              {/* <img
                src={`${apiUrl}/uploads/products/${spec.image}`}
                alt={spec.name}
                width="100"
              /> */}
              {/* <DisplayImageWithS3PreSignedUrl
                imageKey={`${spec.image}`}
                resizeRequired="NO"
              /> */}
              <div style={{ width: "100px" }}>
                <DisplayImageWithS3PreSignedUrl
                  imageKey={spec.image}
                  resizeRequired="NO"
                />
              </div>

              <p>{spec.name}</p>
              <p>₹{spec.productSellingPrice}</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "8px",
                  alignItems: "center",
                }}
              >
                {/* ✅ View button — navigates to product detail page */}
                <a
                  title="Quick View"
                  onClick={() =>
                    (window.location.href = `/product/${spec.productSlug}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/static/img/eye.svg"
                    alt="View"
                    className="eye-icon"
                  />
                </a>

                {/* <a
                  title="Go to Cart"
                  onClick={() => (window.location.href = "/account/checkout")}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-shopping-cart"
                    style={{ fontSize: "20px", color: "#333" }}
                  ></i>
                </a> */}
                <a
                  title="Add to cart"
                  onClick={(e) => handleAddItemToCart(e, spec)}
                  style={{ cursor: cartLoading ? "not-allowed" : "pointer" }}
                >
                  <i
                    className="fa fa-shopping-cart"
                    style={{ fontSize: "20px", color: "#333" }}
                  ></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualSpecsTryOn;
