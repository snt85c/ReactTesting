import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TODO from "../TODOComponents/TODO";

describe("TODO MODIFY TEST BUNDLE", () => {
  it("add one, then MODIFY THE NAME", () => {
    render(<TODO />);
    const BEFORE_MODIFICATION = "modification test 1";
    const AFTER_MODIFICATION = "modification test 2";

    //add and click, as usual
    userEvent.type(screen.getByPlaceholderText(/name/i), BEFORE_MODIFICATION);
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
      })
    );

    //intermediate test, we check for the input to be there in the list
    expect(screen.getByRole("textbox", { name: "input-name-list" }).value).toBe(
      BEFORE_MODIFICATION
    );

    //we fire an event where we get the input from the list and we change the value
    fireEvent.change(screen.getByRole("textbox", { name: "input-name-list" }), {
      target: { value: AFTER_MODIFICATION },
    });

    //we expect now for the value to be different than before
    expect(screen.getByRole("textbox", { name: "input-name-list" }).value).toBe(
      AFTER_MODIFICATION
    );
  });

  it("add one, then MODIFY THE DATE", async () => {
    render(<TODO />);
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

    //the aria-label for the calendar button is styled such as 'Sempteber 12, 2022" so if i want to click the button with the date of tomorrow i have to get a string with such data. i start by setting up a Date variable and then i set the day +1, after that i concatenate the data to be styled as above. it should always pass the test as the calendar should show the day after the month in majority of cases.
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowToString =
      monthNames[tomorrow.getMonth()] +
      " " +
      tomorrow.getDate() +
      ", " +
      tomorrow.getFullYear();

    //i set the data on screen by creating a task with a name, then clicking "add task" which will create a task with the date of today
    userEvent.type(screen.getByPlaceholderText(/name/i), tomorrowToString);
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
      })
    );

    //ACT
    //click on the date to open the calendar
    userEvent.click(screen.getByRole("textbox", { name: "input-list-date" }));
    //the aria-label for the 25/09/2022 button is styled like this : "September 25, 2022" so i click on it to set it,
    userEvent.click(screen.getByRole("button", { name: tomorrowToString }));
    expect(
      screen.getByRole("button", { name: tomorrowToString })
    ).toBeInTheDocument();
    // click on confirm to close the calendar overlay
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));

    waitFor(() => {
      expect(
        screen.findByRole("textbox", { name: "input-list-date" }).value
      ).toEqual(tomorrow.toLocaleDateString());
    });
  });

  it("add one, then MODIFIES THE PRIORITY", () => {
    render(<TODO />);
    //add and click, as usual
    userEvent.type(
      screen.getByPlaceholderText(/name/i),
      "priority modification test"
    );
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
      })
    );

    userEvent.click(
      screen.getByRole("button", { name: "button-list-priority" })
    );

    expect(
      screen.getByRole("button", { name: "button-list-priority" }).textContent
    ).toEqual("Urgent");
  });
});
