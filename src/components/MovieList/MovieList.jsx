import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";

export default function MovieList({ movies, loading }) {
    const location = useLocation();

    return (
        <div className={css.container}>
            {loading ? <LoadingSpinner/> :
                <ul className={css.movieGalery}>
                    {movies.map(({ poster_path, id, release_date, title }) => (
                        <li key={id}>
                            <NavLink to={`/movies/${id}`} state={location}>
                                <MovieCard
                                    movie={{ poster_path, release_date, title }}
                                />
                            </NavLink>
                        </li>
                    ))}
                </ul>}
        </div>
    );
}
