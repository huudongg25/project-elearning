import React from "react";
import DefaultLayout from "../layouts/default/defaultLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/home";
import Course from "../components/course/course";
import CoursesLayout from "../layouts/course/coursesLayout";
import Learning from "../components/courseLearning/learning";
import Profile from "../components/profile/profile";
import MyCourses from "../components/myCourses/myCourses";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout child={<Home />} />} />
        <Route path="/courses" element={<DefaultLayout child={<Course />} />} />
        <Route
          path="/learning/:id"
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
