import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { searchMovie } from "../../services/themoviedb";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

export default function MoviesPage() {

    const [searchingMovies, setSearchingMovies] = useState([]);
    const [movieQuery, setMovieQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onQuery = (query) => {
        setMovieQuery(query);
    }

    useEffect(() => {

        if (!movieQuery) {
            return;
        }

        const getSearching = async () => {
            setIsLoading(true);
            try {
                const data = await searchMovie(movieQuery);
                setSearchingMovies(data.data.results);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        getSearching();
    }, [movieQuery]);

    return (
        <div>
            <SearchBar request={onQuery} />
            <GoBackButton />
            <h1 className={css.headerSearching}>{movieQuery}</h1>
            <MovieList movies={searchingMovies} loading={isLoading} />
        </div>
    );
}
