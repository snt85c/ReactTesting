import { Calendar } from "react-calendar";
import { iCalendarPropsPackage } from "./TODOInterfaces";

export default function TODOcalendar(props: {
  calendarPropsPackage: iCalendarPropsPackage;
}) {
  return (
    props.calendarPropsPackage.isCalendarOpen? <div >
      <Calendar
        onChange={props.calendarPropsPackage.onChange}
        value={props.calendarPropsPackage.value}
      />
    </div> : <div>{props.calendarPropsPackage.value.toDateString()}</div>
  );
}
 