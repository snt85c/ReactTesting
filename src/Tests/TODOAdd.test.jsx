import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TODO from "../TODOComponents/TODO";
import { TodoContextProvider } from "../TODOComponents/TODOContext";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const tomorrowToString =
  monthNames[tomorrow.getMonth()] +
  " " +
  tomorrow.getDate() +
  ", " +
  tomorrow.getFullYear();

describe("TODO ADD TEST BUNDLE", () => {
  it("add a taks  with name 'testADD', date of today, and priority 'Normal' ", async () => {
    render(
      <TodoContextProvider>
        <TODO />
      </TodoContextProvider>
    );
    //set the constant data that is passed to the menu and is expected to be found on the list of todos
    const EXPECTED_INPUT = "test ADD";
    const EXPECTED_PRIORITY = "Normal";
    const EXPECTED_DATE = new Date().toLocaleDateString();

    //get all the dom components for the menu
    const TODOMenuNameInput = screen.getByPlaceholderText(/name/i);
    const TODOMenuAddButton = screen.getByRole("button", {
      name: "button-add-menu",
    });

    //fire events, add a value 'test' to the input then click 'add task'
    userEvent.type(TODOMenuNameInput, EXPECTED_INPUT);
    fireEvent.click(TODOMenuAddButton);

    //get the dom components from the TODOList, which are now rendered after

    const TODOListNameSpan = screen.getByRole("textbox", {
      name: "input-name-list",
    });
    const TODOListPrioritySpan = screen.getByRole("button", {
      name: "button-list-priority",
    });
    const TODOListDateSpan = screen.getByRole("textbox", {
      name: "input-list-date",
    });
    expect(TODOListNameSpan.value).toBe(EXPECTED_INPUT);
    expect(TODOListPrioritySpan.textContent).toBe(EXPECTED_PRIORITY);
    expect(TODOListDateSpan.value).toBe(EXPECTED_DATE);
  });

  it("add a taks  with name 'testADDTomorrow', date of TOMORROW riority 'URGENT' ", async () => {
    render(
      <TodoContextProvider>
        <TODO />
      </TodoContextProvider>
    );
    //set the constant data that is passed to the menu and is expected to be found on the list of todos
    const EXPECTED_INPUT = "testADDTomorrow";
    const EXPECTED_PRIORITY = "Urgent";
    const EXPECTED_DATE = tomorrow.toLocaleDateString();

    //get all the dom components for the menu
    const TODOMenuNameInput = screen.getByPlaceholderText(/name/i);
    const TODOMenuPriorityButton = screen.getByRole("button", {
      name: "button-priority-menu",
    });
    const TODOMenuAddButton = screen.getByRole("button", {
      name: "button-add-menu",
    });

    const TODOMenuCalendarButton = screen.getByRole("button", {
      name: "button-calendar-menu",
    });
    expect(TODOMenuCalendarButton).toBeInTheDocument();

    //fire events, add a value 'test' to the input, click once to the priority button to toggle it to 'Urgent', then click 'add task'
    userEvent.type(TODOMenuNameInput, EXPECTED_INPUT);
    fireEvent.click(TODOMenuPriorityButton);
    userEvent.click(TODOMenuCalendarButton);
    userEvent.click(screen.getByRole("button", { name: tomorrowToString }));
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    fireEvent.click(TODOMenuAddButton);

    //get the dom components from the TODOList, which are now rendered after

    const TODOListNameSpan = screen.getByRole("textbox", {
      name: "input-name-list",
    });
    const TODOListPrioritySpan = screen.getByRole("button", {
      name: "button-list-priority",
    });
    const TODOListDateSpan = screen.getByRole("textbox", {
      name: "input-list-date",
    });
    expect(TODOListNameSpan.value).toBe(EXPECTED_INPUT);
    expect(TODOListPrioritySpan.textContent).toBe(EXPECTED_PRIORITY);
    expect(TODOListDateSpan.value).toBe(EXPECTED_DATE);
  });

  it("add two todo in the list, check for lenght of the list and value of the components", () => {
    render(
      <TodoContextProvider>
        <TODO />
      </TodoContextProvider>
    );
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
      name: "button-priority-menu",
    });
    const TODOMenuAddButton = screen.getByRole("button", {
      name: "button-add-menu",
    });

    //set the first todo to 'test1', 'urgent' 'date of today'
    fireEvent.change(TODOMenuNameInput, {
      target: { value: EXPECTED_INPUT_1 },
    });
    fireEvent.click(TODOMenuPriorityButton);
    fireEvent.click(TODOMenuAddButton);

    //set the second todo, to 'test2' 'low' and 'date of today'
    fireEvent.change(TODOMenuNameInput, {
      target: { value: EXPECTED_INPUT_2 },
    });
    fireEvent.click(TODOMenuPriorityButton);
    fireEvent.click(TODOMenuAddButton);

    //we use getALLbyRole as we expect to have multiple TODOItems, this will result in each to be of type HTMLElement[] (an array of HTMLElement)
    const TODOListNameSpan = screen.getAllByRole("textbox", {
      name: "input-name-list",
    });
    const TODOListPrioritySpan = screen.getAllByRole("button", {
      name: "button-list-priority",
    });
    const TODOListDateSpan = screen.getAllByRole("textbox", {
      name: "input-list-date",
    });

    //we expect all the resulting arrays to be lenght 2, we check for all of them not to be of different lenghts than 2
    expect(TODOListNameSpan.length).not.toBe(1);
    expect(TODOListPrioritySpan.length).toBe(2);
    expect(TODOListDateSpan.length).not.toBe(3);

    //then we check that all the items have the expected value
    expect(TODOListNameSpan[0].value).toBe(EXPECTED_INPUT_1);
    expect(TODOListNameSpan[1].value).toBe(EXPECTED_INPUT_2);

    expect(TODOListPrioritySpan[0].textContent).toBe(EXPECTED_PRIORITY_1);
    expect(TODOListPrioritySpan[1].textContent).toBe(EXPECTED_PRIORITY_2);

    expect(TODOListDateSpan[0].value).toBe(EXPECTED_DATE);
    expect(TODOListDateSpan[1].value).toBe(EXPECTED_DATE);
  });
});
