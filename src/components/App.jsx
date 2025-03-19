import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import Navigation from "./Navigation/Navigation";
import { getTrendingMovies } from "../services/themoviedb";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTrending = async () => {
            setIsLoading(true);
            try {
                const data = await getTrendingMovies(1);
                setMovies(data.results);
                console.log(data.results);
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        getTrending();
    }, []);

    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage movies={movies} loading={isLoading} />} />
                <Route
                    path="/movies/:moviesId"
                    element={<MovieDetailsPage />}
                >
                    <Route path="cast" element={<MovieCast />} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </div>
    );
}
