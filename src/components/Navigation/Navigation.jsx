import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
    const activeLink = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
    };

    return (
        <nav className={css.navigation}>
            <NavLink to="/" className={activeLink}>
                Home
            </NavLink>
            <NavLink to="/movies" className={activeLink}>
                Movies
            </NavLink>
        </nav>

        
    );
}
