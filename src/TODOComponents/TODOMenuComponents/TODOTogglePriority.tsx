export default function TODOTogglePriority(props: {
  priority: "Urgent" | "Normal" | "Low";
  setPriority: React.Dispatch<
    React.SetStateAction<"Urgent" | "Normal" | "Low">
  >;
}) {
  const toggle = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (props.priority === "Normal") props.setPriority("Urgent");
    if (props.priority === "Urgent") props.setPriority("Low");
    if (props.priority === "Low") props.setPriority("Normal");
  };
  return (
    <div
      data-testid="buttontoggle"
      className="flex  mx-2 px-2 border border-gray-400 rounded-xl "
      onClick={(e) => toggle(e)}
    >
      {props.priority}
    </div>
  );
}
