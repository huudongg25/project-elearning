import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import "./header.css";
import { Link } from "react-router-dom";
const CourseHeader = () => {
  return (
    <header className="course_header">
      <section className="course_header_container">
        <div className="course_header_info">
          <Link to={"/"} className="course_header_back">
            <FaChevronLeft />
          </Link>
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
              alt="phoenix logo"
            />
          </Link>
          <p> tên của khóa học </p>
        </div>
        <div className="course_header_progress">
          <div className="course_header_progress_percent">
            <p>0%</p>
          </div>
          <div className="course_header_progress_lesson">
            <p>
              <span className="course_header_progress_total">0 / 0</span> bài
              học
            </p>
          </div>
        </div>
      </section>
    </header>
  );
};

export default CourseHeader;
