import { useState } from "react";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
export default function TODOchangeTaks(props: {
  task: string;
  setIsEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  handleRenameTask: (newTask: string) => void;
}) {
  let { ref } = HandleClickOutsideComponent(props.setIsEditTask);
  const [newTask, setNewTask] = useState(props.task);
  return (
    <div ref={ref}>
      <input
      className="text-black w-[50%]"
        defaultValue={props.task}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      ></input>
      <button onClick={() => props.handleRenameTask(newTask)}>change</button>
    </div>
  );
}
