import React from "react";
import { MdHome } from "react-icons/md";
import { HiBookOpen } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar_body">
        <Link to={"/"}>
          <div className="sidebar_nav">
            <MdHome className="sidebar_nav_icon" />
            <p>Trang chủ</p>
          </div>
        </Link>
        <Link to={"/courses"}>
          <div className="sidebar_nav">
            <HiBookOpen className="sidebar_nav_icon" />
            <p>Bài học</p>
          </div>
        </Link>
        <Link to={"/myCourses"}>
          <div className="sidebar_nav">
            <FaHistory className="sidebar_nav_icon" />
            <p>Lịch sử</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
