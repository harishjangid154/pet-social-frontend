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
import auth from "./Components/auth";

function App() {
  return (
    <div className="App">
      {/* HEADER SECTION START */}
      <NavBar />
      <Header />
      {/* HEADER SECTION END */}

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/auth" component={auth} />
          <Route path="/timeline" component={TimeLine} />
          <Route path="/post" component={SinglePost} />
          <Route path="/reset" component={Reset} />
        </Switch>
      </Router>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
