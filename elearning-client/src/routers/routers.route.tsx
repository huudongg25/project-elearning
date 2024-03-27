import React from "react";
import DefaultLayout from "../layouts/default/defaultLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/homePage/home";
import CoursesLayout from "../layouts/course/coursesLayout";
import Profile from "../components/profile/profile";
import MyCourses from "../components/myCourses/myCourses";
import CoursePage from "../components/course/coursePage/course";
import Login from "../components/login/loginPage/login";
// import CourseDetail from "../components/courseDetail/courseDetail";
// import CourseLesson from "../components/course/courseLesson/lesson";
import Learning from "../components/course/courseLesson/lesson";
import CourseDetail from "../components/courseDetail/courseDetail";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout child={<Home />} />} />
        <Route
          path="/courses"
          element={<DefaultLayout child={<CoursePage />} />}
        />
        <Route
          path="/courses/learning/:id"
          element={<CoursesLayout child={<Learning />} />}
        />
        <Route
          path="/profile/:id"
          element={<DefaultLayout child={<Profile />} />}
        />
        <Route
          path="/courses/detail/:id"
          element={<DefaultLayout child={<CourseDetail />} />}
        />

        <Route
          path="/myCourses"
          element={<DefaultLayout child={<MyCourses />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Routers;
