import css from "./MovieCard.module.css";

export default function MovieCard({ movie }) {
    const { poster_path, release_date, title } = movie;
    const img_url = `https://image.tmdb.org/t/p/w500${poster_path}`;
    return (
        <div className={css.movieCard}>
          <img className={css.card}
            src={img_url}
            // alt={alt_description}
            // onClick={openModal}
            />
            <p className={css.title}>{title}</p>
            <p className={css.date}>{release_date}</p>
        </div>
      );
    }


