import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "260px",
  color: "black",
  lineHeight: "160px",
  textAlign: "center",
  background: "white",
};

const Banner: React.FC = () => (
  <div className="banner">
    <Carousel autoplay>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Flogo%2F432450102_3651502125166576_1669674433274065412_n.jpg?alt=media&token=b589a6b3-c5ed-4540-a7a4-f79cf2f9c840"
          style={contentStyle}
          alt=""
          width="100%"
        />
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </div>
);

export default Banner;
