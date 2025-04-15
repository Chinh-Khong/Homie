"use client";

import { IMAGE_URL } from "@/public";
import { useEffect, useState } from "react";
import { HeartOutlined, StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";

const Home = () => {

  const [users, setUsers] = useState([]);
  console.log(users, 'chinh13');
  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  const _renderItemRoom = () => {
    return (
      <div className="flex flex-col gap-1 md:w-[19vw] w-full">
        <div className="relative w-full">
          <img className="rounded-xl md:h-[18vw]" src={IMAGE_URL.ROOM1} alt="" />
          <div className="absolute top-3 right-4 flex justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-110">
            <img width={35} src={IMAGE_URL.HEART} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-[500] text-md flex flex-row justify-between items-center">
            <span>Tên phòng</span>
            <span>
              <StarFilled style={{ color: '#fadb14', marginRight: '2px' }} />4.9
            </span>
          </p>
          <p className="text-gray-500 text-sm">Cách 111km</p>
          <p className="text-gray-500 text-sm">4-9 thg 5</p>
        </div>
        <div className="text-md"><span className="font-[500]">đ999.999.999</span> / đêm</div>
      </div>
    )
  };

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
        {_renderItemRoom()}
      </div>
    </div>
  );
};

export default Home;
