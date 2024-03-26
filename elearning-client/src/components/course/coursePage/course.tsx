import React from "react";
import "./course.css";
import CourseBox from "../courseBox/courseBox";

const CoursePage = () => {
  return (
    <div className="course_container">
      <div className="course_free">
        <h3>Khóa học miễn phí :</h3>
        <CourseBox />
      </div>
    </div>
  );
};

export default CoursePage;
