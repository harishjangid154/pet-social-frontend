import React, { useState, useEffect } from "react";
import store from "../redux";
import axios from "axios";
import { api_base_url } from "../BaseURL/baseUrl";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        userId: store.getState().userActions.user._id,
      }),
    };
    fetch(`${api_base_url}category/`, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCategories([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [store.getState()]);

  return (
    <div className="rght_cate">
      <div className="rght_cate_hd" id="rght_cat_bg">
        Categories
      </div>
      <div className="rght_list">
        <ul>
          {categories.map((category) => {
            return (
              <li>
                <a href="#">
                  <span className="list_icon">
                    <img src={category.image} alt="up" />
                  </span>
                  {category.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
