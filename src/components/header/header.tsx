"use client"

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Dropdown, DatePicker } from "antd";
import type { MenuProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const Header = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const datePickerRef = useRef<HTMLDivElement>(null);

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

  const userItems: MenuProps = {
    items: [
      { key: '1', label: 'Sign up' },
      { key: '2', label: 'Log in' },
      { type: 'divider' },
      { key: '3', label: 'Host your home' },
      { key: '4', label: 'Host an experience' },
      { key: '5', label: 'Help' },
    ]
  };

  const _renderLogo = () => (
    <Link href="/" className="flex items-center no-underline">
      <div className="text-rose-500 font-bold text-2xl flex items-center">
        <span className="font-serif italic">Homie.</span>
      </div>
    </Link>
  );

  const _renderNavigation = () => (
    <div className="flex space-x-4 ">
      <Link href="#" className="font-semibold px-2">Home</Link>
      <Link href="#" className="font-semibold px-2">Experiences</Link>
    </div>
  );

  const _renderLanguageDropdown = () => (
    <Dropdown menu={languageItems} placement="bottomRight">
      <button className="rounded-full p-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </button>
    </Dropdown>
  );

  const _renderUserDropdown = () => (
    <Dropdown menu={userItems} placement="bottomRight">
      <button className="rounded-full border border-gray-300 pl-3 pr-1 py-1 flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </button>
    </Dropdown>
  );

  const _renderUserControls = () => (
    <div className="flex items-center gap-4">
      {_renderLanguageDropdown()}
      {_renderUserDropdown()}
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
      {_renderSearchButton()}
      {showDatePicker && _renderDatePickerPopup()}
    </div>
  );

  const _renderSearchButton = () => (
    <div className="p-2 rounded-full bg-rose-500 text-white cursor-pointer flex items-center justify-center ml-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
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
    <div className="max-w-full mx-auto px-10 b8 lg:px-28 py-4">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full mb-4">
          {_renderLogo()}
          {_renderNavigation()}
          {_renderUserControls()}
        </div>
       {_renderSearchBar()}
      </div>
    </div>
  );
};

export default Header;