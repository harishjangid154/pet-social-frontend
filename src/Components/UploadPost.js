import React, { useRef } from "react";
import store from "../redux";
import { api_base_url } from "../BaseURL/baseUrl";
import { connect } from "react-redux";

function UploadPost() {
  const headingRef = useRef();
  const bodyRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const uploadImage = async () => {
    const image = imageRef.current.files[0];
    const formData = new FormData();
    formData.append("img", image);
    const options = {
      method: "POST",
      body: formData,
    };
    const url = api_base_url + "upload/";
    let imagePath;
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        imagePath = data.imagePath;
        console.log(imagePath);
      })
      .catch((err) => {
        console.log(err);
      });
    return imagePath;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = store.getState().userActions.user;
    console.log(user);

    let imagePath = "";
    if (imageRef.current.files[0]) {
      await uploadImage().then((path) => {
        imagePath = path;
        console.log(imagePath);
      });
    }

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        userFullName: user.firstName + " " + user.lastName,
        postDesc: bodyRef.current.value,
        postTitle: headingRef.current.value,
        postImage: imagePath,
        userImage: user.userImage,
        userName: user.userName,
        category: categoryRef.current.value,
      }),
      credentials: "include",
    };

    const url = api_base_url + "post/";

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          window.alert(data.errors);
        } else {
          store.dispatch({ type: "SET_SINGLE_POST", payload: data.post });
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    document.querySelector(".popup").classList.add("hide");
  };
  return (
    <>
      <div>
        <label>Image</label>
        <input type="file" ref={imageRef} />
      </div>
      <span class="horizontal_line"></span>
      <div>
        <label>Title</label>

        <input type="text" placeholder="Title" ref={headingRef} required />
        <label>Descripition</label>
        <textarea
          type="text"
          placeholder="Descripition"
          ref={bodyRef}
        ></textarea>
        <br />
        <select defaultValue="Cats" ref={categoryRef}>
          <option>Cats</option>
          <option>Dogs</option>
          <option>Bird</option>
          <option>Rabbit</option>
          <option>other</option>
        </select>
        <br />
        <input type="submit" value="submit" onClick={handleSubmit} />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(UploadPost);
