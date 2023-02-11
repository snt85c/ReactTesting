import { createContext, useReducer } from "react";
import { iTodo } from "./Interfaces";

// Create a context object
export const TodoContext = createContext({} as any);

// Define the context provider component
export const TodoContextProvider = (props: any) => {
  const reducer = (
    state: iTodo[],
    action: { type: string; id?: number; payload?: any; newDate?: Date }
  ) => {
    switch (action.type) {
      case "SET":
        return action.payload;
      case "ADD":
        return [...state, action.payload];
      case "EDITNAME":
        return state.map((item: iTodo) => {
          if (item.id === action.id) {
            item.name = action.payload;
            return item;
          }
          return item;
        });
      case "EDITDATE":
        return state.map((item: iTodo) => {
          if (item.id === action.id) {
            item.date = action.newDate ? action.newDate : new Date();
            return item;
          }
          return item;
        });
      case "EDITPRIORITY":
        return state.map((item: iTodo) => {
          if (item.id === action.id) {
            if (item.priority === "Normal") {
              item.priority = "Urgent";
            } else if (item.priority === "Urgent") {
              item.priority = "Low";
            } else if (item.priority === "Low") {
              item.priority = "Normal";
            }
            return item;
          }
          return item;
        });
      case "DELETE":
        return state.filter((item: iTodo) => {
          return item.id !== action.payload;
        });
      default:
        throw new Error();
    }
  };
  const [todo, dispatch] = useReducer(reducer, []);
  return (
    <TodoContext.Provider value={{ todo, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};
