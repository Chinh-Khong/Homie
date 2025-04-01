'use client';

import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isShowLogin, setIsShowLogin }) => {
  const handleCancel = () => {
    setIsShowLogin(false);
  };

  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
    setIsShowLogin(false);
  };

  return (
    <Modal
      open={isShowLogin}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Chào mừng bạn đến với Homie</h2>
        <p className="text-gray-500 text-lg">Vui lòng đăng nhập để tiếp tục</p>
      </div>
      <Form
        layout="vertical"
        onFinish={handleLogin}
        className="py-4"
      >
        <Form.Item
          label={<span className="font-bold text-lg">Email <span className="text-red-500">*</span></span>}
          name="email"
        >
          <Input placeholder="Nhập email của bạn" className="h-[50px] text-md" />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-lg">Mật khẩu <span className="text-red-500">*</span></span>}
          name="password"
        >
          <Input.Password placeholder="Nhập mật khẩu của bạn" className="h-[50px] text-md" />
        </Form.Item>
        <Button
          type="primary"
          className="!text-white !h-[50px] !w-full !text-lg !font-medium"
        >
          Đăng nhập
        </Button>
      </Form>
    </Modal >
  );
};

export default ModalLogin;