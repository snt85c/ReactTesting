import { motion } from "framer-motion";
import { Calendar } from "react-calendar";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iCalendarPropsPackage } from "../../Interfaces";

export default function ListItemICalendar(props: {
  calendarPropsPackage: iCalendarPropsPackage;
}) {
  const { ref } = HandleClickOutsideComponent(
    props.calendarPropsPackage.setIsCalendarOpen
  );

  return (
    <>
      {props.calendarPropsPackage.isCalendarOpen && (
        <motion.div
          drag
          dragMomentum={false}
          ref={ref}
          className="flex flex-col  border absolute top-10 window gap-1 "
        >
          <div className="title-bar">
            <span className="title-bar-text pl-1 w-full">Set a new date</span>
            <div className="title-bar-controls pr-1">
              <button
                aria-label="Close"
                onClick={() =>
                  props.calendarPropsPackage.setIsCalendarOpen(false)
                }
              ></button>
            </div>
          </div>
          <Calendar
            className=""
            onChange={props.calendarPropsPackage.onChange}
            value={props.calendarPropsPackage.value}
          />
          <button
            className=" text-black"
            onClick={() => props.calendarPropsPackage.handleEditCalendar()}
          >
            Confirm
          </button>
        </motion.div>
      )}

      <div
        onClick={() => props.calendarPropsPackage.setIsCalendarOpen(true)}
        className="flex justify-start text-center w-1/3 items-center cursor-pointer"
      >
        <span>Date: </span>
        <input
          type="text"
          aria-label="input-list-date"
          value={props.calendarPropsPackage.value.toLocaleDateString()}
          onChange={()=>{}}
        />
        <span className="text-red-700">
          <span className="ml-2">
            {props.calendarPropsPackage.value.getDate() + 1 <
            new Date().getDate() + 1
              ? "  expired"
              : ""}
          </span>
        </span>
      </div>
    </>
  );
}
