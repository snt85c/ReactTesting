import { useEffect, useState } from "react";
import { iTodoPropsPackage } from "../TODOInterfaces";
import TODOItem from "./TODOItem";
import TODOListFilterSelector from "./TODOListFilterSelector";
import TODOListItemsFiltered from "./TODOListItemsFiltered";
import TODOListSuggestionBar from "./TODOListSuggestionBar";

export default function TODOList(props: {
  todoPropsPackage: iTodoPropsPackage;
}) {
  const [filter, setFilter] = useState<"Today" | "this Week" | "clear">(
    "clear"
  );

  return (<>
    <TODOListFilterSelector filter={filter} setFilter={setFilter} />
    <fieldset
     className="flex flex-col sm:w-full  my-1 mx-2 ">
      <legend>Tasks</legend>
      <TODOListSuggestionBar />
      <TODOListItemsFiltered todoPropsPackage={props.todoPropsPackage} filter={filter}/>
    </fieldset>
    </>
  );
}
