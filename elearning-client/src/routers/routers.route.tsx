import React from "react";
import DefaultLayout from "../layouts/default/defaultLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/homePage/home";
import CoursesLayout from "../layouts/course/coursesLayout";
import Learning from "../components/course/courseLearning/learning";
import Profile from "../components/profile/profile";
import MyCourses from "../components/myCourses/myCourses";
import CoursePage from "../components/course/coursePage/course";

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
          path="/courses/Learning/:id"
          element={<CoursesLayout child={<Learning />} />}
        />
        <Route
          path="/profile/:id"
          element={<DefaultLayout child={<Profile />} />}
        />
        <Route
          path="/myCourses"
          element={<DefaultLayout child={<MyCourses />} />}
        />
      </Routes>
    </>
  );
};

export default Routers;
