import { useState } from "react";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";

export default function TODOchangeName(props: {
  name: string;
  setIsEditName: React.Dispatch<React.SetStateAction<boolean>>;
  handleRenameName: (newName: string) => void;
}) {
  let { ref } = HandleClickOutsideComponent(props.setIsEditName);
  const [newName, setNewName] = useState<string>(props.name);
  
  return (
    <div ref={ref}>
      <input
        data-testid="changeName"
        className="text-black w-[50%]"
        defaultValue={props.name}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      ></input>
      <button
        onClick={() => props.handleRenameName(newName)}
      >
        change
      </button>
    </div>
  );
}
