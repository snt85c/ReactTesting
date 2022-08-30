export interface iTodo {
    name: string;
    task: string;
    priority: "Urgent" | "Normal" | "Low";
    id: number;
  }
  
  export interface iTodoPropsPackage {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    priority: "Urgent" | "Normal" | "Low";
    setPriority: React.Dispatch<
      React.SetStateAction<"Urgent" | "Normal" | "Low">
    >;
    todo: iTodo[];
    setTodo: React.Dispatch<React.SetStateAction<iTodo[]>>;
    id: number;
    setId: React.Dispatch<React.SetStateAction<number>>;
  }