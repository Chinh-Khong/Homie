"use client";

import { IMAGE_URL } from "@/public";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import ModalLogin from "../ModalComponent/ModalLogin/ModalLogin";
import { useRouter } from "next/navigation";
import { RouterUrl } from "@/src/constants/path";
import ModalForgotPassword from "../ModalComponent/ModalEmailPW/ModalForgotPassword";
import ModalVerifyCode from "../ModalComponent/ModalVerifyPW/ModalVerifyCode";
import ModalSetPassword from "../ModalComponent/ModalSetPW/ModalSetPassword";
import ModalVerifyOTP from "../ModalComponent/ModalVerifyOTP/ModalVerify";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import ModalRegister from "../ModalComponent/ModalRegister/ModalRegister";
import axios from "axios";

const Header = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [isShowSetPassword, setIsShowSetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [isShowVerify, setIsShowVerify] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isToken, setIsToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setSessionToken(token);
      }
    }
  }, [isToken]);

  useEffect(() => {
    getInfoUser();
  }, []);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        if (!sessionToken) return;

        const response = await axios.get("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });

        if (response.data.success) {
          router.push("/admin/manage-user");
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          router.push("/");
          return;
        }
        toast.error(error?.response?.data?.message || "Verification failed");
      }
    };

    verifyAdmin();
  }, [sessionToken]);

  const getInfoUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } 
    } catch (error) {}
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      setIsShowRegister(true);
    } else if (key === "2") {
      setIsShowLogin(true);
    } else if (key === "3") {
      router.push(RouterUrl.PROFILE);
    } else if (key === "4") {
      router.push(RouterUrl.HISTORY);
    } else if (key === "5") {
      localStorage.removeItem("token");
      signOut({ redirect: true, callbackUrl: "/home" });
    } else if (key === "7") {
      router.push(RouterUrl.FAVORITE);
    }
  };

  const userItems: MenuProps = {
    items: [
      ...(!sessionToken ? [{ key: "1", label: "Sign Up" }] : []),
      ...(!sessionToken ? [{ key: "2", label: "Login" }] : []),
      ...(sessionToken ? [{ key: "3", label: "Profile" }] : []),
      ...(sessionToken ? [{ key: "4", label: "Book History" }] : []),
      ...(sessionToken ? [{ key: "7", label: "Favorite" }] : []),
      ...(sessionToken ? [{ key: "5", label: "Log out" }] : []),
      { key: "6", label: "Help" },
    ],
    onClick: handleMenuClick,
  };

  const _renderLogo = () => (
    <div className="text-rose-500 font-bold text-2xl flex items-center">
      <a href={RouterUrl.HOME} className="font-serif italic">
        Homie.
      </a>
    </div>
  );

  const _renderUserControls = () => (
    <div className="flex items-center gap-4">
      <Dropdown menu={userItems} placement="bottomRight" trigger={["click"]}>
        <button className="rounded-full border border-gray-300 flex gap-2 items-center px-4 py-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <Image src={IMAGE_URL.MENU} alt="Menu" width={20} height={20} />
            <img
              src={user && user.avatar ? user.avatar : IMAGE_URL.USER}
              alt="User profile"
              className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center"
            />
        </button>
      </Dropdown>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 items-center w-full lg:px-38 py-6 px-4">
      <div className="flex items-center justify-between w-full">
        {_renderLogo()}
        {_renderUserControls()}
      </div>
      {isShowLogin && (
        <ModalLogin
          setIsToken={setIsToken}
          isShowLogin={isShowLogin}
          setIsShowLogin={setIsShowLogin}
          setIsShowRegister={setIsShowRegister}
          setIsShowForgotPassword={setIsShowForgotPassword}
          setIsShowVerify={setIsShowVerify}
          isShowVerify={isShowVerify}
        />
      )}
      {isShowRegister && (
        <ModalRegister
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
          setIsShowLogin={setIsShowLogin}
          setIsShowVerify={setIsShowVerify}
          isShowVerify={isShowVerify}
          setEmail={setEmail}
          email={email}
        />
      )}
      {isShowForgotPassword && (
        <ModalForgotPassword
          isShowForgotPassword={isShowForgotPassword}
          setIsShowForgotPassword={setIsShowForgotPassword}
          setIsShowLogin={setIsShowLogin}
          setIsShowVerifyCode={setIsShowVerifyCode}
        />
      )}
      {isShowVerifyCode && (
        <ModalVerifyCode
          isShowVerifyCode={isShowVerifyCode}
          setIsShowVerifyCode={setIsShowVerifyCode}
          setIsShowSetPassword={setIsShowSetPassword}
          setIsShowLogin={setIsShowLogin}
          email={email}
          resetToken={resetToken}
          setResetToken={setResetToken}
        />
      )}
      {isShowSetPassword && (
        <ModalSetPassword
          isShowSetPassword={isShowSetPassword}
          setIsShowSetPassword={setIsShowSetPassword}
          setIsShowLogin={setIsShowLogin}
          resetToken={resetToken}
        />
      )}
      {isShowVerify && (
        <ModalVerifyOTP
          isShowVerify={isShowVerify}
          setIsShowVerify={setIsShowVerify}
          email={email}
          setIsShowLogin={setIsShowLogin}
        />
      )}
    </div>
  );
};

export default Header;
