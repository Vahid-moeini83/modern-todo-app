"use client";

import dynamic from "next/dynamic";

const DatePicker = dynamic(() => import("react-multi-date-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-full bg-input rounded-lg animate-pulse" />
  ),
});
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const DateRangePicker = ({
  value,
  onChange,
  placeholder = "Select date range...",
  disabled = false,
  className,
  ...props
}) => {
  const convertDateStringsToDateObjects = (dateStrings) => {
    if (!dateStrings || !Array.isArray(dateStrings) || dateStrings.length === 0)
      return [];

    return dateStrings
      .map((dateStr) => {
        if (!dateStr) return null;
        const [year, month, day] = dateStr.split("-");
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      })
      .filter(Boolean);
  };

  const convertDateObjectsToStrings = (dateObjects) => {
    if (!dateObjects || !Array.isArray(dateObjects)) return [];

    return dateObjects
      .map((dateObj) => {
        if (!dateObj) return "";
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      })
      .filter(Boolean);
  };

  const handleDateChange = (dates) => {
    const dateStrings = convertDateObjectsToStrings(dates);
    onChange(dateStrings);
  };

  return (
    <div className={cn("custom-date-picker relative", className)}>
      <DatePicker
        value={convertDateStringsToDateObjects(value)}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        placeholder={placeholder}
        disabled={disabled}
        range
        className="custom-date-input"
        inputClass="w-full h-10 px-3 py-2 pr-10 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        containerClassName="w-full"
        {...props}
      />
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
    </div>
  );
};

export default DateRangePicker;
