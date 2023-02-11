export interface iTodo {
    name: string;
    date: Date;
    priority: "Urgent" | "Normal" | "Low";
    id: number;
  }
  
  export interface iTodoPropsPackage {
    todo: iTodo[];
    dispatch: React.Dispatch<any>
  }

  export interface iEditNamePropsPackage{
    name:string,
    handleEditName:(newName: string) => Promise<void>
    isEditName:boolean,
    setIsEditName:React.Dispatch<React.SetStateAction<boolean>>
  }

  export interface iEditTaskPropsPackage{
    task:string,
    handleEditTask: (newTask: string) => Promise<void>
    isEditTask:boolean,
    setIsEditTask: React.Dispatch<React.SetStateAction<boolean>>
  }

  export interface iCalendarPropsPackage{
    value: Date;
    onChange: React.Dispatch<React.SetStateAction<Date>>;
    isCalendarOpen: boolean;
    setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleEditCalendar:() => Promise<void>
  }