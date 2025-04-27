"use client";

import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import RoomDetailModal from "@/src/components/ModalComponent/ModalRoomDetail/ModalRoomDetail";
import { useRouter } from "next/navigation";
import ModalConfirm from "@/src/components/ModalComponent/ModalConfirm/ModalConfirm";

export interface ParamsRoom {
  room_id: number;
  name: string;
  address: string;
  rental_date: string;
  price: number;
  image: string;
  rating: number;
  description_room: string;
  check_out: string;
  status: string;
  bed_rooms: number;
  bath_room: number;
  occupancy_limit: number;
  type_room: string;
}

const RoomListPage = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<ParamsRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<ParamsRoom | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);

  useEffect(() => {
    getListRoom();
  }, []);

  const getListRoom = async (query: string = "") => {
    try {
      setLoading(true);
      const response = await axios.get("/api/room/get-list-rooms", {
        params: query ? { search_room: query } : {},
      });

      if (Array.isArray(response.data.data)) {
        setRooms(response.data.data);
      } else {
        setRooms([]);
        toast.warning("No rooms found.");
      }
    } catch (error) {
      toast.error("Failed to load room data.");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    getListRoom(searchText.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddRoom = () => {
    router.push("/admin/manage-list-room/add-room");
  };

  const handleUpdateRoom = async (updatedRoom: ParamsRoom) => {
    try {
      const formData = new FormData();
      formData.append("room_id", updatedRoom.room_id.toString());
      formData.append("name", updatedRoom.name);
      formData.append("address", updatedRoom.address);
      formData.append("price", updatedRoom.price.toString());
      formData.append("rating", updatedRoom.rating.toString());
      formData.append("description_room", updatedRoom.description_room);
      formData.append("status", updatedRoom.status);
      formData.append("bed_rooms", updatedRoom.bed_rooms.toString());
      formData.append("bath_room", updatedRoom.bath_room.toString());
      formData.append(
        "occupancy_limit",
        updatedRoom.occupancy_limit.toString()
      );
      formData.append("type_room", updatedRoom.type_room.toString());

      if (updatedRoom.image) {
        const imageBlob = await fetch(updatedRoom.image).then((res) =>
          res.blob()
        );
        formData.append("image", imageBlob, "image.jpg");
      }
      await axios.put(
        `/api/room/update-room/${updatedRoom.room_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Room updated successfully!");
      getListRoom();
    } catch (error) {
      toast.error("Failed to update room!");
    }
  };

  const handleConfirmDelete = () => {
    setIsConfirmDeleteVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedRoom?.room_id) {
      toast.error("Room ID is missing");
      return;
    }

    try {
      const res = await axios.delete(
        `/api/room/delete-room/${selectedRoom.room_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Room deleted successfully");
        setIsModalVisible(false);
        getListRoom();
      } else {
        toast.error(res.data.message || "Failed to delete room");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while deleting the room"
      );
    } finally {
      setIsConfirmDeleteVisible(false);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="room"
          className="w-24 h-20 object-cover rounded-md shadow-sm"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: ParamsRoom, b: ParamsRoom) => a.name.localeCompare(b.name),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a: ParamsRoom, b: ParamsRoom) =>
        a.address.localeCompare(b.address),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      sorter: (a: ParamsRoom, b: ParamsRoom) => a.price - b.price,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => `${rating}/5`,
      sorter: (a: ParamsRoom, b: ParamsRoom) => a.rating - b.rating,
    },
    {
      title: "Bedrooms",
      dataIndex: "bed_rooms",
      key: "bed_rooms",
    },
    {
      title: "Bathrooms",
      dataIndex: "bath_room",
      key: "bath_room",
    },
    {
      title: "Occupancy Limit",
      dataIndex: "occupancy_limit",
      key: "occupancy_limit",
      sorter: (a: ParamsRoom, b: ParamsRoom) =>
        a.occupancy_limit - b.occupancy_limit,
    },
    {
      title: "Room Type",
      dataIndex: "type_room",
      key: "type_room",
      sorter: (a: ParamsRoom, b: ParamsRoom) =>
        a.type_room.localeCompare(b.type_room),
    },
  ];

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Manage Rooms
        </h1>

        <div className="flex justify-between">
          <div className="flex flex-row gap-4 items-center">
            <Input
              placeholder="Search by room name or address"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mb-4 max-w-[350px] h-[40px]"
            />
            <Button
              className="bg-main py-2 px-4 !font-[500] !text-white rounded-md cursor-pointer !capitalize"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
          </div>

          <Button
            className="bg-main py-2 px-4 !font-[500] !text-white rounded-md cursor-pointer !capitalize"
            onClick={handleAddRoom}
          >
            Add room
          </Button>
        </div>

        <Table
          scroll={{ x: 400 }}
          dataSource={rooms}
          columns={columns}
          rowKey="room_id"
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRoom(record);
              setIsModalVisible(true);
            },
            style: { cursor: "pointer" },
          })}
        />
        <RoomDetailModal
          isModalVisible={isModalVisible}
          selectedRoom={selectedRoom}
          onClose={() => setIsModalVisible(false)}
          onUpdate={handleUpdateRoom}
          handleConfirmDelete={handleConfirmDelete}
        />

        <ModalConfirm
          open={isConfirmDeleteVisible}
          onOk={handleDelete}
          onCancel={() => setIsConfirmDeleteVisible(false)}
          title="Are you sure you want to delete this room?"
          content={`Room: ${selectedRoom?.name || "Unknown"}`}
          okText="Yes, Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default RoomListPage;
