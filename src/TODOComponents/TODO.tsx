import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo } from "./TODOInterfaces";
import TODOList from "./TODOListComponents/TODOList";
import TODOMenu from "./TODOMenuComponents/TODOMenu";
import "98.css";
import { motion } from "framer-motion";

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

  useEffect(() => {
    function telegramAlert() {
        fetch(
          `https://api.telegram.org/bot5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE/sendMessage?chat_id=231233238&text=new visit to TaskManager: ${new Date()} `
        );
    }
    telegramAlert();
  }, []);	

  return (
    <motion.div
      // drag
      // dragMomentum={false}
      className="window m-5  bg-[#007c7c]"
    >
      <div className="title-bar  ">
        <span className="title-bar-text pl-1">Task Manager v.0.7</span>
        <div className="title-bar-controls pr-1">
          <button aria-label="Close" disabled></button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <TODOMenu todoPropsPackage={todoPropsPackage} />
        <TODOList todoPropsPackage={todoPropsPackage} />
      </div>
      <div className="status-bar">
        <p className="status-bar-field">Press F1 for help</p>
        <p className="status-bar-field">Slide 1</p>
        <p className="status-bar-field">CPU Usage: 14%</p>
      </div>
    </motion.div>
  );
}
