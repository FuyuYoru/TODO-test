import { Outlet } from "react-router-dom"
import { ThemeProvider } from "./ThemeProvider"

export const Providers: React.FC = () => {
    return (
        <ThemeProvider>
            <Outlet />
        </ThemeProvider>
    )
}