import { Calendar } from "react-calendar";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iCalendarPropsPackage } from "../TODOInterfaces";

export default function TODOListCalendar(props: {
  calendarPropsPackage: iCalendarPropsPackage;
}) {
  const { ref } = HandleClickOutsideComponent(
    props.calendarPropsPackage.setIsCalendarOpen
  );

  // console.log(props.calendarPropsPackage.value.getDay() , new Date().getDay(), "day")
  // console.log(props.calendarPropsPackage.value.getMonth(),  new Date().getMonth(), "month")

  return (
    <>
      {props.calendarPropsPackage.isCalendarOpen && (
        <div
          ref={ref}
          className="flex flex-col absolute top-auto text-black p-2 bg-gray-300 rounded-xl shadow-xl"
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

      <div
        onClick={() => props.calendarPropsPackage.setIsCalendarOpen(true)}
        className="flex justify-center text-center w-1/4 items-center cursor-pointer"
      >
        {
        props.calendarPropsPackage.value.getDay() <= new Date().getDay() -1 && props.calendarPropsPackage.value.getMonth() !== new Date().getMonth()
          ? "expired"
          : 
          props.calendarPropsPackage.value?.toDateString()}
      </div>
    </>
  );
}
