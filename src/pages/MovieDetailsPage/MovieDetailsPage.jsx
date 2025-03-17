import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInfoMovie } from "../../services/themoviedb";
import css from "./MovieDetailsPage.module.css";
import { BlinkBlur } from "react-loading-indicators";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function MovieDetailsPage() {
    const { moviesId } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        setIsErrorLoading(false);
            const getMovieData = async () => {
                try {
                    const { data } = await getInfoMovie(moviesId);
                    setMovieInfo(data);
                    setGenres(data.genres);
                    console.log(data);
                } catch (error) {
                    setIsErrorLoading(true);
                    console.error(error);
                }
                finally {
                    setIsLoading(false);
                }
            };
            getMovieData();
        }, [moviesId]);

    const getYear = (date) => {
        if(!date) return;
        return  date.toString().split('-')[0];
    }

    const htmlCode =
        <div className={css.container}>
            <img className={css.img} width={500} src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} />
            <div className={css.info}>
                <div className={css.title}>
                    <h1>{movieInfo.title} ({ getYear(movieInfo.release_date) })</h1>
                </div>
                <div className={css.score}>
                    <h2>User score:</h2>
                    <h2>{movieInfo.vote_average}</h2>
                </div>
                <h2>Overview</h2>
                <p className={css.overview}> {movieInfo.overview}</p>
                <div className={css.genres}>
                    <h2>Genres:</h2>
                    { genres.map((genre) => (
                    <span key={genre.id}>{genre.name} </span>
                ))}
                </div> 
                <div className={css.addInfo}>
                    <h2>Additional information:</h2>
                    <ul className={css.addList}>
                        <NavLink to="cast" className={css.navLink}>
                        Cast
                        </NavLink>
                        <NavLink to="reviews" className={css.navLink}>
                        Reviews
                        </NavLink>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    
    const loadingSpinner =
        <div className={css.spinner}>
            <BlinkBlur color="#32cd32" size="large" text="Loading..." textColor="#2b2aed"></BlinkBlur>
        </div>

    return (
        <>
            { isLoading ? loadingSpinner :
                isErrorLoading ? <h1 className={css.errorLoading}>Sorry, something went wrong...</h1> : htmlCode
            }
        </>
        
    );
}
