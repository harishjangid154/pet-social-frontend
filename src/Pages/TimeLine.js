import React, { Component } from "react";
import Profile from "../Components/Profile";
import Category from "../Components/Category";
import Featured from "../Components/Featured";
import Post from "../Components/Post";
import store from "../redux";
import { connect } from "react-redux";
import { api_base_url } from "../BaseURL/baseUrl";
import { Link } from "react-router-dom";

class TimeLine extends Component {
  async fetchPosts() {
    console.log("called");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    };
    const url = api_base_url + "post";
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        store.dispatch({ type: "SET_POSTS", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillMount() {
    console.log(store.getState().userActions);
    if (!store.getState().userActions.isAuthenticated) {
      console.log("redirect ");
      this.props.history.push("/login");
    } else this.fetchPosts();
    console.log("Component called");
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
              <a href="#">Upload Post</a>
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
            <Link to="/">Home</Link>
            {/* CATEGORY & FEATURED PETS */}

            <Category />
            <Featured />
          </div>
          <div className="content_lft">
            {/* Opetion to filter feed */}
            <Profile />
            {/* Feed Posts */}

            {store
              .getState()
              .postActions.posts.filter(
                (post) =>
                  post.userName === store.getState().userActions.user.userName
              )
              .map((post) => {
                <Post post={post} />;
              })}
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
