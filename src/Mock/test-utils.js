import { render } from "@testing-library/react"
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "../hooks/useTheme"
import { TokenProvider } from "../hooks/useToken"


const renderWithContext = (ui, providerValue) => {
    return render(
        <BrowserRouter>
            <ThemeProvider>
                <TokenProvider>
                    {ui}
                </TokenProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

//Only for testing individual routes as /dentist/:id
export const renderWithRouter = (ui, { route = '/', path = '/' }) => {
    window.history.pushState({}, 'Test page', route)

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route index path={path} element={ui} />
            </Routes>
        </MemoryRouter>
    )
}

export * from "@testing-library/react"
export { renderWithContext as render }  