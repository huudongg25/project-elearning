import React from "react";
import DefaultLayout from "../layouts/defaultLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/home";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout child={<Home />} />} />
      </Routes>
    </>
  );
};

export default Routers;
