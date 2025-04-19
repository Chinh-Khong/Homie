"use client";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "@/public";
import { useSession } from "next-auth/react";

interface UserInfoProps {
  label: string;
  type: "text" | "email";
  name: keyof typeof emptyUser;
  value: string;
  placeholder?: string;
}

const emptyUser = {
  name: "Anonymous",
  email: "No email",
  phone: "No phone",
  address: "No address",
};

const Profile = () => {
  const { data, status } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(emptyUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      setFormData(updatedUser);
      setIsEditing(false);
    } catch (error: any) {
      console.error("Save profile error:", error);
    }
  };

  const handleCancel = () => {
    setFormData(data?.user as any);
    setIsEditing(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      setFormData(data?.user as any);
    }
  }, [status, data]);

  const _renderAvatar = () => {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-main">
          <img
            src={IMAGE_URL.USER}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{formData.name}</h2>
          <p className="text-gray-500 text-md">{formData.email}</p>
        </div>
      </div>
    );
  };

  const _renderUserInfo = ({
    label,
    type,
    name,
    value,
    placeholder = "Chưa cung cấp",
  }: UserInfoProps) => {
    return (
      <div className="p-4 border border-gray-300 rounded-lg hover:border-main transition-colors">
        <label htmlFor={name} className="block">
          <h4 className="font-bold text-lg mb-2">{label}</h4>
          {isEditing ? (
            <input
              id={name}
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className="border border-gray-300 w-full rounded px-3 py-2 focus:outline-none focus:border-main"
            />
          ) : (
            <p className="text-gray-500">{value || placeholder}</p>
          )}
        </label>
      </div>
    );
  };

  const _renderEditButton = () => {
    return (
      <div className="flex justify-center items-center">
        {!isEditing ? (
          <button
            className="px-6 font-semibold py-2 bg-main text-white rounded-lg cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa hồ sơ
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              className="px-6 font-semibold py-2 bg-main text-white rounded-lg cursor-pointer"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="px-6 font-semibold py-2 border border-black text-black rounded-lg cursor-pointer"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:px-38 px-4 py-8 flex flex-col gap-10">
      {_renderAvatar()}
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <h3 className="text-xl font-bold mb-4">Chi tiết hồ sơ</h3>
        <div className="grid md:grid-cols-2 gap-6 min-w-[750px]">
          {_renderUserInfo({
            label: "Họ tên",
            type: "text",
            name: "name",
            value: formData.name,
          })}
          {_renderUserInfo({
            label: "Email",
            type: "email",
            name: "email",
            value: formData.email,
          })}
          {_renderUserInfo({
            label: "Phone",
            type: "text",
            name: "phone",
            value: formData.phone,
          })}
          {_renderUserInfo({
            label: "Address",
            type: "text",
            name: "address",
            value: formData.address,
          })}
        </div>
      </div>
      {data?.user && _renderEditButton()}
    </div>
  );
}

export default Profile;