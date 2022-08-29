import { iTodo, iTodoPropsPackage } from "./TODO";
import TODOTogglePriority from "./TODOTogglePriority";

export default function TODOMenu(props: {
  todoPropsPackage: iTodoPropsPackage;
}) {
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
        <input
          type="text"
          placeholder="task"
          className="mx-2 px-2 border border-gray-400 rounded-xl"
          defaultValue={props.todoPropsPackage.task}
          onChange={(e) => {
            props.todoPropsPackage.setTask(e.target.value);
          }}
        ></input>
        <TODOTogglePriority
          priority={props.todoPropsPackage.priority}
          setPriority={props.todoPropsPackage.setPriority}
        />
        <button
          className="px-5 py-2 bg-blue-700 border border-blue-400 rounded-xl font-extrabold text-white "
          disabled={
            props.todoPropsPackage.name && props.todoPropsPackage.task
              ? false
              : true
          }
          style={{
            opacity:
              props.todoPropsPackage.name && props.todoPropsPackage.task
                ? 1
                : 0.5,
          }}
          onClick={(e) => {
            e.preventDefault()
            let todolist: iTodo[] = [...props.todoPropsPackage.todo];
            props.todoPropsPackage.setId(Date.now());
            todolist?.push({
              name: props.todoPropsPackage.name,
              task: props.todoPropsPackage.task,
              priority: props.todoPropsPackage.priority,
              id: props.todoPropsPackage.id,
            });
            props.todoPropsPackage.setTodo(todolist);
          }}
        >
          Add Task
        </button>
      </title>
    </form>
  );
}
