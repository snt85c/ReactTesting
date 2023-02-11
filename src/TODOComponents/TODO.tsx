import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo } from "./Interfaces";
import List from "./ListComponents/List";
import Menu from "./MenuComponents/Menu";
import "98.css";

export default function TODO() {
  const reducer = (
    state: iTodo[],
    action: { type: string; id?: number; payload?: any; newDate?: Date }
  ) => {
    switch (action.type) {
      case "SET":
        return action.payload;
      case "ADD":
        return [...state, action.payload];
      case "EDITNAME":
        return state.map((item: iTodo) => {
          if (item.id === action.id) {
            item.name = action.payload;
            return item;
          }
          return item;
        });
      case "EDITDATE":
        return state.map((item: iTodo) => {
          if (item.id === action.id) {
            item.date = action.newDate ? action.newDate : new Date();
            return item;
          }
          return item;
        });
      case "EDITPRIORITY":
        return state.map((item: iTodo) => {
          if (item.id === action.id) {
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
      case "DELETE":
        return state.filter((item: iTodo) => {
          return item.id !== action.payload;
        });
      default:
        throw new Error();
    }
  };

  const [todo, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    //at first render, get all the todo items from firebase and set them to the list
    const tempTodoArray: iTodo[] = [];
    (async function getTodosFromFirestoreAtFirstRender() {
      const docSnap = await getDocs(collection(db, "users"));
      docSnap.forEach((doc) => {
        const temp = doc.data() as DocumentData;
        const dataconverted: Date = temp.date.toDate();
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

  return (
    <div className="window m-10 bg-[#007c7c]">
      <div className="title-bar  ">
        <span className="title-bar-text pl-1">Task Manager v.1.0</span>
        <div className="title-bar-controls pr-1">
          <button aria-label="Close" disabled></button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <Menu {...{ dispatch }} />
        <List todoPropsPackage={todoPropsPackage}/>
      </div>
      <div className="status-bar">
        <p className="status-bar-field">Press F1 for help</p>
        <p className="status-bar-field">Slide 1</p>
        <p className="status-bar-field">CPU Usage: 14%</p>
      </div>
    </div>
  );
}
