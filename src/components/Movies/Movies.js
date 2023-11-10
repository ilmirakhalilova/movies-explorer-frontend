import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function Movies({ movies }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
      <div className="movies__more-container">
        <button className="movies__more-button animation" type="button">
          Ещё
        </button>
      </div>
    </section>
  )
}

export default Movies;