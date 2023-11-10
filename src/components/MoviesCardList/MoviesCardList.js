import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies}) {
  return (
    <section className="movies-card-list">
      {movies.length === 0 && (
        <p className="movies-card-list__not-found">Ничего не найдено</p>
      )}
      {movies.length > 0 && (
        <ul className="movies-card-list__container">
          {
            movies.map((movie) => {
              return <MoviesCard key={movie.id} movie={movie} />
            })
          }
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList;
