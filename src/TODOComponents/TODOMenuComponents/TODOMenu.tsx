import { iTodo, iTodoPropsPackage } from "../TODOInterfaces";
import TODOTogglePriority from "./TODOTogglePriority";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import TODOMenuCalendar from "./ TODOMenuCalendar";
import { useState } from "react";
import TODOMenuAddButton from "./TODOMenuAddButton";

export default function TODOMenu(props: {
  todoPropsPackage: iTodoPropsPackage;
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [id, setId] = useState<number>(Date.now());
  const [priority, setPriority] = useState<"Urgent" | "Normal" | "Low">(
    "Normal"
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let todolist: iTodo[] = [...props.todoPropsPackage.todo];
    setId(Date.now());
    let todoObject: iTodo = {
      name,
      date,
      priority,
      id,
    };
    todolist?.push(todoObject);
    props.todoPropsPackage.setTodo(todolist);
    addToFirebase(todoObject);
    setName("")
  }

  async function addToFirebase(todo: iTodo) {
    try {
      await setDoc(doc(db, "users", todo.id.toString()), todo);
      console.log("Document written with ID: ", todo.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <form>
      <fieldset className="flex flex-col justify-center sm:items-center m-2 gap-1">
        <legend>Create a new Task</legend>
        <input
          type="text"
          placeholder="name"
          className=" px-2 w-full  border border-gray-400"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <TODOMenuCalendar date={date} setDate={setDate} />
        <TODOTogglePriority priority={priority} setPriority={setPriority} />
        <TODOMenuAddButton handleClick={handleClick} name={name}/>
      </fieldset>
    </form>
  );
}
