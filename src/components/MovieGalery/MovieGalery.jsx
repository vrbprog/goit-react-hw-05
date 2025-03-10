import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieGalery.module.css";
import { Link, NavLink } from "react-router-dom";

export default function MovieGalery({ movies }) {
    return (
        <div className={css.container}>
            <ul className={css.movieGalery}>
                {movies.map(({ poster_path, id, release_date, title }) => (
                    <li key={id}>
                        <NavLink to={`/movies/${id}`}>
                            <MovieCard
                                movie={{ poster_path, release_date, title }}
                            />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
