import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("TODO bundle test", () => {

  it("show the TODOMenu components", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    // expect(screen.getByPlaceholderText("task")).toBeInTheDocument();
    expect(screen.getByTestId("buttontoggle",{name:"Normal"})).toBeInTheDocument()
    expect(screen.getByText(/add task/i)).toBeInTheDocument()
  });

  it("add a new element on the todo, with Low priority",()=>{
    render(<App />);

    const expectedName = "User"
    // const expectedTask = "Task"

    const nameInput = screen.getByPlaceholderText("name")
    // const taskInput = screen.getByPlaceholderText("task")
    const prioritybutton = screen.getByTestId("buttontoggle",{name:"Normal"}) 
    const confirmbutton = screen.getByText(/add task/i)

    fireEvent.change(nameInput, {target:{value:expectedName}})
    // fireEvent.change(taskInput, {target:{value:expectedTask}})
    fireEvent.click(prioritybutton)
    fireEvent.click(prioritybutton)
    fireEvent.click(confirmbutton)

    expect(screen.getByTestId("nameSpan").textContent).toBe(expectedName)
    // expect(screen.getByTestId("taskSpan").textContent).toBe(expectedTask)
    expect(screen.getByTestId("prioritySpan").textContent).toBe("Low")

  })

  it("clicking on the name, opens an input with the current value already inserted",()=>{
    render(<App />);

    const expectedName = "User"
    // const expectedTask = "Task"

    const nameInput = screen.getByPlaceholderText("name")
    // const taskInput = screen.getByPlaceholderText("task")
    const confirmbutton = screen.getByText(/add task/i)

    fireEvent.change(nameInput, {target:{value:expectedName}})
    // fireEvent.change(taskInput, {target:{value:expectedTask}})
    fireEvent.click(confirmbutton)

    const nameSpan = screen.getByTestId("nameSpan")
    fireEvent.click(nameSpan)
    const modifyName = screen.getByTestId("changeName")
    expect(modifyName.value).toBe(expectedName)
  })

  it("changes the name",()=>{
    render(<App />)
    const expectedName = "User"
    // const expectedTask = "Task"
    const newName = "NewUser"

    const nameInput = screen.getByPlaceholderText("name")
    // const taskInput = screen.getByPlaceholderText("task")
    const confirmbutton = screen.getByText(/add task/i)

    fireEvent.change(nameInput, {target:{value:expectedName}})
    // fireEvent.change(taskInput, {target:{value:expectedTask}})
    fireEvent.click(confirmbutton)

    const nameSpan = screen.getByTestId("nameSpan")
    fireEvent.click(nameSpan)
    const modifyName = screen.getByTestId("changeName")
    fireEvent.change(modifyName,{target:{value:newName}})
    expect(modifyName.value).toBe(newName)

  })

});
