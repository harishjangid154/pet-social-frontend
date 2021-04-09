import React, { useCallback, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import useFetchPosts from "../customHooks/useFetchPosts";
import store from "../redux";

function ShowPosts() {
  const [skip, setSkip] = useState(0);
  const { loading, errors, posts } = useFetchPosts(skip);
  let observer = useRef();
  const lastRef = useCallback((n) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !errors) {
        setSkip((prevSkip) => {
          return prevSkip + 5;
        });
      }
    });
    if (n) observer.current.observe(n);
  }, loading);

  if (!loading) {
    store.dispatch({ type: "SET_POSTS", payload: posts });
  }
  return (
    <div>
      <p>{loading ? "Loading..." : null}</p>
      {store.getState().postActions.posts.length != 0
        ? store.getState().postActions.posts.map((post, index) => {
            if (store.getState().postActions.posts.length === index + 1)
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
    </div>
  );
}

export default connect()(ShowPosts);
