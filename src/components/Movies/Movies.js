import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from "../../utils/MoviesApi";
import { useState, useCallback, useEffect } from 'react';
import { DURATION_SHORT_MOVIE } from '../../utils/constants';

function Movies(props) {
  const [searchPhrase, setSearchPhrase] = useState(JSON.parse(localStorage.getItem('searchPhrase')) || '');
  const [filterStateOn, setFilterStateOn] = useState(JSON.parse(localStorage.getItem('filterState') || false));
  const [moviesForShow, setMoviesForShow] = useState([]);
  const [cardsCount, setCardCount] = useState();
  const [moreCards, setMoreCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const moviesForShowStart = moviesForShow.slice(0, cardsCount);
  //const [flagRender, setFlagRender] = useState(true);
  

  // useEffect(() => {
  //   props.setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  // }, []);

  useEffect(() => {
    if (localStorage.getItem('foundMovies')) {
      setMoviesForShow(JSON.parse(localStorage.getItem('foundMovies')));
    }
  }, []);

  function handleWindowSize(width) {
    if (width > 1275) {
      setCardCount(12);
      setMoreCards(3);
    } else if (width > 767) {
      setCardCount(8);
      setMoreCards(2);
    } else {
      setCardCount(5);
      setMoreCards(2);
    }
  }

  useEffect(() => {
    handleWindowSize(window.innerWidth);
  }, [])

  useEffect(() => {
    const handleWidth = (e) => {
      setTimeout(() => {
        handleWindowSize(e.target.innerWidth);
      }, 500);
    };
    window.addEventListener('resize', handleWidth);
    return () => {
      window.addEventListener('resize', handleWidth);
    }
  }, []);

  //ещё
  function openMoreCards() {
    setCardCount(cardsCount + moreCards);
  }

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

  //поиск фильмов по поискОвой фразе + фильтр
  const searchMovies = useCallback((movies, searchPhrase) => {
    handleWindowSize(window.innerWidth);
    setFilterStateOn(localStorage.getItem('filterState'));
    const filterOn = JSON.parse(localStorage.getItem('filterState'));
    let found = search(movies, searchPhrase);
    if (filterOn === true) {
      found = filter(found);
    }
    setMoviesForShow(found);
    localStorage.setItem('foundMovies', JSON.stringify(found));
  }, []);

  //получение фильмов по кнопке
  const handleSearchSubmit = useCallback((searchPhrase) => {
    const allMovies = localStorage.getItem('allMovies');
      if (!allMovies) { //первая загрузка
        setIsLoading(true);
        getMovies()
          .then((allMoviesFromServer) => {
            setTimeout(() => {
              localStorage.setItem('allMovies', JSON.stringify(allMoviesFromServer));
              searchMovies(allMoviesFromServer, searchPhrase);
            })
          })
          .catch((err) => {
            setLoadingError(true);
            console.log(err); // выведем ошибку в консоль
          })
          .finally(() => setIsLoading(false))
      }
      else {
        searchMovies(JSON.parse(allMovies), searchPhrase);
      }
  }, [searchMovies]);

  //клик фильтрации
  const handleClickFilterShorts = useCallback(() => {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    const searchPhrase = JSON.parse(localStorage.getItem('searchPhrase'));
    const filterOn = JSON.parse(localStorage.getItem('filterState'));

    if (searchPhrase) { 
      if (allMovies) {//значит уже не первый поиск
        const found = search(allMovies, searchPhrase);
        if (!filterOn) { //если фильтр включен
          const filterMovies = filter(found);
          setMoviesForShow(filterMovies);
          localStorage.setItem('foundMovies', JSON.stringify(filterMovies));
        }
        else {
          setMoviesForShow(found);
          localStorage.setItem('foundMovies', JSON.stringify(found));
        }
      }
      else {
        handleSearchSubmit(searchPhrase);
      }
    }
  }, [handleSearchSubmit]);

  

  return (
    <main className="movies">
      <SearchForm
        onSearch={handleSearchSubmit}
        searchPhrase={searchPhrase}
        filterStateOn={filterStateOn}
        setFilterStateOn={setFilterStateOn}
        onFilter={handleClickFilterShorts}
        loadingError={loadingError}
        isLoading={isLoading}
      />
      <MoviesCardList
        movies={moviesForShowStart}
        isLoading={isLoading}
        // flagRender={props.flagRender}
        // setFlagRender={props.setFlagRender}
      />
      <div className="movies__more-container">
        {cardsCount < moviesForShow.length && (
          <button className="movies__more-button animation" type="button" onClick={openMoreCards}>
            Ещё
          </button>
        )}
      </div>
    </main>
  )
}

export default Movies;
