import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound.js';

import moviesData from '../../utils/movies.js';

// const user = {
//   name: "Ильмира",
//   email: "ilmira@gmail.com",
//   password: "qwerty",
// };

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <Header loggedIn={loggedIn}/>
            <Main />
            <Footer />
          </>
        } />
        <Route path='/movies' element={
          <>
            <Header loggedIn={loggedIn}/>
            <Movies movies={moviesData} />
            <Footer />
          </>
        } />
        <Route path='/saved-movies' element={
          <>
            <Header loggedIn={loggedIn}/>
            <SavedMovies movies={moviesData} />
            <Footer />
          </>
        } />

        <Route path='/signup' element={ <Register /> } />
        <Route path='/signin' element={ <Login /> } />
        <Route path='/profile' element={
          <>
            <Header loggedIn={loggedIn}/>
            <Profile setLoggedIn={setLoggedIn}/>
          </>
        } />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
