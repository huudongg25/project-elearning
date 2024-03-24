<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
import "./course.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CoursesService from "../../../services/course.service";
import UserService from "../../../services/user.service";
const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);
  const [getAllCourse, setAllCourse] = useState([]);
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const toDetails = (id: number | undefined): void => {
    navigation("/courses/detail" + id);
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const CourseService = new CoursesService();
  const userService = new UserService();
  useEffect(() => {
    const getCourse = async () => {
      const result: any = await CourseService.getAllCourses();
      const coursesAfterFilter = result.filter((item: any) => item.scale);
      const lastIndex = currentPage * coursesPerPage;
      const firstIndex = lastIndex - coursesPerPage;
      const currentCourses = coursesAfterFilter.slice(firstIndex, lastIndex);
      setAllCourse(coursesAfterFilter);
      setCourses(currentCourses);
    };
    getCourse();
  }, [currentPage]);

  return (
    <div className="course_container">
      <div className="course_box">
        <h3>Khóa học miễn phí :</h3>
        {courses.map((item: any) =>
          item.price == 0 ? (
            <div className="course_box">
              <div className="course_box_content">
                <Link to={`learning/${item.id}`}>
                  <img src={`${item.id}`} alt="Ảnh chương trình" />
                </Link>
              </div>
              <Link to={`learning/${item.id}`}>
                <p className="course_box_title">{item.courseName}</p>
              </Link>
              <p className="course_box_price">{item.price}</p>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div className="course_box">
        <h3>Khóa học tính phí :</h3>
        {courses.map((item: any) =>
          item.price != 0 ? (
            <div className="course_box">
              <div className="course_box_content">
                <Link to={`learning/${item.id}`}>
                  <img src={`${item.id}`} alt="Ảnh chương trình" />
                </Link>
              </div>
              <Link to={`learning/${item.id}`}>
                <p className="course_box_title">{item.courseName}</p>
              </Link>
              <p className="course_box_price">{item.price}</p>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default CoursePage;
=======
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
>>>>>>> Stashed changes
