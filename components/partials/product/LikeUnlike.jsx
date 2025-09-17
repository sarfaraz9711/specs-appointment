import  Router  from 'next/router';
import React, { useState, useEffect } from "react";

import { abuseListApi } from "../../../api/product/abuseReason";
import { alterVote } from "../../../api/product/votes";
import { useTranslation } from "../../../i18n";
function LikeQues({
  answerId,
  likes,
  unLike,
  userLike,
  setShowReportModal,
  setAnsId,
  setAbuseReason,
}) {
  const [likeCount, setLikeCount] = useState(likes);
  const [disLikeCount, setDisLikeCount] = useState(unLike);
  const [likeAnimate, setLikeAnimate] = useState("");
  const [dislikeAnimate, setDislikeAnimate] = useState("");
  // const [det, setDet] = useState(info)
  const [initialuserLike, setInitialUserLike] = useState(0);

  const { t } = useTranslation("common");

  const abuseFunc = (e, answerId) => {
    e.preventDefault();
    let AuthCheck=localStorage.getItem("spurtToken")
        
    if(AuthCheck){
      setAnsId(answerId);
      e.preventDefault();
      setShowReportModal(true);
      abuseListApi(setAbuseReason);
    }else{
        Router.push('/account/login')
    }
   
  };

  useEffect(() => {
    setLikeAnimate(
      userLike === 1
        ? true
        : userLike === 0
        ? false
        : userLike === 2
        ? false
        : ""
    );
    setDislikeAnimate(
      userLike === 1
        ? false
        : userLike === 0
        ? false
        : userLike === 2
        ? true
        : ""
    );
  }, []);

  const likeHandler = (e,type) => {
    e.preventDefault();
    let AuthCheck=localStorage.getItem("spurtToken")
        
    if(AuthCheck){
      if (type === "likeClick") {
        if (userLike === 0) {
          if (initialuserLike === 0) {
            setLikeAnimate((i) => !i);
            setInitialUserLike(1);
            // setDislikeAnimate(i=>!i)
            !likeAnimate && alterVote(answerId, 1); //reverse logic but runs well
            // !dislikeAnimate ? setDisLikeCount(i => i + 1) : setDisLikeCount(i => i === 0 ? i : i - 1)
            !likeAnimate
              ? setLikeCount((i) => i + 1)
              : setLikeCount((i) => (i === 0 ? i : i - 1));
          } else {
            setLikeAnimate((i) => !i);
            setDislikeAnimate((i) => !i);
            !likeAnimate && alterVote(answerId, 1);
            // !likeAnimate ?  alterVote(answerId, setLikeAnimate, 1) : alterVote(postid, setLikeAnimate, 2);	//reverse logic but runs well
            !dislikeAnimate
              ? setDisLikeCount((i) => i + 1)
              : setDisLikeCount((i) => (i === 0 ? i : i - 1));
            !likeAnimate
              ? setLikeCount((i) => i + 1)
              : setLikeCount((i) => (i === 0 ? i : i - 1));
          }
        } else {
          setLikeAnimate((i) => !i);
          setDislikeAnimate((i) => !i);
          !likeAnimate && alterVote(answerId, 1);
          !dislikeAnimate
            ? setDisLikeCount((i) => i + 1)
            : setDisLikeCount((i) => (i === 0 ? i : i - 1));
          !likeAnimate
            ? setLikeCount((i) => i + 1)
            : setLikeCount((i) => (i === 0 ? i : i - 1));
        }
      } else {
        if (userLike === 0) {
          if (initialuserLike === 0) {
            // setLikeAnimate(i => !i)
            setInitialUserLike(1);
            setDislikeAnimate((i) => !i);
            !dislikeAnimate && alterVote(answerId, 2);
            // !likeAnimate ?  alterVote(answerId, setLikeAnimate, 1) : alterVote(postid, setLikeAnimate, 2);	//reverse logic but runs well
            !dislikeAnimate
              ? setDisLikeCount((i) => i + 1)
              : setDisLikeCount((i) => (i === 0 ? i : i - 1));
            // !likeAnimate ? setLikeCount(i => i + 1) : setLikeCount(i => i === 0 ? i : i - 1)
          } else {
            setLikeAnimate((i) => !i);
            setDislikeAnimate((i) => !i);
            !dislikeAnimate && alterVote(answerId, 2);
            !dislikeAnimate
              ? setDisLikeCount((i) => i + 1)
              : setDisLikeCount((i) => (i === 0 ? i : i - 1));
            !likeAnimate
              ? setLikeCount((i) => i + 1)
              : setLikeCount((i) => (i === 0 ? i : i - 1));
          }
        } else {
          setLikeAnimate((i) => !i);
          setDislikeAnimate((i) => !i);
          !dislikeAnimate && alterVote(answerId, 2);
          !dislikeAnimate
            ? setDisLikeCount((i) => i + 1)
            : setDisLikeCount((i) => (i === 0 ? i : i - 1));
          !likeAnimate
            ? setLikeCount((i) => i + 1)
            : setLikeCount((i) => (i === 0 ? i : i - 1));
        }
      }
     
    }else{
        Router.push('/account/login')
    }
    
  };

  return (
    <>
    
   
    <div className="answer-like-unlike">
  
      {likeAnimate === true ? (
        <div className="like-button-question">
          <i
            class="fa fa-thumbs-up fa-2x"
            aria-hidden="true"
            style={{ color: "blue", cursor: "pointer" }}
            //   onClick={(e) => likeHandler("likeClick")}
          ></i>

          <p>{likeCount}</p>
        </div>
      ) : (
        <div className="like-button-question">
          <i
            class="fa fa-thumbs-up fa-2x"
            aria-hidden="true"
            style={{ color: "#d1d1d1", cursor: "pointer" }}
            onClick={(e) => likeHandler(e,"likeClick")}
          ></i>

          <p>{likeCount}</p>
        </div>
      )}
      {dislikeAnimate === true ? (
        <div className="unlike-button-question">
          <i
            class="fa fa-thumbs-down fa-2x"
            aria-hidden="true"
            style={{ color: "blue", cursor: "pointer" }}
            //   onClick={(e) => likeHandler("unlikeClick")}
          ></i>

          <p>{disLikeCount}</p>
          {/* <a href="" onClick={(e) => abuseFunc(e, answerId)}>
            {t("ReportAbuse.ReportAbuse")}
          </a> */}
        </div>
      ) : (
        <div className="unlike-button-question">
          <i
            class="fa fa-thumbs-down fa-2x"
            aria-hidden="true"
            style={{ color: "#d1d1d1", cursor: "pointer" }}
            onClick={(e) => likeHandler(e,"unlikeClick")}
          ></i>

          <p>{disLikeCount}</p>
          {/* <a href="" onClick={(e) => abuseFunc(e, answerId)}>
            {t("ReportAbuse.ReportAbuse")}
          </a> */}
        </div>
      )}
    </div>
    </>
  );
}

export default LikeQues;
