import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ movies }) {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </section>
  )
}

export default SavedMovies;