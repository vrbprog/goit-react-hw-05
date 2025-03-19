import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage({movies, loading}) {

    return (
        <div>
            <h1 className={css.headerTrending}>Trending Movies</h1>
            <MovieList movies={movies} loading={loading} />
        </div>
    );
}
