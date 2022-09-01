import { useState } from "react";
import { HandleClickOutsideComponent } from "../../../HandleClickOutsideComponent";
import { motion, useDragControls } from "framer-motion";
export default function TODOchangeName(props: {
  name: string;
  setIsEditName: React.Dispatch<React.SetStateAction<boolean>>;
  handleRenameName: (newName: string) => void;
}) {
  let { ref } = HandleClickOutsideComponent(props.setIsEditName);
  const [newName, setNewName] = useState<string>(props.name);
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={false}
      ref={ref}
      className="window p-4 px-6 absolute top-auto"
    >
      <div
        className="title-bar w-[98%] "
        onPointerDown={(e) => {
          dragControls.start(e);
        }}
      >
        <span className="title-bar-text pl-1 w-full">Set a new title</span>
        <div className="title-bar-controls pr-1">
          <button
            aria-label="Close"
            onClick={() => props.setIsEditName(false)}
          ></button>
        </div>
      </div>

      <input
        data-testid="changeName"
        className="text-black w-[50%] m-2"
        defaultValue={props.name}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      ></input>
      <button onClick={() => props.handleRenameName(newName)}>change</button>
    </motion.div>
  );
}
