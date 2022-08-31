import { Calendar } from "react-calendar";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iCalendarPropsPackage } from "../TODOInterfaces";

export default function TODOListCalendar(props: {
  calendarPropsPackage: iCalendarPropsPackage;
}) {
  const { ref } = HandleClickOutsideComponent(
    props.calendarPropsPackage.setIsCalendarOpen
  );

  return (
    <>
      {props.calendarPropsPackage.isCalendarOpen && (
        <div ref={ref} className="flex flex-col absolute top-auto text-black p-2 bg-gray-300 rounded-xl shadow-xl">
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

      <div
        onClick={() => props.calendarPropsPackage.setIsCalendarOpen(true)}
        className="flex justify-center items-center text-[0.8rem] cursor-pointer"
      >
        {props.calendarPropsPackage.value?.toDateString()}
      </div>
    </>
  );
}
