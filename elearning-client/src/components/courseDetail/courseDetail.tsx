import React from "react";
import "./courseDetail.css";
import { MdOutlineSpeed } from "react-icons/md";
import { FaFilm } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaBatteryFull } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CourseBox from "../course/courseBox/courseBox";
const CourseDetail = () => {
  return (
    <div className="course_detail_container">
      <div className="course_detail_container_body">
        <div className="course_detail_main">
          <div className="course_detail_main_title">
            <h1>Lập Trình Javascript Cơ Bản</h1>
            <p className="course_detail_main_desc">
              Học Javascript cơ bản phù hợp cho người chưa từng học lập trình.
              Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.
            </p>
          </div>
          <div className="course_detail_mini_title">
            <h2>Bạn sẽ học được gì</h2>
            <div className="course_detail_mini_title_info">
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
              <div className="course_detail_mini_title_checkLine">
                <FaCheck className="checkLine_icon" />
                <p>123123123123</p>
              </div>
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
              <li className="course_detail_mini_title_courseIndex_detail">
                <p>
                  <span>1</span> bài học
                </p>
              </li>
              <li className="course_detail_mini_title_courseIndex_detail">
                <p>
                  <span>1</span> bài học
                </p>
              </li>
              <li className="course_detail_mini_title_courseIndex_detail">
                <p>
                  <span>1</span> bài học
                </p>
              </li>
              <li className="course_detail_mini_title_courseIndex_detail">
                <p>
                  <span>1</span> bài học
                </p>
              </li>
              <li className="course_detail_mini_title_courseIndex_detail">
                <p>
                  <span>1</span> bài học
                </p>
              </li>
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
          <CourseBox />
          <p className="course_detail_aside_price">1.000.000đ</p>
          <button className="course_detail_aside_button">ĐĂNG KÝ HỌC</button>
          <div className="course_detail_aside_info">
            <div className="course_detail_aside_info_line">
              <MdOutlineSpeed />
              <p>Trình độ cơ bản</p>
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
              <p>Trình độ cơ bản</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
