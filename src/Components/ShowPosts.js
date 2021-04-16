import React, { useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import useFetchPosts from "../customHooks/useFetchPosts";
import store from "../redux";

function ShowPosts(props) {
  const [skip, setSkip] = useState(0);
  let { loading, errors, posts } = useFetchPosts(skip);
  let observer = useRef();
  const lastRef = useCallback(
    (n) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !errors) {
          setTimeout(() => {
            setSkip((prevSkip) => {
              return prevSkip + 5;
            });
          }, 1000);
        }
      });
      if (n) observer.current.observe(n);
    },
    [loading, errors]
  );

  if (!loading) {
    if (posts.length !== 0)
      store.dispatch({ type: "SET_POSTS", payload: posts });
  }

  return (
    <div>
      {props.posts.length !== 0
        ? props.posts.map((post, index) => {
            if (props.posts.length === index + 1)
              return (
                <div className="contnt_2" key={index} ref={lastRef}>
                  <Post post={post} />
                </div>
              );
            else
              return (
                <div className="contnt_2" key={index}>
                  <Post post={post} />
                </div>
              );
          })
        : null}
      <h1>{loading ? "Loading..." : null}</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.postActions.posts,
  };
};

export default connect(mapStateToProps)(ShowPosts);
