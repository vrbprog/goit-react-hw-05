import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCastMovie } from "../../services/themoviedb";
import CastCard from "../CastCard/CastCard";
import css from "./MovieCast.module.css";
import { BlinkBlur } from "react-loading-indicators";

export default function MovieCast() {

    const { moviesId } = useParams();
    const [casts, setCasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        const getCastData = async () => {
                    setIsLoading(true);
                    try {
                        const { data } = await getCastMovie(moviesId);
                        console.log(data);
                        setCasts(data.cast);
                    } catch (error) {
                        setIsErrorLoading(true);
                        console.error(error);
                    }
                    finally {
                        setIsLoading(false);
                    }
                };
                getCastData();
    }, [moviesId]);
    
    const htmlCode =
        <div className={css.container}>
            <ul className={css.castList}>
                {casts.map(({ cast_id, profile_path, name }) => (
                    <li key={cast_id}>
                        <CastCard path={profile_path} name={name} />
                    </li>
                ))}
            </ul>
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
};
