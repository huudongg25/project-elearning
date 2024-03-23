import React from "react";
import { MdHome } from "react-icons/md";
import { HiBookOpen } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { HiUsers } from "react-icons/hi2";
const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar_body">
        <Link to={"/"}>
          <div className="sidebar_nav">
            <MdHome className="sidebar_nav_icon" />
            <p>DashBoard</p>
          </div>
        </Link>
        <Link to={"/adminCourses"}>
          <div className="sidebar_nav">
            <HiBookOpen className="sidebar_nav_icon" />
            <p>Courses</p>
          </div>
        </Link>
        <Link to={"/adminUsers"}>
          <div className="sidebar_nav">
            <HiUsers className="sidebar_nav_icon" />
            <p>Users</p>
          </div>
        </Link>
        <Link to={"/adminMessages"}>
          <div className="sidebar_nav">
            <TiMessages className="sidebar_nav_icon" />
            <p>Messages</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
