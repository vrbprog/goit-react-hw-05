import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/Moviespage";
import Navigation from "./Navigation/Navigation";
import { getTrendingMovies } from "../services/themoviedb";

export default function App() {

    const [movies, setMovies] = useState([]);
    const [showMovies, setShowMovies] = useState([]);
    const [showPage, setShowPage] = useState(1);
    const [requestPage, setRequestPage] = useState(1);

    useEffect(() => {
        const getArticlesData = async () => {
            try {
                const data = await getTrendingMovies(requestPage);
                setMovies(data.results);
            } catch (error) {
                console.error(error);
            }
        };
        getArticlesData();
    }, [requestPage]);

    useEffect(() => {

        if (showPage > requestPage * 2) {
            setRequestPage(prev => prev + 1);
        }
        else if (showPage < ((requestPage * 2) - 1)) {
            setRequestPage(prev => prev - 1);
        }
        else {
            setShowMovies(movies.filter((movie, index) =>
                (index >= (showPage % 2 ? 0 : 1) * 10)
            &&  (index < (showPage % 2 ? 1 : 2) * 10)));
        }
        
    }, [movies, showPage, requestPage]);

    const updatePage = (delta) => {
        if (delta > 0) {
            setShowPage(prev => prev + 1);
        }
        else if (showPage > 1) {
            setShowPage(prev => prev - 1);
        }
    }

    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage movies={showMovies} updatePage={updatePage} showPage={showPage} />} />
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </div>
    );
}
