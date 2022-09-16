import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase/Firebase";
import { iTodo, iTodoPropsPackage } from "../TODOInterfaces";
import TODOName from "./TODOName";
import "react-calendar/dist/Calendar.css";
import TODOListCalendar from "./TODOListCalendar";
import TODOItemPriority from "./TODOItemPriority";
import TODOListDelete from "./TODOListDelete";

export default function TODOItem(props: {
  data: iTodo;
  todoPropsPackage: iTodoPropsPackage;
}) {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [date, setDate] = useState(props.data.date);

  const handleEditCalendar = async () => {
    props.todoPropsPackage.dispatch({
      type: "EDITDATE",
      id: props.data.id,
      newDate: date,
    });
    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
      date: date,
    });
    setIsCalendarOpen(false);
  };

  const handleEditName = async (newName: string) => {
    props.todoPropsPackage.dispatch({
      type: "EDITNAME",
      payload: newName,
      id: props.data.id,
    });
    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
      name: newName ? newName : "empty",
    });
    setIsEditName(false);
  };

  const handleDelete = async () => {
    props.todoPropsPackage.dispatch({ type: "DELETE", payload: props.data.id });
    await deleteDoc(doc(db, "users", props.data.id.toString()));
  };

  const handlePriority = async () => {
    props.todoPropsPackage.dispatch({
      type: "EDITPRIORITY",
      id: props.data.id,
    });
    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
    });
  };

  const editNamePropsPackage = {
    name: props.data.name,
    handleEditName,
    isEditName,
    setIsEditName,
  };

  const calendarPropsPackage = {
    value: date,
    onChange: setDate,
    isCalendarOpen,
    setIsCalendarOpen,
    handleEditCalendar,
  };

  return (
    <>
      <div className="flex flex-col  mx-2 my-1 justify-around">
        <TODOName editNamePropsPackage={editNamePropsPackage} />
        <div className="flex flex-col sm:flex-row justify-between gap-1">
          <TODOListCalendar calendarPropsPackage={calendarPropsPackage} />
          <div className="flex flex-row justify-end">
            <TODOItemPriority
              handlePriority={handlePriority}
              priority={props.data.priority}
            />
            <TODOListDelete handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
