'use client';
import { IMAGE_URL } from "@/public";
import { DatePicker, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { useRef, useState } from "react";
const { RangePicker } = DatePicker;

const LocationSearch = ({ onSearchLocation }: { onSearchLocation: (val: string) => void }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const formatSelectedDates = () => {
    if (!selectedDates[0] || !selectedDates[1]) return "Add dates";
    const format = "D MMM";
    return `${selectedDates[0].format(format)} - ${selectedDates[1].format(
      format
    )}`;
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setSelectedDates(dates);
    } else {
      setSelectedDates([null, null]);
    }
  }

  const handleClearDates = () => {
    setSelectedDates([null, null]);
    setShowDatePicker(false);
  };

  const handleApplyDates = () => {
    setShowDatePicker(false);
  };

  const handleSearch = () => {
    onSearchLocation(searchKeyword);
  };


  const _renderLocationSearch = () => (
    <div className="">
      <input
        className="text-b text-gray-600 outline-none text-center w-full"
        placeholder="Search destinations"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );

  const _renderDatePickerPopup = () => (
    <div
      ref={datePickerRef}
      className="absolute top-[110%] left-1/3 right-0 mt-2 p-4 bg-white rounded-xl shadow-lg z-50"
    >
      <RangePicker
        className="w-full"
        format="DD/MM/YYYY"
        value={selectedDates}
        onChange={handleDateChange}
      />
      <div className="mt-4 flex justify-between">
        <button
          className="text-gray-500 underline cursor-pointer bg-transparent border-none"
          onClick={handleClearDates}
        >
          Clear dates
        </button>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded-md cursor-pointer border-none"
          onClick={handleApplyDates}
        >
          Apply
        </button>
      </div>
    </div>
  );

  const _renderDatePickerComponent = () => (
    <div className="flex items-center justify-between pl-2 p-1">
      <button
        type="button"
        onClick={handleSearch}
        className="w-[45px] h-[45px] rounded-full bg-[#ff2e63] flex items-center justify-center shadow-md hover:opacity-80 transition cursor-pointer"
      >
        <SearchOutlined style={{ color: 'white', fontSize: '20px' }} />
      </button>
      {showDatePicker && _renderDatePickerPopup()}
    </div>
  );

  return (
    <div className="w-full md:flex md:flex-row md:justify-center">
      <div className="relative flex justify-center items-center border border-gray-200 rounded-full shadow-sm md:min-w-xl ">
        <div className="w-full flex items-center justify-between">  
          {_renderLocationSearch()}
          {_renderDatePickerComponent()}
        </div>
      </div>
    </div>
  );
}

export default LocationSearch