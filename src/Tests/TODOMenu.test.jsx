import { fireEvent, render, screen } from "@testing-library/react";
import TODO from "../TODOComponents/TODO";

describe("TODO MENU COMPONENT TEST BUNDLE", () => {
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
      screen.getByRole("button", { name: "button-priority-menu" })
    ).toBeInTheDocument();
  });

  it("expect a add task button to be present and initially disabled since the name input would be empty at render", () => {
    render(<TODO />);
    expect(screen.getByRole("button",{name:"button-add-menu"})).toBeDisabled();
  });

  it("expect the add task button not to be disabled after inputting a value in the name field", () => {
    render(<TODO />);
    // screen.debug()
    const expectedinput = "test input";
    const nameInput = screen.getByPlaceholderText(/name/i);
    const addTaskButton = screen.getByRole("button", { name: "button-add-menu" });
    fireEvent.change(nameInput, { target: { value: expectedinput } });
    expect(addTaskButton).not.toBeDisabled();
  });
});
