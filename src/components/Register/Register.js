import React from "react";
import './Register.css';
import { Link, Navigate } from "react-router-dom";
import { NAME_REGEXP, EMAIL_REGEXP } from "../../utils/constants";
import useValidation from '../../utils/useValidation';

function Register(props) {
  const { values, errors, isValid, handleChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values.name, values.email, values.password);
  }

  function handleInput(e) {
    handleChange(e);
    props.setRegistrationError('');
  }

  return (
    !props.loggedIn
      ? <main className="register">
        <Link to="/" className="logo">
          <div className="logo__icon animation"></div>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit} disabled={!isValid}>
          <div className="register__form-text">
            <label className="register__field-name">
              Имя
              <input id="name" name="name" className="register__input" type="text" minLength="2" maxLength="30" pattern={NAME_REGEXP} required value={values.name || ""} placeholder="Введите имя" onChange={handleInput}></input>
              <span id="name-error" className="register__error">{errors.name}</span>
            </label>
            <label className="register__field-name">
              E-mail
              <input id="email" name="email" className="register__input" type="email" pattern={EMAIL_REGEXP} required value={values.email || ""} placeholder="Введите email" onChange={handleInput}></input>
              <span id="email-error" className="register__error">{errors.email}</span>
            </label>
            <label className="register__field-name">
              Пароль
              <input id="password" name="password" className="register__input" type="password" placeholder="Введите пароль" minLength="8" maxLength="16" required value={values.password || ""} onChange={handleInput}></input>
              <span id="password-error" className="register__error">{errors.password}</span>
            </label>
          </div>
          <div className="register__buttons">
            <span id="register-form-error" className="register__form-error">{props.registrationError}</span>
            <button className={`register__button animation ${!isValid ? "register__button_type_disabled" : ''}`} disabled={!isValid} type="submit">Зарегистрироваться</button>
            <p className="register__text">
              Уже зарегистрированы?
              <Link to="/signin" className="register__link animation"> Войти</Link>
            </p>
          </div>
        </form>
      </main>
      : <Navigate to="/" replace />
  )
}

export default Register;
