import './SearchForm.css';
import React from 'react';

function SearchForm() {
  const[isFilterShorts, setFilterShorts] = React.useState(true);

  const handleClickFilterShorts = () => {
    setFilterShorts(!isFilterShorts);
  };

  return(
    <div className="search">
      <form className="search__form" name="search-form" action="#">
        <input className="search__input" type="text" required placeholder="Фильм"></input>
        <button className="search__button animation">Поиск</button>
      </form>
      <button className={"search__thumb animation"} type="button" onClick={handleClickFilterShorts}>
        <div className={`search__relay ${isFilterShorts ? "search__relay_active" : "search__relay_disabled"}`}></div>
        Короткометражки
      </button>
      <div className="search__line"></div>
    </div>
  )
}

export default SearchForm;