import { useEffect, useState } from "react";
import store from "../redux";
import { api_base_url } from "../BaseURL/baseUrl";

export default function useFetchPosts(skip) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    if (!store.getState().userActions.user) {
      return false;
    }
    setLoading(true);
    setErrors(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        limit: 5,
        skip: skip,
      }),
      credentials: "include",
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
