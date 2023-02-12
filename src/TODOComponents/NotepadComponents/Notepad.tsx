export default function Notepad(props: {
  inView: "notepad" | "tasks";
  setInView: React.Dispatch<React.SetStateAction<"notepad" | "tasks">>;
}) {
  const NOTEPAD_TEXT: string = `Welcome to Task Manager
  \n\nThis TypeScript CRUD webapp is created to use automated testing when pushed on GitHub to make sure that no breaking changes are added 
  \n\n All the data (apart from this readme.txt) are managed via useReducer and its stored on Google Firestore.
  \n Styled with 98.css 
  \n------------------------------------------------------------
  \n**TODOMenu.test.jsx**\n\n-expects the name input on the menu to be present 
  \n-expects the calendar option in the menu to be present and with the date of today at render 
  \n-expects a priority button to be present, set at normal on first render \n-expect a add task button to be present and
  initially disabled since the name input would be empty at render 
  \n-expect the add task button not to be disabled after inputting a value in the name field
  \n------------------------------------------------------------
  \n**TODOAdd.test.jsx**\n\n-adding 1 item with date of TODAY, ad default priority (Normal) 
  \n-adding 1 item with date of TOMORROW and different priority than default (Urgent) 
  \n-adds two tasks
  \n------------------------------------------------------------
  \n**TODOFilter.test.jsx**\n\n-add 3 tasks: one with the date of today, one with the date of 2 days from today, one with the date of two weeks from now. then will filter for "today","week" and "clear". Expects one to be found once in day/week filter, two in week filter, three in clear filter 
  \n-add one with the date of +8 from today: the today and this Week filter should return nothing
  \n------------------------------------------------------------
  \n**TODOListModify.test.jsx**\n\n-add one, then MODIFY THE NAME 
  \n-add one, then MODIFY THE DATE
  \n-add one, then MODIFIES THE PRIORITY
  \n------------------------------------------------------------
  \n**TODORemove.test.jsx**\n\n-add one, then remove from the list
  \n-add two, then remove two from the list
  \n------------------------------------------------------------
  \n\n https://github.com/snt85c/ReactTesting `;

  return (
    <div
      className={`window bg-[#007c7c] absolute top-0 m-2 min-w-[75vw] min-h-[50vh] ${
        props.inView === "notepad" ? " z-10 " : " z-0 "
      }`}
      onClick={() => props.setInView("notepad")}
    >
      <div
        className={`title-bar ${props.inView === "notepad" ? "" : "inactive"}`}
      >
        <span className="title-bar-text pl-1">🗒️ Notepad - readme.txt</span>
        <div className="title-bar-controls pr-1">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row"></div>
      <div className="status-bar">
        <textarea
          spellCheck={false}
          style={{ resize: "none" }}
          className="min-w-full min-h-[50vh]"
          onChange={() => {}}
        >
          {NOTEPAD_TEXT}
        </textarea>
      </div>
    </div>
  );
}
