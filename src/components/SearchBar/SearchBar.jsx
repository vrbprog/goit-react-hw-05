import { useState } from "react";
 import css from "./SearchBar.module.css";
 import { CgSearch } from "react-icons/cg";
 import { toast } from "react-hot-toast";


export default function SearchBar({ request }) {

    const [stateSearchBar, setStateSearchBar] = useState({
        color: "grey",
        enableSearch: false,
        query: "",
    });

    const resetSearchBar = () =>
        setStateSearchBar({
            color: "grey",
            enableSearch: false,
            query: "",
        });

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (stateSearchBar.enableSearch) {
            e.target.reset();
            resetSearchBar();
            request(stateSearchBar.query);
        } else {
            toast.error("Please, enter your request!");
        }
    };

    const handlerQuery = (e) => {
        if (e.target.value === "") {
            resetSearchBar();
        } else {
            setStateSearchBar({
                color: "blue",
                enableSearch: true,
                query: e.target.value,
            });
        }
    };

    return (
        <div className={css.searchContainer}>
            <form className={css.searchBar} onSubmit={handlerSubmit}>
                <input
                    onChange={handlerQuery}
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies..."
                />
                <button className={css.button} type="submit">
                    <CgSearch style={stateSearchBar} />
                </button>
            </form>
        </div>
    );
}
