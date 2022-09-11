import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TODO from "../TODOComponents/TODO";

describe("TODO FILTERING test bundle", () => {
  it("add 3, one with the date of today, one with the date of 2 days from today,  one with the date of two weeks from now. Filter for today,  week and clear. expect one to be found once in day/week filter, two in week filter, three in clear filter", () => {
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
    const inTwoDays = new Date();
    inTwoDays.setDate(inTwoDays.getDate() + 2);

    const inTwoDaysToString =
      monthNames[inTwoDays.getMonth()] +
      " " +
      inTwoDays.getDate() +
      ", " +
      inTwoDays.getFullYear();

    const inEightDays = new Date();
    inEightDays.setDate(inEightDays.getDate() + 8);

    const eightDaysToString =
      monthNames[inEightDays.getMonth()] +
      " " +
      inEightDays.getDate() +
      ", " +
      inEightDays.getFullYear();

    render(<TODO />);

    //add and click
    userEvent.type(
      screen.getByPlaceholderText(/name/i),
      "filter item test TODAY"
    );
    userEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    //add and click, we change the date to set a todo for 2 days from today
    userEvent.clear(screen.getByPlaceholderText(/name/i));
    userEvent.type(
      screen.getByPlaceholderText(/name/i),
      "filter item test IN2DAYS"
    );
    userEvent.click(
      screen.getByRole("button", {
        name: "date: " + new Date().toLocaleDateString(),
      })
    );
    userEvent.click(screen.getByRole("button", { name: inTwoDaysToString }));
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    userEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    //add and click, this time we change the date by clicking the button which has the aria-label like eightDaysToString
    userEvent.clear(screen.getByPlaceholderText(/name/i));
    userEvent.type(
      screen.getByPlaceholderText(/name/i),
      "filter item test IN8DAYS"
    );
    //get the button as '"date: " + inTwoDays.toLocaleDateString()' since the button will keep the label with the last date used
    userEvent.click(
      screen.getByRole("button", {
        name: "date: " + inTwoDays.toLocaleDateString(),
      })
    );
    userEvent.click(screen.getByRole("button", { name: eightDaysToString }));
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    userEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    userEvent.click(screen.getByText("Today"));
    //as we only have one task set for today
    expect(
      screen.getAllByRole("textbox", { name: "input-name-list" }).length
    ).toBe(1);

    userEvent.click(screen.getByText("Week"));
    //as the second task is still outside of the week
    expect(
      screen.getAllByRole("textbox", { name: "input-name-list" }).length
    ).toBe(2);

    userEvent.click(screen.getByText("Clear Filter"));
    //as it will show all the tasks available
    expect(
      screen.getAllByRole("textbox", { name: "input-name-list" }).length
    ).toBe(3);
  });
});
