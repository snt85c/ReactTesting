import { useEffect, useState } from "react";
import { iEditNamePropsPackage } from "../../Interfaces";

export default function ItemNameInput(props: {
  editNamePropsPackage: iEditNamePropsPackage;
}) {
  const [inputValue, setInputValue] = useState(props.editNamePropsPackage.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //The onBlur event handler is called when focus has left the element
  const handleBlur = () => {
    props.editNamePropsPackage.handleEditName(inputValue.trim());
  };


  return (
    <div className="flex  items-center flex-1">
      <span>Task:</span>
      <input
        className="w-full flex justify-center items-center my-1"
        type="text"
        aria-label="input-name-list"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
