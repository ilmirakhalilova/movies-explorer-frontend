import React from "react";
import './Login.css';
import { Link, Navigate } from "react-router-dom";
import useValidation from "../../utils/useValidation";
import { EMAIL_REGEXP } from "../../utils/constants";


function Login(props) {
  const { values, errors, isValid, handleChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }

  function handleInput(e) {
    handleChange(e);
    props.setLoginError('');
  }

  return (
    !props.loggedIn
      ? <main className="login">
        <Link to="/" className="logo">
          <div className="logo__icon animation"></div>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit} disabled={!isValid}>
          <div className="login__form-text">
            <label className="login__field-name">
              E-mail
              <input id="email" name="email" className="login__input" type="email" pattern={EMAIL_REGEXP} required value={values.email || ""} placeholder="Введите email" onChange={handleInput}></input>
              <span id="email-error" className="login__error">{errors.email}</span>
            </label>
            <label className="login__field-name">
              Пароль
              <input id="password" name="password" className="login__input" type="password" placeholder="Введите пароль" minLength="8" maxLength="16" required value={values.password || ""} onChange={handleInput}></input>
              <span id="password-error" className="login__error">{errors.password}</span>
            </label>
          </div>
          <div className="login__buttons">
            <span id="login-form-error" className="login__form-error">{props.loginError}</span>
            <button className={`login__button animation ${!isValid ? "login__button_type_disabled" : "" }`} type="submit">Войти</button>
              <p className="login__text">
                Ещё не зарегистрированы?
                <Link to="/signup" className="login__link animation"> Регистрация</Link>
            </p>
          </div>
        </form>
      </main>
      : <Navigate to="/" replace />
  )
}

export default Login;
