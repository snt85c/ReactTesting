import { fireEvent, render, screen, cleanup} from "@testing-library/react";
import TODO from "./TODO";

describe("TODO bundle test", () => {
  it("expect the name input on the menu to be present", () => {
    render(<TODO />);
    expect(screen.getByPlaceholderText(/name/)).toBeInTheDocument();
  });

  it("expect the calendar option in the menu to be present and with the date of today at render", () => {
    render(<TODO />);
    expect(
      screen.getByText("date: " + new Date().toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("expect a priority button to be present, set at normal on first render", () => {
    render(<TODO />);
    expect(
      screen.getByRole("button", { name: "Priority: Normal" })
    ).toBeInTheDocument();
  });
  describe("rename test", () => {});

  it("expect a add task button to be present and initially disabled since the name input would be empty at render", () => {
    render(<TODO />);
    expect(screen.getByText(/add task/i)).toBeDisabled();
  });

  it("expect the add task button not to be disabled after inputting a value in the name field", () => {
    render(<TODO />);
    // screen.debug()
    const expectedinput = "test input";
    const nameInput = screen.getByPlaceholderText(/name/i);
    const addTaskButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.change(nameInput, { target: { value: expectedinput } });
    expect(addTaskButton).not.toBeDisabled();
  });
});

describe("TODO add test", () => {
  it("add a taks  with name 'test', date of today, and priority 'Urgent' ", () => {
    render(<TODO />);
    //set the constant data that is passed to the menu and expected to be found on the list of todos
    const EXPECTED_INPUT = "test";
    const EXPECTED_PRIORITY = "Urgent";
    const EXPECTED_DATE = new Date().toLocaleDateString();

    //get all the dom components for the menu
    const TODOMenuNameInput = screen.getByPlaceholderText(/name/i);
    const TODOMenuPriorityButton = screen.getByRole("button", {
      name: /priority: normal/i,
    });
    const TODOMenuAddButton = screen.getByRole("button", {
      name: /add task/i,
    });

    //fire events, add a value 'test' to the input, click once to the priority button to toggle it to 'Urgent', then click 'add task'
    fireEvent.change(TODOMenuNameInput, { target: { value: EXPECTED_INPUT } });
    fireEvent.click(TODOMenuPriorityButton);
    fireEvent.click(TODOMenuAddButton);

    //get the dom components from the TODOList, which are now rendered after
    const TODOListNameSpan = screen.getByTestId("nameSpan");
    const TODOListPrioritySpan = screen.getByTestId("prioritySpan");
    const TODOListDateSpan = screen.getByTestId("dateSpan");

    expect(TODOListNameSpan.value).toBe(EXPECTED_INPUT);
    expect(TODOListPrioritySpan.textContent).toBe(EXPECTED_PRIORITY);
    expect(TODOListDateSpan.textContent).toBe(EXPECTED_DATE);
  });

  it("add two todo in the list, check for lenght of the list and value of the components", () => {
    render(<TODO />);
    //expected valued of first todo
    const EXPECTED_INPUT_1 = "test1";
    const EXPECTED_INPUT_2 = "test2";

    //expected valued of second todo
    const EXPECTED_PRIORITY_1 = "Urgent";
    const EXPECTED_PRIORITY_2 = "Low";

    //expected value of date for both
    const EXPECTED_DATE = new Date().toLocaleDateString();

    //get menu components
    const TODOMenuNameInput = screen.getByPlaceholderText(/name/i);
    const TODOMenuPriorityButton = screen.getByRole("button", {
      name: /priority: normal/i,
    });
    const TODOMenuAddButton = screen.getByRole("button", {
      name: /add task/i,
    });

    //set the first todo to 'test1', 'urgent' 'date of today' 
    fireEvent.change(TODOMenuNameInput, { target: { value: EXPECTED_INPUT_1 } });
    fireEvent.click(TODOMenuPriorityButton);
    fireEvent.click(TODOMenuAddButton);

    //set the second todo, to 'test2' 'low' and 'date of today'
    fireEvent.change(TODOMenuNameInput, { target: { value: EXPECTED_INPUT_2 } });
    fireEvent.click(TODOMenuPriorityButton);
    fireEvent.click(TODOMenuAddButton);

    //we use getALLbyTestID as we expect to have multiple TODOItems, this will result in each constant to be of type HTMLElement[] (an array of HTMLElement)
    const TODOListNameSpan = screen.getAllByTestId("nameSpan");
    const TODOListPrioritySpan = screen.getAllByTestId("prioritySpan");
    const TODOListDateSpan = screen.getAllByTestId("dateSpan");

    //we expect all the resulting arrays to be lenght 2, we check for all of them not to be of different lenghts than 2
    expect(TODOListNameSpan.length).not.toBe(1)
    expect(TODOListPrioritySpan.length).toBe(2)
    expect(TODOListDateSpan.length).not.toBe(3)

    //then we check that all the items have the expected value
    expect(TODOListNameSpan[0].value).toBe(EXPECTED_INPUT_1)
    expect(TODOListNameSpan[1].value).toBe(EXPECTED_INPUT_2)

    expect(TODOListPrioritySpan[0].textContent).toBe(EXPECTED_PRIORITY_1)
    expect(TODOListPrioritySpan[1].textContent).toBe(EXPECTED_PRIORITY_2)
    
    expect(TODOListDateSpan[0].textContent).toBe(EXPECTED_DATE)
    expect(TODOListDateSpan[1].textContent).toBe(EXPECTED_DATE)
  });
});

