'use client';
import { Input, Button } from 'antd';
import React, { useState } from 'react';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    image: null as File | null,
    name: '',
    address: '',
    rentalDate: '',
    price: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image as File);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('rentalDate', formData.rentalDate);
    formDataToSend.append('price', formData.price);

    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Room created successfully:', data);
        // Reset form or show success message
      } else {
        console.error('Failed to create room:', await response.json());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const _renderInput = (label: string, name: keyof typeof formData, type: string) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input
          type={type}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  };

  const _renderInputImage = () => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image:</label>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => document.getElementById('fileInput')?.click()}
            className='bg-main w-[150px] h-[50px] text-white font-semibold rounded-md cursor-pointer'
          >
            Upload Image
          </button>
          <div className='w-[300px]'>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full  h-auto rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-20 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create a Room</h1>
      <form onSubmit={handleSubmit} className="max-w-[600px] flex flex-col gap-4">
        {_renderInputImage()}
        {_renderInput("Name Room:", "name", "text")}
        {_renderInput("Address:", "address", "text")}
        {_renderInput("Rental Date:", "rentalDate", "date")}
        {_renderInput("Price:", "price", "number")}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-main text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;