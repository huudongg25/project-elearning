import React from "react";
import "./footer.css";
import { IoListOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const CourseFooter = () => {
  return (
    <div className="course_footer_container">
      <div className="course_footer_button">
        <button className="course_footer_lesson_button">
          <span>
            <FaChevronLeft />
          </span>
          BÀI TRƯỚC
        </button>
        <button className="course_footer_lesson_button">
          BÀI TIẾP THEO
          <span>
            <FaChevronRight />
          </span>
        </button>
      </div>
      <div className="course_footer_session_title">
        <p>tiêu đề của bài học</p>
        <button className="course_footer_session_button">
          <IoListOutline />
        </button>
      </div>
    </div>
  );
};

export default CourseFooter;
