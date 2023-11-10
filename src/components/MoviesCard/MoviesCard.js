import React from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const pageMovies = pathname === "/movies";
  const pageSavedMovies = pathname === "/saved-movies";

  const [isSavedMovie, setSavedMovie] = React.useState(false);

  const handleClickSaveMovie = () => {
    setSavedMovie(!isSavedMovie);
  };

  return (
    <li className="movies-card">
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <div className="movies-card__title">
          <p className="movies-card__name">{movie.name}</p>
          <p className="movies-card__duration">{movie.duration}</p>
        </div>
        <img className="movies-card__image" src={movie.link} alt={`Превью фильма "${movie.name}"`}></img>
      </a>
      {pageMovies && !isSavedMovie && (
        <button className="movies-card__button movies-card__button_type_save" type="button" onClick={handleClickSaveMovie}>Сохранить</button>
      )}
      {pageMovies && isSavedMovie && (
        <button className="movies-card__button movies-card__button_type_saved" type="button"></button>
      )}
      {pageSavedMovies && (
        <button className="movies-card__button movies-card__button_type_delete" type="button" onClick={handleClickSaveMovie}></button>
      )}
    </li>
  )
}

export default MoviesCard;
