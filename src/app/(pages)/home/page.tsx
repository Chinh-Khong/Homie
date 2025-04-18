"use client";

import { useEffect, useState } from "react";
import { HeartFilled, StarFilled,} from "@ant-design/icons";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getListRooms();
  }, []);

  const getListRooms = async () => {
    try {
      const response = await fetch("/api/get-list-rooms");
      const data = await response.json();
      setRooms(data.data);
    } catch (error) {}
  };

  const _renderItemRoom = (room: any) => {
    const truncateName = (name: string, wordLimit: number) => {
      const words = name.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + " ...";
      }
      return name;
    };

    return (
      <div key={room._id} className="flex flex-col gap-1 md:w-[19vw] w-full">
        <div className="relative w-full">
          <img
            className="rounded-xl md:h-[18vw] w-full object-cover"
            src={room.image || "/default-room.jpg"}
            alt={room.name}
          />
          <div className="absolute top-3 right-4 cursor-pointer">
            <HeartFilled
              style={{
                color: "#e11d48",
                fontSize: "23px",
                stroke: "white",
                strokeWidth: 45,
              }}
              className="hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-[500] text-md flex flex-row justify-between items-center">
            <span>{truncateName(room.name || "Tên phòng", 4)}</span> {/* Hiển thị tên phòng */}
            <span>
              <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />
              {room.rating || "N/A"}
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            {room.address || "Địa chỉ không xác định"}
          </p>
          <p className="text-gray-500 text-sm">
            {room.rentalDate || "Không có ngày thuê"}
          </p>
        </div>
        <div className="text-md">
          <span className="font-[500]">{room.price || "N/A"} đ</span> / đêm
        </div>
      </div>
    );
  };

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl font-bold">Danh sách phòng</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {rooms.length > 0 ? (
          rooms.map((room) => _renderItemRoom(room))
        ) : (
          <p>Loading room list ...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
