import React from "react";
import "./coursesLayout.css";
import Header from "../../components/courseHeader/header";
import Footer from "../../components/courseFooter/footer";

interface Props {
  child: JSX.Element;
}
const CoursesLayout = (props: Props): JSX.Element => {
  return (
    <div className="course_layout">
      <div className="header_course_layout">
        <Header />
      </div>
      <div className="child">{props.child}</div>
      <div className="footer_course_layout">
        <Footer />
      </div>
    </div>
  );
};

export default CoursesLayout;
