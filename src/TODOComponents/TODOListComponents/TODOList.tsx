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

  return (
    <title className="flex flex-col w-full">
      <TODOListFilterSelector setFilter={setFilter} />
      <TODOListSuggestionBar />
      <TODOListItemsFiltered todoPropsPackage={props.todoPropsPackage} filter={filter}/>
    </title>
  );
}
