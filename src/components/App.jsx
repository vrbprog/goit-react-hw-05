import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/Moviespage";
import Navigation from "./Navigation/Navigation";
import { getTrendingMovies } from "../services/themoviedb";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [showMovies, setShowMovies] = useState([]);

    useEffect(() => {
        const getArticlesData = async () => {
            try {
                const data = await getTrendingMovies(1);
                setMovies(data.results);
            } catch (error) {
                console.log(error);
            }
        };
        getArticlesData();
    }, []);

    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage movies={movies} />} />
                <Route
                    path="/movies/:moviesId"
                    element={<MovieDetailsPage />}
                ></Route>
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </div>
    );
}
