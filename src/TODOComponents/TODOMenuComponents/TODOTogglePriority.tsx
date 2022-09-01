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
      data-testid="buttontoggle"
      className="flex  mx-2 px-2 justify-center items-center"
      onClick={(e) => toggle(e)}
    >
      {props.priority}
    </button>
  );
}
