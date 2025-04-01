"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Dropdown, DatePicker } from "antd";
import type { MenuProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const Header = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [screenSize, setScreenSize] = useState("mobile");
  const [activeNav, setActiveNav] = useState("home"); // Track active navigation
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Language dropdown items
  const languageItems: MenuProps = {
    items: [
      { key: '1', label: 'English' },
      { key: '2', label: 'Vietnamese' },
      { key: '3', label: 'Japanese' },
      { key: '4', label: 'French' },
      { key: '5', label: 'Chinese' },
    ]
  };

  // User dropdown items
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

  // Handler for nav item clicks
  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 py-3 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center w-full">
          {/* Top navigation bar */}
          <div className="flex items-center justify-between w-full mb-4">
            {/* Logo */}
            <Link href="/" className="flex items-center no-underline">
              <div className="text-rose-500 font-bold text-2xl flex items-center">
                <span className="font-serif italic ml-4">Homie</span>
              </div>
            </Link>

            {/* Center - Home and Experiences (visible on tablet and desktop) */}
            <div className={`${screenSize !== 'mobile' ? 'block absolute left-1/2 transform -translate-x-1/2' : 'hidden'}`}>
              <div className="flex space-x-1">
                <Link href="#" className="font-semibold px-2">Home</Link>
                <Link href="#" className="font-semibold px-2">Experiences</Link>
              </div>
            </div>

            {/* Right menu */}
            <div className="flex items-center gap-4">
              {/* Language dropdown */}
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

              {/* User menu button */}
              <div className="relative">
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
              </div>
            </div>
          </div>

          {/* Mobile navigation - Only visible on mobile */}
          {screenSize === "mobile" && (
            <div className="flex justify-center w-full my-2 gap-4">
              <Link
                href="#"
                className={`font-semibold px-2 py-1 text-sm no-underline text-gray-700 ${activeNav === "home" ? "font-bold" : ""}`}
                onClick={() => handleNavClick("home")}
              >
                Home
              </Link>
              <Link
                href="#"
                className={`font-semibold px-2 py-1 text-sm no-underline text-gray-700 ${activeNav === "experiences" ? "font-bold" : ""}`}
                onClick={() => handleNavClick("experiences")}
              >
                Experiences
              </Link>
            </div>
          )}

          {/* Search Bar */}
          <div className={`relative flex items-center border border-gray-200 rounded-full shadow-sm ${screenSize === "mobile" ? "p-1" : "p-2"} w-full max-w-xl mx-auto transition-shadow duration-200`}>
            <div className="grid grid-cols-2 w-full items-center">
              {/* Location search */}
              <div className="flex flex-col items-center justify-center p-1">
                <div className={`font-medium ${screenSize === "mobile" ? "text-sm" : "text-base"} text-center w-full`}>Location</div>
                <input
                  className={`${screenSize === "mobile" ? "text-xs" : "text-sm"} text-gray-600 outline-none text-center w-full`}
                  placeholder="Search destinations"
                />
              </div>

              {/* Date picker section with integrated search button */}
              <div className="flex items-center justify-between border-l border-gray-300 pl-2 p-1">
                <div className="flex-1">
                  <div className={`font-medium ${screenSize === "mobile" ? "text-sm" : "text-base"} text-center w-full`}>Schedule</div>
                  <div
                    className={`flex justify-center items-center ${screenSize === "mobile" ? "text-xs" : "text-sm"} text-gray-600 cursor-pointer`}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    {formatSelectedDates()}
                  </div>
                </div>

                {/* Search button */}
                <div className={`${screenSize === "mobile" ? "p-1" : "p-2"} rounded-full bg-rose-500 text-white cursor-pointer flex items-center justify-center ml-auto`}>
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

                {/* Date picker dropdown */}
                {showDatePicker && (
                  <div
                    ref={datePickerRef}
                    className={`absolute top-full ${screenSize === "mobile" ? "left-0 right-0" : "left-1/3"} mt-2 p-4 bg-white rounded-xl shadow-lg z-50`}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;