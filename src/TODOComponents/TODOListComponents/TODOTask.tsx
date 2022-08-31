import TODOchangeTaks from "./TODOchangeTask";
import { iEditTaskPropsPackage } from "../TODOInterfaces";

export default function TODOTask(props:{editTaskPropsPackage:iEditTaskPropsPackage}){

    return(<>
    {!props.editTaskPropsPackage.isEditTask ? (
          <span
            className="min-w-[25%] "
            data-testid="taskSpan"
            onClick={() => props.editTaskPropsPackage.setIsEditTask(!props.editTaskPropsPackage.isEditTask)}
          >
            {props.editTaskPropsPackage.task}
          </span>
        ) : (
          <TODOchangeTaks
            task={props.editTaskPropsPackage.task}
            setIsEditTask={props.editTaskPropsPackage.setIsEditTask}
            handleRenameTask={props.editTaskPropsPackage.handleEditTask}
          />
        )}
    </>)
}