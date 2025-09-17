import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { productRatingCountStarApi } from "../../../../../api/product/RatingReviewsApi";

function ProductReviewRatingviews({ product, starcout }) {
  const [starcoutid, setStarcoutid] = useState("")
  useEffect(() => {
    productRatingCountStarApi(product.productId, setStarcoutid)
  }, [])
  return (
    <>
      {product.rating && product.ratingCount > 0 && <>

        <div className="custom-product-rate-rev">
          <div className="star-rating flex">
            <div className="dd">
              <div className="dd-a">

                <div className="custom-product-rate-rev-subcontainer">
                  <p>{Number(product.rating).toFixed(1)}</p>
                  <i className="fa fa-star"></i>
                </div>
              </div>
              <input type="checkbox" />
              <div className="dd-c">
                <div className="flex star-count">
                  <div className="strlist flex">
                    <Rate
                      allowHalf
                      defaultValue={Number(product.rating).toFixed(1)}
                      disabled={true}
                    />

                  </div>
                  <h3>{Number(product.rating)} out of 5</h3>
                </div>

                <div className="str-rat">
                  {product.ratingCount != 0 ? (
                    <>{product.ratingCount} Ratings  </>
                  ) : (
                    ""
                  )}
                </div>
                {starcoutid && starcoutid.starsCount && (
                  <>
                    <div className="str-cnt-rw flex">
                      <h5>5 Star</h5>

                      <div className="str-cnt-bg">
                        <span
                          className={`w${starcoutid.starsCount.fiveStar}0`}
                        ></span>
                      </div>
                      <p>{starcoutid.starsCount.fiveStar}</p>
                    </div>
                    <div className="str-cnt-rw flex">
                      <h5>4 Star</h5>
                      <div className="str-cnt-bg">
                        <span
                          className={`w${starcoutid.starsCount.fourStar}0`}
                        ></span>
                      </div>
                      <p>{starcoutid.starsCount.fourStar}</p>
                    </div>
                    <div className="str-cnt-rw flex">
                      <h5>3 Star</h5>
                      <div className="str-cnt-bg">
                        <span
                          className={`w${starcoutid.starsCount.threeStar}0`}
                        ></span>
                      </div>
                      <p>{starcoutid.starsCount.threeStar}</p>
                    </div>
                    <div className="str-cnt-rw flex">
                      <h5>2 Star</h5>
                      <div className="str-cnt-bg">
                        <span
                          className={`w${starcoutid.starsCount.twoStar}0`}
                        ></span>
                      </div>
                      <p>{starcoutid.starsCount.twoStar}</p>
                    </div>
                    <div className="str-cnt-rw flex">
                      <h5>1 Star</h5>
                      <div className="str-cnt-bg">
                        <span
                          className={`w${starcoutid.starsCount.oneStar}0`}
                        ></span>
                      </div>
                      <p>{starcoutid.starsCount.oneStar}</p>
                    </div>
                  </>
                )}

              </div>
            </div>
            <div className="rat">
              {product.rating != 0 ? (
                <>{Number(product.ratingCount).toFixed(0)} Ratings </>
              ) : (
                ""
              )}{" "}
              {product.reviewCount !== "null" ? (
                <> & {product.reviewCount} Reviews</>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* <div className="custom-product-rate-rev">
      
                   <div className="star-rating flex">
                       <div className="dd">
                           <div className="dd-a">
                           {console.log(product,"bala42erw444")}
                               <div className="custom-product-rate-rev-subcontainer">
                                   <p>{Number(product.rating).toFixed(1)}</p>
                                   <i className="fa fa-star"></i>
                               </div>
                           </div>
                           <input type="checkbox" />
                           <div className="dd-c">

                               <div className="flex star-count">
                                   <div className="strlist flex">
                                       {console.log()}
                                   <Rate allowHalf defaultValue={Number(product.rating).toFixed(1)} disabled={true} />
                                     
                                   </div>
                                   <h3>{Number(product.rating).toFixed(1)} out of 5</h3>
                               </div>
                              
                               <div className="str-rat">{product.ratingCount !=0?<>{product.ratingCount} Ratings  &  </>:"" }</div>
                               {starcoutid&&starcoutid.starsCount&&<>
                               <div className="str-cnt-rw flex">
                                   <h5>5 Star</h5>
                                   
                                   <div className="str-cnt-bg"><span className={`w${starcoutid.starsCount.fiveStar}0`}></span></div>
                                   <p>{starcoutid.starsCount.fiveStar}</p>
                               </div>
                               <div className="str-cnt-rw flex">
                                   <h5>4 Star</h5>
                                   <div className="str-cnt-bg"><span className={`w${starcoutid.starsCount.fourStar}0`}></span></div>
                                   <p>{starcoutid.starsCount.fourStar}</p>
                               </div>
                               <div className="str-cnt-rw flex">
                                   <h5>3 Star</h5>
                                   <div className="str-cnt-bg"><span className={`w${starcoutid.starsCount.threeStar}0`}></span></div>
                                   <p>{starcoutid.starsCount.threeStar}</p>
                               </div>
                               <div className="str-cnt-rw flex">
                                   <h5>2 Star</h5>
                                   <div className="str-cnt-bg"><span className={`w${starcoutid.starsCount.twoStar}0`}></span></div>
                                   <p>{starcoutid.starsCount.twoStar}</p>
                               </div>
                               <div className="str-cnt-rw flex">
                                   <h5>1 Star</h5>
                                   <div className="str-cnt-bg"><span className={`w${starcoutid.starsCount.oneStar}0`}></span></div>
                                   <p>{starcoutid.starsCount.oneStar}</p>
                               </div>
                               </>}
                               <div className="cus-rev-link">
                                   
                                   <a onClick={scrollTo} > See all customer reviews <img src="assets/img/arrow-down-blue.svg" alt="" /> </a>
                                   {
                                       
                                   }
                                  
                               </div>
                           </div>
                       </div>
                       <div className="rat">{product.ratingCount !=0?<>{product.ratingCount} Ratings  &  </>:"" } {product.reviewCount !== "null" ? <>{product.reviewCount}Reviews</> : ""}</div>
                   </div>
               </div> */}
      </>
      }
    </>
  );
};

export default ProductReviewRatingviews;
