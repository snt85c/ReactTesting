import { iEditNamePropsPackage } from "../TODOInterfaces";

export default function TODOName(props: {
  editNamePropsPackage: iEditNamePropsPackage;
}) {
  return (
    <div className="flex  items-center flex-1">
      <span>Task:</span>
      <input
        className="w-full flex justify-center items-center my-1"
        type="text"
        aria-label="input-name-list"
        defaultValue={props.editNamePropsPackage.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.editNamePropsPackage.handleEditName(e.target.value)
        }
      />
    </div>
  );
}
