import React from "react";

function CompareRatingReviews({ product, index }) {
  return (
    <>
      {product.rating > 0 && (
        <>
     
          <td className="compare-table-data compare-rate-rev" key={index}>
            <div className="comp-rev-rate">
              <div className="custom-product-rate-rev-container">
                <div className="custom-product-rate-rev-subcontainer">
                  <p style={{ color: "white" }}>{Math.round(product.rating)}</p>
                  <i className="fa fa-star"></i>
                </div>
                <span>
                  {product.ratingCount !=0?<>{product.ratingCount} Ratings & </>:"" } 
                  {product.reviewCount !== "null" ? <>{product.reviewCount}Reviews</> : ""}
                  
                </span>
              </div>
            </div>
          </td>
        </>
      )}
    </>
  );
}

export default CompareRatingReviews;
