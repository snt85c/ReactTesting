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
        <form className="flex md:flex-col lex-row justify-between items-center px-2 mx-2 gap-3">
          <div className="field-row">
            <input
              type="radio"
              value="Today"
              name="first-example"
              checked={props.filter === "Today"}
            />
            <label
              htmlFor="radio5"
              onClick={() => props.setFilter("Today")}
            >
              Today
            </label>
          </div>
          <div className="field-row">
            <input
              type="radio"
              name="first-example"
              checked={props.filter === "this Week"}
            />
            <label
              htmlFor="radio5"
              onClick={() => props.setFilter("this Week")}
            >
              Week
            </label>
          </div>
          <div className="field-row">
            <input
              type="radio"
              name="first-example"
              checked={props.filter === "clear"}
            />
            <label htmlFor="radio5" onClick={() => props.setFilter("clear")}>
              Clear Filter
            </label>
          </div>
        </form>
      </fieldset>
    </>
  );
}
