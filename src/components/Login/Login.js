import React from "react";
import './Login.css';
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <main className="login">
      <Link to="/" className="logo">
        <div className="logo__icon animation"></div>
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <div className="login__form-text">
          <label className="login__field-name">
            E-mail
            <input id="email" className="login__input" type="email" placeholder="Введите email" required></input>  {/* value={email} */}
            {/* <span id="email-error" className="login__error"></span> */}
          </label>
          <label className="login__field-name">
            Пароль
            <input id="password" className="login__input" type="password" placeholder="Введите пароль" minLength="8" maxLength="16" required></input>  {/* value={password} */}
            {/* <span id="password-error" className="login__error">Что-то пошло не так...</span> */}
          </label>
        </div>
        <div className="login__buttons">
        <button className="login__button animation" type="submit">Войти</button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link animation"> Регистрация</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Login;