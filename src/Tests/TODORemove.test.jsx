import {
    fireEvent,
    render,
    screen,
  } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import TODO from "../TODOComponents/TODO";

  describe("TODO REMOVE TEST BUNDLE", () => {
    it("add one, then remove from the list", () => {
      render(<TODO />);
      //set the constant data that is passed to the menu and is expected to be found on the list of todos
      const EXPECTED_INPUT = "deletion test";
  
      //get the minimum necessary dom components for the menu to change and click
      const TODOMenuNameInput = screen.getByPlaceholderText(/name/i);
      const TODOMenuAddButton = screen.getByRole("button", {
        name: "button-add-menu",
      });
  
      //fire events, add a value 'deletion test' to the input, then click 'add task'
      fireEvent.change(TODOMenuNameInput, { target: { value: EXPECTED_INPUT } });
      fireEvent.click(TODOMenuAddButton);
  
      //get the minimum dom components from the TODOList, which are now rendered after clicking
      const TODOListNameInput = screen.getByRole("textbox", {
        name: "input-name-list",
      });
      const TODOListDeleteButton = screen.getByRole("button", {
        name: /delete/i,
      });
  
      //intermediate check: we check if we have an input with the expected input and a delete button
      expect(TODOListNameInput.value).toBe(EXPECTED_INPUT);
      expect(TODOListDeleteButton).toBeInTheDocument();
  
      //we click on the delete button
      userEvent.click(TODOListDeleteButton);
  
      //we are now expecting for the TODOListName input NOT to be in the document
      expect(TODOListNameInput).not.toBeInTheDocument();
    });

    
    it("add two, then remove two from the list", () => {
      render(<TODO />);
  
      const EXPECTED_INPUT1 = "deletion test 1";
      const EXPECTED_INPUT2 = "deletion test 2";
  
      //get the minimum necessary dom components for the menu to change and click
      const TODOMenuNameInput = screen.getByPlaceholderText(/name/i);
      const TODOMenuAddButton = screen.getByRole("button", {
        name: "button-add-menu",
      });
  
      //fire events twice , add a value 'deletion test 1' and 'deletion test 2' to the input, then click 'add task'
      fireEvent.change(TODOMenuNameInput, { target: { value: EXPECTED_INPUT1 } });
      fireEvent.click(TODOMenuAddButton);
      fireEvent.change(TODOMenuNameInput, { target: { value: EXPECTED_INPUT2 } });
      fireEvent.click(TODOMenuAddButton);
  
      //intermediate check, we test if we have 2 input and 2 delete button in the list, as we should now have 2 elements with name "deletion test 2" and "deletion test 2, while we are there we also check the text input value"
      const TODOListNameInput = screen.getAllByRole("textbox", {
        name: "input-name-list",
      });
      const TODOListDeleteButton = screen.getAllByRole("button", {
        name: /delete/i,
      });
      expect(TODOListNameInput.length).toBe(2);
      expect(TODOListDeleteButton.length).toBe(2);
      expect(TODOListNameInput[0].value).toBe(EXPECTED_INPUT1);
      expect(TODOListNameInput[1].value).toBe(EXPECTED_INPUT2);
  
      //if we click the first button, we expect the list of input to be one shorter
      fireEvent.click(TODOListDeleteButton[0]);
      const TODOListNameInputAfterDeletion = screen.queryAllByRole("textbox", {
        name: "input-name-list",
      });
      expect(TODOListNameInputAfterDeletion.length).toBe(1);
  
      // we click the button again
      fireEvent.click(TODOListDeleteButton[0]);
      const TODOListNameInputAfterSecondDeletion = screen.queryAllByRole(
        "textbox",
        { name: "input-name-list" }
      );
      expect(TODOListNameInputAfterSecondDeletion.length).toBe(0);
    });
  });