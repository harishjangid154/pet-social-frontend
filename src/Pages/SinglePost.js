import React, { Component } from "react";
import Comment from "../Components/Comment";
import Category from "../Components/Category";
import Featured from "../Components/Featured";
import Post from "../Components/Post";
import PostComment from "../Components/PostComment";

export default class SinglePost extends Component {
  render() {
    return (
      <div class="container">
        <div class="content">
          <div class="content_rgt">
            <div class="rght_btn">
              {" "}
              <span class="rght_btn_icon">
                <img src="images/btn_iconb.png" alt="up" />
              </span>{" "}
              <span class="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a href="#">Upload Post</a>{" "}
            </div>
            <div class="rght_btn">
              {" "}
              <span class="rght_btn_icon">
                <img src="images/btn_icona.png" alt="up" />
              </span>{" "}
              <span class="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a href="#">Invite Friends</a>{" "}
            </div>
            <Category />
            <Featured />
          </div>
          <div class="content_lft">
            <Post />
            <div class="contnt_3">
              <ul>
                <Comment />
                <Comment />
                <li>
                  <PostComment />
                </li>
              </ul>
              <div class="view_div">
                <a href="#">View more</a>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    );
  }
}
