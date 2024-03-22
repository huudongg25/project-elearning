import React, { useState } from "react";
import "./login.css";
import RegisterBox from "../InfoBox/infoBox";
import LoginBanner from "../loginBanner/loginBanner";

const Login = () => {
  return (
    <div className="login_container">
      <div className="login_container_body">
        <LoginBanner />
        <RegisterBox />
      </div>
    </div>
  );
};

export default Login;
