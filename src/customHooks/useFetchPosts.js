import React, { useEffect, useState } from "react";
import store from "../redux";
import { api_base_url } from "../BaseURL/baseUrl";

export default function useFetchPosts(skip) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    setLoading(true);
    setErrors(false);

    const user = store.getState().userActions.user;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        userId: user._id,
        limit: 5,
        skip: skip,
      }),
    };
    const url = api_base_url + "post/posts";
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.errors) {
          setErrors(true);
          setLoading(false);
        } else if (data.post === "Posts unavailable") {
          // store.dispatch({ type: "SET_POSTS", payload: [] });
          setErrors(true);
          setLoading(false);
        } else {
          if (data.length === 0) {
            setLoading(true);
          } else {
            setLoading(false);
          }
          setPosts((prevPosts) => {
            return [...prevPosts, ...data];
          });
          // store.dispatch({ type: "SET_POSTS", payload: data })
        }
      })
      .catch((err) => {
        setErrors(true);
      });
  }, [skip]);
  return {
    loading,
    errors,
    posts,
  };
}
