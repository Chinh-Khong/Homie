
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CalendarSection from '@/src/components/CalendarSection/CalendarSection';
import {
  ShareAltOutlined,
  HeartOutlined,
  BranchesOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  LockOutlined,
  WifiOutlined,
  CarOutlined,
  ExperimentOutlined,
  FireOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  CoffeeOutlined,
  WarningOutlined,
  StopOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { IMAGE_URL } from '@/public';

interface RoomDetail {
  _id: string;
  name: string;
  images: string[]; // Thay image thành images
  address: string;
  rentalDate: string;
  price: string;
  rating: string;
  description_room: string;
  check_in: string;
  check_out: string;
  bed_rooms: string;
  bath_room: string;
  occupancy_limit: string;
}

export default function DetailRoom() {
  const params = useParams();
  const id = params?.id as string;

  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(2025, 4, 4),
    endDate: new Date(2025, 4, 9),
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        console.log("Fetching room with ID:", id); // Log ID để kiểm tra
        const res = await fetch(`/api/get-room/${id}`);
        if (!res.ok) {
          setError('Room not found');
          return;
        }
        const data = await res.json();
        if (!data.success) {
          setError(data.message || 'Room not found');
          return;
        }
        console.log("Room data:", data.data); // Log dữ liệu trả về
        setRoom(data.data);
      } catch (err) {
        console.error("Error fetching room:", err);
        setError('Failed to load room details');
      }
    };
  
    if (id) fetchRoom();
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-20 text-xl font-medium text-red-500">
        {error}
        <a href="/" className="block mt-4 text-blue-500 underline">
          Quay lại trang chủ
        </a>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-20 text-xl font-medium">
        Đang tải thông tin phòng...
      </div>
    );
  }

  const _renderTitle = () => {
    const actions: [React.ReactNode, string][] = [
      [<ShareAltOutlined className="mr-1" />, 'Share'],
      [<HeartOutlined className="mr-1" />, 'Save'],
    ];

    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-2xl font-bold mb-4 md:mb-0 pb-5">{room.name}</h1>
        <div className="flex space-x-2 gap-4">
          {actions.map(([icon, text], i) => (
            <button
              key={i}
              className={`flex items-center text-gray-600 hover:text-gray-900 ${i !== 0 ? 'ml-4' : ''} gap-2`}
              aria-label={typeof text === 'string' ? text : 'Action button'}
            >
              {icon || <span>Icon missing</span>}
              <span className="text-sm md:text-base">{text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const _renderPhotoGallery = () => {
    const cornerClasses = ['rounded-tr-lg', '', 'rounded-bl-lg', 'rounded-br-lg'];

    // Tạo mảng images từ room.images
    const images = room.images.map((url, index) => ({
      url,
      alt: index === 0 ? `Main image of ${room.name}` : `Additional room image ${index}`,
    }));

    // Đảm bảo có ít nhất 5 hình ảnh, nếu không thì lặp lại hình ảnh đầu tiên
    while (images.length < 5) {
      images.push({
        url: room.images[0],
        alt: `Placeholder image ${images.length}`,
      });
    }
    
  
  const _renderAboutThisPlace = () => (
    <div className="pt-6 pb-6">
      <p className="pt-4 text-base pb-6">
        Some info has been automatically translated.{' '}
        <span className="underline font-medium cursor-pointer">Show original</span>
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 pb-6">About this place</h2>
      <p className="text-base leading-relaxed text-justify text-neutral-800">
        {room.description_room}
      </p>
      <button className="mt-3 text-base font-semibold underline flex items-center gap-1 pt-3">
        Show more <span>›</span>
      </button>
    </div>
  );

  const _renderRoomFeatures = () => (
    <div className="pt-6 pb-6 mb-6 border-b border-gray-200 leading-loose w-full pl-3">
      <div className="space-y-6">
        {[
          [
            <HomeOutlined className="text-xl text-gray-800 mt-1" />,
            'Room in a home',
            'Your own room in a home, plus access to shared spaces.',
          ],
          [
            <BranchesOutlined className="text-xl text-gray-800 mt-1" />,
            'Outdoor entertainment',
            'The pool and alfresco dining are great for summer trips.',
          ],
          [
            <EnvironmentOutlined className="text-xl text-gray-800 mt-1" />,
            'Calm and convenient location',
            'This area is easy to get around.',
          ],
        ].map(([icon, title, desc], i) => (
          <div className="flex items-center gap-4" key={i}>
            <span>{icon}</span>
            <div>
              <p className="font-semibold text-lg leading-relaxed">{title}</p>
              <p className="text-base text-gray-600 leading-normal">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const _renderWhatThisPlaceOffers = () => (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold mt-6 mb-4 pb-6">What this place offers</h2>
      <div className="grid grid-cols-2 gap-y-5 text-lg text-neutral-800 pb-6">
        {[
          [<LockOutlined />, 'Room door lock'],
          [<WifiOutlined />, 'Wi-Fi'],
          [<CarOutlined />, 'Free parking on premises'],
          [<ExperimentOutlined />, 'Air conditioning'],
          [<WarningOutlined className="text-gray-500" />, <s>Carbon monoxide detector</s>],
          [<FireOutlined />, 'Lake access'],
          [<DesktopOutlined />, 'Dedicated workspace'],
          [<AppstoreOutlined />, 'Pool'],
          [<CoffeeOutlined />, 'Breakfast'],
          [<StopOutlined className="text-gray-500" />, <s>Smoke detector</s>],
        ].map(([icon, text], i) => (
          <div className="flex items-center gap-4" key={i}>
            <span className="text-xl text-gray-800">{icon}</span>
            <p
              className={
                typeof text === 'string' ? '' : 'line-through text-neutral-500'
              }
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const _renderPriceBox = ({
    selectedDates,
  }: {
    selectedDates: { startDate: Date; endDate: Date };
  }) => {
    const pricePerNight = parseInt(room.price) || 17;
    const serviceFee = 17;

    const nights = Math.max(
      1,
      Math.ceil(
        (selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    const total = pricePerNight * nights + serviceFee;

    return (
      <div className="sticky top-24 self-start pt-6">
        <div className="border border-neutral-300 rounded-2xl shadow-lg p-6 space-y-6">
          <h3 className="text-2xl font-semibold pb-5">
            <span className="mr-1">€{pricePerNight}</span>
            <span className="text-base font-normal text-neutral-700">night</span>
          </h3>
          <CalendarSection
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            location={room.address}
          />
          <div className="pt-5">
            <button
              className="w-full text-white py-3 rounded-xl font-medium hover:brightness-110 transition bg-gradient-to-r from-[#ff385c] via-[#e61e4d] to-[#d70466]"
            >
              Reserve
            </button>
          </div>
          <p className="text-center text-sm text-neutral-700">
            You won't be charged yet
          </p>
          <div className="pt-4 text-lg font-base space-y-5">
            <div className="flex justify-between">
              <p className="underline">
                €{pricePerNight} x {nights} nights
              </p>
              <p>€{pricePerNight * nights}</p>
            </div>
            <div className="flex justify-between pb-6">
              <p className="underline">Homie service fee</p>
              <p>€{serviceFee}</p>
            </div>
            <hr className="border-t border-neutral-300 pt-6" />
            <div className="flex justify-between font-semibold text-neutral-900 mt-2">
              <p>Total</p>
              <p>€{total}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:px-32 py-8">
      {_renderTitle()}
      {_renderPhotoGallery()}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 relative items-start md:items-center pb-6 mb-6">
        <div>
          <div className="border-b border-gray-200 pb-6 mb-6 pt-6">
            <h2 className="text-2xl font-semibold">{room.address}</h2>
            <p className="text-gray-700 mt-1">
              {room.bed_rooms} bedrooms · {room.bath_room} bathrooms
            </p>
            <div className="flex items-center text-base text-gray-800 mt-1">
              <span className="font-semibold">★ {room.rating || '4.67'}</span>
              <span className="mx-1 text-gray-400">·</span>
              <span className="underline cursor-pointer font-semibold pl-3">
                6 reviews
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-gray-300 pb-6 pt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src={IMAGE_URL.avatar}
                alt="Host avatar"
                width={48}
                height={48}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Stay with Chunn</p>
              <p className="text-base text-gray-600">1 year hosting</p>
            </div>
          </div>
          {_renderRoomFeatures()}
          {_renderAboutThisPlace()}
          {_renderWhatThisPlaceOffers()}
          <div className="pt-6 border-t border-gray-200">
            <CalendarSection
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              location={room.address}
            />
          </div>
        </div>
        {_renderPriceBox({ selectedDates })}
      </div>
    </div>
  );
}}
