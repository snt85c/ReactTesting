export interface iTodo {
    name: string;
    date: Date;
    priority: "Urgent" | "Normal" | "Low";
    id: number;
  }
  
  export interface iTodoPropsPackage {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    // task: string;
    // setTask: React.Dispatch<React.SetStateAction<string>>;
    priority: "Urgent" | "Normal" | "Low";
    setPriority: React.Dispatch<
      React.SetStateAction<"Urgent" | "Normal" | "Low">
    >;
    todo: iTodo[];
    setTodo: React.Dispatch<React.SetStateAction<iTodo[]>>;
    id: number;
    setId: React.Dispatch<React.SetStateAction<number>>;
    date: Date,
    setDate:React.Dispatch<React.SetStateAction<Date>>;
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