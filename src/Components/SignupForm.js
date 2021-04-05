import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { api_base_url } from "../BaseURL/baseUrl";

export default function SignupForm() {
  const history = useHistory();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const checkBoxRef = useRef();
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!checkBoxRef.current.checked) {
      setErrors({ ...errors, checkBox: "Accept Term" });
    } else {
      const user = {
        email: emailRef.current.value,
        userName: userNameRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        password: passwordRef.current.value,
      };
      const options = {
        method: "POST",
        body: JSON.stringify({ ...user }),
      };
      const url = api_base_url + "signup";
      console.log(url);
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          // TODO:  ADD DISPATCH TO SET USER
          console.log(data);
          if (data.errors) {
            const err = data.errors;
            setErrors({ ...err });
          } else {
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(JSON.stringify(user));
    }
  };

  return (
    <div className="register_sec">
      <h1>Create An Account</h1>
      <ul>
        <li>
          <span>{errors.userName}</span>
          <span>Username</span>
          <input
            type="text"
            placeholder="Enter your username"
            ref={userNameRef}
          />
        </li>
        <li>
          <span>{errors.password}</span>
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
        </li>
        <li>
          <span>{errors.email}</span>
          <span>Email</span>
          <input type="text" placeholder="Enter your email" ref={emailRef} />
        </li>
        <li>
          <span>{errors.firstName}</span>
          <span>First Name</span>
          <input
            type="text"
            placeholder="Enter your first name"
            ref={firstNameRef}
          />
        </li>
        <li>
          <span>{errors.lastName}</span>
          <span>Last Name</span>
          <input
            type="text"
            placeholder="Enter your last name"
            ref={lastNameRef}
          />
        </li>
        <li>
          <span>{errors.checkBox}</span>
          <input type="checkbox" ref={checkBoxRef} />I agree to Term &
          Conditions
        </li>
        <li>
          <input type="submit" value="Register" onClick={handleSubmit} />
        </li>
      </ul>
      <div className="addtnal_acnt">
        I already have an account.<Link to="/login">Login My Account !</Link>
      </div>
    </div>
  );
}
