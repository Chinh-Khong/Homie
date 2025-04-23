"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/src/components/header/AdminHeader";
import AdminSidebar from "@/src/components/sidebar/AdminSidebar";
import axios from "axios";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.get("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data.success) {
          router.push("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        router.push("/");
      }
    };

    verifyAdmin();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="relative max-h-screen h-screen flex flex-col">
      <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar - hidden on mobile by default */}
        <div
          className={`
          fixed inset-0 z-10 transform lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
        >
          <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col mt-12 lg:mt-0 max-h-[calc(100vh-58px)] overflow-scroll">
          <div className="flex-1 bg-[#ffe3e8] p-4 pt-20 lg:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
