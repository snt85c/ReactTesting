import { iTodo, iTodoPropsPackage } from "./TODOInterfaces";
import TODOTogglePriority from "./TODOTogglePriority";
import { doc, setDoc, } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { Calendar } from "react-calendar";
import TODOMenuCalendar from "./TODOCalendarComponents / TODOMenuCalendar";

export default function TODOMenu(props: {
  todoPropsPackage: iTodoPropsPackage;
}) {
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
      <title className="flex flex-col justify-cente items-center border-r-2 border-black sm:min-h-screen  gap-2">
        add
        <input
          type="text"
          placeholder="name"
          className="mx-2 px-2  border border-gray-400 rounded-xl"
          defaultValue={props.todoPropsPackage.name}
          onChange={(e) => {
            props.todoPropsPackage.setName(e.target.value);
          }}
        ></input>
        {/* <input
          type="text"
          placeholder="task"
          className="mx-2 px-2 border border-gray-400 rounded-xl"
          defaultValue={pops.todoPropsPackage.task}
          onChange={(e) => {
            props.todoPropsPackage.setTask(e.target.value);
          }}
        ></input> */}
        <TODOMenuCalendar todoPropsPackage={props.todoPropsPackage}/>
        <TODOTogglePriority
          priority={props.todoPropsPackage.priority}
          setPriority={props.todoPropsPackage.setPriority}
        />
        <button
          className="px-5 py-2 bg-blue-700 border border-blue-400 rounded-xl font-extrabold text-white "
          disabled={
            props.todoPropsPackage.name 
              ? false
              : true
          }
          style={{
            opacity:
              props.todoPropsPackage.name 
                ? 1
                : 0.5,
          }}
          onClick={(e) => {
            e.preventDefault();
            let todolist: iTodo[] = [...props.todoPropsPackage.todo];
            props.todoPropsPackage.setId(Date.now());
            let todoObject: iTodo = {
              name: props.todoPropsPackage.name,
              date: props.todoPropsPackage.date,
              priority: props.todoPropsPackage.priority,
              id: props.todoPropsPackage.id,
            };
            todolist?.push(todoObject);
            props.todoPropsPackage.setTodo(todolist);
            addToFirebase(todoObject);
          }}
        >
          Add Task
        </button>
      </title>
    </form>
  );
}
