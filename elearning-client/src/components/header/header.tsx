import React from "react";
import { IoIosSearch } from "react-icons/io";
import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <section className="header_container">
        <div className="header_logo">
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Flogo%2Ff8-icon.18cd71cfcfa33566a22b.png?alt=media&token=7f889615-ae00-4f44-a7b3-679200082943"
              alt="F8 logo"
            />
          </Link>
          <h4>Học lập trình để đi làm</h4>
        </div>
        <div className="header_search">
          <IoIosSearch className="header_search_icon" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, bài viết, video,..."
            className="header_search_bar"
          />
        </div>
        <div className="header_button">
          <button className="header_button_login">Đăng nhập</button>
          <button className="header_button_register">Đăng ký</button>
        </div>
      </section>
    </header>
  );
};

export default Header;
