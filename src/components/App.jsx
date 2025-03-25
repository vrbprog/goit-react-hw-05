import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../pages/HomePage/HomePage";
// import MoviesPage from "../pages/MoviesPage/MoviesPage";
import Navigation from "./Navigation/Navigation";
import { getTrendingMovies } from "../services/themoviedb";
// import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
// import MovieCast from "../components/MovieCast/MovieCast";
// import MovieReviews from "../components/MovieReviews/MovieReviews";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { lazy, Suspense } from "react";

const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../components/MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export default function App() {
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
        <div>
            <Navigation />
            {isErrorLoading ? <h1 style={{ textAlign: "center", color: "red" }}>
                Sorry, something went wrong...</h1> :
                <Suspense fallback={<h1>Loading...</h1>}>
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
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            }
        </div>
    );
}
