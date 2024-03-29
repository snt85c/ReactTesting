import { iTodo, iTodoPropsPackage } from "../Interfaces";
import TODOItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";

export default function FilteredList(props: {
  todoPropsPackage: iTodoPropsPackage;
  filter: "Today" | "this Week" | "clear";
}) {
  const today = new Date();
  let todoList = props.todoPropsPackage.todo
    .sort((a: iTodo, b: iTodo): number => {
      return a.date.getDate() - b.date.getDate();
    })
    .map((item) => {
      switch (props.filter) {
        case "Today":
          if (item.date.getDate() === today.getDate()) {
            return (
              <TODOItem
                data={item}
                key={uuidv4()}
                todoPropsPackage={props.todoPropsPackage}
              />
            );
          }
          break;
        case "this Week":
          if (item.date.getDate() + 1 <= today.getDate() + 7) {
            return (
              <TODOItem
                data={item}
                key={uuidv4()}
                todoPropsPackage={props.todoPropsPackage}
              />
            );
          }
          break;
        default:
          return (
            <TODOItem
              data={item}
              key={uuidv4()}
              todoPropsPackage={props.todoPropsPackage}
            />
          );
      }
      return undefined;
    })
    .filter((item) => item !== undefined);

  return (
    <div>
      {todoList.length !== 0
        ? todoList
        : todoList.length !== props.todoPropsPackage.todo.length
        ? "No items to show for this filter selection"
        : "There are no Tasks! Add some new task first "}
    </div>
  );
}
