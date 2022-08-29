import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState<number>(0);
  return (
    <>
      <div className="flex justify-center items-center capitalize gap-5">
        <button className="rounded-xl border border-blue-400 px-5 py-2"
        onClick={()=>setCounter((prev)=>prev+1)}>
          +1
        </button>
        <div data-testid="counter" className="rounded-sm border border-blue-400 px-5 py-2">
          {counter}
        </div>
        <button className="rounded-xl border border-blue-400 px-5 py-2"
        onClick={()=>setCounter((prev)=>prev-1)}
        
        >
          -1
        </button>
      </div>
    </>
  );
}
