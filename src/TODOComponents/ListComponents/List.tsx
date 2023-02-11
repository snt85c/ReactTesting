import { useContext, useState } from "react";
import FilterSelector from "./FilterSelector";
import FilteredList from "./FilteredList";
import { TodoContext } from "../TODOContext";

export default function List() {
  const [filter, setFilter] = useState<"Today" | "this Week" | "clear">(
    "clear"
  );

  const { todo, dispatch } = useContext(TodoContext);

  return (
    <>
      <FilterSelector filter={filter} setFilter={setFilter} />
      <fieldset className="flex flex-col w-[90%]  my-1 mx-2 ">
        <legend>Tasks</legend>
        <FilteredList {...{ todoPropsPackage: { todo, dispatch }, filter }} />
      </fieldset>
    </>
  );
}
