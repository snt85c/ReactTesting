import { iEditNamePropsPackage } from "../../TODOInterfaces";
import TODOchangeName from "./TODOchangeName";

export default function TODOName(props:{editNamePropsPackage:iEditNamePropsPackage}){

    return(
        <>
         {!props.editNamePropsPackage.isEditName ? (
          <span
            className="min-w-[25%]"
            data-testid="nameSpan"
            onClick={() => props.editNamePropsPackage.setIsEditName(!props.editNamePropsPackage.isEditName)}
          >
            {props.editNamePropsPackage.name}
          </span>
        ) : (
          <TODOchangeName
            name={props.editNamePropsPackage.name}
            setIsEditName={props.editNamePropsPackage.setIsEditName}
            handleRenameName={props.editNamePropsPackage.handleEditName}
          />
        )}
        </>
    )
}