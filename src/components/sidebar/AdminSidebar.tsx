"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserOutlined,
  ShopOutlined,
  CloseOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

interface AdminSidebarProps {
  onClose?: () => void;
}

const menuItems = [
  { name: "Users", href: "/admin/manage-user", icon: UserOutlined },
  { name: "Rooms", href: "/admin/manage-list-room", icon: ShopOutlined },
  { name: "Bookings", href: "/admin/manage-bookings", icon: CalendarOutlined },
];

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col relative z-20">
      {/* Mobile close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
        >
          <CloseOutlined className="text-lg" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 pt-20 lg:pt-0">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname?.includes(item.href);
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-rose-500 text-white"
                      : "text-gray-700 hover:bg-main/10"
                  }`}
                  onClick={() => onClose?.()}
                >
                  <Icon className="text-lg" />
                  <span className="pl-3">{item.name}</span>
                </Link>
              </li>
            );
          })}

          <li
            className={`cursor-pointer flex lg:hidden items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-main/10`}
            onClick={handleLogout}
          >
            <LogoutOutlined className="text-lg" />
            <span className="pl-3">Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
