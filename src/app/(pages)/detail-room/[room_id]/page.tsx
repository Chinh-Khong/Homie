"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Modal } from "antd";
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
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { IMAGE_URL } from "@/public";



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

  
  const [reviews, setReviews] = useState([
    {
      name: "Chunn",
      location: "Hanoi, Vietnam",
      date: "April 2025",
      rating: 5,
      comment:
        "So cool, I had a great time here, hope to come back soon, love you forever"
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    name: "",
    location: "",
    date: "",
    rating: 5,
    comment: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

    
    const openModal = (index: number | null = null) => {
      if (index !== null) {
        setCurrentReview(reviews[index]);
        setEditIndex(index);
      } else {
        setCurrentReview({
          name: "",
          location: "",
          date: new Date().toLocaleDateString("vi-VN", {
            month: "long",
            year: "numeric",
          }),
          rating: 5,
          comment: "",
        });
        setEditIndex(null);
      }
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const handleSave = () => {
      if (editIndex !== null) {
        const updated = [...reviews];
        updated[editIndex] = currentReview;
        setReviews(updated);
      } else {
        setReviews([...reviews, { ...currentReview, name: "You" }]);
      }
      closeModal();
    };
  
    const handleDelete = (index: number) => {
      const updatedReviews = reviews.filter((_, i) => i !== index);
      setReviews(updatedReviews);
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
          {room.bed_rooms} bed rooms · {room.bath_room} bath room ·{" "}
        </p>
        <div className="flex items-center text-base text-gray-800 mt-1">
          <span className="font-semibold">★ {room.rating}</span>
          <span className="mx-1 text-gray-400">·</span>
          <span className="underline cursor-pointer font-semibold pl-3">
            6 reviews
          </span>
        </div>
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

 
  const _renderReviews = () => {
    const fixedReviews = [
      {
        name: "Ilya",
        location: "Antalya, Turkey",
        date: "March 2025",
        rating: 5,
        comment:
          "A relaxing location. The room was clean. Not many grocery stores or cafes nearby, but Grab delivery service was quick.",
      },
      {
        name: "Hauke",
        location: "Wiesbaden, Germany",
        date: "April 2025",
        rating: 5,
        comment: "The room was very nice! Everyone was very friendly and clean!It was a great experience!",
      },
      {
        name: "Lina",
        location: "London, UK",
        date: "February 2025",
        rating: 4,
        comment: "Everything was as described. 👍",
      },
      {
        name: "Huong",
        location: "Phu Quoc, Vietnam",
        date: "February 2025",
        rating: 5,
        comment:
          "This place feels cozy and sunny. Everything was well-organized, beautiful, and tidy. The area is quiet and fresh, although there aren't many convenience stores nearby.",
      },
    ];
  
    return (
      <div className="pt-6 border-t border-gray-200 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mt-6 mb-4">Reviews</h2>
          <button
            onClick={() => openModal()}
            className="bg-pink-600 text-white px-4 py-2 rounded-xl hover:bg-pink-550 text-sm"
          >
            Write a Review
          </button>
        </div>
  
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 pt-6">
          {reviews.map((review, index) => (
            <div
              key={`user-review-${index}`}
              className="border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-4 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mb-5">
                  <img
                    src={room.image}
                    alt={review.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  {room.address && (
                    <p className="text-sm text-gray-500">{room.address}</p>
                  )}
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
  
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <StarFilled key={i} className="text-yellow-400 text-lg" />
                  ) : (
                    <StarOutlined key={i} className="text-gray-300 text-lg" />
                  )
                )}
              </div>
  
              <p className="text-base text-gray-800 mb-4">{review.comment}</p>
  
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(index)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
  
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {fixedReviews.map((review, index) => (
            <div
              key={`fixed-review-${index}`}
              className="border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-4 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={room.image}
                    alt={review.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  {review.location && (
                    <p className="text-sm text-gray-500">{review.location}</p>
                  )}
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
  
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <StarFilled key={i} className="text-yellow-400 text-lg" />
                  ) : (
                    <StarOutlined key={i} className="text-gray-300 text-lg" />
                  )
                )}
              </div>
  
              <p className="text-base text-gray-800 mb-4">{review.comment}</p>
            </div>
          ))}
        </div>
  
        <Modal
          open={isOpen}
          onCancel={closeModal}
          onOk={handleSave}
          title={editIndex !== null ? "Edit Review" : "Write a Review"}
          okText="Save"
          cancelText="Cancel"
        >
          <div className="mb-4">
            <textarea
              className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              placeholder="Enter your review..."
              value={currentReview.comment}
              onChange={(e) =>
                setCurrentReview({ ...currentReview, comment: e.target.value })
              }
            />
          </div>
  
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) =>
              i < currentReview.rating ? (
                <StarFilled
                  key={i}
                  className="text-yellow-400 text-lg cursor-pointer"
                  onClick={() =>
                    setCurrentReview({ ...currentReview, rating: i + 1 })
                  }
                />
              ) : (
                <StarOutlined
                  key={i}
                  className="text-gray-300 text-lg cursor-pointer"
                  onClick={() =>
                    setCurrentReview({ ...currentReview, rating: i + 1 })
                  }
                />
              )
            )}
          </div>
        </Modal>
      </div>
    );
  };
    
  return (
    <div className="lg:px-38 py-8">
      {_renderTitle()}
      <div className="flex flex-row gap-4 items-center">
        {_renderPhotoGallery()}
        {_renderRoomFeatures()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 relative items-start md:items-center pb-6 mb-6">
        <div>
          {/* Host info */}
          <div className="flex items-center gap-4 border-b border-gray-300 pb-6 pt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <img
                src={room.image}
                alt="Host avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Stay with Chunn</p>
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
            />
          </div>
        </div>

        {_renderPriceBox({ selectedDates })}
      </div>
      {_renderReviews()}
    </div>
  );
};

export default DetailRoom;