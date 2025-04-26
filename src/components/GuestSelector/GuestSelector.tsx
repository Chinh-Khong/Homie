import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

const GuestSelector = ({
  guests,
  setGuests,
}: {
  guests: { adults: number; children: number; infants: number };
  setGuests: React.Dispatch<
    React.SetStateAction<{
      adults: number;
      children: number;
      infants: number;
    }>
  >;
}) => {
  const updateGuestCount = (type: "adults" | "children" | "infants", delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta), // Ensure count is not negative
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  const guestItems = [
    {
      key: "adults",
      label: (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-neutral-900">Adults</p>
            <p className="text-xs text-neutral-500">Age 13+</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateGuestCount("adults", -1)}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-neutral-500 hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-sm font-medium">{guests.adults}</span>
            <button
              onClick={() => updateGuestCount("adults", 1)}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-neutral-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "children",
      label: (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-neutral-900">Children</p>
            <p className="text-xs text-neutral-500">Ages 2–12</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateGuestCount("children", -1)}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-neutral-500 hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-sm font-medium">{guests.children}</span>
            <button
              onClick={() => updateGuestCount("children", 1)}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-neutral-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "infants",
      label: (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-neutral-900">Infants</p>
            <p className="text-xs text-neutral-500">Under 2</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateGuestCount("infants", -1)}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-neutral-500 hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-sm font-medium">{guests.infants}</span>
            <button
              onClick={() => updateGuestCount("infants", 1)}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-neutral-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ),
    },
  ];

  const menu = {
    items: guestItems,
    className: "rounded-lg shadow-xl",
  };
  
  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomLeft">
  <div className="flex justify-between items-center px-4 py-3 border-t cursor-pointer  hover:shadow-lg transition">
    <div>
      <p className="text-xs font-semibold text-neutral-500 uppercase">
        Guests
      </p>
      <p className="mt-1 text-sm font-medium text-neutral-900">
        {totalGuests} guest{totalGuests > 1 ? "s" : ""}
      </p>
    </div>
    <DownOutlined className="text-l text-neutral-500 group-hover:text-neutral-700 transition" />
  </div>
</Dropdown>
  );
};

export default GuestSelector;