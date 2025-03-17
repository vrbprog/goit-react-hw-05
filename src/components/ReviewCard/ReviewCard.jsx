import css from './ReviewCard.module.css';

export default function ReviewCard({ author, review }) {
    return (
        <div className={css.review}>
                <h4 className={css.title}>{author}:</h4>
                <br />
                <p>{review}</p>
        </div>
        );
};
