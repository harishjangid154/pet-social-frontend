import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./css/style.css";
import "./App.css";
import "./css/bootstrap.css";
import "./css/bootstrap-responsive.css";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import TimeLine from "./Pages/TimeLine";
import SinglePost from "./Pages/SinglePost";
import Reset from "./Pages/Reset";
import { Provider } from "react-redux";
import { useEffect } from "react";

import store from "./redux";
import axios from "axios";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* HEADER SECTION START */}
        {/* HEADER SECTION END */}

        <Router>
          <NavBar />
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/forgot" exact component={ForgotPassword} />
            <Route path="/timeline" exact component={TimeLine} />
            <Route path="/post" exact component={SinglePost} />
            <Route path="/reset" exact component={Reset} />
          </Switch>
        </Router>

        {/* FOOTER */}
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
