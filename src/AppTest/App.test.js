import { render, screen } from "@testing-library/react";
import App from "../App";
import AppSimple from "./AppSimple";

test("basic initial test: renders learn react link", () => {
  render(<AppSimple />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("checks for a div by data-testid=testid", () => {
  render(<AppSimple />);
  const testdiv = screen.getByTestId(/testid/i);
  expect(testdiv).toBeInTheDocument();
});

test("count <li> by getting all the listitems on screen, then counting them, correct if they are 3 ", () => {
  render(<AppSimple />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(3);
});

test("check that the value of the multiplication is 6", () => {
  render(<AppSimple />);
  const mult = screen.getByTitle(/mult/i);
  expect(mult.textContent).toBe("6");
});
