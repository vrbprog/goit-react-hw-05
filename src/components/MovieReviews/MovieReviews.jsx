import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovie } from '../../services/themoviedb';
import ReviewCard from '../ReviewCard/ReviewCard';
import css from './MovieReviews.module.css';
import { BlinkBlur } from "react-loading-indicators";


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
    
    const htmlCode =
        <div className={css.container}>
            <ul className={css.reviewList}>
                {reviews.map(({ id, author, content }) => (
                    <li key={id}>
                        <ReviewCard author={author} review={content} />
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
            {
                isLoading ? loadingSpinner :
                isErrorLoading ? <h1 className={css.errorLoading}>Sorry, something went wrong...</h1> :
                reviews.length > 0 ? htmlCode : <h1 className={css.noReviews}>Sorry, no reviews...</h1>
            }
        </>
    );
}
