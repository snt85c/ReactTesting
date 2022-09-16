export default function TODOTogglePriority(props: {
  priority: "Urgent" | "Normal" | "Low";
  setPriority: React.Dispatch<
    React.SetStateAction<"Urgent" | "Normal" | "Low">
  >;
}) {
  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (props.priority === "Normal") props.setPriority("Urgent");
    if (props.priority === "Urgent") props.setPriority("Low");
    if (props.priority === "Low") props.setPriority("Normal");
  };
  return (
    <button
      className="flex px-2  py-1 min-h-[40px] justify-center items-center w-full"
      aria-label="button-priority-menu"
      onClick={(e) => toggle(e)}
    >
      {"Priority: " + props.priority}
    </button>
  );
}
