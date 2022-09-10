export default function TODOMenuAddButton(props: {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string;
}) {
  return (
    <button
      className="px-5 py-2 font-extrabold w-full"
      disabled={props.name ? false : true}
      onClick={(e) => {
        props.handleClick(e);
      }}
    >
      Add Task
    </button>
  );
}
