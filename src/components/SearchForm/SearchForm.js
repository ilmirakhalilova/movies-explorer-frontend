import { useLocation } from 'react-router-dom';
import { SEARCH_FORM_ERROR, SEARCH_LOADING_ERROR } from '../../utils/constants';
import './SearchForm.css';
import  { useState } from 'react';

function SearchForm(props) {
  
  const [inputValue, setInputValue] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [filterStateOn, setFilterStateOn] = useState(JSON.parse(localStorage.getItem('filterState')) || false);
  const [filterStateOnPageSM, setFilterStateOnPageSM] = useState(false);
  localStorage.setItem('filterState', JSON.stringify(filterStateOn));
  localStorage.setItem('filterStatePageSM', JSON.stringify(filterStateOnPageSM));

  const { pathname } = useLocation();
  const pageMovies = pathname === "/movies";
  const pageSavedMovies = pathname === "/saved-movies";

  function handleSubmit(e) {
    e.preventDefault();
    if (pageMovies) {
    
      if (JSON.parse(localStorage.getItem('searchPhrase')) === null || JSON.parse(localStorage.getItem('searchPhrase')).length === 0) {
        setSearchError(true);
      } else {
        props.onSearch(inputValue);
        setSearchError(false);
      }
    } else {
      if (inputValue.length === 0) {
        setSearchError(true);
      } else {
        props.onSearch(inputValue, JSON.parse(localStorage.getItem('filterStatePageSM')));
        setSearchError(false);
      }
    }
  }

  function handleSearchInput(e) {
    setInputValue(e.target.value);
    if (pageMovies) {
      localStorage.setItem('searchPhrase', JSON.stringify(e.target.value));
    }
  }

  function handleFilterChange() {
    if (JSON.parse(localStorage.getItem('searchPhrase')) === null || JSON.parse(localStorage.getItem('searchPhrase')).length === 0) {
      setSearchError(true);
    } else {
      setFilterStateOn(!filterStateOn);
      localStorage.setItem('filterState', JSON.stringify(filterStateOn));
      props.onFilter();
      setSearchError(false);
    }
  }

  function handleFilterChangePageSM() {
    if (inputValue.length === 0) {
      setSearchError(true);
    } else {
      setFilterStateOnPageSM(!filterStateOnPageSM);
      localStorage.setItem('filterStatePageSM', JSON.stringify(!filterStateOnPageSM));
      props.onFilter(inputValue);
      setSearchError(false);
    }
  }

  return(
    <div className="search">
      <form className="search__form" name="search-form" onSubmit={handleSubmit} action="#" noValidate>
        <div className="search__input-container">
          {pageMovies && (
          <input className="search__input" value={JSON.parse(localStorage.getItem('searchPhrase')) || ''} onChange={handleSearchInput} type="text" required placeholder="Фильм" disabled={props.isLoading ? true : false}></input>
          )}
          {pageSavedMovies && (
          <input className="search__input" value={inputValue || ''} onChange={handleSearchInput} type="text" required placeholder="Фильм"></input>
          )}
          <button className="search__button animation" type="submit" disabled={props.isLoading ? true : false}>Поиск</button>
        </div>
        <span id="search-form-error" className="search__form-error">{searchError ? `${SEARCH_FORM_ERROR}` : ""}</span>
        <p className={"search__thumb"} >
          {pageMovies && (
            <button className={`search__relay animation ${JSON.parse(localStorage.getItem('filterState')) ? "search__relay_active" : "search__relay_disabled"}`} type="button" onClick={handleFilterChange} disabled={props.isLoading ? true : false}></button>
          )}
          {pageSavedMovies && (
            <button className={`search__relay animation ${filterStateOnPageSM ? "search__relay_active" : "search__relay_disabled"}`} type="button" onClick={handleFilterChangePageSM} ></button>
          )}
          Короткометражки
        </p>
      </form>
      <span className="search__loading-error">{props.loadingError ? `${SEARCH_LOADING_ERROR}` : ""}</span>
    </div>
  )
}

export default SearchForm;
