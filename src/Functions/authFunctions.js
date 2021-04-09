import { api_base_url } from "../BaseURL/baseUrl";

function emailValidate(email) {
  const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  reg.test(email);
}

const signup = async (user, setErrors, err) => {
  let token;
  if (user.email.length === 0 && !emailValidate(user.email)) {
    err.email = "Enter a valid EMAIL";
  }
  if (user.userName.length === 0) {
    err.userName = "Enter a USER NAME";
  }
  if (user.firstName.length === 0) {
    err.firstName = "must not be empty";
  }
  if (user.lastName.length === 0) {
    err.lastName = "must not be empty";
  }
  if (user.password.length === 0) {
    err.password = "Enter a password";
  }

  if (Object.keys(err).length != 0) {
    setErrors({ ...err });
    return false;
  }

  // OPTIONS FOR FETCH
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(user),
  };
  const url = api_base_url + "auth/signup";
  console.log(options);

  // POST API REQUEST TO SERVER FOR SIGNUP
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        const err = data.errors;
        setErrors({ ...err });
      } else {
        token = data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return token;
};

const login = async (user, setErrors, err) => {
  let authentication = false;
  let token;
  if (user.email.length === 0) {
    err.email = "Must not be empty";
  }
  if (user.password.length === 0) {
    err.password = "Must not be empty";
  }
  if (Object.keys(err).length != 0) {
    setErrors({ ...err });
    return false;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(user),
  };
  const url = api_base_url + "auth/login";
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        const err = data.errors;
        console.log(err);
        setErrors({ ...err });
      } else {
        token = data.token;
        authentication = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(authentication);
  if (authentication) return token;
  else {
    err.user = "Invalid Credintials";
    setErrors({ ...err });
    return false;
  }
};

export { signup, login };
