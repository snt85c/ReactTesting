export default function TODOListFilterSelector(props:{setFilter:React.Dispatch<React.SetStateAction<"Today" | "this Week" | "clear">>}) {
  return (
    <>
      <div className="flex justify-center items-center">
        <div>filter</div>
        <button onClick={()=>props.setFilter("Today")} className="mx-5 px-5  my-2 rounded-xl border border-black">Today</button>
        <button onClick={()=>props.setFilter("this Week")} className="mx-5 px-5  my-2 rounded-xl border border-black">this Week</button>
        <button onClick={()=>props.setFilter("clear")} className="mx-5 px-5  my-2 rounded-xl border border-black">clear</button>
      </div>
    </>
  );
}
