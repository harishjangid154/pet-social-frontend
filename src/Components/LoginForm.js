import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import store from "../redux";
import { login } from "../Functions/authFunctions";
import jwt from "jsonwebtoken";
import { api_base_url } from "../BaseURL/baseUrl";
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
    const err = {};
    // USER DATA
    let user = {
      email: emailRef.current.value,
      password: passwrodRef.current.value,
      remember: checkBoxRef.current.checked,
    };
    const token = await login(user, setErrors, err);

    if (token) {
      user = jwt.decode(token);
      dispatch({ type: "SET_USER", payload: user });
      document.cookie = `jwt-token=${token}`;
      history.push("/");
    }
  };
  useEffect(() => {
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(api_base_url, options)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
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
