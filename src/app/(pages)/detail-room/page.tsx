"use client";

import { useState } from "react";
import { FiShare2, FiHeart } from "react-icons/fi";
import Image from "next/image";
import CalendarSection from "@/src/components/detail-room/CalendarSection";
import { format } from "date-fns";



import {
  FaTree,
  FaDoorOpen,
  FaMapMarkerAlt,
  FaDoorClosed,
  FaWifi,
  FaCar,
  FaSnowflake,
  FaWater,
  FaChair,
  FaSwimmingPool,
  FaUtensils,
  FaExclamationTriangle,
  FaSmokingBan,
} from "react-icons/fa";


const roomImages = [
  "/img/picture1.png",
  "/img/picture2.png",
  "/img/picture3.png",
  "/img/picture4.png",
  "/img/picture5.png",
  "/img/avatar.png",
];

const Title = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
    <h1 className="text-2xl md:text-2xl font-bold mb-4 md:mb-0 pb-5">
      [Lazy House] Wooden sensibility's private sensibility accommodation
    </h1>
    <div className="flex space-x-2 gap-4 ">
      <button className="flex items-center text-gray-600 hover:text-gray-900 gap-2">
        <FiShare2 className="mr-1" />
        <span className="text-sm md:text-base ">Share</span>
      </button>
      <button className="flex items-center text-gray-600 hover:text-gray-900 ml-4 gap-2">
        <FiHeart className="mr-1" />
        <span className="text-sm md:text-base">Save</span>
      </button>
    </div>
  </div>
);

