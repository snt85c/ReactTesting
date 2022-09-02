export default function TODOItemPriority(props: {
  handlePriority: () => Promise<void>;
  priority: "Urgent" | "Normal" | "Low";
}) {
  return (
    <div className="flex justify-center items-center">
      priority: 
      <button
        data-testid="prioritySpan"
        className="cursor-pointer flex justify-center items-center"
        style={{ color: props.priority === "Urgent" ? "red" : "black" }}
        onClick={props.handlePriority}
      >
        {props.priority}
      </button>
    </div>
  );
}
