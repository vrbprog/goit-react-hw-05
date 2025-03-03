import MovieCard from '../MovieCard/MovieCard';
import css from './MovieGalery.module.css';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function MovieGalery({ movies, updatePage, showPage }) {
    
    const handleNextPage = () => {
        updatePage(1);
    }

    const handlePrevPage = () => {
        updatePage(-1);
    }

    return (
        <div className={css.container}>
            <AiFillCaretLeft size={70} color={showPage > 1 ? 'blue' : 'grey'} onClick={handlePrevPage} />
            <ul className={css.movieGalery}>
                {movies.map(({ poster_path, id, release_date, title }) => (    
                    <li key={id}>
                        <MovieCard movie={{ poster_path, release_date, title }  } />
                    </li>
                ))}
            </ul>
            <AiFillCaretRight size={70} color={'blue'} onClick={handleNextPage}/>
        </div>
    );
    
};