const PhotoGallery = () => (
  <div className="mb-8">
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 w-270 pr-1 ">
      <div className="relative col-span-2 row-span-2 rounded-tl-lg overflow-hidden">
        <Image
          src={roomImages[0]}
          alt="Main room image"
          fill
          className="object-cover"
          priority
        />
      </div>
      {roomImages.slice(1, 5).map((img, index) => (
        <div
          key={index}
          className={`relative overflow-hidden ${
            index === 0
              ? "rounded-tr-lg"
              : index === 2
              ? "rounded-bl-lg"
              : index === 3
              ? "rounded-br-lg"
              : ""
          }`}
        >
          <Image
            src={img}
            alt={`Room image ${index + 1}`}
            fill
            className="object-cover"
          />
          {index === 3 && (
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
              <button className="flex items-center bg-white px-3 py-1 rounded-md text-sm font-medium">
                <FiShare2 className="mr-1" />
                <span>Show all photos</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const AboutThisPlace = () => (
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

const RoomFeatures = () => (
  <div className="space-y-6 border-b border-gray-200 leading-loose pb-6 pt-6 pl-3 mb-6 w-full">
    {[
      {
        icon: <FaDoorOpen className="text-xl text-gray-800 mt-1" />,
        title: "Room in a home",
        desc: "Your own room in a home, plus access to shared spaces.",
      },
      {
        icon: <FaTree className="text-xl text-gray-800 mt-1" />,
        title: "Outdoor entertainment",
        desc: "The pool and alfresco dining are great for summer trips.",
      },
      {
        icon: <FaMapMarkerAlt className="text-xl text-gray-800 mt-1" />,
        title: "Calm and convenient location",
        desc: "This area is easy to get around.",
      },
    ].map((item, i) => (
      <div className="flex items-center gap-4" key={i}>
        {item.icon}
        <div>
          <p className="font-semibold text-lg leading-relaxed">{item.title}</p>
          <p className="text-base text-gray-600 leading-normal">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const WhatThisPlaceOffers = () => (
  <div className="pt-6 border-t border-gray-200">
    <h2 className="text-xl font-semibold mt-6 mb-4 pb-6">
      What this place offers
    </h2>
    <div className="grid grid-cols-2 gap-y-5 text-lg text-neutral-800 pb-6">
      {[
        [<FaDoorClosed />, "Room door lock"],
        [<FaWifi />, "Wi-Fi"],
        [<FaCar />, "Free parking on premises"],
        [<FaSnowflake />, "Air conditioning"],
        [
          <FaExclamationTriangle className="text-gray-500" />,
          <s>Carbon monoxide detector</s>,
        ],
        [<FaWater />, "Lake access"],
        [<FaChair />, "Dedicated workspace"],
        [<FaSwimmingPool />, "Pool"],
        [<FaUtensils />, "Breakfast"],
        [<FaSmokingBan className="text-gray-500" />, <s>Smoke detector</s>],
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

const PriceBox = ({
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
      <div className="border border-neutral-300 rounded-2xl shadow-lg p-6 space-y-6 w-[320px]">
        <h3 className="text-2xl font-semibold pb-5">
          <span className="mr-1">€{pricePerNight}</span>
          <span className="text-base font-normal text-neutral-700">night</span>
        </h3>
        <div className="border rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 divide-x">
            <div className="p-4">
              <p className="text-xs font-semibold text-neutral-500  uppercase">
                Check-in
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {format(selectedDates.startDate, "dd/MM/yyyy")}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase">
                Checkout
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {format(selectedDates.endDate, "dd/MM/yyyy")}
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
            <span className="text-lg text-neutral-500">⌄</span>
          </div>
        </div>
        <div className="pt-5">
          <button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-xl font-medium hover:brightness-110 transition">
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

const DetailRoom = () => {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(2025, 3, 22), // April 22, 2025
    endDate: new Date(2025, 3, 27), // April 27, 2025
  });

  return (
    <div className="max-w-6xl mx-auto pl-30 px-4 py-8">
      <Title />
      <PhotoGallery />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 relative items-start md:items-center border-b pb-6 mb-6">
        <div>
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
              <span className="underline cursor-pointer font-semibold">
                6 reviews
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-gray-300 pb-6 pt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src={roomImages[5]}
                alt="avataruser"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Stay with Chunn</p>
              <p className="text-base text-gray-600">1 year hosting</p>
            </div>
          </div>
          <RoomFeatures />
          <AboutThisPlace />
          <WhatThisPlaceOffers />
          {/* Add CalendarSection below WhatThisPlaceOffers */}
          <div className="pt-6 border-t border-gray-200">
            <CalendarSection
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              location="Phu Tho"
            />
          </div>
        </div>
        <PriceBox selectedDates={selectedDates} />
      </div>
      <ReviewSection />
    </div>
    
  );
};
export default DetailRoom;




const reviews = [
  {
    name: "Franck",
    avatar: "/img/avatar.png",
    yearsActive: 8,
    date: "March 2025",
    rating: 5,
    review:
      "Green Garden is a place to explore. A small paradise that’s very peaceful in a rural setting near the center of Tam Coc. Very unique and perfectly located to discover the wonders of the area...",
  },
  {
    name: "Alice",
    avatar: "/img/avatar.png",
    yearsActive: 3,
    date: "February 2025",
    rating: 5,
    review:
      "Absolutely loved this place. Peaceful atmosphere, great view, and very welcoming host!",
  },
  {
    name: "Ben",
    avatar: "/img/avatar.png",
    yearsActive: 5,
    date: "January 2025",
    rating: 4,
    review:
      "The house is in a beautiful location. The garden is stunning, and it's super quiet at night.",
  },
  {
    name: "Clara",
    avatar: "/img/avatar.png",
    yearsActive: 2,
    date: "December 2024",
    rating: 5,
    review:
      "Very cozy and authentic place. We enjoyed biking around the nearby countryside.",
  },
];

const ReviewSection = () => (
  <div className="max-w-6xl mx-auto px-4 py-10 border-t border-gray-200">
    <h2 className="text-2xl font-semibold mb-6 pb-6">★ 4.9 · Guest Reviews</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {reviews.map(({ name, avatar, yearsActive, date, rating, review }, idx) => (
        <div key={idx}>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image
                src={avatar}
                alt={`${name}'s avatar`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-500">
                {yearsActive} years active on Homie
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-3 mb-2">
            <span>{"★".repeat(rating)}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <p className="text-base text-gray-700 leading-relaxed">{review}</p>
        </div>
      ))}
    </div>
  </div>
);
