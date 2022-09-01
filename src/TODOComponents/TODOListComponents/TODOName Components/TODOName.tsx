import { iEditNamePropsPackage } from "../../TODOInterfaces";
import TODOchangeName from "./TODOchangeName";

export default function TODOName(props:{editNamePropsPackage:iEditNamePropsPackage}){

    return(
        <>
          <span
            className="min-w-[20%] sm:min-w-[35%] flex justify-center items-center"
            data-testid="nameSpan"
            onClick={() => props.editNamePropsPackage.setIsEditName(!props.editNamePropsPackage.isEditName)}
          >
            {props.editNamePropsPackage.name}
          </span>
          {props.editNamePropsPackage.isEditName && 
          <TODOchangeName
          name={props.editNamePropsPackage.name}
          setIsEditName={props.editNamePropsPackage.setIsEditName}
          handleRenameName={props.editNamePropsPackage.handleEditName}
          />
        }
        </>
    )
}