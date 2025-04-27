import React, { useState, useEffect } from "react";
import { Modal, Input, Select, InputNumber } from "antd";
import { ParamsRoom } from "@/src/app/(admin)/admin/manage-list-room/page";
import { toast } from "react-toastify";
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
import axios from "axios";

interface RoomDetailModalProps {
  isModalVisible: boolean;
  selectedRoom: ParamsRoom | null;
  onClose: () => void;
  onUpdate: (updatedRoom: ParamsRoom) => void;
  handleConfirmDelete: () => void;
}
const { Option } = Select;

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  isModalVisible,
  selectedRoom,
  onClose,
  onUpdate,
  handleConfirmDelete,
}) => {
  const [formData, setFormData] = useState({
    image: null as File | null,
    name: "",
    address: "",
    price: "",
    rating: "",
    description_room: "",
    status: "",
    bed_rooms: "",
    bath_room: "",
    occupancy_limit: "",
    type_room: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedRoom) {
      setFormData({
        image: null,
        name: selectedRoom.name,
        address: selectedRoom.address,
        price: selectedRoom.price.toString(),
        rating: selectedRoom.rating.toString(),
        description_room: selectedRoom.description_room,
        status: selectedRoom.status,
        bed_rooms: selectedRoom.bed_rooms.toString(),
        bath_room: selectedRoom.bath_room.toString(),
        occupancy_limit: selectedRoom.occupancy_limit.toString(),
        type_room: selectedRoom.type_room,
      });
      setPreviewImage(selectedRoom.image);
    }
  }, [selectedRoom]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    if (!formData.image && !previewImage) {
      toast.warning("Please upload an image or leave it unchanged.");
      return;
    }

    const updatedRoom: ParamsRoom = {
      ...selectedRoom!,
      ...formData,
      image: previewImage || selectedRoom?.image || "",
      price: Number(formData.price),
      rating: Number(formData.rating),
      bed_rooms: Number(formData.bed_rooms),
      bath_room: Number(formData.bath_room),
      occupancy_limit: Number(formData.occupancy_limit),
      type_room: formData.type_room,
    };

    onUpdate(updatedRoom);
    onClose();
  };

  const _renderInput = (
    label: string,
    name: keyof typeof formData,
    type: string,
    icon?: React.ReactNode
  ) => {
    const isPrice = name === "price";

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {isPrice ? (
          <InputNumber<number>
            name={name}
            value={formData[name] ? Number(formData[name]) : undefined}
            onChange={(value) =>
              setFormData({
                ...formData,
                [name]: value !== null ? value.toString() : "",
              })
            }
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
            }
            parser={(value) =>
              parseInt(
                (value || "").replace(/\./g, "").replace(/[^\d]/g, ""),
                10
              )
            }
            style={{ width: "100%", height: "50px" }}
            prefix={icon}
          />
        ) : (
          <Input
            placeholder={label}
            type={type}
            name={name}
            value={formData[name] as string}
            onChange={handleChange}
            prefix={icon}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-[50px]"
          />
        )}
      </div>
    );
  };

  const _renderInputImage = () => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Room Image:</label>
      <label className="cursor-pointer border-2 border-dashed border-gray-400 rounded-md p-6 w-full text-center flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <span className="text-gray-600 font-medium">
          Click to upload an image
        </span>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-auto rounded-md border border-gray-300"
          />
        )}
      </label>
    </div>
  );

  const _renderSelectTypeRoom = () => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Room Type</label>
      <Select
        value={formData.type_room}
        onChange={(value) => setFormData({ ...formData, type_room: value })}
        placeholder="Select room type"
        className="w-full !h-[50px]"
      >
        <Option value="countryside">Countryside</Option>
        <Option value="villa">Villa</Option>
        <Option value="lakeside">Lakeside</Option>
        <Option value="seaside">Seaside</Option>
      </Select>
    </div>
  );

  return (
    <Modal
      title={<span className="text-xl font-bold text-gray-800">Edit Room</span>}
      open={isModalVisible}
      onCancel={onClose}
      footer={null}
      width={850}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center"
      >
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
        
        <div className="col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="h-[50px] px-6 text-rose-500 border border-rose-500 font-medium rounded-md transition"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[50px] px-6 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-[50px] px-6 bg-main text-white font-medium rounded-md transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomDetailModal;
