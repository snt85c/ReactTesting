export default function TODOItemPriority(props: {
  handlePriority: () => Promise<void>;
  priority: "Urgent" | "Normal" | "Low";
}) {
  return (
    <div className="flex justify-center items-center">
      <span className="mr-1">priority:</span> 
      <button
        aria-label="button-list-priority"
        className="cursor-pointer flex justify-center items-center "
        style={{ color: props.priority === "Urgent" ? "red" : "black" }}
        onClick={props.handlePriority}
      >
        {props.priority}
      </button>
    </div>
    
  );
}
