import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "./login.css";
import { Button, Form, Input } from "antd";
import LoginBanner from "../loginBanner/loginBanner";
import { IntfLogin, IntfUser } from "../../../types/entities.type";
import UserService from "../../../services/user.service";
import { ToastSuccess, ToastWarning } from "../../../common/toastify.common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// interface Props {
//   offLogin: Function;
// }
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const Login = () => {
  const userService = new UserService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [formRegister, setFormRegister] = useState<IntfUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formLogin, setLogin] = useState<IntfLogin>({
    email: "",
    password: "",
  });
  const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterClick = () => {
    setShowLoginBox(false);
  };

  const handleLoginClick = () => {
    setShowLoginBox(true);
  };

  const changeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
    // const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$");
    // const isValid = regex.test(formRegister.email);
    // const parentElements = e.target.parentElement as HTMLElement;
  };
  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    // setIsLoading(true);
    const data = await userService.register(formRegister);
    if (data === 1) {
      ToastSuccess("Register Success");
      setShowLoginBox(true);
      setFormRegister({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else {
      ToastWarning("Please check all information again");
    }
  };
  // Đăng Nhập

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    ToastSuccess("bấm đc");
    try {
      const data = await userService.login(formLogin);
      if (data.status === 200) {
        if (data.data.data.user.status === 1) {
          localStorage.setItem("token", data.data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.data.data.user));
          navigate("/");
          ToastSuccess("Đăng nhập thành công");
        } else {
          ToastWarning("Your account has been Blocked");
          return;
        }
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        ToastWarning("Login Failed");
      } else if (error.response.status === 404) {
        ToastWarning("Email is not exist!");
      } else if (error.response.status === 400) {
        ToastWarning("Password incorrect!");
      }
    }
  };
  return (
    <div className="login_container">
      <div className="login_container_body">
        <LoginBanner />
        <div className="info_box">
          {showLoginBox ? (
            <div className="login_body">
              <h2> Lập trình dễ dàng bắt đầu từ số 0. </h2>

              <div className="login_form">
                <Form
                  {...formItemLayout}
                  style={{ maxWidth: 600 }}
                  className="login_form"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email hợp lệ!",
                      },
                    ]}
                    className="login_input"
                  >
                    <Input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={changeLogin}
                      value={formLogin.email}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "Yêu cầu mật khẩu!" }]}
                    className="login_input"
                    name="password"
                  >
                    <Input
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={changeLogin}
                      value={formLogin.password}
                    />
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 36 }} className="login_button">
                    <Button
                      style={{
                        width: 200,
                        height: 38,
                        backgroundColor: "#FE5F59",
                        color: "white",
                        textAlign: "center",
                      }}
                      onClick={handleLogin}
                    >
                      Đăng Nhập
                    </Button>
                    <Button
                      style={{
                        width: 200,
                        height: 38,
                        backgroundColor: "transparent",
                        marginTop: 20,
                      }}
                      onClick={handleRegisterClick}
                    >
                      Bạn chưa có tài khoản ?
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              {/* <div className="login_navigator">
            <TiSocialYoutube className="login_navigator_icon youtube" />
            <BiLogoFacebookSquare className="login_navigator_icon facebook" />
            <FaInstagram className="login_navigator_icon instagram" />
            <FaGithub className="login_navigator_icon github" />
          </div> */}
            </div>
          ) : (
            <div className="register_body">
              <h2> Đăng kí ngay để nhận các khóa học miễn phí.</h2>
              <div className="register_form">
                <Form
                  {...formItemLayout}
                  style={{ maxWidth: 600 }}
                  className="register_form"
                >
                  <Form.Item
                    name="firstName"
                    rules={[
                      { required: true, message: "Vui lòng không để trống!" },
                    ]}
                    className="register_input"
                  >
                    <Input
                      name="firstName"
                      value={formRegister.firstName}
                      placeholder="Tên của bạn"
                      onChange={changeRegister}
                    />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      { required: true, message: "Vui lòng không để trống!" },
                    ]}
                    className="register_input"
                  >
                    <Input
                      name="lastName"
                      placeholder="Họ của bạn"
                      onChange={changeRegister}
                      value={formRegister.lastName}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email hợp lệ!",
                      },
                    ]}
                    className="register_input"
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={changeRegister}
                      value={formRegister.email}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Yêu cầu mật khẩu!" }]}
                    className="register_input"
                  >
                    <Input
                      name="password"
                      type="password"
                      placeholder="Mật khẩu"
                      onChange={changeRegister}
                      value={formRegister.password}
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{ span: 36 }}
                    className="register_button"
                  >
                    <Button
                      htmlType="submit"
                      style={{
                        width: 200,
                        height: 38,
                        backgroundColor: "#FE5F59",
                        color: "white",
                      }}
                      onClick={handleRegister}
                    >
                      Đăng Kí
                    </Button>
                    <Button
                      style={{
                        width: 200,
                        height: 38,
                        backgroundColor: "transparent",
                      }}
                      onClick={handleLoginClick}
                    >
                      Bạn đã có tài khoản ?
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
