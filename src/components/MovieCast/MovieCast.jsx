import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCastMovie } from "../../services/themoviedb";
import css from "./MovieCast.module.css";
import CastList from "../CastList/CastList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function MovieCast() {

    const { moviesId } = useParams();
    const [casts, setCasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        const getCastData = async () => {
            setIsLoading(true);
            setIsErrorLoading
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
     
    return (
        <>
            { isLoading ? <LoadingSpinner /> :
                isErrorLoading ? <h1 className={css.errorLoading}>Sorry, something went wrong...</h1> :
                    casts.length > 0 ? <CastList casts={casts} /> : <h2 className={css.noCasts}>Sorry, no casts...</h2>
            }
        </>
    );
};
