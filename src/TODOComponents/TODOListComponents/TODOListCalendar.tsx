import { motion } from "framer-motion";
import { Calendar } from "react-calendar";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iCalendarPropsPackage } from "../TODOInterfaces";

export default function TODOListCalendar(props: {
  calendarPropsPackage: iCalendarPropsPackage;
}) {
  const { ref } = HandleClickOutsideComponent(
    props.calendarPropsPackage.setIsCalendarOpen
  );

  // console.log(props.calendarPropsPackage.value , new Date(), "day",props.calendarPropsPackage.value )
  // console.log(props.calendarPropsPackage.value.getMonth(),  new Date().getMonth(), "month")
  // const dragControls = useDragControls();

  return (
    <>
      {props.calendarPropsPackage.isCalendarOpen && (
        <motion.div
          drag
          dragMomentum={false}
          // dragControls={dragControls}
          // dragListener={false}
          ref={ref}
          className="flex flex-col  border absolute window gap-1 "
        >
          <div
            className="title-bar"
            // onPointerDown={(e) => {
            //   dragControls.start(e);
            // }}
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
            Confirm
          </button>
        </motion.div>
      )}

      <div
        onClick={() => props.calendarPropsPackage.setIsCalendarOpen(true)}
        className="flex justify-start text-center w-1/4 items-center cursor-pointer"
      >
        <span className="mr-2">Date: </span>
        <span data-testid="dateSpan">
          {props.calendarPropsPackage.value?.toLocaleDateString()}
        </span>
        <span className="text-red-700">
          <span className="ml-2">
            {props.calendarPropsPackage.value < new Date() ? "  expired" : ""}
          </span>
        </span>
      </div>
    </>
  );
}
