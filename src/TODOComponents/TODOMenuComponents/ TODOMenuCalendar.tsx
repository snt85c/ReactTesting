import { useState } from "react";
import Calendar from "react-calendar";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iTodoPropsPackage } from "../TODOInterfaces";

export default function TODOMenuCalendar(props: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const { ref } = HandleClickOutsideComponent(setIsCalendarOpen);
  return (
    <>
      <div onClick={() => setIsCalendarOpen(true)}>
        date: {props.date.toLocaleDateString()}
      </div>
      {isCalendarOpen && (
        <div
          ref={ref}
          className="flex z-10 flex-col items-center absolute top-20 sm:left-20 window"
        >
          <div className="title-bar w-full ">
            <span className="title-bar-text pl-1 w-full">set a date</span>
            <div className="title-bar-controls pr-1">
              <button aria-label="Close"
              onClick={() => setIsCalendarOpen(false)}
              ></button>
            </div>
          </div>
          <Calendar
            className="bg-fuchsia-50"
            value={props.date}
            onChange={props.setDate}
          />
          <button className="p-2 m-1" onClick={() => setIsCalendarOpen(false)}>confirm</button>
        </div>
      )}
    </>
  );
}
