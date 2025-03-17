import css from './CastCard.module.css';

export default function CastCard({path, name}) {
    const img_url = `https://image.tmdb.org/t/p/w500${path}`;
    return (
        <div className={css.castCard}>
            <img
                className={css.cardFoto}
                alt={name}
                src={img_url}
            />
            <p className={css.name}>{name}</p>
        </div>
    );
    
};
