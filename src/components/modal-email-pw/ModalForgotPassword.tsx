'use client';

import { Modal, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"; 

interface ModalForgotPasswordProps {
  isShowForgotPassword: boolean;
  setIsShowForgotPassword: (isShowForgotPassword: boolean) => void;
  setIsShowLogin: (isShowLogin: boolean) => void;
  setIsShowVerifyCode: (isShowVerifyCode: boolean) => void;
}

const ModalForgotPassword: React.FC<ModalForgotPasswordProps> = ({
  isShowForgotPassword,
  setIsShowForgotPassword,
  setIsShowLogin,
  setIsShowVerifyCode,
}) => {
  const handleCancel = () => {
    setIsShowForgotPassword(false);
    setIsShowLogin(true);
  };

  const handleSubmit = (values: { email: string }) => {
    console.log("Password reset requested for:", values.email);
    setIsShowForgotPassword(false);
    setIsShowVerifyCode(true);
  };

  const switchToLogin = () => {
    setIsShowForgotPassword(false);
    setIsShowLogin(true);
  };

  return (
    <Modal
      open={isShowForgotPassword}
      onCancel={handleCancel}
      footer={null}
    >
       <button
        onClick={switchToLogin}
        className="text-rose-500 hover:text-rose-700 text-lg mb-6 inline-flex items-center font-medium transition-colors gap-2 cursor-pointer"
      >
        <span className="mr-1"><ArrowLeftOutlined /></span> Back to login
      </button>


      <div className="text-center py-4">
        <h2 className="text-2xl font-bold">Forgot your password?</h2>
        <p className="text-gray-500 text-lg">Enter your email below to reset your password</p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="py-4 !px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={<span className="font-bold text-lg">Email <span className="text-red-500">*</span></span>}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="h-[50px] text-md"
          />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main hover:bg-main-dark rounded-xl text-center cursor-pointer transition-colors"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForgotPassword;