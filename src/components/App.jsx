import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/Moviespage";
import Navigation from "./Navigation/Navigation";

export default function App() {
    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </div>
    );
}
