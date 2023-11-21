import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useCallback, useEffect, useState } from 'react';
import { DURATION_SHORT_MOVIE } from '../../utils/constants';

function SavedMovies(props) {
  // const [foundMoviesPageSM, setFoundMoviesPageSM] = useState(JSON.parse(localStorage.getItem('savedMovies')));
  const [moviesForShow, setMoviesForShow] = useState([]);

  useEffect(() => {
    props.setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  }, []);
  
  // useEffect(() => {
  //   setFoundMoviesPageSM(props.savedMovies);
  // }, [props.savedMovies]);

  useEffect(() => {
    setMoviesForShow(JSON.parse(localStorage.getItem('savedMoviesForShow')));
  }, [props.savedMovies]);

  //функция поиска фильмов
  const search = (movies, searchPhrase) => {
    const foundMovies = movies.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchPhrase.toLowerCase()));
    });
    return foundMovies;
  }

  //функция для фильтрации короткометражек
  const filter = (movies) => {
    const filteredMovies = movies.filter((movie) => movie.duration <= DURATION_SHORT_MOVIE);
    return filteredMovies;
  }

  //получение фильмов по кнопке
  const handleSearchSubmit = useCallback((searchPhrase, filterStateOn) => {
    let found = search(JSON.parse(localStorage.getItem('savedMovies')), searchPhrase);
    if (filterStateOn) {
      found = filter(found);
    }
    setMoviesForShow(found);
    localStorage.setItem('savedMoviesForShow', JSON.stringify(found));
  }, []);

  //клик фильтрации
  const handleClickFilterShorts = useCallback((searchPhrase) => {
    const filterOn = JSON.parse(localStorage.getItem('filterStatePageSM'))
    if (searchPhrase) { 
        handleSearchSubmit(searchPhrase, filterOn);
      } else {                                           //вот это вроде не нужно вообще
      // setFoundMoviesPageSM(filter(props.savedMovies));
      setMoviesForShow(filter(props.savedMovies));
    }
  }, [handleSearchSubmit, props.savedMovies]);


  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={handleSearchSubmit}
        onFilter={handleClickFilterShorts}
      />
      <MoviesCardList 
        movies={moviesForShow}
        savedMovies={props.savedMovies}
        setSavedMovies={props.setSavedMovies}
      />
    </main>
  )
}

export default SavedMovies;
