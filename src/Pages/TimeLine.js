import React, { Component } from "react";
import Profile from "../Components/Profile";
import Category from "../Components/Category";
import Featured from "../Components/Featured";
import Post from "../Components/Post";
import store from "../redux";
import { connect } from "react-redux";
import { api_base_url } from "../BaseURL/baseUrl";
import { Link } from "react-router-dom";
import UploadPost from "../Components/UploadPost";
import ShowPosts from "../Components/ShowPosts";

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
    };
  }
  async fetchPosts() {
    console.log("called");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        user: store.getState().userActions.user,
        skip: this.state.skip,
        limit: this.state.limit,
      }),
    };
    const url = api_base_url + "post/posts";
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.post === "Posts unavailable") {
          store.dispatch({ type: "SET_POSTS", payload: [] });
        } else store.dispatch({ type: "SET_POSTS", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async componentWillMount() {
    console.log(store.getState().userActions);
    console.log(store.getState().userActions.user.userName);
    this.setState({ userName: store.getState().userActions.user.userName });
    if (!store.getState().userActions.isAuthenticated) {
      console.log("redirect ");
      this.props.history.push("/login");
    } else await this.fetchPosts();
    // store.dispatch({ type: "SHOW_NOTIFICATION", payload: "Profile" });
    console.log("Component called");
  }

  postpopup() {
    document.querySelector(".popup").classList.remove("hide");
  }
  closePopup() {
    document.querySelector(".popup").classList.add("hide");
  }

  render() {
    console.log("INSIDE");
    return (
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_btn">
              <span className="rght_btn_icon">
                <img src="images/btn_iconb.png" alt="up" />
              </span>
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>
              <a href="#" onClick={this.postpopup}>
                Upload Post
              </a>
            </div>
            <div className="rght_btn">
              <span className="rght_btn_icon">
                <img src="images/btn_icona.png" alt="up" />
              </span>
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>
              <a href="#">Invite Friends</a>
            </div>
            {/* POPUP WINDOW */}
            <div className="popup hide">
              <div className="popup_inner">
                <UploadPost />
                <button className="popup_button" onClick={this.closePopup}>
                  X
                </button>
              </div>
            </div>
            {/* CATEGORY & FEATURED PETS */}

            <Category />
            <Featured />
          </div>
          <div className="content_lft">
            {/* Opetion to filter feed */}
            <Profile />
            {/* Feed Posts */}

            {/* {store
              .getState()
              .postActions.posts.filter(
                (post) => post.userName === this.state.userName
              )
              .map((post) => (
                <Post post={post} />
              ))} */}
            <ShowPosts />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TimeLine);
