import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo, iTodoPropsPackage } from "./TODOInterfaces";
import TODOchangeName from "./TODOchangeName";
import TODOchangeTaks from "./TODOchangeTask";

export default function TODOItem(props: {
  data: iTodo;
  todoPropsPackage: iTodoPropsPackage;
}) {

  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isEditTask, setIsEditTask] = useState<boolean>(false);

  const handleEditTask = async (newTask: string) => {
    const temp = props.todoPropsPackage.todo.map((item) => {
      if (item.id === props.data.id) {
        props.data.task = newTask ? newTask : "empty";
        return item;
      }
      return item;
    });
    props.todoPropsPackage.setTodo(temp);
    await updateDoc(doc(db, "users", props.data.id.toString()), {
      ...props.data,
      task: newTask ? newTask : "empty",
    });
    console.log(props.data.id, " => task has changed");
    setIsEditTask(false);
  };

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

  return (
    <>
      <div className="flex justify-between mx-2 text-white font-extrabold bg-blue-400 border border-blue-700 rounded-xl px-5 py-2 my-2 shadow-2xl">
        {!isEditName ? (
          <span
            className="min-w-[25%]"
            data-testid="nameSpan"
            onClick={() => setIsEditName(!isEditName)}
          >
            {props.data.name}
          </span>
        ) : (
          <TODOchangeName
            name={props.data.name}
            setIsEditName={setIsEditName}
            handleRenameName={handleEditName}
          />
        )}
        {!isEditTask ? (
          <span
            className="min-w-[25%] "
            data-testid="taskSpan"
            onClick={() => setIsEditTask(!isEditTask)}
          >
            {props.data.task}
          </span>
        ) : (
          <TODOchangeTaks
            task={props.data.task}
            setIsEditTask={setIsEditTask}
            handleRenameTask={handleEditTask}
          />
        )}
        <span
          data-testid="prioritySpan"
          className="cursor-pointer min-w-[25%] flex justify-center"
          onClick={handlePriority}
        >
          {props.data.priority}
        </span>
        <span
          data-testid="deleteSpan"
          className="cursor-pointer min-w-[25%] flex justify-end"
          onClick={handleDelete}
        >
          delete
        </span>
      </div>
    </>
  );
}
