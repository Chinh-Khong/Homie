"use client";
import React, { useState } from "react";
import { IMAGE_URL } from "@/public";
import CalendarSection from "@/src/components/CalendarSection/CalendarSection";
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
} from "@ant-design/icons";




const DetailRoom = () => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(2025, 4, 4),
    endDate: new Date(2025, 4, 9),
  });

  const _renderTitle = () => {
    const actions = [
      [<ShareAltOutlined className="mr-1" />, "Share"],
      [<HeartOutlined className="mr-1" />, "Save"],
    ];

    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-2xl font-bold mb-4 md:mb-0 pb-5">
          [Lazy House] Wooden sensibility's private sensibility accommodation
        </h1>
        <div className="flex space-x-2 gap-4">
          {actions.map(([icon, text], i) => (
            <button
              key={i}
              className={`flex items-center text-gray-600 hover:text-gray-900 ${i !== 0 ? "ml-4" : ""
                } gap-2`}
            >
              {icon}
              <span className="text-sm md:text-base">{text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };


  const _renderPhotoGallery = () => {
    const cornerClasses = ["rounded-tr-lg", "", "rounded-bl-lg", "rounded-br-lg"];

    const images = [
      IMAGE_URL.picture1,
      IMAGE_URL.picture2,
      IMAGE_URL.picture3,
      IMAGE_URL.picture4,
      IMAGE_URL.picture5,
      IMAGE_URL.avatar,
    ];

    return (
      <div className="mb-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 pr-1 relative">
          {/* Main image (left big image) */}
          <div
            className="col-span-2 row-span-2 rounded-tl-lg overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${images[0]})` }}
          />

          {/* 4 smaller images on the right */}
          {images.slice(1).map((url, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-cover bg-center ${cornerClasses[index]}`}
              style={{ backgroundImage: `url(${url})` }}
            >
              {index === 3 && (
                <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                  <button className="flex items-center bg-white px-3 py-1 rounded-md text-sm font-medium">
                    <BranchesOutlined className="mr-1" />
                    <span>Show all photos</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };


  const _renderAboutThisPlace = () => (
    <div className="pt-6 pb-6">
      <p className="pt-4 text-base pb-6">
        Some info has been automatically translated.{" "}
        <span className="underline font-medium cursor-pointer">
          Show original
        </span>
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 pb-6">About this place</h2>
      <p className="text-base leading-relaxed text-justify text-neutral-800">
        Our house located in Phu Tho town center. It’s close enough to walk to
        restaurants and cafes but far enough to where you don’t hear noises from
        cars and people from the street. The garden is surrounded, make cool for
        our bungalow. The swimming pool is so nice and it’s cool in temperature so
        it’s perfect for the hot days. Beside, we also provide services as
        transportation service (by bus/by train/by private car), laundry service,
        tours, motobike for rent, ……
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
    const pricePerNight = 17;
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
    <div className=" lg:px-38 py-8">
      {_renderTitle()}
      {_renderPhotoGallery()}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 relative items-start md:items-center pb-6 mb-6">
        <div>
          {/* Room header info */}
          <div className="border-b border-gray-200 pb-6 mb-6 pt-6">
            <h2 className="text-2xl font-semibold">
              House in Phu Tho, Vietnam
            </h2>
            <p className="text-gray-700 mt-1">
              1 king bed · Private attached bathroom
            </p>
            <div className="flex items-center text-base text-gray-800 mt-1">
              <span className="font-semibold">★ 4.67</span>
              <span className="mx-1 text-gray-400">·</span>
              <span className="underline cursor-pointer font-semibold pl-3">
                6 reviews
              </span>
            </div>
          </div>

          {/* Host info */}
          <div className="flex items-center gap-4 border-b border-gray-300 pb-6 pt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <img
                src={IMAGE_URL.avatar}
                alt="Host avatar"
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
              location="Phu Tho"
            />
          </div>
        </div>

        {_renderPriceBox({ selectedDates })}
      </div>
    </div>
  );
};

export default DetailRoom;
