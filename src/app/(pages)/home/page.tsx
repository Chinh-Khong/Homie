'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartFilled, StarFilled } from '@ant-design/icons';

interface Room {
  _id: string;
  name: string;
  image: string;
  address: string;
  rentalDate: string;
  price: string;
  rating: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/get-list-rooms');
        if (!res.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await res.json();
        setRooms(data.data || []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const goToDetail = (id: string) => {
    if (!id) {
      console.error('Invalid room ID');
      return;
    }
    router.push(`/detail-room/${id}`);
  };

  const truncateName = (name: string, wordLimit: number) => {
    if (!name) return 'Tên không xác định';
    const words = name.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + ' ...'
      : name;
  };

  return (
    <div className="lg:px-38 px-4 w-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl font-bold">Danh sách phòng</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {rooms.length ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col gap-1 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="relative w-full"
                onClick={() => goToDetail(room._id)}
              >
                <img
                  className="rounded-xl md:h-[18vw] w-full object-cover"
                  src={room.image || '/placeholder.jpg'}
                  alt={room.name || 'Room Image'}
                />
                <div className="absolute top-3 right-4">
                  <HeartFilled
                    style={{ color: '#e11d48', fontSize: 23 }}
                    className="hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div
                className="font-[500] text-md flex justify-between items-center"
                onClick={() => goToDetail(room._id)}
              >
                <span>{truncateName(room.name, 4)}</span>
                <div className="flex items-center">
                  <StarFilled style={{ color: '#fadb14', marginRight: 2 }} />
                  {room.rating || 'N/A'}
                </div>
              </div>
              <p className="text-gray-500 text-sm">{room.address}</p>
              <p className="text-gray-500 text-sm">{room.rentalDate}</p>
              <div className="text-md font-medium">
                <span className="font-[500]">{room.price} đ</span> / đêm
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500">Đang tải danh sách phòng...</p>
          </div>
        )}
      </div>
    </div>
  );
}