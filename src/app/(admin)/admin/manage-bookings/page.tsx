"use client";

import { useEffect, useState } from "react";
import { Table, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

export interface Booking {
  _id: string;
  email: string;
  room_id: number;
  room_name?: string;
  address?: string;
  price_per_night?: number;
  check_in: string;
  check_out: string;
  total_nights?: number;
  total_price?: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, [page, pageSize]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, limit: pageSize },
      });
      setBookings(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Room",
      dataIndex: "room_name",
      key: "room_name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Check-in",
      dataIndex: "check_in",
      key: "check_in",
      render: (val: Date) => new Date(val).toLocaleDateString(),
      sorter: (a: Booking, b: Booking) =>
        new Date(a.check_in).getTime() - new Date(b.check_in).getTime(),
    },
    {
      title: "Check-out",
      dataIndex: "check_out",
      key: "check_out",
      render: (val: string) => {
        const isPast =
          new Date(val).getTime() < new Date().setHours(0, 0, 0, 0);
        return (
          <span style={{ color: isPast ? "red" : "inherit" }}>
            {new Date(val).toLocaleDateString()}
          </span>
        );
      },
      sorter: (a: Booking, b: Booking) =>
        new Date(a.check_out).getTime() - new Date(b.check_out).getTime(),
    },
    {
      title: "Total Nights",
      dataIndex: "total_nights",
      key: "total_nights",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap = {
          pending: "orange",
          confirmed: "green",
          cancelled: "red",
        } as any;
        return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>;
      },
      sorter: (a: Booking, b: Booking) => a.status.localeCompare(b.status),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="pb-4 md:flex justify-between  items-center gap-2">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Manage Bookings
        </h1>
        <div className="flex gap-2 py-2">
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={fetchBookings}
          />
          <button
            className="bg-main text-white px-4 py-2 rounded"
            onClick={fetchBookings}
          >
            Search
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: (newPage, newSize) => {
            setPage(newPage);
            setPageSize(newSize);
          },
          showSizeChanger: true,
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ManageBookingsPage;
