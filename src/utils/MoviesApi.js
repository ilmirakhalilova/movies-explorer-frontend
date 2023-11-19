import { MOVIES_API_URL, HEADERS } from "./constants";

function checkResponse(res) {
  if (res.ok)
    return res.json();
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status} : ${res.statusText}`);
}

export function getMovies() { //GET
  return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
    headers: HEADERS
  })
  .then(res => checkResponse(res));
}
