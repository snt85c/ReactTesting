import { iTodo } from "../Interfaces";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import MenuCalendar from "./MenuItems/ MenuCalendar";
import AddButton from "./MenuItems/AddButton";
import NameInput from "./MenuItems/NameInput";
import TogglePriority from "./MenuItems/TogglePriority";

export default function Menu(props: { dispatch: React.Dispatch<any> }) {
  const { dispatch } = props;
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [priority, setPriority] = useState<"Urgent" | "Normal" | "Low">(
    "Normal"
  );

  const handleClickAdd = (
    //when Add is clicked, add it to list and set it to Firebase
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let todoObject: iTodo = {
      name,
      date,
      priority,
      id: Date.now(),
    };
    dispatch({
      type: "ADD",
      payload: todoObject,
    });
    addToFirebase(todoObject);
    setName("");
  };

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
        <NameInput {...{ name, setName }} />
        <MenuCalendar {...{ date, setDate }} />
        <TogglePriority {...{ priority, setPriority }} />
        <AddButton {...{ handleClickAdd, name }} />
      </fieldset>
    </form>
  );
}
