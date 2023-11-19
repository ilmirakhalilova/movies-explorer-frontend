import { MAIN_API_URL, MOVIES_API_URL } from "./constants";

//Проверка ответа от сервера
function checkResponse(res) {
  if (res.ok)
    return res.json();
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибкаааааа: ${res.status} : ${res.statusText}`);
}

export const register = (name, email, password) => { //POST
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
}

export const authorize = (email, password) => { //POST
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
}

export const getUserInfo = (token) => { //GET
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse)
  .then(data => data);
}

export const setUserInfo = (data) => { //PATCH
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  })
}

// export const checkToken = (token) => {
//   return fetch(`${MAIN_API_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : `Bearer ${token}`
//     },
//   })
//   .then(checkResponse);
// }

export const getSavedMovies = (token) => { //GET
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResponse(res));
};

export const saveMovie = (movie, token) => { //POST
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${MOVIES_API_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
  })
  .then(checkResponse);
}

export const deleteMovie = (movieId, token) => { //DELETE
  return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `Bearer ${token}`
    }
  })
  //.then(checkResponse);
}
