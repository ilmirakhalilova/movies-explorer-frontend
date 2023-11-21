import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIES_NOTHING_FOUND, USE_SEARCH } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const { pathname } = useLocation();
  const pageMovies = pathname === "/movies";

  return (
    <section className="movies-card-list">

      {pageMovies && props.isLoading && <Preloader />}

      {props.movies.length === 0 && !props.isLoading && (
        <p className="movies-card-list__not-found">{JSON.parse(localStorage.getItem('allMovies')) ? MOVIES_NOTHING_FOUND : USE_SEARCH}</p>
      )}
      {props.movies.length > 0 && !props.isLoading && (
        <ul className="movies-card-list__container">
          {
            
            
            props.movies.map((movie) => {
              return <MoviesCard 
                        movies = {props.movies}
                        key={movie.id || movie._id}
                        movie={movie}
                        isSaved={JSON.parse(localStorage.getItem('savedMovies')).some((element) => element.movieId === movie.id)}
                        savedMovies={props.savedMovies}
                        setSavedMovies={props.setSavedMovies}
                      />
            })
          }
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList;
