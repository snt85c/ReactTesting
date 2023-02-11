export default function TogglePriority(props: {
  priority: "Urgent" | "Normal" | "Low";
  setPriority: React.Dispatch<
    React.SetStateAction<"Urgent" | "Normal" | "Low">
  >;
}) {
  const { priority, setPriority } = props;

  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (priority === "Normal") setPriority("Urgent");
    if (priority === "Urgent") setPriority("Low");
    if (priority === "Low") setPriority("Normal");
  };

  return (
    <button
      className="flex px-2  py-1 min-h-[40px] justify-center items-center w-full"
      aria-label="button-priority-menu"
      onClick={(e) => toggle(e)}
    >
      {"Priority: " + priority}
    </button>
  );
}
