export default function TODOListFilterSelector(props: {
  setFilter: React.Dispatch<
    React.SetStateAction<"Today" | "this Week" | "clear">
  >;
  filter: "Today" | "this Week" | "clear";
}) {
  return (
    <>
      <fieldset className="mx-2 my-1 p-2">
        <legend>filter</legend>
        <div className="flex md:flex-col lex-row justify-between items-center px-2 mx-2 gap-3">
          <div className="field-row">
            <input
              id="Today"
              type="radio"
              checked={props.filter === "Today"}
              onChange={() => {}}
            />
            <label htmlFor="Today" onClick={() => props.setFilter("Today")}>
              Today
            </label>
          </div>
          <div className="field-row">
            <input
              id="this Week"
              type="radio"
              checked={props.filter === "this Week"}
              onChange={() => {}}
            />
            <label
              htmlFor="this Week"
              onClick={() => props.setFilter("this Week")}
            >
              Week
            </label>
          </div>
          <div className="field-row">
            <input
              id="clear"
              type="radio"
              checked={props.filter === "clear"}
              onChange={() => {}}
            />
            <label htmlFor="clear" onClick={() => props.setFilter("clear")}>
              Clear Filter
            </label>
          </div>
        </div>
      </fieldset>
    </>
  );
}
