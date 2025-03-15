import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInfoMovie } from "../../services/themoviedb";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
    const { moviesId } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [genres, setGenres] = useState([]);
    
    useEffect(() => {
            const getMovieData = async () => {
                try {
                    const { data } = await getInfoMovie(moviesId);
                    setMovieInfo(data);
                    setGenres(data.genres);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            };
            getMovieData();
        }, [moviesId]);

    const getYear = (date) => {
        if(!date) return;
        return  date.toString().split('-')[0];
    }

    return (
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
                    
            </div>
        </div>
    );
}
