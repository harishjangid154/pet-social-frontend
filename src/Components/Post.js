import React from "react";

export default function Post({ post }) {
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
              <a href="#">
                <span className="btn_icon">
                  <img src="images/icon_004.png" alt="share" />
                </span>
                {post.commectCount} Comments
              </a>
            </li>
            <li>
              <a href="#">
                <span className="btn_icon">
                  <img src="images/icon_003.png" alt="share" />
                </span>
                Likes
              </a>
            </li>
            <div className="like_count" style={{ marginRight: "10px" }}>
              <span className="lft_cnt"></span>
              <span className="mid_cnt">{post.likeCount}</span>
              <span className="rit_cnt"></span>
            </div>
            <li>
              <a href="#">
                <span className="btn_icon">
                  <img src="images/icon_003.png" alt="share" />
                </span>
                Unlike
              </a>
            </li>
            <div className="like_count">
              <span className="lft_cnt"></span>
              <span className="mid_cnt">{post.unlikeCount}</span>
              <span className="rit_cnt"></span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
