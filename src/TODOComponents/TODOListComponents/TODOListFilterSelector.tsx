export default function TODOListFilterSelector(props: {
  setFilter: React.Dispatch<
    React.SetStateAction<"Today" | "this Week" | "clear">
  >;
}) {
  return (
    <>
      <div>filter</div>
      <div className="flex justify-between items-center px-2 mx-2">
        <input
          type="radio"
          value="Today"
          name="Today"
          className="field-row mx-5 px-5  my-2"
        />
          Today
        <input
          type="radio"
          value="this Week"
          name="this Week"
          className="mx-5 px-5  my-2 "
        />
          this Week
        <input
          type="radio"
          value="clear"
          name="clear"
          className="mx-5 px-5  my-2 "
        />
          clear
      </div>
    </>
  );
}
