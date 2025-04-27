"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartFilled, SearchOutlined, StarFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Input } from "antd";
import { formatCurrency } from "@/src/utils";

const Favorite = () => {
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFavoriteRooms(searchTerm);
  }, [searchTerm]);

  const fetchFavoriteRooms = async (search = "") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to login first.");
        return;
      }

      const res = await fetch(
        `/api/user/favorite-rooms?search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setFavoriteRooms(data.data || []);
    } catch (err: any) {}
  };

  const toggleLike = async (roomId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You need to login first.");

      const res = await fetch(`/api/room/${roomId}/unlike`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchFavoriteRooms();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const truncateName = (name: string, wordLimit: number) => {
    const words = name.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : name;
  };

  const _renderRoomItem = (room: any) => (
    <div
      key={room._id}
      className="flex flex-row gap-4 w-full cursor-pointer border border-gray-100 p-3 rounded-xl hover:shadow-lg transition"
      onClick={() => router.push(`/detail-room/${room.room_id}`)}
    >
      <div className="relative min-w-[160px] max-w-[160px]">
        <img
          className="rounded-xl h-[120px] w-full object-cover"
          src={room.image}
          alt={room.name}
        />
        <div className="absolute top-2 right-2 cursor-pointer">
          <HeartFilled
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(room._id);
            }}
            style={{
              color: "#e11d48",
              fontSize: "20px",
              stroke: "white",
              strokeWidth: 45,
            }}
            className="hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <span className="font-semibold text-md">
            {truncateName(room.name || "Tên phòng", 4)}
          </span>
          <div className="flex items-center text-sm">
            <StarFilled style={{ color: "#fadb14", marginRight: "4px" }} />
            {room.rating || "N/A"}
          </div>
        </div>

        <p className="text-gray-500 text-sm">{room.address || ""}</p>

        <div className="text-md font-medium text-black-600 mt-1">
          <span className="font-semibold">
            {formatCurrency(room.price) || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 py-6">
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Favorite Rooms</h1>
        <Input
          placeholder="Search by room name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-[300px] rounded-lg focus:outline-none focus:ring-2"
          prefix={<SearchOutlined />}
          size="large"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-8">
        {favoriteRooms.length > 0 ? (
          favoriteRooms.map((room) => _renderRoomItem(room))
        ) : (
          <p>No rooms matched your search.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
