import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';

import moviesData from '../../utils/movies.js';
import { register, authorize, getUserInfo, getSavedMovies } from '../../utils/MainApi.js'
import { LOGIN_FORM_ERROR, REGISTER_FORM_ERROR } from '../../utils/constants.js';


function App() {  
  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  const [loggedIn, setLoggedIn] = useState(loggedInFromStorage);
  const [flagRender, setFlagRender] = useState(true); //прокинуть пропсами
  const [currentUser, setCurrentUser] = useState({ name:'', email: "" });
  const [savedMovies, setSavedMovies] = useState([]);
  
  //errors
  const [registrationError, setRegistrationError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();


  //регистрация
  function handleRegister(name, email, password) {
    register(name, email, password)
      .then ((result) => {
        if (result.status === 400) {
          setRegistrationError('Переданы некорректные данные при создании пользователя.');
          return result;
        } else if (result.status === 409) {
          setRegistrationError('Пользователь с таким email уже зарегистрирован.');
          return result;
        } else if (result.status === 201) {
          return result.json();
        }
      })
      .then((res) => {
        if (res.email) {
          handleLogin(email, password);
          setRegistrationError('');
          navigate('/movies', {replace: true});
        }
      })
      .catch((err) => {
        setRegistrationError(REGISTER_FORM_ERROR);
        console.log(err);
      })
  }

  //авторизация
  function handleLogin(email, password) {
    authorize(email, password)
      .then((result) => {
        if (result.status === 401) {
          setLoginError('Неправильные почта или пароль.');
          return result;
        } else if (result.status === 400) {
          setLoginError('Переданы некорректные данные при авторизации пользователя.');
          return result;
        } else if (result.status === 200) {
          return result.json();
        }
      })
      .then ((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          localStorage.setItem('loggedIn', JSON.stringify(true));
          setLoginError('');
          navigate('/movies', {replace: true});
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setLoginError(LOGIN_FORM_ERROR);
        console.log(err);
      })
  }

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token');
      //Загрузка данных профиля и сохраненных фильмов
      Promise.all([getUserInfo(token), getSavedMovies(token)])
        .then (([infoUser, savedMovies]) => {
          setCurrentUser(infoUser);
          setSavedMovies(savedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[loggedIn, flagRender]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <>
              <Header loggedIn={loggedIn}/>
              <Main />
              <Footer />
            </>
          } />
          <Route path='/signup' element={
            <Register
              loggedIn={loggedIn}
              onRegister={handleRegister}
              registrationError={registrationError}
              setRegistrationError={setRegistrationError}
            />} />

          <Route path='/signin' element={
            <Login
              loggedIn={loggedIn}
              onLogin={handleLogin}
              loginError={loginError}
              setLoginError={setLoginError}
            />} />
          <Route path='*' element={ <PageNotFound /> } />




          <Route path='/movies' element={
            <ProtectedRouteElement loggedIn={loggedIn} elements={
              <>
                <Header loggedIn={loggedIn}/>
                <Movies 
                  flagRender={flagRender}
                  setFlagRender={setFlagRender}
                />
                <Footer />
              </>
            } />
          } />

          <Route path='/saved-movies' element={
            <ProtectedRouteElement loggedIn={loggedIn} elements={
              <>
                <Header loggedIn={loggedIn}/>
                <SavedMovies 
                  savedMovies={savedMovies} 
                  setSavedMovies={setSavedMovies}
                  flagRender={flagRender}
                  setFlagRender={setFlagRender}
                />
                <Footer />
              </>
            } />
          } />

          <Route path='/profile' element={
            <ProtectedRouteElement loggedIn={loggedIn} elements={
              <>
                <Header loggedIn={loggedIn}/>
                <Profile
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              </>
            } />
          } />

          
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
