# TaskManager

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

this project it's a simple CRUD application written in Test Driven Development (TDD). Utilizes React Testing-Library and Cypress for the testing as well as Cloud Firestore to save the data permanently between sessions.
it's styled using 98.css(https://jdan.github.io/98.css/)

the idea of the project is not to be groundbreaking but be a learning stepstone for concepts like testing, clean code, and extend the knowledge with react

the project is divided as follows:

TODO.tsx contains a reducer that keeps the state of the todo with his own interface (iTodo[]) that allows:
    -SET: get data from database at first render. This is actually triggered in an useEffect and then set in the dispatch at the end.
    -ADD: add a todo to the list in TODOMenu
    -EDITNAME: edit the name, search the todo by id in a map and return it with the modified name
    -EDITDATE:edit the date, search the todo by id in a map and return it with the modified date
    -EDITPRIORITY: search the todo by id in a map, then toggle between the 3 possible state with a serie if statement
    -DELETE: filter the array by the provided id for the todo to be removed from the array

dispatcher and state are passed down the line inside a wrapper object for simplicity (as i only have to declare the interface once for everything that i'm passing down and then just state that in the props when drilling down) and are given as props to TODOMenu and TODOList

# TODOMenu
has the components to add a NEW todo item to the list. Contains the name input, the calendar button, the priority button and the add button

# TODOList
contains the component to filter the list and show the list as well as the logic to modify it

# RCT
React Testing-Library is used to test every part of the webapp from the render to the edit of the single components. the Tests folder contains five files that are test-specific 

    TODOMenu.test.jsx
        -expects the name input on the menu to be present
        -expects the calendar option in the menu to be present and with the date of today at render
        -expects a priority button to be present, set at normal on first render
        -expect a add task button to be present and initially disabled since the name input would be empty at render
        -expect the add task button not to be disabled after inputting a value in the name field

   TODOAdd.test.jsx
        - adding 1 item with date of TODAY, ad default priority (Normal)
        -adding 1 item with date of TOMORROW and different priority than default (Urgent) 
        -adds two tasks

    # TODOFilter.test.jsx
        -add 3 tasks: one with the date of today, one with the date of 2 days from today, one with the date of two weeks from now. then will filter for "today",  "week" and "clear". Expects one to be found once in day/week filter, two in week filter, three in clear filter
        -add one with the date of +8 from today: the today and this Week filter should return nothing 
    
    # TODOListModify.test.jsx
        -add one, then MODIFY THE NAME
        -add one, then MODIFY THE DATE
        -add one, then MODIFIES THE PRIORITY

    # TODORemove.test.jsx
        -add one, then remove from the list
        -add two, then remove two from the list

## Cypress
is currently used less at this stage, but it will mimick the same amount of testing from RTL in the future

    # TODO.cy.jsx
        -mounts
        -contains the menu items
        -when clicking the priority button, it will change from Normal to Urgent
        -when adding a name, the addButton is not disabled anymore

## How to run the code
 
 ```bash
gh repo clone snt85c/ReactTesting
```

install project repositories 

 ```bash
npm install
```

run

```bash
npm start
```

open http://localhost/3000 with your browser to see the site

## License

[MIT](https://choosealicense.com/licenses/mit/)
