import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function MainRoutes() {
    const {theme} = useTheme();
    
    return (
        <div className={theme}>
            <header >
                < Navbar />
            </header>
            <main className={theme}>
                <Outlet />
            </main>
            <footer>
                < Footer />
            </footer>
        </div>
    )
}