import React, { useState, useRef, useEffect } from "react";
import store from "../redux";
import { api_base_url } from "../BaseURL/baseUrl";
import Comment from "./Comment";

export default function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [likes, setLikes] = useState(post.likeCount);
  const [unlikes, setUnlikes] = useState(post.unlikeCount);
  const [classes, setClasses] = useState("contnt_3 hide");
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const userId = store.getState().userActions.user._id;

  const handleLike = () => {
    if (!liked) {
      // TODO SEND REQUEST TO SERVER TO ADD LIKE TO THE POST
      const opetions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({
          userId,
        }),
      };

      fetch(`${api_base_url}like/addlike/${post._id}`, opetions)
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setLiked(true);
            setLikes((preLikes) => preLikes + 1);
          }
        });

      // if done then
      // dispatch action to increment like
    } else {
      const opetions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({
          userId,
        }),
      };

      fetch(`${api_base_url}like/removelike/${post._id}`, opetions)
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setLiked(false);
            setLikes((preLlikes) => preLlikes - 1);
          }
        });
    }
    console.log("Liked a post", post._id);
  };
  const handleUnLike = () => {
    console.log("unLiked a post");
    if (!unliked) {
      // TODO SEND REQUEST TO SERVER TO ADD LIKE TO THE POST
      const opetions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({
          userId,
        }),
      };

      fetch(`${api_base_url}like/addunlike/${post._id}`, opetions)
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setUnliked(true);
            setUnlikes((prevUnlikes) => prevUnlikes + 1);
          }
        });

      // if done then
      // dispatch action to increment like
    } else {
      const opetions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({
          userId,
        }),
      };

      fetch(`${api_base_url}like/removeunlike/${post._id}`, opetions)
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            setUnliked(false);
            setUnlikes((prevUnlikes) => prevUnlikes - 1);
          }
        });
    }
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
        userId,
        text: commentText,
        postId: post._id,
      }),
    };

    fetch(`${api_base_url}comment/add`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.text);
        setComments((prevComments) => [...prevComments, data]);
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
      body: JSON.stringify({
        userId: userId,
      }),
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
  }, []);

  return (
    <div className="div_a">
      <div className="div_title">{post.postTitle}</div>
      <div className="btm_rgt">
        <div className="btm_arc">{post.category || "cats"}</div>
      </div>
      <div className="div_top">
        <div className="div_top_lft">
          <img src={post.userImage} />
          {post.userFullName}
        </div>
        <div className="div_top_rgt">
          <span className="span_date">02 Jan 2014</span>
          <span className="span_time">11:15am</span>
        </div>
      </div>
      <div className="div_image">
        {post.postImage.length != 0 ? (
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
