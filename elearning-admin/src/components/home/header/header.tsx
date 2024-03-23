import React from "react";
import { IoIosSearch } from "react-icons/io";
import "./header.css";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
const Header = () => {
  return (
    <header className="header">
      <section className="header_container">
        <div className="header_logo">
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
              alt="phoenix logo"
            />
          </Link>
          <h4>Phoenix Academy</h4>
        </div>
        <div className="header_search">
          <IoIosSearch className="header_search_icon" />
          <input
            type="text"
            placeholder="Tìm kiếm ..."
            className="header_search_bar"
          />
        </div>
        <div className="header_info">
          <div className="header_info_admin">
            <div className="header_info_admin_avatar">
              <p>B</p>
            </div>
            <p>Admin</p>
          </div>
          <button className="header_info_button">
            <RiLogoutBoxRLine className="header_info_button_icon" />
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
