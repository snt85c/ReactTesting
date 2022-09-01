import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase/Firebase";
import { iTodo, iTodoPropsPackage } from "../TODOInterfaces";
import TODOName from "./TODOName Components/TODOName";
// import TODOTask from "./TODOTask";
import 'react-calendar/dist/Calendar.css';
import TODOListCalendar from "./TODOListCalendar";
import TODOItemPriority from "./TODOItemPriority";



export default function TODOItem(props: {
  data: iTodo;
  todoPropsPackage: iTodoPropsPackage;
}) {

  // console.log(props.data)

  // const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [date, setDate] = useState(props.data.date);

  // const handleEditTask = async (newTask: string) => {
  //   const temp = props.todoPropsPackage.todo.map((item) => {
  //     if (item.id === props.data.id) {
  //       props.data.task = newTask ? newTask : "empty";
  //       return item;
  //     }
  //     return item;
  //   });
  //   props.todoPropsPackage.setTodo(temp);
  //   await updateDoc(doc(db, "users", props.data.id.toString()), {
  //     ...props.data,
  //     task: newTask ? newTask : "empty",
  //   });
  //   console.log(props.data.id, " => task has changed");
  //   setIsEditTask(false);
  // };

  const handleEditCalendar = async ()=>{
    await updateDoc(doc(db, "users", props.data.id.toString()), {
          ...props.data,
          date: date,
        });
        console.log(props.data.id, " => date has changed");
        setIsCalendarOpen(false);
  }

  const handleEditName = async (newName: string) => {
    const temp = props.todoPropsPackage.todo.map((item) => {
      if (item.id === props.data.id) {
        props.data.name = newName ? newName : "empty";
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
    name:props.data.name,handleEditName, isEditName, setIsEditName
  } 

  // const editTaskPropsPackage = {
  //   task:props.data.task, handleEditTask, isEditTask, setIsEditTask
  // }

  const calendarPropsPackage ={
    value:date,
    onChange: setDate,
    isCalendarOpen,
    setIsCalendarOpen,
    handleEditCalendar
  }

  return (
    <>
      <div className="flex justify-between mx-2 text-white font-extrabold border bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 duration-300 border-blue-700  rounded-xl px-5 py-2 my-1 shadow-2xl">
        <TODOName editNamePropsPackage={editNamePropsPackage}  />
        {/* <TODOTask editTaskPropsPackage={editTaskPropsPackage}/> */}
        <TODOListCalendar calendarPropsPackage={calendarPropsPackage}/>
        <TODOItemPriority handlePriority={handlePriority} priority={props.data.priority}/> 
        <span
          data-testid="deleteSpan"
          className="cursor-pointer min-w-[5%] flex justify-end items-center hover:text-red-700 duration-300"
          onClick={handleDelete}
        >
          delete
        </span>
      </div>
    </>
  );
}
