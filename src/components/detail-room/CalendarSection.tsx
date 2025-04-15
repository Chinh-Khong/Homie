import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
  const range: Range[] = [
    {
      startDate: selectedDates.startDate,
      endDate: selectedDates.endDate,
      key: "selection",
    },
  ];

  const getNights = () => {
    const diffTime = Math.abs(
      selectedDates.endDate.getTime() - selectedDates.startDate.getTime()
    );
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    if (selection.startDate && selection.endDate) {
      setSelectedDates({
        startDate: selection.startDate,
        endDate: selection.endDate,
      });
    }
  };

  const resetDates = () => {
    setSelectedDates({
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // +1 day
    });
  };

  return (
    <div className="border border-gray-300 rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-1">
        {getNights()} night{getNights() > 1 ? "s" : ""} at {location}
      </h2>
      <p className=" mb-4 text-base">
        {format(selectedDates.startDate, "dd MMM yyyy", { locale: enUS })} –{" "}
        {format(selectedDates.endDate, "dd MMM yyyy", { locale: enUS })}
      </p>

      <div className="max-300">
        <DateRange
          ranges={range}
          onChange={handleDateChange}
          months={2}
          direction="horizontal"
          minDate={new Date()}
          rangeColors={["#000"]}
          showDateDisplay={false}
          showMonthAndYearPickers={true}
          locale={enUS}
          editableDateInputs={true}
        />
      </div>

      <button
        className="mt-3 text-sm underline text-gray-700 hover:text-black"
        onClick={resetDates}
      >
        Clear dates
      </button>
    </div>
  );
};

export default CalendarSection;
