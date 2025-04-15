"use client"

import { IMAGE_URL } from "@/public";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Dropdown, DatePicker } from "antd";
import type { MenuProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import ModalLogin from "../modal-login/ModalLogin";
import ModalRegister from "../modal-register/ModalRegister";
import { useRouter } from "next/navigation";
import { RouterUrl } from "@/src/constants/path";
import ModalForgotPassword from "../modal-email-pw/ModalForgotPassword";
import ModalVerifyCode from "../modal-verify-pw/ModalVerifyCode";
import ModalSetPassword from "../modal-set-pw/ModalSetPassword";

const { RangePicker } = DatePicker;

const Header = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [isShowSetPassword, setIsShowSetPassword] = useState(false);
  const router = useRouter();

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setSelectedDates(dates);
    } else {
      setSelectedDates([null, null]);
    }
  };

  const handleApplyDates = () => {
    setShowDatePicker(false);
  };

  const handleClearDates = () => {
    setSelectedDates([null, null]);
    setShowDatePicker(false);
  };

  const formatSelectedDates = () => {
    if (!selectedDates[0] || !selectedDates[1]) return "Add dates";
    const format = "D MMM";
    return `${selectedDates[0].format(format)} - ${selectedDates[1].format(format)}`;
  };

  const languageItems: MenuProps = {
    items: [
      { key: '1', label: 'English' },
      { key: '2', label: 'Vietnamese' },
      { key: '3', label: 'Japanese' },
      { key: '4', label: 'French' },
      { key: '5', label: 'Chinese' },
    ]
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      setIsShowRegister(true);
    } else if (key === '2') {
      setIsShowLogin(true);
    }
    else if (key === '3') {
      router.push(RouterUrl.PROFILE);
    }
  };

  const userItems: MenuProps = {
    items: [
      {
        key: '1',
        label: <span className="font-semibold w-full block">Sign Up</span>,
      },
      {
        key: '2',
        label: <span className="font-semibold w-full block">Log in</span>,
      },
      {
        key: '3',
        label: <span className="font-semibold w-full block">Profile</span>,
      },
      { key: '4', label: 'Host an experience' },
      { key: '5', label: 'Help' },
    ],
    onClick: handleMenuClick,
  };


  const _renderLogo = () => (
    <Link href="/" className="flex items-center no-underline">
      <div className="text-rose-500 font-bold text-2xl flex items-center">
        <span className="font-serif italic">Homie.</span>
      </div>
    </Link>
  );

  const _renderNavigation = () => (
    <div className="hidden md:flex space-x-4 text-[24px]">
      <Link href="#" className="font-semibold px-2">Home</Link>
      <Link href="#" className="font-semibold px-2">Experiences</Link>
    </div>
  );

  const _renderUserControls = () => (
    <div className="flex items-center gap-4">
      <Dropdown menu={languageItems} placement="bottomRight">
        <button className="rounded-full p-2 cursor-pointer">
          <Image
            src={IMAGE_URL.LANGUAGE}
            alt="Language selector"
            width={25}
            height={25}
          />
        </button>
      </Dropdown>

      <Dropdown
        menu={userItems}
        placement="bottomRight"
        trigger={['click']}
      >
        <button className="rounded-full border border-gray-300 flex gap-2 items-center px-4 py-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <Image
            src={IMAGE_URL.MENU}
            alt="Menu"
            width={20}
            height={20}
          />
          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Image
              src={IMAGE_URL.USER}
              alt="User profile"
              width={45}
              height={45}
            />
          </div>
        </button>
      </Dropdown>
    </div>
  );

  const _renderLocationSearch = () => (
    <div className="flex flex-col items-center justify-center p-1">
      <div className="font-medium text-base text-center w-full">Location</div>
      <input
        className="text-sm text-gray-600 outline-none text-center w-full"
        placeholder="Search destinations"
      />
    </div>
  );

  const _renderDatePickerComponent = () => (
    <div className="flex items-center justify-between border-l border-gray-300 pl-2 p-1">
      <div className="flex-1">
        <div className="font-medium text-base text-center w-full">Schedule</div>
        <div
          className="flex justify-center items-center text-sm text-gray-600 cursor-pointer"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {formatSelectedDates()}
        </div>
      </div>
      <Image
        src={IMAGE_URL.SEARCH}
        alt="Search"
        width={45}
        height={45}
        className="cursor-pointer"
      />
      {showDatePicker && _renderDatePickerPopup()}
    </div>
  );

  const _renderDatePickerPopup = () => (
    <div
      ref={datePickerRef}
      className="absolute top-[110%] left-1/3 right-0 mt-2 p-4 bg-white rounded-xl shadow-lg z-50"
    >
      <RangePicker
        className="w-full"
        format="DD/MM/YYYY"
        value={selectedDates}
        onChange={handleDateChange}
      />
      <div className="mt-4 flex justify-between">
        <button
          className="text-gray-500 underline cursor-pointer bg-transparent border-none"
          onClick={handleClearDates}
        >
          Clear dates
        </button>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded-md cursor-pointer border-none"
          onClick={handleApplyDates}
        >
          Apply
        </button>
      </div>
    </div>
  );

  const _renderSearchBar = () => (
    <div className="relative flex items-center border border-gray-200 rounded-full shadow-sm p-2 w-full max-w-xl mx-auto">
      <div className="grid grid-cols-2 w-full items-center">
        {_renderLocationSearch()}
        {_renderDatePickerComponent()}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 items-center w-full lg:px-38 py-6 px-4">
      <div className="flex items-center justify-between w-full">
        {_renderLogo()}
        {_renderNavigation()}
        {_renderUserControls()}
      </div>
      {_renderSearchBar()}
      {isShowLogin && (
        <ModalLogin
          isShowLogin={isShowLogin}
          setIsShowLogin={setIsShowLogin}
          setIsShowRegister={setIsShowRegister}
          setIsShowForgotPassword={setIsShowForgotPassword}
        />
      )}
      {isShowRegister && (
        <ModalRegister
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
          setIsShowLogin={setIsShowLogin}
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
          setIsShowLogin={setIsShowLogin}
          setIsShowSetPassword={setIsShowSetPassword}
        />
      )}
      {isShowSetPassword && (
        <ModalSetPassword
          isShowSetPassword={isShowSetPassword}
          setIsShowSetPassword={setIsShowSetPassword}
          setIsShowLogin={setIsShowLogin}
        />
        )}
    </div>
  );
};

export default Header;