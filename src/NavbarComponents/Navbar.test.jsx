import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../LoginComponents/Login";
import Navbar from "./Navbar";

let user = { name: "", username: "" };
let setUser = () => {
  user = { name: "Leanne Graham", username: "Bret" };
};

describe("Navbar testing bundle", () => {
  it("render the navbar", () => {
    render(
      <>
        <Navbar name={user.name} />
        <Login user={user} setUser={setUser} />
      </>
    );
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  // it("if correct username, then show name on screen", async () => {
  //   render(
  //     <>
  //       <Navbar name={user.name} />
  //       <Login user={user} setUser={setUser} />
  //     </>
  //   );
  //   const username = screen.getByPlaceholderText(/username/i);
  //   const password = screen.getByPlaceholderText(/password/i);
  //   const button = screen.getByRole("button", { name: /login/i });
  //   fireEvent.change(username, { target: { value: "Bret" } });
  //   fireEvent.change(password, { target: { value: "testvalue" } });
  //   fireEvent.click(button);
  //   // await waitFor(() => {
  //   expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  //   // });
  // });
});
