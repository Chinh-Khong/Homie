"use client";

import { IMAGE_URL } from "@/public";
import { useRouter } from "next/navigation";
import { StarFilled } from "@ant-design/icons";

const Home = () => {
  const router = useRouter();

  const goToDetail = (roomId: string) => {
    router.push(`/detail-room?id=${roomId}`);
  };

  const _renderItemRoom = (roomId: string) => {
    return (
      <div
        key={roomId}
        className="flex flex-col gap-1 md:w-[19vw] w-full"
      >
        <div className="relative w-full cursor-pointer" onClick={() => goToDetail(roomId)}>
          <img className="rounded-xl md:h-[18vw]" src={IMAGE_URL.ROOM1} alt="" />
          <div className="absolute top-3 right-4 flex justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-110">
            <img width={35} src={IMAGE_URL.HEART} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <p
            className="font-[500] text-md flex flex-row justify-between items-center cursor-pointer hover:underline"
            onClick={() => goToDetail(roomId)}
          >
            <span>Tên phòng {roomId}</span>
            <span>
              <StarFilled style={{ color: "#fadb14", marginRight: "2px" }} />4.9
            </span>
          </p>
          <p className="text-gray-500 text-sm">Cách 111km</p>
          <p className="text-gray-500 text-sm">4-9 thg 5</p>
        </div>
        <div className="text-md">
          <span className="font-[500]">đ999.999.999</span> / đêm
        </div>
      </div>
    );
  };

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {_renderItemRoom("room1")}
        {_renderItemRoom("room2")}
        {_renderItemRoom("room3")}
        {_renderItemRoom("room4")}
        {_renderItemRoom("room5")}
        {_renderItemRoom("room6")}
        {_renderItemRoom("room7")}
        {_renderItemRoom("room8")}
        {_renderItemRoom("room9")}
        {_renderItemRoom("room10")}
        {_renderItemRoom("room11")}
        {_renderItemRoom("room12")}
      </div>
    </div>
  );
};

export default Home;

