import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";

const availableSpecs = [
  {
    id: 1,
    name: "Classic Black",
    src: "/static/img/glasses1.png",
    price: 1200,
  },
  { id: 2, name: "Retro Brown", src: "/static/img/glasses2.png", price: 1500 },
  { id: 3, name: "Modern Blue", src: "/static/img/glasses3.png", price: 1800 },
  { id: 4, name: "New Angel", src: "/static/img/angel.png", price: 1000 },
];

const VirtualSpecsTryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [glassesSrc, setGlassesSrc] = useState(availableSpecs[0].src);
  const glassesImgRef = useRef(null);
  const [getSelect, setSelect] = useState([]);

  // Preload specs image
  useEffect(() => {
    const img = new Image();
    img.src = glassesSrc;
    img.onload = () => {
      glassesImgRef.current = img;
    };
  }, [glassesSrc]);

  // FaceMesh setup
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

  const handleSelect = () => {
    const selectedSpec = availableSpecs.find((s) => s.src === glassesSrc);
    setSelect((prev) => [...prev, selectedSpec]);
  };

  return (
    <div className="virtual-specs-container">
      {/* Cart Icon */}
      {/* <div className="cart-icon">
        <span className="cart-emoji">🛒</span>
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div> */}

      <div className="content-wrapper">
        {/* Left: Specs List */}
        <div className="specs-list">
          <h3>Try Frames</h3>
          {availableSpecs.map((spec) => (
            <div
              key={spec.id}
              className={`spec-item ${
                glassesSrc === spec.src ? "active-spec" : ""
              }`}
              onClick={() => setGlassesSrc(spec.src)}
            >
              <img src={spec.src} alt={spec.name} width="100" />
              <p>{spec.name}</p>
              <p>₹{spec.price}</p>
            </div>
          ))}
        </div>

        {/* Right: Try-on Canvas */}
        <div className="canvas-container">
          <video ref={videoRef} autoPlay playsInline className="hidden-video" />
          <canvas ref={canvasRef} width={640} height={480} />
          <button onClick={handleSelect} className="add-to-cart">
            Select
          </button>
        </div>
        <div className="">
          <h3>Selected Frames</h3>
          {getSelect.map((spec) => {
            return (
              <>
                <div
                  key={spec.id}
                  className={`spec-item ${
                    glassesSrc === spec.src ? "active-spec" : ""
                  }`}
                >
                  <img src={spec.src} alt={spec.name} width="100" />
                  <p>{spec.name}</p>
                  <p>₹{spec.price}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualSpecsTryOn;
