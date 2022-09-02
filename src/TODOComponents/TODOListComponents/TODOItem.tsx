import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase/Firebase";
import { iTodo, iTodoPropsPackage } from "../TODOInterfaces";
import TODOName from "./TODOName";
import "react-calendar/dist/Calendar.css";
import TODOListCalendar from "./TODOListCalendar";
import TODOItemPriority from "./TODOItemPriority";

export default function TODOItem(props: {
  data: iTodo;
  todoPropsPackage: iTodoPropsPackage;
}) {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [date, setDate] = useState(props.data.date);

  const handleEditCalendar = async () => {
    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
      date: date,
    });
    console.log(props.data.id, " => date has changed");
    setIsCalendarOpen(false);
  };

  const handleEditName = async (newName: string) => {
    const temp = props.todoPropsPackage.todo.map((item) => {
      if (item.id === props.data.id) {
        props.data.name = newName /*? newName : "empty";*/
        return item;
      }
      return item;
    });
    props.todoPropsPackage.setTodo(temp);

    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
      name: newName ? newName : "empty",
    });
    console.log(props.data.id, " => name has changed");
    setIsEditName(false);
  };

  const handleDelete = async () => {
    const tempTodoList = props.todoPropsPackage.todo.filter((item) => {
      return item.id !== props.data.id;
    });
    props.todoPropsPackage.setTodo(tempTodoList);
    await deleteDoc(doc(db, "users", props.data.id.toString()));
    console.log(props.data.id, " => has been deleted");
  };

  const handlePriority = async () => {
    const temp: iTodo[] = props.todoPropsPackage.todo.map((item) => {
      if (item.id === props.data.id) {
        if (item.priority === "Normal") {
          item.priority = "Urgent";
        } else if (item.priority === "Urgent") {
          item.priority = "Low";
        } else if (item.priority === "Low") {
          item.priority = "Normal";
        }
        return item;
      }
      return item;
    });
    props.todoPropsPackage.setTodo(temp);
    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
    });
    console.log(props.data.id, " => priority has changed");
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
        <div className="flex flex-row justify-between">
          <TODOListCalendar calendarPropsPackage={calendarPropsPackage} />
          <div className="flex flex-row">
          <TODOItemPriority
            handlePriority={handlePriority}
            priority={props.data.priority}
            />
          <button
            data-testid="deleteSpan"
            className="cursor-pointer flex justify-center items-center hover:text-red-700 duration-300"
            onClick={handleDelete}
            >
            delete
          </button>
            </div>
        </div>
      </div>
    </>
  );
}
