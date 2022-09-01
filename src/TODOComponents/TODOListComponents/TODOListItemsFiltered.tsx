import { iTodo, iTodoPropsPackage } from "../TODOInterfaces";
import TODOItem from "./TODOItem";

export default function TODOListItemsFiltered(props: {
  todoPropsPackage: iTodoPropsPackage;
  filter: "Today" | "this Week" | "clear";
}) {
  let todoList = props.todoPropsPackage.todo
    .sort((a: iTodo, b: iTodo): number => {
      return a.date.getDate() - b.date.getDate();
    })
    .sort((a: iTodo, b: iTodo): number => {
      return a.date.getMonth() - b.date.getMonth();
    })
    .sort((a: iTodo, b: iTodo): number => {
        return a.date.getFullYear() - b.date.getFullYear();
      })
    .map((item, i) => {
      const today = new Date();
      switch (props.filter) {
        case "Today":
          if (
            item.date.getDay() === today.getDay() &&
            item.date.getMonth() === today.getMonth()
          ) {
            return (
              <TODOItem
                data={item}
                key={i}
                todoPropsPackage={props.todoPropsPackage}
              />
            );
          }
          break;
        case "this Week":
          if (
            item.date.getDay() + 1 <= today.getDay() + 7 &&
            item.date.getMonth() === today.getMonth()
          ) {
            return (
              <TODOItem
                data={item}
                key={i}
                todoPropsPackage={props.todoPropsPackage}
              />
            );
          }
          break;
        default:
          return (
            <TODOItem
              data={item}
              key={i}
              todoPropsPackage={props.todoPropsPackage}
            />
          );
      }
    });

  return <>{todoList}</>;
}
