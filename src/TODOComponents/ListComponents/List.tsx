import { useState } from "react";
import { iTodoPropsPackage } from "../Interfaces";
import FilterSelector from "./FilterSelector";
import FilteredList from "./FilteredList";

export default function List(props: { todoPropsPackage: iTodoPropsPackage }) {
  const [filter, setFilter] = useState<"Today" | "this Week" | "clear">(
    "clear"
  );

  return (
    <>
      <FilterSelector filter={filter} setFilter={setFilter} />
      <fieldset className="flex flex-col w-[90%]  my-1 mx-2 ">
        <legend>Tasks</legend>
        <FilteredList
          {...{ todoPropsPackage: props.todoPropsPackage, filter }}
        />
      </fieldset>
    </>
  );
}
