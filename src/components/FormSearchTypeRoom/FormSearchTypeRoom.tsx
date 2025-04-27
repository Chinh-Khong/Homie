import { useState } from "react";

const roomTypes = ["countryside", "villa", "lakeside", "seaside", ];

interface Props {
  onChangeType: (type: string) => void;
}

const FormSearchTypeRoom = (props: Props) => {
  const { onChangeType } = props;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    const newType = selectedType === type ? "" : type;
    setSelectedType(newType === "" ? null : newType);
    onChangeType(newType);
  };

  return (
    <div className="md:flex md:flex-row md:justify-center md:items-center gap-4 grid grid-cols-2 lg:grid-cols-6">
      {roomTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleSelect(type)}
          className={`px-4 py-2 rounded-full border cursor-pointer font-semibold
            ${selectedType === type
              ? "bg-main text-white border-bg-main"
              : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FormSearchTypeRoom;
