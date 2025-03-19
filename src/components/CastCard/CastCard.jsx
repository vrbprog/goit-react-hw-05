import css from "./CastCard.module.css";
import photo from "/src/assets/def_foto.png";

export default function CastCard({ path, name }) {
    const getPhoto = () => {
        if (path === null) return photo;
        else return `https://image.tmdb.org/t/p/w500${path}`;
    };
    const img_url = getPhoto();

    return (
        <div className={css.castCard}>
            <img className={css.cardFoto} alt={name} src={img_url} />
            <p className={css.name}>{name}</p>
        </div>
    );
}
