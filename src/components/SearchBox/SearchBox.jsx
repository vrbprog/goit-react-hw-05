
import s from "./SearchBox.module.css";

export default function SearchBox({ filter }) {

    const handleSearch = (e) => {
        filter(e.target.value);
    };

    return (
        <div>
            <label className={s.label}>
                <span>Find contacts by name:</span>
                <input onChange={handleSearch} className={s.input} type="text" name="name" />
            </label>
        </div>
    );
};
