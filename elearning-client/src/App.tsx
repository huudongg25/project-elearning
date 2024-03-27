import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./routers/routers.route";
import { ToastContainer } from "react-toastify";
import UserService from "./services/user.service";
import { useNavigate } from "react-router-dom";
import useSocket from "./hooks/socket.hooks";
import { ToastWarning } from "./common/toastify.common";

function App() {
  const userService = new UserService();
  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    socket.on("logout", async (id: any) => {
      if (id === user?.id) {
        await userService.logout();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
        ToastWarning("Your account has been Blocked");
      }
    });
  });
  return (
    <div className="App">
      <Routers />
      <ToastContainer />
    </div>
  );
}

export default App;
