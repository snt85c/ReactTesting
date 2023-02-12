import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo } from "./Interfaces";
import List from "./ListComponents/List";
import Menu from "./MenuComponents/Menu";
import "98.css";
import { TodoContext } from "./TODOContext";
import Notepad from "./NotepadComponents/Notepad";

export default function TODO() {
  const { todo, dispatch } = useContext(TodoContext);
  const [inView, setInView] = useState<"notepad" | "tasks">("tasks");

  useEffect(() => {
    //at first render, get all the todo items from firebase and set them to the list
    const tempTodoArray: iTodo[] = [];
    (async function getTodosFromFirestoreAtFirstRender() {
      const docSnap = await getDocs(collection(db, "users"));
      docSnap.forEach((doc) => {
        const temp = doc.data() as DocumentData;
        const dataconverted: Date = temp.date.toDate();
        console.log(dataconverted);
        tempTodoArray.push({ ...doc.data(), date: dataconverted } as iTodo);
      });
      dispatch({ type: "SET", payload: tempTodoArray });
    })();
  }, []);

  const todoPropsPackage = {
    //creates a bundle object with the list and the dispatcher, to be drilled down across components
    todo,
    dispatch,
  };

  useEffect(() => {
    function telegramAlert() {
      fetch(
        `https://api.telegram.org/bot5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE/sendMessage?chat_id=231233238&text=new visit to TaskManager: ${new Date()} `
      );
    }
    if (process.env.NODE_ENV !== "development") telegramAlert();
  }, []);

  useEffect(()=>{console.log(inView)},[inView])

  return (
    <>
      <div
        className={`relative window m-10 bg-[#007c7c] ${
          inView === "tasks" ? " z-10 " : " z-0 "
        }
        `}
        onClick={() => {
          setInView("tasks");
        }}
      >
        <div className={`title-bar ${inView === "tasks" ? "" : "inactive"} `}>
          <span className={`title-bar-text pl-1 `}>🔖 Task Manager v.1.0</span>
          <div className="title-bar-controls pr-1">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <Menu />
          <List />
        </div>
        <div className="status-bar">
          <p className="status-bar-field">Press F1 for help</p>
          <p className="status-bar-field">Slide 1</p>
          <p className="status-bar-field">CPU Usage: 14%</p>
        </div>
      </div>
      <Notepad {...{ inView, setInView }} />
    </>
  );
}
