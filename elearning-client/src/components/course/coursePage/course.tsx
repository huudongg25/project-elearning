import React, { useEffect, useState } from "react";
import "./course.css";
import CourseBox from "../courseBox/courseBox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserService from "../../../services/user.service";
import CoursesService from "../../../services/course.service";
const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);
  const [getAllCourse, setAllCourse] = useState([]);
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const toDetails = (id: number | undefined): void => {
    navigation("/courses/detail/" + id);
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const courseService = new CoursesService();
  const userService = new UserService();
  useEffect(() => {
    const getCourse = async () => {
      const result = await courseService.getAllCourses();
      const courseDb = result.data;
      const CoursesAfterFilter = courseDb.filter(
        (item: any) => item.state === 0
      );
      const lastIndex = currentPage * coursesPerPage;
      const firstIndex = lastIndex - coursesPerPage;
      const currentCourses = CoursesAfterFilter.slice(firstIndex, lastIndex);
      setAllCourse(CoursesAfterFilter);
      setCourses(currentCourses);
    };
    getCourse();
  }, [currentPage]);
  console.log(courses);

  return (
    <div className="course_container">
      <div className="course_free">
        <h3>Khóa học miễn phí :</h3>
        <div className="course_box_container">
          {courses.map((item: any) =>
            item.price == 0 ? (
              <div className="course_box">
                <div className="course_box_content">
                  <Link to={`detail/${item.id}`}>
                    <img src={`${item.image}`} alt="Ảnh chương trình" />
                  </Link>
                  <button
                    className="course_box_content_watch_button"
                    onClick={() => toDetails(item.id)}
                  >
                    Xem khóa học
                  </button>
                </div>
                <Link to={`detail/${item.id}`}>
                  <p className="course_box_title">{item.courseName}</p>
                </Link>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        {/* <ul className="pagination">
          {Array.from(
            { length: Math.ceil(getAllCourse.length / coursesPerPage) },
            (element, i) => (
              <li key={i + 1} onClick={() => paginate(i + 1)}>
                <button
                  className={
                    currentPage === i + 1 ? "btn_active" : "btn_non_active"
                  }
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul> */}
      </div>
      <div className="course_box">
        <h3>Khóa học tính phí :</h3>
        <div className="course_box_container">
          {courses.map((item: any) =>
            item.price != 0 ? (
              <div className="course_box">
                <div className="course_box_content">
                  <Link to={`detail/${item.id}`}>
                    <img src={`${item.image}`} alt="Ảnh chương trình" />
                  </Link>
                  <button
                    className="course_box_content_watch_button"
                    onClick={() => toDetails(item.id)}
                  >
                    Xem khóa học
                  </button>
                </div>
                <Link to={`detail/${item.id}`}>
                  <p className="course_box_title">{item.courseName}</p>
                </Link>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        {/* <ul className="pagination">
          {Array.from(
            { length: Math.ceil(getAllCourse.length / coursesPerPage) },
            (element, i) => (
              <li key={i + 1} onClick={() => paginate(i + 1)}>
                <button
                  className={
                    currentPage === i + 1 ? "btn_active" : "btn_non_active"
                  }
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul> */}
      </div>
    </div>
  );
};

export default CoursePage;
