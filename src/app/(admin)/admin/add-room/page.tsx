"use client";
import { Input, Button, Select } from "antd";
import React, { useState } from "react";
import {
  HomeOutlined,
  DollarOutlined,
  StarOutlined,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  BankOutlined,
  KeyOutlined,
  TeamOutlined,
  ProfileOutlined,
  ShopOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Divider } from "@mui/material";

const { Option } = Select;

const AddRoom = () => {
  const [formData, setFormData] = useState({
    image: null as File | null,
    name: "",
    address: "",
    rentalDate: "",
    price: "",
    rating: "",
    description_room: "",
    check_in: "",
    check_out: "",
    status: "",
    bed_rooms: "",
    bath_room: "",
    occupancy_limit: "",
    type_room: "",
  });
  const token = localStorage.getItem("token");

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, type_room: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();
    data.append("image", formData.image);
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("rentalDate", formData.rentalDate);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("description_room", formData.description_room);
    data.append("check_in", formData.check_in);
    data.append("check_out", formData.check_out);
    data.append("status", formData.status);
    data.append("bed_rooms", formData.bed_rooms);
    data.append("bath_room", formData.bath_room);
    data.append("occupancy_limit", formData.occupancy_limit);
    data.append("type_room", formData.type_room);
    try {
      const response = await fetch("/api/room/add-rooms", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const _renderInput = (
    label: string,
    name: keyof typeof formData,
    type: string,
    icon?: React.ReactNode
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input
          placeholder={label}
          type={type}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          prefix={icon}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[50px]"
        />
      </div>
    );
  };

  const _renderInputImage = () => {
    return (
      <div className="flex flex-col gap-2 h-full">
        <label className="text-sm font-medium text-gray-700">Room image:</label>
        <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-400 rounded-md p-6 w-full max-w-[500px] text-center flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="text-gray-600 font-medium">
            Click to upload an image
          </div>
          {previewImage && (
            <div className="w-full mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto rounded-md border border-gray-300"
              />
            </div>
          )}
        </label>
      </div>
    );
  };

  const _renderSelectTypeRoom = () => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Room Type</label>
        <Select
          value={formData.type_room}
          onChange={handleSelectChange}
          placeholder="Room Type"
          className="w-full !h-[50px]"
        >
          <Option value="countryside">Countryside</Option>
          <Option value="villa">Villa</Option>
          <Option value="lakeside">Lakeside</Option>
          <Option value="seaside">Seaside</Option>
        </Select>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 items-center flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center"
      >
        <h1 className="col-span-2 text-2xl font-bold mb-2 text-gray-800 pb-6">
          Room Details
        </h1>

        {_renderInputImage()}
        <div className="flex flex-col gap-4">
          {_renderInput("Name Room", "name", "text", <HomeOutlined />)}
          {_renderInput(
            "Description",
            "description_room",
            "text",
            <ProfileOutlined />
          )}
          {_renderInput("Price", "price", "number", <DollarOutlined />)}
          {_renderSelectTypeRoom()}
        </div>
        <Divider className="col-span-2" />
        <h1 className="col-span-2 text-2xl font-bold mb-2 text-gray-800 pb-6">
          Additional Information
        </h1>
        {_renderInput("Address", "address", "text", <EnvironmentOutlined />)}
        {_renderInput("Rating", "rating", "string", <StarOutlined />)}
        {_renderInput("Status", "status", "text", <KeyOutlined />)}
        {_renderInput("Bedrooms", "bed_rooms", "number", <ShopOutlined />)}
        {_renderInput(
          "Bathrooms",
          "bath_room",
          "number",
          <ExperimentOutlined />
        )}
        {_renderInput(
          "Occupancy Limit",
          "occupancy_limit",
          "number",
          <TeamOutlined />
        )}
        <Divider className="col-span-2" />
        <h1 className="col-span-2 text-2xl font-bold mb-2 text-gray-800 pb-6">
          Date & Time
        </h1>
        {_renderInput("Check In", "check_in", "date")}
        {_renderInput("Check Out", "check_out", "date")}
        {_renderInput("Rental Date", "rentalDate", "date")}
        <div className="flex gap-4 items-end h-full">
          <button
            type="submit"
            className="w-full h-[50px] px-4 text-rose-500 font-medium rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2 col-span-1 md:col-span-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full h-[50px] px-4 bg-main text-white font-medium rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2 col-span-1 md:col-span-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
