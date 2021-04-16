import React, { useState, useRef, useEffect } from "react";
import { api_base_url } from "../BaseURL/baseUrl";
import Comment from "./Comment";
import axios from "axios";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likeCount);
  const [unlikes, setUnlikes] = useState(post.unlikeCount);
  const [classes, setClasses] = useState("contnt_3 hide");
  const commentRef = useRef();
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    axios({
      method: "post",
      url: `${api_base_url}like/add/${post._id}`,
    }).then((res) => {
      console.log(res);
      if (res.data === "added") {
        setLikes((preLikes) => preLikes + 1);
      }
      if (res.data === "removed") {
        setLikes((preLikes) => preLikes - 1);
      }
    });
    console.log("Liked a post", post._id);
  };
  const handleUnLike = () => {
    axios({
      method: "post",
      url: `${api_base_url}like/addunlike/${post._id}`,
    }).then((res) => {
      console.log(res);
      if (res.data === "added") {
        setUnlikes((prevUnlikes) => prevUnlikes + 1);
      }
      if (res.data === "removed") {
        setUnlikes((prevUnlikes) => prevUnlikes - 1);
      }
    });
    console.log("unLiked a post");
  };
  let add = false;
  const handleComment = () => {
    if (add) {
      setClasses("contnt_3 hide");
      add = false;
    } else {
      add = true;
      setClasses("contnt_3");
    }
  };

  const submitComment = () => {
    const commentText = commentRef.current.value;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        text: commentText,
        postId: post._id,
      }),
      credentials: "include",
    };

    fetch(`${api_base_url}comment/add`, options)
      .then((res) => res.json())
      .then((data) => {
        fetch(`${api_base_url}comment/get/${data._id}`, options)
          .then((res) => res.json())
          .then((data) => {
            // data is object contain comment id, commnet text and userId Who post the comment
            console.log(data);
            commentRef.current.value = "";
            setComments((prevComments) => [...prevComments, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      credentials: "include",
    };

    post.comments.forEach((comment) => {
      fetch(`${api_base_url}comment/get/${comment}`, options)
        .then((res) => res.json())
        .then((data) => {
          // data is object contain comment id, commnet text and userId Who post the comment
          console.log(data);
          setComments((prevComments) => [...prevComments, ...data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [post.comments]);

  return (
    <div className="div_a">
      <div className="div_title">{post.postTitle}</div>
      <div className="btm_rgt">
        <div className="btm_arc">{post.category || "cats"}</div>
      </div>
      <div className="div_top">
        <div className="div_top_lft">
          <img src={post.userImage} alt="user" />
          {post.userFullName}
        </div>
        <div className="div_top_rgt">
          <span className="span_date">02 Jan 2014</span>
          <span className="span_time">11:15am</span>
        </div>
      </div>
      <div className="div_image">
        {post.postImage.length !== 0 ? (
          <img src={post.postImage} alt="pet" />
        ) : (
          ""
        )}

        <p>{post.postDesc}</p>
      </div>

      <div className="div_btm">
        <div className="btm_list">
          <ul>
            <li>
              <a href="#">
                <span className="btn_icon">
                  <img src="images/icon_001.png" alt="share" />
                </span>
                Share
              </a>
            </li>
            <li>
              <a href="#">
                <span className="btn_icon">
                  <img src="images/icon_002.png" alt="share" />
                </span>
                Flag
              </a>
            </li>
            <li>
              <a onClick={handleComment}>
                <span className="btn_icon">
                  <img src="images/icon_004.png" alt="share" />
                </span>
                {post.commectCount} Comments
              </a>
            </li>
            <li>
              <a onClick={handleLike}>
                <span className="btn_icon">
                  <img src="images/icon_003.png" alt="share" />
                </span>
                Likes
              </a>
            </li>
            <div className="like_count" style={{ marginRight: "10px" }}>
              <span className="lft_cnt"></span>
              <span className="mid_cnt">{likes}</span>
              <span className="rit_cnt"></span>
            </div>
            <li>
              <a onClick={handleUnLike}>
                <span className="btn_icon">
                  <img src="images/icon_003.png" alt="share" />
                </span>
                Unlike
              </a>
            </li>
            <div className="like_count">
              <span className="lft_cnt"></span>
              <span className="mid_cnt">{unlikes}</span>
              <span className="rit_cnt"></span>
            </div>
          </ul>
        </div>
      </div>
      <div className={classes}>
        <ul>
          {comments.map((comment, idx) => {
            return <Comment key={idx} comment={comment} />;
          })}

          <li>
            <div className="cmnt_div1">
              <input
                type="text"
                placeholder="Enter your Comment"
                className="cmnt_bx1"
                ref={commentRef}
              />
              <input
                type="submit"
                className="sub_bttn1"
                value="Submit Comment"
                onClick={submitComment}
              />
            </div>
          </li>
        </ul>
        <div className="view_div">
          <a href="#">View more</a>
        </div>
      </div>
    </div>
  );
}
