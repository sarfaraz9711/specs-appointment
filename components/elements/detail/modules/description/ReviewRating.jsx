import React from "react";

function ReviewRating({ product }) {
  return (

    <>

      {product.rating > 0 ? <>
        <div className="star-rating flex">
          <div className="custom-product-rate-rev-subcontainer">
            <p>{Number(product.rating).toFixed(1)}</p>
            <i className="fa fa-star"></i>
          </div>
          <div className="rat">

            {product.rating && <>
              {product.rating != 0 ? <>{Number(product.ratingCount).toFixed(0)} Ratings </> : ""}
              {product.reviewCount !== "null" && product.reviewCount !== "0" ? <>&  {product.reviewCount} Reviews</> : ""}
            </>

            }

          </div>
        </div>
      </> : <>
        <div className="star-rating flex mt-2">
          <div className="custom-product-rate-rev-subcontainer-none-col">
            <p></p>
            <i className=""></i>
          </div>
          <div className="rat">



          </div>
        </div>


      </>

      }
    </>
  );
};

export default ReviewRating;
