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
        <div className="search__input-container">
          <input className="search__input" type="text" required placeholder="Фильм"></input>
          <button className="search__button" type="submit" animation>Поиск</button>
        </div>
        <p className={"search__thumb animation"} >
          <button className={`search__relay animation ${isFilterShorts ? "search__relay_active" : "search__relay_disabled"}`} type="button" onClick={handleClickFilterShorts}></button>
          Короткометражки
        </p>
      </form>
    </div>
  )
}

export default SearchForm;