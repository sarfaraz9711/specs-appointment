
import ReportPopup from "../../shared/modal/ReportAbuse";
import PostQuestionPopup from "../../shared/modal/QuestionPop";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ViewAllQuestionApi } from "../../../api/product/viewAllQuestionApi";
import moment from "moment";
import LikeQues from "./LikeUnlike";
import { imageUrl } from "../../../api/url";
import { GetImageProductApi } from "../../../api/product/getImageProductApi";
import { useTranslation } from "../../../i18n";
const ViewAllQuestion = () => {
  const router = useRouter();
  let productId = router.query.productId;
  let product = router.query.product;
  let name = router.query.name;
  // let images=router.query.images
  let productSlug = router.query.productSlug;

  let price = router.query.price;

  const [questionInfo, setQuestionInfo] = useState([]);

  const [showReportModal, setShowReportModal] = useState(false);
  const [showQuesModal, setShowQuesModal] = useState(false);
  const [abuseReason, setAbuseReason] = useState([]);
  const [ansId, setAnsId] = useState("");
  const [limit, setLimit] = useState(10);
  const [keyword, setkeyword] = useState("");
  const [imagepaths, setimagepaths] = useState([]);
  const { t } = useTranslation("common");
  const [orderLoader, setOrderLoader] = useState(true);

  let res = {};

  const abuseFunc = (e, answerId) => {
    setAnsId(answerId);
    e.preventDefault();
    setShowReportModal(true);
    abuseListApi(setAbuseReason);
  };

  useEffect(() => {
    setOrderLoader(true);
    // setShowReportModal(true)
    // setShowQuesModal(true)
    ViewAllQuestionApi(
      setQuestionInfo,
      productId,
      limit,
      keyword,
      setOrderLoader
    );
    if (productSlug !== undefined) {
      GetImageProductApi(productSlug, setimagepaths);
    }
  }, [keyword]);

  return (
    <div className="cus-qa-wrap">
      {imagepaths.length !== 0 ? (
        <div className="cus-qa-row flex">
          <div className="cus-qa-left">
            <img
              src={`${imageUrl}?path=${imagepaths[0].containerName}&name=${imagepaths[0].image}&width=200&height=400`}
              alt="martfury"
            />

            <h4>{name}</h4>
            <h2>
              {"₹"}
              {price}
            </h2>
          </div>
        
          <div className="cus-qa-right">
          {/* <div className="ps-questions"> */}
            <ReportPopup
              showModal={showReportModal}
              setShowModal={setShowReportModal}
              abuseReason={abuseReason}
              ansId={ansId}
            />
            <PostQuestionPopup
              showModal={showQuesModal}
              setShowModal={setShowQuesModal}
              productId={productId}
            />

            <div className="questions-header">
              <h5>Customer questions &amp; answers</h5>
              <div className="post-question">
                <button onClick={(e) => setShowQuesModal(true)}>
                  {t("products.PostYourQuestion")}
                </button>
              </div>
            </div>

            <div className="que-head-search">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
                placeholder="Have a question ? Find Answer"
              />
            </div>
            {orderLoader === false ? (
              <>
                {questionInfo && questionInfo.length !== 0 ? (
                  <>
                    {questionInfo &&
                      questionInfo.map((info, index) => {
                        return (
                          <div
                            className="question-answer-containor"
                            key={index}
                          >
                            <div className="product-ques-content">
                              <h3>
                                <span>Question</span>
                                <div className="product-question-main">
                                  {info.question} ?
                                </div>
                              </h3>

                              {info.answerCount !== 0 && (
                                <div className="product-answer-section">
                                  <span>Answer</span>
                                  <div className="product-answer-container">
                                    <h5>
                                      {info &&
                                        info.answerList &&
                                        info.answerList.answer}
                                    </h5>
                                  </div>
                                </div>
                              )}
                              {info &&
                                info.postedBy &&
                                info.postedBy.firstName && (
                                  <h5 style={{ marginTop: "10px" }}>
                                    {info.postedBy.firstName}{" "}
                                    <span>
                                      {moment(
                                        info &&
                                          info.answerList &&
                                          info.answerList.createdDate
                                      ).format("LL")}
                                    </span>
                                  </h5>
                                )}
                             
                              {info.answerList && (
                                <LikeQues
                                  answerId={
                                    info &&
                                    info.answerList &&
                                    info.answerList.answerId
                                  }
                                  likes={
                                    info &&
                                    info.answerList &&
                                    info.answerList.likes
                                  }
                                  unLike={
                                    info &&
                                    info.answerList &&
                                    info.answerList.dislikes
                                  }
                                  userLike={
                                    info &&
                                    info.answerList &&
                                    info.answerList.likeType
                                  }
                                  setShowReportModal={setShowReportModal}
                                  setAnsId={setAnsId}
                                  setAbuseReason={setAbuseReason}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <div className=" ">
                    <p>{t("products.NoQuestionFound")}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="ps-block__content">
                <center>
                  <img
                    src="/static/img/spurt-original-loader.gif"
                    style={{ width: "80px", height: "80px" }}
                  />
                </center>
              </div>
            )}
          </div>
        </div>
        // </div>
      ) : (
        <div className="ps-page--product">
          <div className="ps-container">
            <div style={{ paddingTop: "100px", paddingBottom: "200px" }}>
              <center>
                <img
                  src="/static/img/spurt-original-loader.gif"
                  style={{ height: "100px", width: "100px" }}
                />
              </center>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewAllQuestion;
