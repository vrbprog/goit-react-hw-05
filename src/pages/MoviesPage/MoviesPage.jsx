import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { searchMovie } from "../../services/themoviedb";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {

    const [searchingMovies, setSearchingMovies] = useState([]);
    const [movieQuery, setMovieQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const updatedParams = new URLSearchParams(searchParams);
  
    const onQuery = (query) => {
        setMovieQuery(query);
        updatedParams.set("query", query);
        setSearchParams(updatedParams);
    }

    useEffect(() => {
        if (searchParams.has("query")) {
            setMovieQuery(searchParams.get("query"));
        }
    }, [searchParams]);

    useEffect(() => {
        if (!movieQuery) {
            return;
        }

        const getSearching = async () => {
            setIsErrorLoading(false);
            setIsLoading(true);
            try {
                const data = await searchMovie(movieQuery);
                setSearchingMovies(data.data.results);
            } catch {
                setIsErrorLoading(true);
            }
            finally {
                setIsLoading(false);
            }
        };
        getSearching();
    }, [movieQuery]);

    return (
        <>
            <SearchBar request={onQuery} />
            {isErrorLoading ? <h1 style={{ textAlign: "center", color: "red" }}>
                Sorry, something went wrong...</h1> :
                <>  <h1 className={css.headerSearching}>{movieQuery}</h1>
                    <MovieList movies={searchingMovies} loading={isLoading} />
                </>
            }
        </>
    );
}
