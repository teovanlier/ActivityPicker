import {render,screen} from "@testing-library/react"

import LoginRegisterButton from "../../src/components/LoginRegisterButton"

test('should contain text login', () => {
    render(<LoginRegisterButton datatestid="loginbutton" disableButton={false} text={'Login'}/>)
    const buttonElement = screen.getByTestId('loginbutton')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent("Login")
})

test('should render button that contains class is bg-green-600 and is clickable', () => {
    render(<LoginRegisterButton datatestid="loginbutton" disableButton={false} text={'Login'}/>)
    
    const loginRegisterButton = screen.getByTestId('loginbutton')
    const button = screen.getByTestId("button")

    expect(loginRegisterButton).toBeInTheDocument()
    expect(button).toBeEnabled()
    expect(loginRegisterButton).toHaveClass("bg-green-600")
})

test('should render button that  class is bg-gray-400 and is not clickable', () => {
    render(<LoginRegisterButton datatestid="loginbutton" disableButton={true} text={'Login'}/>)
    
    const loginRegisterButton = screen.getByTestId('loginbutton')
    const button = screen.getByTestId("button")

    expect(loginRegisterButton).toBeInTheDocument()

    expect(button).toBeDisabled()
    expect(loginRegisterButton).toHaveClass("bg-gray-400")
})
