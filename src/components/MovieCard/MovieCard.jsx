import css from "./MovieCard.module.css";
import photo from "/src/assets/cinema.png";

export default function MovieCard({ movie }) {
    const { poster_path, title } = movie;

    const getPhoto = () => {
            if (poster_path === null) return photo;
            else return `https://image.tmdb.org/t/p/w500${poster_path}`;
    };
    const img_url = getPhoto();

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
