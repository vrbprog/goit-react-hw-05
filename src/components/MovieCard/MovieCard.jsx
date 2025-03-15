import css from "./MovieCard.module.css";

export default function MovieCard({ movie }) {
    const { poster_path, title } = movie;
    const img_url = `https://image.tmdb.org/t/p/w500${poster_path}`;
    return (
        <div className={css.movieCard}>
            <img
                className={css.card}
                src={img_url}
            />
            <p className={css.title}>{title}</p>
        </div>
    );
}
