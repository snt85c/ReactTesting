import { useState } from "react";
import { iTodoPropsPackage } from "../TODOInterfaces";
import TODOListFilterSelector from "./TODOListFilterSelector";
import TODOListItemsFiltered from "./TODOListItemsFiltered";

export default function TODOList(props: {
  todoPropsPackage: iTodoPropsPackage;
}) {
  const [filter, setFilter] = useState<"Today" | "this Week" | "clear">(
    "clear"
  );

  return (<>
    <TODOListFilterSelector filter={filter} setFilter={setFilter} />
    <fieldset
     className="flex flex-col w-[90%]  my-1 mx-2 ">
      <legend>Tasks</legend>
      <TODOListItemsFiltered todoPropsPackage={props.todoPropsPackage} filter={filter}/>
    </fieldset>
    </>
  );
}
