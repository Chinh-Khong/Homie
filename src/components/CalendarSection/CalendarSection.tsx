import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";

interface CalendarSectionProps {
  selectedDates: {
    startDate: Date;
    endDate: Date;
  };
  setSelectedDates: (dates: { startDate: Date; endDate: Date }) => void;
  location: string;
}

const CalendarSection = ({
  selectedDates,
  setSelectedDates,
  location,
}: CalendarSectionProps) => {
  const startDate = dayjs(selectedDates.startDate);
  const endDate = dayjs(selectedDates.endDate);

  const getNights = () => {
    const diffTime = endDate.diff(startDate, "day");
    return Math.max(1, diffTime);
  };

  const handleDateChange = (dates: any) => {
    if (dates?.length === 2) {
      setSelectedDates({
        startDate: dates[0].toDate(),
        endDate: dates[1].toDate(),
      });
    }
  };

  const resetDates = () => {
    setSelectedDates({
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000),
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff66b2",
        },
        components: {
          DatePicker: {
            activeBorderColor: "#ff66b2",
            hoverBorderColor: "#ff99cc",
            cellActiveWithRangeBg: "#ffd6e7",
            cellRangeBorderColor: "#ff66b2",
            cellHoverBg: "#ffebf5",
          },
        },
      }}
    >
      <div className="border border-gray-300 hover:black rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-1">
          {getNights()} night{getNights() > 1 ? "s" : ""} at {location}
        </h2>
        <p className="mb-4 text-base pt-3">
          {startDate.format("DD MMM YYYY")} – {endDate.format("DD MMM YYYY")}
        </p>

        <div className="max-w-[300px] pt-2">
          <DatePicker.RangePicker
            value={[startDate, endDate]}
            onChange={handleDateChange}
            format="DD MMM YYYY"
            disabledDate={(current) => current && current < dayjs()}
            className="custom-range-picker"
          />
        </div>

        <button
          className="mt-3 text-sm underline text-gray-700 hover:text-black pt-6"
          onClick={resetDates}
        >
          Clear dates
        </button>
      </div>
      <style jsx>{`
        :global(
            .ant-picker-cell-in-view.ant-picker-cell-selected
              .ant-picker-cell-inner
          ) {
          background: #e61e4d !important;
        }
        :global(
            .ant-picker-cell-in-view.ant-picker-cell-range-start
              .ant-picker-cell-inner
          ),
        :global(
            .ant-picker-cell-in-view.ant-picker-cell-range-end
              .ant-picker-cell-inner
          ) {
          background: #e61e4d !important;
        }
        :global(
            .ant-picker-cell-in-view.ant-picker-cell-today
              .ant-picker-cell-inner::before
          ) {
          border-color: #e61e4d !important;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default CalendarSection;
