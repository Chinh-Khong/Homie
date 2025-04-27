"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CalendarSection from "@/src/components/CalendarSection/CalendarSection";
import {
  ShareAltOutlined,
  HeartOutlined,
  HomeOutlined,
  WifiOutlined,
  CarOutlined,
  ExperimentOutlined,
  FireOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  CoffeeOutlined,
  DownOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
  LockOutlined,
  WarningOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { IMAGE_URL } from "@/public";
import Image from "next/image";
import { toast } from "react-toastify";
import CommentSection from "./comment";


const DetailRoom = () => {
  const params = useParams();
  const roomId = params?.room_id;
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [disabledDates, setDisabledDates] = useState<
  { check_in: string; check_out: string }[]
>([]);
  const router = useRouter();
  console.log(room, 'chinh456')
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/room/get-room-detail?room_id=${roomId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch room details");
        }

        setRoom(data.data);
        setDisabledDates(data.bookings || []);

      } catch (err: any) {
        setError(err.message);
      } finally {

        setLoading(false);
      }
    };
    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-medium">Loading...</div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-20 text-xl font-medium">
        Room details not available.
      </div>
    );
  }

const toLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("Z")[0] + "Z";
};

const handleReserve = async () => {
  const email = localStorage.getItem("email") || "unknown_user";
  const token = localStorage.getItem("token") || "unknown_user";

  const reservationDetails = {
    email,
    room_id: room.room_id,
    room_name: room.name,
    price_per_night: room.price,
    room_image: room.image,
    address: room.address,
    check_in: toLocalISOString(selectedDates.startDate),
    check_out: toLocalISOString(selectedDates.endDate),
    total_nights: Math.max(
      1,
      Math.ceil(
        (selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    ),
    total_price:
      parseInt(room.price) *
        Math.max(
          1,
          Math.ceil(
            (selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        ) +
      17, // Service fee
  };


  try {
    const response = await fetch("/api/booking/order", {
      method: "POST",
      body: JSON.stringify(reservationDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add room");
    }
    
    await response.json();
    toast.success("Successful reservation!");
    setTimeout(() => {
      router.push("/book-history");
    }, 500);
  } catch (error: any) {
    toast.error(error.message || "An error occurred while reserving the room");
  }

};

  const _renderTitle = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-2xl font-bold mb-4 md:mb-0 pb-5">
          {room.name}
        </h1>
        <div className="flex space-x-2 gap-4">
          <button
            className="flex items-center text-gray-600 hover:text-gray-900 gap-2"
            aria-label="Share"
          >
            <ShareAltOutlined className="mr-1" />
            <span className="text-sm md:text-base">Share</span>
          </button>
          <button
            className="flex items-center text-gray-600 hover:text-gray-900 gap-2"
            aria-label="Save"
          >
            <HeartOutlined className="mr-1" />
            <span className="text-sm md:text-base">Save</span>
          </button>
        </div>
      </div>
    );
  };

  const _renderPhotoGallery = () => {
    return (
      <div className="mb-8">
        <img
          src={room.image}
          alt="Host avatar"
          className="object-cover w-full lg:w-[600px] h-[400px] rounded-lg shadow-lg"
        />
      </div>
    );
  };

  const _renderRoomFeatures = () => (
    <div className="pb-6 mb-6 border-b border-gray-200 leading-loose w-full pl-3">
      <div className="border-b border-gray-200 pb-6 mb-6 pt-6">
        <h2 className="text-2xl font-semibold">
          {room.name || "Room Name"}, {room.address}
        </h2>
        <p className="text-gray-700 mt-1">
          {room.bed_rooms} bed rooms · {room.bath_room} bath room 
        </p>
        
      </div>
      <div className="space-y-6">
        {[
          [
            <HomeOutlined className="text-xl text-gray-800 mt-1" />,
            "Room in a home",
            "Your own room in a home, plus access to shared spaces.",
          ],
          [
            <BranchesOutlined className="text-xl text-gray-800 mt-1" />,
            "Outdoor entertainment",
            "The pool and alfresco dining are great for summer trips.",
          ],
          [
            <EnvironmentOutlined className="text-xl text-gray-800 mt-1" />,
            "Calm and convenient location",
            "This area is easy to get around.",
          ],
        ].map(([icon, title, desc], i) => (
          <div className="flex items-center gap-4 !mb-4" key={i}>
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

  const _renderAboutThisPlace = () => (
    <div className="pt-6 pb-6">
      <h2 className="text-xl font-semibold mt-6 mb-2 pb-6">About this place</h2>
      <p className="text-base leading-relaxed text-justify text-neutral-800">
        {room.description_room}
      </p>
    </div>
  );

  const _renderWhatThisPlaceOffers = () => (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold mt-6 mb-4 pb-6">
        What this place offers
      </h2>
      <div className="grid grid-cols-2 gap-y-5 text-lg text-neutral-800 pb-6">
        {[
          [<LockOutlined />, "Room door lock"],
          [<WifiOutlined />, "Wi-Fi"],
          [<CarOutlined />, "Free parking on premises"],
          [<ExperimentOutlined />, "Air conditioning"],
          [
            <WarningOutlined className="text-gray-500" />,
            <s>Carbon monoxide detector</s>,
          ],
          [<FireOutlined />, "Lake access"],
          [<DesktopOutlined />, "Dedicated workspace"],
          [<AppstoreOutlined />, "Pool"],
          [<CoffeeOutlined />, "Breakfast"],
          [<StopOutlined className="text-gray-500" />, <s>Smoke detector</s>],
        ].map(([icon, text], i) => (
          <div className="flex items-center gap-4" key={i}>
            <span className="text-xl text-gray-800">{icon}</span>
            <p
              className={
                typeof text === "string" ? "" : "line-through text-neutral-500"
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
    const pricePerNight = parseInt(room.price) || 0;
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
            <span className="mr-1">${room.price}</span>
            <span className="text-base font-normal text-neutral-700">
              /night
            </span>
          </h3>
          <div className="border rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x">
              <div className="p-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase">
                  Check-in
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-900">
                  {selectedDates.startDate.toLocaleDateString()}
                </p>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase">
                  Checkout
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-900">
                  {selectedDates.endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-3 border-t">
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase">
                  Guests
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-900">
                  1 guest
                </p>
              </div>
              <DownOutlined className="text-l text-neutral-500 cursor-pointer" />
            </div>
          </div>
          <div className="pt-5">
            <button
              className="w-full text-white py-3 rounded-xl font-medium hover:brightness-110 transition"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ff385c 0%, #e61e4d 27.5%, #e31c5f 40%, #d70466 57.5%)",
              }}
              onClick={handleReserve}
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
                ${room.price} x {nights} nights
              </p>
              <p>${room.price * nights}</p>
            </div>
            <div className="flex justify-between pb-6">
              <p className="underline">Homie service fee</p>
              <p>${serviceFee}</p>
            </div>
            <hr className="border-t border-neutral-300 pt-6" />
            <div className="flex justify-between font-semibold text-neutral-900 mt-2">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (

  <div className=" py-8 px-4 sm:px-2 md:px-4 lg:px-38">
  {_renderTitle()}
  <div className="flex flex-col lg:flex-row gap-4 items-center">
    {_renderPhotoGallery()}
    {_renderRoomFeatures()}
  </div>
  <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 relative items-start pb-6 mb-6">
    <div>
      {/* Thông tin host */}
      <div className="flex items-center gap-4 border-b border-gray-300 pb-6 pt-6">
        <div className="w-12 h-12 rounded-full overflow-hidden relative">
          <img
            src={IMAGE_URL.logo} // Sử dụng ảnh mặc định nếu không có ảnh
            alt="Host avatar"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Stay with Homie</p>
          <p className="text-base text-gray-600">1 year hosting</p>
        </div>
      </div>


      {_renderAboutThisPlace()}
      {_renderWhatThisPlaceOffers()}


      <div className="pt-6 border-t border-gray-200">
        <CalendarSection
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          location={room.address}
          disabledDates={disabledDates}
        />
      </div>
    </div>


    <div className="sticky top-24 self-start">
      {_renderPriceBox({ selectedDates })}
    </div>
  </div>


  <div className="mt-12 pt-8 border-t border-gray-300 w-full">
    <CommentSection roomId={Array.isArray(roomId) ? roomId[0] : roomId || ""} />
  </div>
</div>
    
    
  );
};

export default DetailRoom;