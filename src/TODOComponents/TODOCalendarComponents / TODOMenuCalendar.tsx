import { useState } from "react";
import Calendar from "react-calendar";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iTodoPropsPackage } from "../TODOInterfaces";

export default function TODOMenuCalendar(props: {
  todoPropsPackage: iTodoPropsPackage;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const {ref} = HandleClickOutsideComponent(setIsCalendarOpen)
  return (
    <>
        <div onClick={() => setIsCalendarOpen(true)}>
          date: {props.todoPropsPackage.date.toLocaleDateString()}
        </div>
      {isCalendarOpen && (
        <div 
        ref = {ref}
        className="flex z-10 flex-col items-center absolute top-auto text-black p-2 rounded-xl bg-slate-200 shadow-xl gap-1">
          <div>set a date</div>
          <Calendar
          className="bg-fuchsia-50"
            value={props.todoPropsPackage.date}
            onChange={props.todoPropsPackage.setDate}
          />
          <button onClick={()=>setIsCalendarOpen(false)}>confirm</button>
        </div>
      )}
    </>
  );
}
