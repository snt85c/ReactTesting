
export default function TODOItemPriority(props: {
  handlePriority: () => Promise<void>;
  priority: "Urgent" | "Normal" | "Low";
}) {
  return (
    <>
      <span
        data-testid="prioritySpan"
        className="cursor-pointer min-w-[25%] flex justify-center items-center"
        style={{ color: props.priority === "Urgent" ? "red" : "white" }}
        onClick={props.handlePriority}
      >
        {props.priority}
      </span>
    </>
  );
}
