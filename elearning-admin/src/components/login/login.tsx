import React, { useState } from "react";
import "./login.css";
import { Button, Form, Input } from "antd";
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

const AdminLogin = () => {
  return (
    <div className="admin_login_container">
      <div className="admin_login_body">
        <h2>Admin Login</h2>
        <Form
          {...formItemLayout}
          style={{ maxWidth: 800 }}
          className="login_form"
        >
          <h4>Email</h4>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email hợp lệ!" }]}
            className="login_input"
          >
            <Input type="email" />
          </Form.Item>
          <h4>Password</h4>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Yêu cầu mật khẩu!" }]}
            className="login_input"
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 36 }} className="login_button">
            <Button
              htmlType="submit"
              style={{
                border: "none",
                width: 100,
                height: 40,
                backgroundColor: "transparent",
                color: "#38C6D0",
                textAlign: "center",
                borderBottom: "1px solid #38C6D0",
                borderLeft: "1px solid #38C6D0",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
