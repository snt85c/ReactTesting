import { useState } from "react";
import TODOItem from "./TODOItem";
import TODOMenu from "./TODOMenu";

export interface iTodo {
  name: string;
  task: string;
  priority: "Urgent" | "Normal" | "Low";
  id: number;
}

export interface iTodoPropsPackage {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  priority: "Urgent" | "Normal" | "Low";
  setPriority: React.Dispatch<
    React.SetStateAction<"Urgent" | "Normal" | "Low">
  >;
  todo: iTodo[];
  setTodo: React.Dispatch<React.SetStateAction<iTodo[]>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

export default function TODO() {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [id, setId] = useState<number>(Date.now());
  const [priority, setPriority] = useState<"Urgent" | "Normal" | "Low">(
    "Normal"
    );
    const [todo, setTodo] = useState<iTodo[]>([]);

  const todoPropsPackage = {
    name,
    setName,
    task,
    setTask,
    priority,
    setPriority,
    todo,
    setTodo,
    id,
    setId,
  };
  const todoList = todo.map((item, i) => {
    return <TODOItem data={item} key={i} todoPropsPackage={todoPropsPackage} />;
  });

  return (
    <div className="flex flex-col sm:flex-row">
      <TODOMenu todoPropsPackage={todoPropsPackage} />
      <title className="flex flex-col w-full">
        <div className=" flex justify-between mx-5">
          <span>name</span>
          <span>task</span>
          <span>priority</span>
          <span>options</span>
        </div>
        <div>{todoList}</div>
      </title>
    </div>
  );
}
