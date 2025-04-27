"use client";

import React from "react";
import { Modal, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormInput from "../../FormInput/FormInput";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
  setIsShowRegister: (isShowRegister: boolean) => void;
  setIsShowForgotPassword: (isShowForgotPassword: boolean) => void;
  setIsShowVerify: (isShowVerify: boolean) => void;
  isShowVerify: boolean;
  setIsToken: (isToken: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({
  isShowLogin,
  setIsShowLogin,
  setIsShowRegister,
  setIsShowForgotPassword,
  setIsShowVerify,
  isShowVerify,
  setIsToken,
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const handleCancel = () => {
    setIsShowLogin(false);
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));
      if (data.meta === 401) {
        setIsShowVerify(true);
        setIsShowLogin(false);
        toast.error("Please authenticate OTP before logging in!", {
          position: "top-right",
        });
        return;
      }
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        setIsToken(true);
        setIsShowLogin(false);
        toast.success(data.message || "Login successful!", {
          position: "top-right",
        });

        if (data.isAdmin) router.push("/admin");
      } else {
        toast.error(data.message || "Login failed!", { position: "top-right" });
      }
    } catch (error) {
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
        <p className="text-gray-500 text-lg">
          Please login to continue con cac
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleLogin}
        className="py-4 px-2"
        requiredMark="optional"
      >
        <FormInput
          label="Email"
          name="email"
          placeholder="Enter your email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        />

        <div
          onClick={handleForgotPassword}
          className="pb-3 text-right font-semibold cursor-pointer text-base text-blue-500 hover:underline"
        >
          Forgot Password?
        </div>

        <Form.Item>
          <button className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main hover:bg-main/90 rounded-xl cursor-pointer">
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
