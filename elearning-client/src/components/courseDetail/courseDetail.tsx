import React, { useEffect, useState } from "react";
import "./courseDetail.css";
import { MdOutlineSpeed } from "react-icons/md";
import { FaFilm } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaBatteryFull } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CourseBox from "../course/courseBox/courseBox";
import CoursesService from "../../services/course.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserService from "../../services/user.service";
import { IntfCourse } from "../../types/entities.type";
const CourseDetail = () => {
  const idUser: string = localStorage.getItem("idUser") as string;
  const [courseDetail, setCourseDetail] = useState<IntfCourse>();
  const userService = new UserService();
  const courseService = new CoursesService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let param: any = useParams();
  let idCourse: number = param.id;
  useEffect(() => {
    const getCourses = async () => {
      const result: any = await courseService.getCoursesById(idCourse);
      const courseData = result.data;
      setCourseDetail(courseData.data[0]);
    };
    getCourses();
  }, [idCourse]);
  const renderCourseIndex = () => {
    if (!courseDetail || !courseDetail.completedContent) return null;
    const completedContents = courseDetail.completedContent.split(".");
    return completedContents.map((content, index) => (
      <div className="course_detail_mini_title_checkLine">
        <FaCheck className="checkLine_icon" />
        <p>{content.trim()}</p>
      </div>
    ));
  };

  return (
    <div className="course_detail_container">
      <div className="course_detail_container_body">
        <div className="course_detail_main">
          <div className="course_detail_main_title">
            <h1>{courseDetail?.courseName}</h1>
            <p className="course_detail_main_desc">
              {courseDetail?.description}
            </p>
          </div>
          <div className="course_detail_mini_title">
            <h2>Bạn sẽ học được gì</h2>
            <div className="course_detail_mini_title_info">
              {renderCourseIndex()}
            </div>
          </div>
          <div className="course_detail_mini_title">
            <h2>Nội dung khóa học</h2>
            <div className="course_detail_mini_title_courseInfo">
              <p>
                <b>20</b> bài học
              </p>
              <p>
                Thời lượng <b>24 giờ 22 phút </b>
              </p>
            </div>
            <ul className="course_detail_mini_title_courseIndex">
              {/* {courses.map((item: any) => (item.price == 0 ? "" : ""))} */}
              <li className="course_detail_mini_title_courseIndex_detail">
                <p>
                  <span>1</span> bài học
                </p>
              </li>
            </ul>
          </div>
          <div className="course_detail_mini_title">
            <h2>Yêu cầu</h2>
            <div className="course_detail_mini_title">
              <div className="course_detail_mini_title_info_request">
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS).
                  </p>
                </div>
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Ý thức tự học cao, trách nhiệm cao, kiên trì bền bỉ không
                    ngại cái khó.
                  </p>
                </div>
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Không được nóng vội, bình tĩnh học, làm bài tập sau mỗi bài
                    học.
                  </p>
                </div>
                <div className="course_detail_mini_title_checkLine">
                  <FaCheck className="checkLine_icon" />
                  <p>
                    Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho
                    bạn những gì bạn cần phải biết.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="course_detail_aside">
          <div className="course_box">
            <div className="course_box_content">
              <Link to={`learning/${idCourse}`}>
                <img
                  className="CommonItem_thumb__ew8Jj"
                  src={courseDetail?.image}
                  alt={courseDetail?.courseName}
                />
              </Link>
            </div>
            <Link to={`learning/${idCourse}`}>
              <p className="course_box_title"> {courseDetail?.courseName}</p>
            </Link>
            <p className="course_box_price">
              {courseDetail?.price !== 0 ? courseDetail?.price : "Miễn phí"}
            </p>
          </div>
          <Link to={`learning/${idCourse}`}>
            <div className="course_detail_aside_button">ĐĂNG KÝ HỌC</div>
          </Link>
          <div className="course_detail_aside_info">
            <div className="course_detail_aside_info_line">
              <MdOutlineSpeed />
              <p>
                {courseDetail?.level == 1
                  ? "Trình độ cơ bản"
                  : "Trình độ nâng cao"}
              </p>
            </div>
            <div className="course_detail_aside_info_line">
              <FaFilm />
              <p>
                Tổng số <b>24</b> bài học
              </p>
            </div>
            <div className="course_detail_aside_info_line">
              <FaClock />
              <p>
                Thời lượng <b>24 giờ 22 phút</b>
              </p>
            </div>
            <div className="course_detail_aside_info_line">
              <FaBatteryFull />
              <p>Đầy đủ giáo trình</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
