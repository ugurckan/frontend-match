import React, { useRef } from "react";
import { CalendarIcon } from "@heroicons/react/solid";

interface DatepickerProps {
  name: string;
  label: string;
  value: string;
  onDateChange: any;
}

const Datepicker = ({ name, label, value, onDateChange }: DatepickerProps) => {
  const dateRef = useRef<any>(null);

  const handleClick = () => {
    dateRef.current.focus();
  };

  const onChange = (event: any) => {
    onDateChange(name, event.target.value);
  };

  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full rounded-md bg-wgreen-400 px-4 py-2 text-sm text-white focus:outline-none focus:right-0"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {value ? (
          <input
            ref={dateRef}
            className="text-white bg-wgreen-400"
            type="date"
            onChange={onChange}
          />
        ) : (
          <span>{label}</span>
        )}
        <CalendarIcon
          className="-mr-1 ml-2 h-5 w-5"
          aria-hidden="true"
          onClick={handleClick}
        />
      </button>
    </div>
  );
};

export default Datepicker;
