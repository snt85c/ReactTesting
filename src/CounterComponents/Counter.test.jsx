import { fireEvent, render, screen } from "@testing-library/react"
import App from "../App"
import Counter from "./Counter"

describe("counter basic test package",()=>{
    it("render counter",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        expect(counter).toBeInTheDocument()
    })
    it("render counter at 0",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        expect(counter.textContent).toBe("0")
    })

    it("successfully add 1 after clicking +1",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        const addButton = screen.getByText("+1")
        fireEvent.click(addButton)
        expect(counter.textContent).toBe("1")
    })

    it("successfully shows 3 after clicking +1 three times",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        const addButton = screen.getByText("+1")
        fireEvent.click(addButton)
        fireEvent.click(addButton)
        fireEvent.click(addButton)
        expect(counter.textContent).toBe("3")
    })

    it("successfully remove 1 after clicking -1",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        const removeButton = screen.getByText("-1")
        fireEvent.click(removeButton)
        expect(counter.textContent).toBe("-1")
    })

    it("successfully shows -3 after clicking -1 three times",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        const removeButton = screen.getByText("-1")
        fireEvent.click(removeButton)
        fireEvent.click(removeButton)
        fireEvent.click(removeButton)
        expect(counter.textContent).toBe("-3")
    })

    it("successfully shows 0 after clicking -1 three times and +1 three times",()=>{
        render(<Counter/>)
        const counter = screen.getByTestId("counter",{name:0})
        const removeButton = screen.getByText("-1")
        const addButton = screen.getByText("+1")
        fireEvent.click(removeButton)
        fireEvent.click(removeButton)
        fireEvent.click(removeButton)
        fireEvent.click(addButton)
        fireEvent.click(addButton)
        fireEvent.click(addButton)
        expect(counter.textContent).toBe("0")
    })
})