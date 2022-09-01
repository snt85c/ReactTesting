import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo } from "./TODOInterfaces";
import TODOList from "./TODOListComponents/TODOList";
import TODOMenu from "./TODOMenuComponents/TODOMenu";
import "98.css";

export default function TODO() {
  const [todo, setTodo] = useState<iTodo[]>([]);

  useEffect(() => {
    const tempTodoArray: iTodo[] = [];
    async function getTodosFromFirestoreAtFirstRender() {
      const docSnap = await getDocs(collection(db, "users"));
      docSnap.forEach((doc) => {
        const temp = doc.data() as DocumentData;
        const dataconverted: Date = temp.date.toDate();
        tempTodoArray.push({ ...doc.data(), date: dataconverted } as iTodo);
      });
      setTodo(tempTodoArray);
    }
    getTodosFromFirestoreAtFirstRender();
  }, []);

  const todoPropsPackage = {
    todo,
    setTodo,
  };

  return (
    <div className="window min-h-full">
      <div className="title-bar  ">
        <span className="title-bar-text pl-1">Task Organizer v.0.7</span>
        <div className="title-bar-controls pr-1">
          <button aria-label="Close" disabled></button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <TODOMenu todoPropsPackage={todoPropsPackage} />
        <TODOList todoPropsPackage={todoPropsPackage} />
      </div>
      <div className="status-bar">
        <p className="status-bar-field">Press F1 for help</p>
        <p className="status-bar-field">Slide 1</p>
        <p className="status-bar-field">CPU Usage: 14%</p>
      </div>
    </div>
  );
}
