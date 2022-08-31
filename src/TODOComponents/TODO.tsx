import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo } from "./TODOInterfaces";
import TODOList from "./TODOList";
import TODOMenu from "./TODOMenu";

export default function TODO() {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [id, setId] = useState<number>(Date.now());
  const [priority, setPriority] = useState<"Urgent" | "Normal" | "Low">(
    "Normal"
  );
  const [todo, setTodo] = useState<iTodo[]>([]);

  useEffect(() => {
    const tempTodoArray: iTodo[] = [];
    async function getTodosFromFirestoreAtFirstRender() {
      const docSnap = await getDocs(collection(db, "users"));
      docSnap.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tempTodoArray.push(doc.data() as iTodo);
      });
      setTodo(tempTodoArray);
    }
    getTodosFromFirestoreAtFirstRender();
  }, []);

  const todoPropsPackage = {
    name,
    setName,
    // task,
    // setTask,
    priority,
    setPriority,
    todo,
    setTodo,
    id,
    setId,
    date,
    setDate,
  };

  return (
    <div className="flex flex-col m-5 sm:flex-row">
      <div>v.0.6.1</div>
      <TODOMenu todoPropsPackage={todoPropsPackage} />
      <TODOList todoPropsPackage={todoPropsPackage} />
    </div>
  );
}
