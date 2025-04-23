"use client";

import { useEffect, useState } from "react";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import FormSearchTypeRoom from "@/src/components/FormSearchTypeRoom/FormSearchTypeRoom";
import { Pagination } from "antd";
import { useSearchParams } from "next/navigation";


const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [typeRoom, setTypeRoom] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 16;

  const searchParams = useSearchParams();
  const searchAddress = searchParams?.get("search_address") || "";

  useEffect(() => {
    getListRooms(typeRoom);
  }, [typeRoom, page, searchAddress]);

  const getListRooms = async (type: string) => {
    try {
      const response = await fetch(
        `/api/room/get-list-rooms?search_room=${type}&search_address=${searchAddress}&page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setRooms(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const truncateName = (name: string, wordLimit: number) => {
    const words = name.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : name;
  };

  const _renderItemRoom = (room: any) => (
    <div key={room._id} className="flex flex-col gap-1 md:w-[19vw] w-full">
      <div className="relative w-full">
        <img
          className="rounded-xl md:h-[18vw] w-full object-cover"
          src={room.image}
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
        <div className="font-[500] text-md flex flex-row justify-between items-center">
          <span>{truncateName(room.name || "Tên phòng", 4)}</span>
          <div className="flex items-center">
            <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />
            {room.rating || "N/A"}
          </div>
        </div>
        <p className="text-gray-500 text-sm">{room.address || "Địa chỉ không xác định"}</p>
        <p className="text-gray-500 text-sm">{room.rentalDate || "Không có ngày thuê"}</p>
      </div>
      <div className="text-md font-medium text-black-600">
        <span className="font-[500]">{room.price || "N/A"} đ</span> / đêm
      </div>
    </div>
  );

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8">
      <FormSearchTypeRoom
        onChangeType={(val) => {
          setPage(1);
          setTypeRoom(val);
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {rooms.length > 0 ? (
          rooms.map((room) => _renderItemRoom(room))
        ) : (
          <p className="!w-full">No matching rooms found.</p>
        )}
      </div>
      <div className="flex justify-center !mb-4">
        <Pagination
          current={page}
          total={totalPages * limit}
          pageSize={limit}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Home;
