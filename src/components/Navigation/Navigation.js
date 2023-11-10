import './Navigation';
import React from 'react';
import { Link } from 'react-router-dom';
import iconPath from '../../images/account-icon.svg';

function Navigation(props) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  function handleOpenMenu () {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <>
      <div className="navigation">
        {props.loggedIn ?
          <>
            <div className="navigation__menu">
              <Link to="/movies" className={`navigation__link animation ${props.pathname === "/movies" ? "navigation__link_active" : ""}`}>Фильмы</Link>
              <Link to="/saved-movies" className={`navigation__link animation ${props.pathname === "/saved-movies" ? "navigation__link_active" : ""}`} >Сохранённые фильмы</Link>
              <div className="navigation__profile animation">
                <Link to="/profile" className={`navigation__link ${props.pathname === "/profile" ? "navigation__link_active" : ""}`}>
                  Аккаунт
                  <p className={props.pathname === "/" ? "navigation__icon-background navigation__icon-background_page_main" : "navigation__icon-background"}>
                    <img className="navigation__icon" src={iconPath} alt="иконка в виде человечка"></img>
                  </p>
                </Link>
              </div>
            </div>
            {isBurgerMenuOpen ?
              <>
                <div className="overlay" onClick={handleOpenMenu} />
                <div className="burger-menu">
                  <button className="burger-menu__close animation" type="button" onClick={handleOpenMenu} />
                  <div className="burger-menu__navigation">
                    <Link to="/" className={`burger-menu__link animation ${props.pathname === "/" ? "burger-menu__link_active" : ""}`} onClick={handleOpenMenu} >Главная</Link>
                    <Link to="/movies" className={`burger-menu__link animation ${props.pathname === "/movies" ? "burger-menu__link_active" : ""}`} onClick={handleOpenMenu} >Фильмы</Link>
                    <Link to="/saved-movies" className={`burger-menu__link animation ${props.pathname === "/saved-movies" ? "burger-menu__link_active" : ""}`} onClick={handleOpenMenu} >Сохранённые фильмы</Link>
                  </div>
                  <div className="burger-menu__profile animation">
                    <Link to="/profile" className="burger-menu__profile-link" onClick={handleOpenMenu}>
                      Аккаунт
                      <p className="navigation__icon-background">
                        <img className="navigation__icon" src={iconPath} alt="иконка в виде человечка"></img>
                      </p>
                    </Link>
                  </div>
                </div>
              </>
            :
              <button className="burger-menu-icon animation" type="button" onClick={handleOpenMenu}  />
            }
          </>
          :
          <div className="navigation__sign-menu">
            <Link to="/signup" className="navigation__sign-link animation">Регистрация</Link>
            <Link to="/signin" className="navigation__sign-link animation">
              <div className="navigation__button">Войти</div>
            </Link>
          </div>
        }
      </div>
    </>
  );
}

export default Navigation;
