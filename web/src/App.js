import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import React, { useEffect } from "react";

import { GlobalContext } from "./context/Context";
import { useContext } from "react";
import Splash from "./components/Splash/Splash";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  const dev = "http://localhost:2000";
  const baseURL =
    window.location.hostname.split(":")[0] === "localhost" ? dev : "";

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/post/tokenverify`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result?.data?.email) {
          dispatch({
            type: "USER_LOGIN",
            payload: {
              id: result.data.id,
              fullName: result.data.fullName,
              email: result.data.email,
              gender: result.data.gender,
              phoneNumber: result.data.phoneNumber,
              address: result.data.address,
            },
          });
        } else {
          dispatch({ type: "USER_LOGOUT" });
        }
      })
      .catch((e) => {
        dispatch({ type: "USER_LOGOUT" });
      });
    return () => {
      // cleanup
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {state.user === undefined ? (
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="*">
            <Splash />
          </Route>
        </Switch>
      ) : null}
      {state.user === null ? (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      ) : null}
      {state.user ? (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Route path="*">
            <Dashboard />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}

export default App;
