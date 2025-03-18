import css from './ReviewList.module.css';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ReviewList({ reviews }) {

    return (
        <div>
            <ul className={css.reviewList}>
                {reviews.map(({ id, author, content }) => (
                    <li key={id}>
                        <ReviewCard author={author} review={content} />
                    </li>
                ))}
            </ul>
        </div>
    );
    
};
