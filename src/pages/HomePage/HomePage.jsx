import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/themoviedb";

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    
        useEffect(() => {
        const getTrending = async () => {
            setIsErrorLoading(false);
            setIsLoading(true);
            try {
                const data = await getTrendingMovies(1);
                setMovies(data.results);
            } catch {
                setIsErrorLoading(true);
            }
            finally {
                setIsLoading(false);
            }
        };
        getTrending();
    }, []);

    return (
        <>
            {isErrorLoading ? <h1 className={css.errorLoading}>Sorry, something went wrong...</h1> :
                <>
                    <h1 className={css.headerTrending}>Trending Movies</h1>
                    <MovieList movies={movies} loading={isLoading} />
                </>
            }
        </>
    );
}
