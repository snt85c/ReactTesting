import { Calendar } from "react-calendar";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
import { iCalendarPropsPackage } from "./TODOInterfaces";

export default function TODOcalendar(props: {
  calendarPropsPackage: iCalendarPropsPackage;
}) {
  const { ref } = HandleClickOutsideComponent(
    props.calendarPropsPackage.setIsCalendarOpen
  );

  return (
    <>
      {props.calendarPropsPackage.isCalendarOpen && (
        <div
          ref={ref}
          className="flex flex-col absolute top-auto text-black bg-slate-100 shadow-xl rounded-"
        >
          <Calendar
            className=""
            onChange={props.calendarPropsPackage.onChange}
            value={props.calendarPropsPackage.value}
          />
          <button
            className=" text-black"
            onClick={() => props.calendarPropsPackage.handleEditCalendar()}
          >
            confirm
          </button>
        </div>
      )}

      <div onClick={() => props.calendarPropsPackage.setIsCalendarOpen(true)}>
        {props.calendarPropsPackage.value.toDateString()}
      </div>
    </>
  );
}
