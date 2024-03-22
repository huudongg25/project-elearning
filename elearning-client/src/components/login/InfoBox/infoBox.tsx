import React, { useState } from "react";
import "./infoBox.css";
import { Button, Form, Input } from "antd";
import { TiSocialYoutube } from "react-icons/ti";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
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

const RegisterBox = () => {
  const [showLoginBox, setShowLoginBox] = useState(false);

  const handleRegisterClick = () => {
    setShowLoginBox(false);
  };

  const handleLoginClick = () => {
    setShowLoginBox(true);
  };

  return (
    <div className="info_box">
      {showLoginBox ? (
        <div className="login_body">
          <h2> Lập trình dễ dàng bắt đầu từ số 0 </h2>
          <div className="login_form">
            <Form
              {...formItemLayout}
              style={{ maxWidth: 600 }}
              className="login_form"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email hợp lệ!" },
                ]}
                className="login_input"
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Yêu cầu mật khẩu!" }]}
                className="login_input"
              >
                <Input type="password" placeholder="Mật khẩu" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 36 }} className="login_button">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 100, height: 38, backgroundColor: "#FF8A37" }}
                >
                  Đăng Nhập
                </Button>
                <Button
                  type="primary"
                  style={{ width: 140, height: 38, marginLeft: 20 }}
                  onClick={handleRegisterClick}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="login_navigator">
            <TiSocialYoutube className="login_navigator_icon youtube" />
            <BiLogoFacebookSquare className="login_navigator_icon facebook" />
            <FaInstagram className="login_navigator_icon instagram" />
            <FaGithub className="login_navigator_icon github" />
          </div>
        </div>
      ) : (
        <div className="register_body">
          <h2> Đăng kí ngay để nhận các khóa học miễn phí</h2>
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
                <Input placeholder="Tên của bạn" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Vui lòng không để trống!" },
                ]}
                className="register_input"
              >
                <Input placeholder="Họ của bạn" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email hợp lệ!" },
                ]}
                className="register_input"
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Yêu cầu mật khẩu!" }]}
                className="register_input"
              >
                <Input type="password" placeholder="Mật khẩu" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 36 }} className="register_button">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 100, height: 38, backgroundColor: "#FF8A37" }}
                >
                  Đăng Kí
                </Button>
                <Button
                  type="primary"
                  style={{ width: 140, height: 38, marginLeft: 20 }}
                  onClick={handleLoginClick}
                >
                  Đã có tài khoản ?
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterBox;
