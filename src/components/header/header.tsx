"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Dropdown, DatePicker } from "antd";
import type { MenuProps } from 'antd';
const { RangePicker } = DatePicker;

// CSS Styles with proper typing
const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem"
  },
  container: {
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  topNavBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "1rem"
  },
  logo: {
    color: "#f43f5e",
    fontWeight: "bold",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center"
  },
  logoText: {
    fontFamily: "serif",
    fontStyle: "italic",
    marginLeft: "0.5rem"
  },
  navCenter: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"
  },
  navLinks: {
    display: "flex",
    columnGap: "0.25rem"
  },
  navLink: {
    fontWeight: 600,
    padding: "0 0.5rem"
  },
  rightMenu: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  iconButton: {
    borderRadius: "9999px",
    padding: "0.5rem",
    cursor: "pointer"
  },
  userButton: {
    borderRadius: "9999px",
    border: "1px solid #d1d5db",
    paddingLeft: "0.75rem",
    paddingRight: "0.25rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center"
  },
  userAvatar: {
    height: "2rem",
    width: "2rem",
    backgroundColor: "#e5e7eb",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchBar: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: "9999px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    padding: "0.1rem", 
    width: "100%",
    maxWidth: "40rem", 
    marginLeft: "auto",
    marginRight: "auto",
    transition: "box-shadow 0.2s"
  },
  searchGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "100%"
  },
  searchSection: {
  alignItems: "center", 
  justifyContent: "center",
  padding: "0.1rem"
  },
  searchBorder: {
    borderLeft: "1px solid #d1d5db"
  },
  searchTitle: {
    fontWeight: 500,
    fontSize: "1rem",
    textAlign: "center",
    width: "100%"
  },
  searchInput: {
    fontSize: "0.875rem",
    color: "#4b5563",
    outline: "none",
    textAlign: "center",
    width: "100%"
  },
  clickableText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#4b5563",
    cursor: "pointer"
    
  },
  calendarDropdown: {
    position: "absolute",
    top: "100%",
    left: "33.333333%",
    marginTop: "0.5rem",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 50
  },
  buttonRow: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between"
  },
  clearButton: {
    color: "#6b7280",
    textDecoration: "underline",
    cursor: "pointer"
  },
  applyButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#f43f5e",
    color: "white",
    borderRadius: "0.375rem",
    cursor: "pointer"
  },
  searchButton: {
    padding: "0.5rem",
    borderRadius: "9999px",
    backgroundColor: "#f43f5e",
    color: "white",
    cursor: "pointer"
  },
  flex1: {
    flex: 1
  },
  flexBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
};

const Header = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.flexColumn}>
          {/* Top navigation bar */}
          <div style={styles.topNavBar}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <div style={styles.logo}>
                <span style={styles.logoText}>Homie</span>
              </div>
            </Link>

            {/* Center - Home and Experiences */}
            <div style={styles.navCenter}>
              <div style={styles.navLinks}>
                <Link href="#" style={styles.navLink as React.CSSProperties}>Home</Link>
                <Link href="#" style={styles.navLink as React.CSSProperties}>Experiences</Link>
              </div>
            </div>

            {/* Right menu */}
            <div style={styles.rightMenu}>
              {/* Language dropdown */}
              <Dropdown menu={languageItems} placement="bottomRight">
                <button style={styles.iconButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </button>
              </Dropdown>

              {/* User menu button */}
              <div style={{ position: "relative" }}>
                <Dropdown menu={userItems} placement="bottomRight">
                  <button style={styles.userButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <div style={styles.userAvatar}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: "1rem", height: "1rem" }}
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

          {/* Search Bar */}
          <div style={styles.searchBar}>
            <div style={styles.searchGrid}>
              {/* Location search */}
              <div style={styles.searchSection}>
                <div style={styles.searchTitle}>Location</div>
                <input 
                  style={styles.searchInput} 
                  placeholder="Search destinations" 
                />
              </div>
              
              {/* Date picker section with integrated search button */}
              <div style={{
                ...styles.searchSection, 
                ...styles.searchBorder, 
                ...styles.flexBetween
              } as React.CSSProperties}>
                <div style={styles.flex1}>
                  <div style={styles.searchTitle}>Schedule</div>
                  <div 
                    style={styles.clickableText}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    Add dates
                  </div>
                </div>
                
                {/* Search button */}
                <div style={styles.searchButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "1rem", height: "1rem" }}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                
                {/* Date picker dropdown */}
                {showDatePicker && (
                  <div 
                    ref={datePickerRef}
                    style={styles.calendarDropdown}
                  >
                    <RangePicker 
                      style={{ width: "100%" }} 
                      format="DD/MM/YYYY"
                    />
                    <div style={styles.buttonRow}>
                      <button 
                        style={styles.clearButton}
                        onClick={() => setShowDatePicker(false)}
                      >
                        Clear dates
                      </button>
                      <button 
                        style={styles.applyButton}
                        onClick={() => setShowDatePicker(false)}
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