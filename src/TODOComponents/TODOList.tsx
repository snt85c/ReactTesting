import { iTodoPropsPackage } from "./TODOInterfaces";
import TODOItem from "./TODOItem";

export default function TODOList(props:{todoPropsPackage:iTodoPropsPackage}){

    const todoList = props.todoPropsPackage.todo.map((item, i) => {
        return <TODOItem data={item} key={i} todoPropsPackage={props.todoPropsPackage} />;
      });

    return (
        <title className="flex flex-col w-full">
        <div className=" flex justify-between mx-5">
          <span>name</span>
          <span>task</span>
          <span>priority</span>
          <span>options</span>
        </div>
        <div>{todoList}</div>
      </title>
    )
}