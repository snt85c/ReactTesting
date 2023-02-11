export default function AddButton(props: {
  handleClickAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string;
}) {
  return (
    <button
      className="px-5 py-2 font-extrabold w-full"
      aria-label="button-add-menu"
      disabled={props.name ? false : true}
      onClick={(e) => {
        props.handleClickAdd(e);
      }}
    >
      Add Task
    </button>
  );
}
