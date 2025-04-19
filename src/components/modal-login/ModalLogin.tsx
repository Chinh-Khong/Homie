"use client";

import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
  setIsShowRegister: (isShowRegister: boolean) => void;
  setIsShowForgotPassword: (isShowForgotPassword: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({
  isShowLogin,
  setIsShowLogin,
  setIsShowRegister,
  setIsShowForgotPassword,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleCancel = () => {
    setIsShowLogin(false);
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Login successful!", {
          position: "top-right",
        });

        setIsShowLogin(false);
        window.location.reload();
      } else {
        toast.error(result?.error || "Login failed!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during the login process!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const switchToRegister = () => {
    setIsShowLogin(false);
    setIsShowRegister(true);
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider);
  };

  const handleForgotPassword = () => {
    setIsShowForgotPassword(true);
    setIsShowLogin(false);
  };

  return (
    <Modal
      open={isShowLogin}
      onCancel={handleCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Welcome to Homie</h2>
        <p className="text-gray-500 text-lg">Please login to continue</p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleLogin}
        className="py-4 px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={
            <span className="font-bold text-lg">
              Email <span className="text-red-500">*</span>
            </span>
          }
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
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
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[50px] text-md"
          />
        </Form.Item>

        <div
          onClick={handleForgotPassword}
          className="pb-3 text-right font-semibold cursor-pointer text-base text-blue-500 hover:underline"
        >
          Forgot Password?
        </div>

        <Form.Item>
          <button className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main hover:bg-main/90 rounded-xl">
            Login
          </button>
        </Form.Item>

        <div className="text-center text-[16px] mb-4">Or login with:</div>

        {/* Social login buttons (uncomment if needed) */}
        {/* <div className="flex justify-center gap-4 pb-4">
          <Button
            onClick={() => handleSocialLogin("google")}
            className="bg-red-500 text-white h-[50px] w-[150px] text-lg font-medium rounded-xl"
          >
            Google
          </Button>
          <Button
            onClick={() => handleSocialLogin("facebook")}
            className="bg-blue-600 text-white h-[50px] w-[150px] text-lg font-medium rounded-xl"
          >
            Facebook
          </Button>
        </div> */}

        <div className="text-center text-[16px]">
          Don't have an account?{" "}
          <span
            className="font-semibold cursor-pointer text-blue-500 hover:underline"
            onClick={switchToRegister}
          >
            Sign Up
          </span>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalLogin;
