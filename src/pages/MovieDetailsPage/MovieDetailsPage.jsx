import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getInfoMovie } from "../../services/themoviedb";
import css from "./MovieDetailsPage.module.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { CgArrowLeftR } from "react-icons/cg";
import photo from "/src/assets/cinema.png";

export default function MovieDetailsPage() {
    const { moviesId } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const location = useLocation();
    const backRef = useRef(location.state ?? "/");

    
    useEffect(() => {
        setIsLoading(true);
        setIsErrorLoading(false);
            const getMovieData = async () => {
                try {
                    const { data } = await getInfoMovie(moviesId);
                    setMovieInfo(data);
                    setGenres(data.genres);
                } catch {
                    setIsErrorLoading(true);
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

    const activeLink = ({ isActive }) => {
            return clsx(css.navLink, isActive && css.active);
    };
    
    const getPhoto = () => {
                if (movieInfo.poster_path === null) return photo;
                else return `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`;
        };
    const img_url = getPhoto();

    const detailsPage =
        <>
            <NavLink to={backRef.current} state={location} className={css.button}><CgArrowLeftR /> Go back</NavLink>
            <div className={css.container}>
                <img className={css.img} width={500} src={img_url} />
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
                            <NavLink to="cast" className={activeLink}>
                            Cast
                            </NavLink>
                            <NavLink to="reviews" className={activeLink}>
                            Reviews
                            </NavLink>
                        </ul>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    
    return (
        <>
            { isLoading ? <LoadingSpinner /> :
                isErrorLoading ? <h1 className={css.errorLoading}>Sorry, something went wrong...</h1> : detailsPage
            }
        </>
    );
}
