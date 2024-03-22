import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/defaultLayout/defaultLayout";
import AdminHome from "../components/home/homePage/homePage";
import AdminCourse from "../components/courses/adminCourse";
import AdminMessages from "../components/messages/messages";
import AdminUsers from "../components/users/users";
import Login from "../components/login/login";
import AdminLogin from "../components/login/login";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout child={<AdminHome />} />} />
        <Route
          path="/adminCourses"
          element={<DefaultLayout child={<AdminCourse />} />}
        />
        <Route
          path="/adminMessages"
          element={<DefaultLayout child={<AdminMessages />} />}
        />
        <Route
          path="/adminUsers"
          element={<DefaultLayout child={<AdminUsers />} />}
        />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default Routers;
