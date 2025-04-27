"use client";

import { useEffect, useState } from "react";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import FormSearchTypeRoom from "@/src/components/FormSearchTypeRoom/FormSearchTypeRoom";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import LocationSearch from "@/src/components/FormSearch/LocationSearch";
import { toast } from "react-toastify";
import { formatCurrency } from "@/src/utils";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [typeRoom, setTypeRoom] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 16;

  const router = useRouter();
  useEffect(() => {
    getListRooms(typeRoom);
  }, [typeRoom, page]);

  const getListRooms = async (type: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/room/get-list-rooms?search_room=${type}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const data = await response.json();
      setRooms(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLike = async (roomId: string, isLiked: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You need to login first.");

      const endpoint = isLiked
        ? `/api/room/${roomId}/unlike`
        : `/api/room/${roomId}/like`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        getListRooms(typeRoom);
      } else {
        console.error("Like/unlike failed");
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

  const _renderItemRoom = (room: any) => (
    <div
      key={room.room_id}
      className="flex flex-col gap-1 md:w-[19vw] w-full cursor-pointer"
      onClick={() => router.push(`/detail-room/${room.room_id}`)}
    >
      <div className="relative w-full">
        <img
          className="rounded-xl md:h-[18vw] w-full object-cover"
          src={room.image}
          alt={room.name}
        />
        <div className="absolute top-3 right-4 cursor-pointer">
          <HeartFilled
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(room._id, room.isUserFavorite);
            }}
            style={{
              color: room.isUserFavorite ? "#e11d48" : "#ccc",
              fontSize: "23px",
              stroke: "white",
              strokeWidth: 45,
            }}
            className="hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <div className="font-[500] text-md flex flex-row justify-between items-center">
        <span>{truncateName(room.name || "Tên phòng", 4)}</span>
        <div className="flex items-center">
          <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />
          {room.rating || "N/A"}
        </div>
      </div>

      <p className="text-gray-500 text-sm">{room.address || ""}</p>
      <div className="text-md font-medium text-black-600">
        <span className="font-[500]">
          {formatCurrency(room.price) || "N/A"} đ
        </span>{" "}
        / đêm
      </div>
    </div>
  );

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8">
      <LocationSearch
        onSearchLocation={(keyword) => {
          setTypeRoom(keyword);
          setPage(1);
        }}
      />
      <FormSearchTypeRoom
        onChangeType={(val) => {
          setPage(1);
          setTypeRoom(val);
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {rooms?.length > 0 ? (
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
