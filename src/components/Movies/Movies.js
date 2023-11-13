import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function Movies({ movies }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
      <div className="movies__more-container">
        <button className="movies__more-button animation" type="button">
          Ещё
        </button>
      </div>
    </main>
  )
}

export default Movies;