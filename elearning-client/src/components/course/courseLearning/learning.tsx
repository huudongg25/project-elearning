import React from "react";
import "./learning.css";
const Learning = () => {
  return (
    <div className="learning_container">
      <iframe
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="1. Giới Thiệu khóa học C++"
        width="100%"
        height="500px"
        src="https://www.youtube.com/embed/Da1tpV9TMU0?autoplay=1&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Ffullstack.edu.vn&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=5"
        id="widget6"
      ></iframe>
      <div className="learning_title">
        <h2>Giới thiệu khóa học</h2>
      </div>
    </div>
  );
};

export default Learning;
