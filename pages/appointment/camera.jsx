import React, { useEffect, useRef, useState, } from "react";
import { useSelector } from "react-redux";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import {getProductList} from '../../api/appointment/appointment'
import DisplayImageWithS3PreSignedUrl from '../../components/elements/AwsS3PreSignedUrl';
import Router from "next/router";
import ProductWishList from '../../components/elements/products/productWishList';
import { getWishListApi, delWishApiSelect, AddWishlistSelect } from "../../api";
const VirtualSpecsTryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [glassesId, setGlassesId] = useState();
  const glassesImgRef = useRef(null);
  const [getSelect, setSelect] = useState([]);
const [availableSpecs, setAvailableSpecs]=useState([])
let wishListData = useSelector(s => s.wishlist)
  useEffect(()=>{
    getProduct()
    wishList()
  },[])

const getProduct = async ()=>{

  const result = await getProductList()
  setAvailableSpecs(result.data)
  imageDefault(result.data[0])
  console.log(result)
}

const imageDefault = (imageData)=>{
  setGlassesId(imageData.productId)
  const img = new Image();
  console.log(imageData)
  img.src = `${process.env.NEXT_PUBLIC_S3_BUCKET_CF_URL}/${imageData.image}`;
  img.onload = () => {
    glassesImgRef.current = img;
  };
}
  // Preload specs image
  useEffect(() => {

  }, [glassesId]);

  // FaceMesh setup
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      // ✅ Guard against null
      if (results.image) {
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      }
    
      if (
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks.length > 0 &&
        glassesImgRef.current
      ) {
        const landmarks = results.multiFaceLandmarks[0];
        drawSpecs(ctx, landmarks, glassesImgRef.current);
      }
    });
    
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start();
    return () => camera.stop();
  }, []);

  const drawSpecs = (ctx, landmarks, img) => {
    if (!landmarks || !img) return;
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

  const handleSelect = (val) => {
    if(val){
      setSelect(prev => prev.filter(item => item.productId !== glassesId));
      delWishApiSelect(glassesId)
    }else{
      AddWishlistSelect(glassesId)
    const selectedSpec = availableSpecs.find((s) => s.productId === glassesId);
    setSelect((prev) => [...prev, selectedSpec]);
    }
  };

  const wishList = async ()=>{
    const result = await getWishListApi()
    console.log(result)
    setSelect(result.data)
  }


  
const viewProduct = (productSlug)=>{
  Router.push(`/product/${productSlug}`)
}


  return (
    <div className="virtual-specs-container">
      {/* Cart Icon */}
      {/* <div className="cart-icon">
        <span className="cart-emoji">🛒</span>
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div> */}

      <div className="content-wrapper d-flex justify-content-center">
        {/* Left: Specs List */}
        <div className="specs-list">
          <h3>Try Frames</h3>
          {availableSpecs.map((spec) => (
            <div
              key={spec.productId}
              className={`spec-item ${
                glassesId === spec.productId ? "active-spec" : ""
              }`}
              onClick={() => imageDefault(spec)}
            >
               <DisplayImageWithS3PreSignedUrl 
                imageKey={spec.image} 
                resizeRequired="YES" 
                style={{width: '100px'}}
                alt=""
                />
              <p>{spec.name}</p>
              <p>₹{spec.price}</p>
            </div>
          ))}
        </div>

        {/* Right: Try-on Canvas */}
        <div className="canvas-container">
          <video ref={videoRef} autoPlay playsInline className="hidden-video" />
          <canvas ref={canvasRef} width={640} height={480} />
          <button onClick={()=>handleSelect(getSelect.some(item=>item.productId==glassesId))} className={`add-to-cart mb-3 ${getSelect.some(item=>item.productId==glassesId)?'de-select':''}`}>
            {getSelect.some(item=>item.productId==glassesId)?'Deselect':'Select'}
          </button>
          {/* <ProductWishList productId={glassesId} wishListStatus={wishListFunction()}/> */}
        </div>
        <div className="specs-list ml-5">
        <h3>Selected Frames</h3>
            {getSelect.map(spec=>{
                return <>

<div
              key={spec.productId}
              className={`text-center spec-item`}
            >
              
              <DisplayImageWithS3PreSignedUrl 
                imageKey={spec.containerName+spec.image} 
                resizeRequired="YES" 
                style={{width: '100px'}}
                alt=""
                />
              <p>{spec.name} (₹{spec.price})</p>
              <p>
              <input type="button" className="btn btn-primary ml-3" value="View" onClick={()=>viewProduct(spec.productSlug)}/>
              </p>
            </div>

                
                </>
            })}
        </div>
      </div>
    </div>
  );
};

export default VirtualSpecsTryOn;
