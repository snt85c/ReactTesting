import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { iTodo } from "./TODOInterfaces";
import TODOList from "./TODOListComponents/TODOList";
import TODOMenu from "./TODOMenuComponents/TODOMenu";

export default function TODO() {
  const [todo, setTodo] = useState<iTodo[]>([]);

  useEffect(() => {
    const tempTodoArray: iTodo[] = [];
    async function getTodosFromFirestoreAtFirstRender() {
      const docSnap = await getDocs(collection(db, "users"));
      docSnap.forEach((doc) => {
        const temp = doc.data() as DocumentData;
        const dataconverted: Date = temp.date.toDate();
        tempTodoArray.push({ ...doc.data(), date: dataconverted } as iTodo);
      });
      setTodo(tempTodoArray);
    }
    getTodosFromFirestoreAtFirstRender();
  }, []);

  const todoPropsPackage = {
    todo,
    setTodo,
  };

  return (
    <div className="flex flex-col sm:flex-row bg-gradient-to-t from-white to-blue-400">
      <div>v.0.7</div>
      <TODOMenu todoPropsPackage={todoPropsPackage} />
      <TODOList todoPropsPackage={todoPropsPackage} />
    </div>
  );
}
