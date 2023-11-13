import React from "react";
import './Register.css';
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <main className="register">
      <Link to="/" className="logo">
        <div className="logo__icon animation"></div>
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <div className="register__form-text">
          <label className="register__field-name">
            Имя
            <input id="name" className="register__input" type="text" minLength="2" maxLength="30" placeholder="Введите имя" required></input>
            {/* <span id="name-error" className="register__error"></span> */}
          </label>
          <label className="register__field-name">
            E-mail
            <input id="email" className="register__input" type="email" placeholder="Введите email" required></input> {/* value={email} */}
            {/* <span id="email-error" className="register__error">Неверный формат email</span> */}
          </label>
          <label className="register__field-name">
            Пароль
            <input id="password" className="register__input" type="password" placeholder="Введите пароль" minLength="8" maxLength="16" required></input> {/* value={password} */}
            {/* <span id="password-error" className="register__error">При регистрации пользователя произошла ошибка.</span> */}
          </label>
        </div>
        <div className="register__buttons">
          <button className="register__button animation" type="submit">Зарегистрироваться</button>
          <p className="register__text">
            Уже зарегистрированы?
            <Link to="/signin" className="register__link animation"> Войти</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Register;
