import React from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import { MOVIES_API_URL } from '../../utils/constants';
import { deleteMovie, getSavedMovies, saveMovie } from '../../utils/MainApi';

function MoviesCard(props) {
  const [isSavedMovie, setSavedMovie] = React.useState(props.isSaved);

  const { pathname } = useLocation();
  const pageMovies = pathname === "/movies";
  const pageSavedMovies = pathname === "/saved-movies";

  const convertDuration = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  //сохранение/удаление карточки
  function handleChangeSave() {
    const token = localStorage.getItem('token');
    if (!isSavedMovie && pageMovies) { //если не сохранен, сохраняем
      saveMovie(props.movie, token)
        .then(() => {
          setSavedMovie(true);
        })
        .catch(err => console.log(err));
      props.setFlagRender(!props.flagRender);
    } else { //если сохранен, удаляем
      getSavedMovies(token)
        .then((result) => {
          result.forEach(element => {
            if (element.movieId === props.movie.id) {
              deleteMovie(element._id, token)
                .then(() => {
                  setSavedMovie(false);
                  props.setFlagRender(!props.flagRender);
                })
                .catch(err => console.log(err));
            }
            if (element.movieId === props.movie.movieId) {
              deleteMovie(element._id, token)
                .then(() => {
                  setSavedMovie(false);
                  props.setFlagRender(!props.flagRender);
                })
                .catch(err => console.log(err));
            }
          });
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <li className="movies-card">
      <a className="movies-card__link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <div className="movies-card__title">
          <h2 className="movies-card__name">{props.movie.nameRU}</h2>
          <p className="movies-card__duration">{convertDuration(props.movie.duration)}</p>
        </div>
        <img className="movies-card__image" src={pageMovies ? `${MOVIES_API_URL}${props.movie.image.url}` : `${props.movie.image}`} alt={`Превью фильма "${props.movie.nameRU}"`}></img>
      </a>
      {pageMovies && !isSavedMovie && (
        <button className="movies-card__button movies-card__button_type_save animation" type="button" onClick={handleChangeSave}>Сохранить</button> //сохранить
      )}
      {pageMovies && isSavedMovie && (
        <button className="movies-card__button movies-card__button_type_saved animation" type="button" onClick={handleChangeSave}></button> //удалить
      )}
      {pageSavedMovies && (
        <button className="movies-card__button movies-card__button_type_delete animation" type="button" onClick={handleChangeSave}></button> //удалить
      )}
    </li>
  )
}

export default MoviesCard;
