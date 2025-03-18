import css from './CastList.module.css';
import CastCard from '../CastCard/CastCard';

export default function CastList({ casts }) {
    return (
        <div>
            <ul className={css.castList}>
                {casts.map(({ cast_id, profile_path, name }) => (
                    <li key={cast_id}>
                        <CastCard path={profile_path} name={name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
