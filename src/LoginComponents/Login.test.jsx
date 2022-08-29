import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import Login from "./Login";
import Navbar from "../NavbarComponents/Navbar";

const user = "";
const setUser = () => {
  user = "Leanne Graham";
};

describe(" testing username input package", () => {
  it("username input should be rendered and empty", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const username = screen.getByPlaceholderText(/username/i);
    expect(username.value).toBe("");
  });

  it("username input should change", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const username = screen.getByPlaceholderText(/username/i);
    const testvalue = "testvalue";
    fireEvent.change(username, { target: { value: testvalue } });
    expect(username.value).toBe(testvalue);
  });
});

describe(" test password input package", () => {
  it("password should be rendered and is empty ", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();
    expect(password.value).toBe("");
  });

  it("password input can change", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const password = screen.getByPlaceholderText(/password/i);
    const testvalue = "testvalue";
    fireEvent.change(password, { target: { value: testvalue } });
    expect(password.value).toBe(testvalue);
  });
});

describe("test login button package", () => {
  it("login button is rendered", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeInTheDocument();
  });

  it("login button is disabled at render", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeDisabled();
  });

  it("login button will become active and change opacity when username and password exist", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const testvalue = "testvalue";
    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.change(username, { target: { value: testvalue } });
    fireEvent.change(password, { target: { value: testvalue } });
    expect(button).not.toBeDisabled();
  });

  it("error is not visible at render", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const errorSpan = screen.getByText(/error/i);
    expect(errorSpan).not.toBeVisible();
  });

  it("button show login instead of wait at render", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).not.toHaveTextContent(/wait/i);
  });

  it("button show wait instead of login at click", () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const testvalue = "testvalue";
    const button = screen.getByRole("button", { name: /login/i });
    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    fireEvent.change(username, { target: { value: testvalue } });
    fireEvent.change(password, { target: { value: testvalue } });
    fireEvent.click(button); //need to have values on username and password to have the button clickable
    expect(button).toHaveTextContent(/wait/i);
  });

  it("if wrong username, then error message", async () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const testvalue = "testvalue";
    const button = screen.getByRole("button", { name: /login/i });
    const errorSpan = screen.getByText(/error/i);
    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    fireEvent.change(username, { target: { value: testvalue } });
    fireEvent.change(password, { target: { value: testvalue } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(errorSpan).toBeVisible();
    });
  });

  it("if right username, then no error message", async () => {
    render(
      <>
        <Navbar user={user} />
        <Login user={user} setUser={setUser} />
      </>
    );
    const testvalue = "testvalue";
    const button = screen.getByRole("button", { name: /login/i });
    const errorSpan = screen.getByText(/error/i);
    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    fireEvent.change(username, { target: { value: "Bret" } });
    fireEvent.change(password, { target: { value: testvalue } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(errorSpan).not.toBeVisible();
    });
  });
});
