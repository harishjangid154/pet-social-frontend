import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { api_base_url } from "../BaseURL/baseUrl";
import { connect, useDispatch } from "react-redux";
import store from "../redux";

function LoginForm() {
  const history = useHistory();
  const passwrodRef = useRef();
  const emailRef = useRef();
  const checkBoxRef = useRef(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch(store.dispatch);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // USER DATA
    const user = {
      email: emailRef.current.value,
      password: passwrodRef.current.value,
      remember: checkBoxRef.current.checked,
    };
    const err = {};
    if (user.email.length === 0) {
      err.email = "Email must not be empty";
    }
    if (user.password.length === 0) {
      err.password = "Password must not be empty";
    }

    if (Object.keys(err).length != 0) {
      setErrors({ ...err });
      return;
    }

    // OPTIONS FOR FETCH REQUEST

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify(user),
    };
    const url = api_base_url + "login";
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          const err = data.errors;
          console.log(err);
          setErrors({ ...err });
        } else {
          const user = data.user;
          dispatch({ type: "SET_USER", payload: user });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login_sec">
      <h1>Log In</h1>
      <ul>
        <li>
          <span>{errors.user}</span>
          <span>{errors.email}</span>
          <span>Email-ID</span>
          <input type="text" placeholder="Enter your email" ref={emailRef} />
        </li>
        <li>
          <span>{errors.password}</span>
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            ref={passwrodRef}
          />
        </li>
        <li>
          <input type="checkbox" ref={checkBoxRef} />
          Remember Me
        </li>
        <li>
          <input type="submit" value="Log In" onClick={handleSubmit} />
          <Link to="/forgot">Forgot Password</Link>
        </li>
      </ul>
      <div className="addtnal_acnt">
        I do not have any account yet.
        <Link to="/signup">Create My Account Now !</Link>
      </div>
    </div>
  );
}

export default connect(null, null)(LoginForm);
