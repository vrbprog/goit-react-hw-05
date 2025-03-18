import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovie } from '../../services/themoviedb';
import css from './MovieReviews.module.css';
import ReviewList from '../ReviewList/ReviewList';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


export default function MovieReviews() {

    const { moviesId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        const getCastData = async () => {
                    setIsLoading(true);
                    setIsErrorLoading(false);
                    try {
                        const { data } = await getReviewsMovie(moviesId);
                        console.log(data.results);
                        setReviews(data.results);
                    } catch (error) {
                        console.error(error);
                        setIsErrorLoading(true);
                    }
                    finally {
                        setIsLoading(false);
                    }
                };
                getCastData();
    }, [moviesId]);
    
    return (
        <>
            {
                isLoading ? <LoadingSpinner /> :
                isErrorLoading ? <h1 className={css.errorLoading}>Sorry, something went wrong...</h1> :
                    reviews.length > 0 ? <ReviewList reviews={reviews} /> : <h2 className={css.noReviews}>Sorry, no reviews...</h2>
            }
        </>
    );
}
