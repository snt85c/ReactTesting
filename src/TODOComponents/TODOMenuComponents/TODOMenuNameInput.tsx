export default function TODOMenuNameInput(props:{name:string, setName: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <input
      type="text"
      placeholder="name"
      className=" px-2 w-full  border border-gray-400"
      value={props.name}
      aria-label="input-name-menu"
      onChange={(e) => {
        props.setName(e.target.value);
      }}
    ></input>
  );
}
