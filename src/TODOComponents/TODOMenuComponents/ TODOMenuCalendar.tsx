import { motion, useDragControls } from "framer-motion";
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
  const dragControls = useDragControls();

  return (
    <>
      <button className="mt-2 w-full" onClick={() => setIsCalendarOpen(true)}>
        date: {props.date.toLocaleDateString()}
      </button>
      {isCalendarOpen && (
        <motion.div
          drag
          dragMomentum={false}
          dragControls={dragControls}
          dragListener={false}
          ref={ref}
          className="flex z-10 flex-col items-center absolute top-20 sm:left-20 window"
        >
          <div
            className="title-bar w-[98%]"
            onPointerDown={(e) => {
              dragControls.start(e);
            }}
          >
            <span className="title-bar-text pl-1 ">set a date</span>
            <div className="title-bar-controls pr-1">
              <button
                aria-label="Close"
                onClick={() => setIsCalendarOpen(false)}
              ></button>
            </div>
          </div>
          <Calendar value={props.date} onChange={props.setDate} />
          <button className="p-2 m-1" onClick={() => setIsCalendarOpen(false)}>
            confirm
          </button>
        </motion.div>
      )}
    </>
  );
}
