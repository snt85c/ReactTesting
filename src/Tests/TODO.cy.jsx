import TODO from "../TODOComponents/TODO";

describe("basic menu test", () => {
  const priorityButton = "[aria-label = button-priority-menu]" 
  const nameInput = "[aria-label = input-name-menu]" 
  const calendarButton =  "[aria-label = button-calendar-menu]"
  const addButton = "[aria-label = button-add-menu]"

  it("mounts", () => {
    cy.mount(<TODO />);
  });

  it("contains the menu items", ()=>{
    cy.mount(<TODO />);
    cy.get(nameInput).invoke('attr', 'placeholder').should('contain', 'name');
    cy.get(calendarButton).should("contain","date: "+ new Date().toLocaleDateString())
    cy.get(priorityButton).should("contain", "Priority: Normal")
    cy.get(addButton).should("be.disabled")
  })

  it("when clicking the priority button, it will change from Normal to Urgent",()=>{
    cy.mount(<TODO />);
    cy.get(priorityButton).click()
    cy.get(priorityButton).should("contain", "Priority: Urgent")
  })

  it("when adding a name, the addButton is not disabled anymore",()=>{
    cy.mount(<TODO />);
    cy.get(nameInput).type("hello world")
    cy.get(nameInput).invoke('attr', 'value').should("contain","hello world")
    cy.get(addButton).should("not.be.disabled")

  })

});
