import { motion, useDragControls } from "framer-motion";
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
  const dragControls = useDragControls();

  return (
    <>
      {props.calendarPropsPackage.isCalendarOpen && (
        <motion.div
          drag
          dragMomentum={false}
          dragControls={dragControls}
          dragListener={false}
          ref={ref}
          className="flex flex-col  border absolute window gap-1 "
        >
          <div
            className="title-bar"
            onPointerDown={(e) => {
              dragControls.start(e);
            }}
          >
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
            confirm
          </button>
        </motion.div>
      )}

      <div
        onClick={() => props.calendarPropsPackage.setIsCalendarOpen(true)}
        className="flex justify-center text-center w-1/4 items-center cursor-pointer"
      >
        {props.calendarPropsPackage.value.getDay() <= new Date().getDay() - 1 &&
        props.calendarPropsPackage.value.getMonth() !== new Date().getMonth()
          ? "expired"
          : props.calendarPropsPackage.value?.toDateString()}
      </div>
    </>
  );
}
