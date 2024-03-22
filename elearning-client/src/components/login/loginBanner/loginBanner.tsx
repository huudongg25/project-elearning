import React from "react";
import { Carousel } from "antd";
import "./loginBanner.css";

const contentStyle: React.CSSProperties = {
  height: "450px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  width: "750px",
};

const LoginBanner: React.FC = () => (
  <Carousel autoplay className="carousel">
    <div className="banner_login">
      <img
        src="https://www.commonsense.org/sites/default/files/png/2020-12/teachers-essential-guide-to-coding-in-the-classroom-article.png"
        style={contentStyle}
      />
    </div>
    <div className="banner_login">
      <img
        src="https://genk.mediacdn.vn/thumb_w/640/2015/img-0359-1451277991189.jpg"
        style={contentStyle}
      />
    </div>
    <div className="banner_login">
      <img
        src="https://khpt.1cdn.vn/2024/01/16/089a7916.jpg"
        style={contentStyle}
      />
    </div>
    <div className="banner_login">
      <img
        src="https://toidicodedao.files.wordpress.com/2017/03/117software-developer.jpg?w=672&h=300&crop=1"
        style={contentStyle}
      />
    </div>
  </Carousel>
);

export default LoginBanner;
