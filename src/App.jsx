import "./App.css";
import TODO from "./TODOComponents/TODO";
import { TodoContextProvider } from "./TODOComponents/TODOContext";
export default function App() {

  return (
    <>
      <TodoContextProvider>
        <TODO />;
      </TodoContextProvider>
    </>
  );
}
