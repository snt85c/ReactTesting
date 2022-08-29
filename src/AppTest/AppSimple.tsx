import { useContext } from "react";
import { AppCtx } from "./TestContext";

export default function AppSimple() {
  const three: number = 3;
  const two: number = 2;
  const appContext = useContext(AppCtx);
  return (
    <header className="App-header">
      <p>UNIT TESTING</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <div data-testid="testid">testid</div>
      <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ul>
      <div title="mult">{three * two}</div>
      <div>
        Name: {appContext && appContext.name}, Author: {appContext && appContext.author}, Url:{" "}
        {appContext && appContext.url}
      </div>
    </header>
  );
}
