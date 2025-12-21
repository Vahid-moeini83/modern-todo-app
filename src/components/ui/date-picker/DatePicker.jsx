"use client";

import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const DatePicker = dynamic(() => import("react-multi-date-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-full bg-input rounded-lg animate-pulse" />
  ),
});

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select date...",
  disabled = false,
  className,
  autoClose = true,
  ...props
}) => {
  const convertDateStringToDateObject = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const convertDateObjectToString = (dateObj) => {
    if (!dateObj) return "";

    // Handle different date object types from react-multi-date-picker
    let jsDate;

    if (dateObj instanceof Date) {
      jsDate = dateObj;
    } else if (dateObj && typeof dateObj === "object") {
      // Handle DateObject from react-multi-date-picker
      if (dateObj.toDate && typeof dateObj.toDate === "function") {
        jsDate = dateObj.toDate();
      } else if (dateObj.year && dateObj.month && dateObj.day) {
        jsDate = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
      } else {
        return "";
      }
    } else {
      return "";
    }

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    const dateString = convertDateObjectToString(date);
    onChange(dateString);
  };

  return (
    <div className={cn("custom-date-picker relative", className)}>
      <DatePicker
        value={convertDateStringToDateObject(value)}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        placeholder={placeholder}
        disabled={disabled}
        className="custom-date-input"
        inputClass="w-full h-10 px-3 py-2 pr-10 rounded-lg border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        containerClassName="w-full"
        hideOnScroll
        closeOnSelect={autoClose}
        {...props}
      />
      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
    </div>
  );
};

export default CustomDatePicker;
