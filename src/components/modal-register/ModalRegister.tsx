"use client";

import React from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";

interface ModalRegisterProps {
  isShowRegister: boolean;
  setIsShowRegister: (isShowRegister: boolean) => void;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalRegister: React.FC<ModalRegisterProps> = ({
  isShowRegister,
  setIsShowRegister,
  setIsShowLogin,
}) => {
  const handleCancel = () => {
    setIsShowRegister(false);
  };

  const handleRegister = (values: any) => {
    console.log("Register values:", values);
    setIsShowRegister(false);
  };

  const switchToLogin = () => {
    setIsShowRegister(false);
    setIsShowLogin(true);
  };

  return (
    <Modal open={isShowRegister} onCancel={handleCancel} footer={null}>
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Register an account</h2>
        <p className="text-gray-500 text-lg">
          Create an account to start the experience
        </p>
      </div>
      <Form
        layout="vertical"
        onFinish={handleRegister}
        className="py-4 !px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={
            <span className="font-bold text-lg">
              Email <span className="text-red-500">*</span>
            </span>
          }
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Enter your email" className="h-[50px] text-md" />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-bold text-lg">
              Password <span className="text-red-500">*</span>
            </span>
          }
          name="password"
          rules={[{ required: true, message: "Please enter the password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[50px] text-md"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-bold text-lg">
              Confirm Password <span className="text-red-500">*</span>
            </span>
          }
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm the password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password does not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Re-enter your password"
            className="h-[50px] text-md"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error("You need to agree with the terms!")
                  ),
            },
          ]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>
        <Form.Item>
          <button
            className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main !hover:none rounded-xl text-center cursor-pointer"
          >
            Register
          </button>
        </Form.Item>
        <div className="text-center text-[16px]">
          Already have an account? <span onClick={switchToLogin} className="font-semibold cursor-pointer">Sign In</span>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalRegister;
