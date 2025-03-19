import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGalery from "../../components/MovieGalery/MovieGalery";
import css from "./MoviesPage.module.css";
import { searchMovie } from "../../services/themoviedb";

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
            <h1 className={css.headerSearching}>{movieQuery}</h1>
            <MovieGalery movies={searchingMovies} loading={isLoading} />
        </div>
    );
}
