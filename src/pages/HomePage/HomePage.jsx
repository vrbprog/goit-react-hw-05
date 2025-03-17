import MovieGalery from "../../components/MovieGalery/MovieGalery";
import css from "./HomePage.module.css";

export default function HomePage({movies}) {

    return (
        <div>
            <h1 className={css.headerTrending}>Trending Movies</h1>
            <MovieGalery movies={movies} />
        </div>
    );
}
