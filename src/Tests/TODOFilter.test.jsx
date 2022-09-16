import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TODO from "../TODOComponents/TODO";

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

describe("TODO FILTERING test bundle", () => {
  it("add 3, one with the date of today, one with the date of 2 days from today,  one with the date of two weeks from now. Filter for today,  week and clear. expect one to be found once in day/week filter, two in week filter, three in clear filter", async () => {
    render(<TODO />);

    //add and click
    userEvent.type(
      screen.getByPlaceholderText(/name/i),
      "filter item test TODAY"
    );
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
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
        name: "button-calendar-menu",
      })
    );
    userEvent.click(screen.getByRole("button", { name: inTwoDaysToString }));
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
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
        name: "button-calendar-menu",
      })
    );
    userEvent.click(screen.getByRole("button", { name: eightDaysToString }));
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
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

  it("add one with the date of +8 from today: the today and this Week filter should return nothing ", async () => {
    render(<TODO />);

    //i save the name input so that i can clear it later, otherwise when testing for the presence of an item with that name, it will find two (one on the menu, one on the list, so i will clear the menu after clicking )
    const menuInput = screen.getByPlaceholderText(/name/i);
    userEvent.type(menuInput, "filter item test IN8DAYS");

    userEvent.click(
      screen.getByRole("button", {
        name: "button-calendar-menu",
      })
    );

    userEvent.click(screen.getByRole("button", { name: eightDaysToString }));
    userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    userEvent.click(
      screen.getByRole("button", {
        name: "button-add-menu",
      })
    );
    userEvent.clear(menuInput);

    userEvent.click(screen.getByText("Today"));

    expect(
      screen.getByText("No items to show for this filter selection")
    ).toBeInTheDocument();

    userEvent.click(screen.getByText("Week"));
    expect(
      screen.getByText("No items to show for this filter selection")
    ).toBeInTheDocument();

    userEvent.click(screen.getByText("Clear Filter"));
    expect(
      screen.getByDisplayValue("filter item test IN8DAYS")
    ).toBeInTheDocument();
  });
});
