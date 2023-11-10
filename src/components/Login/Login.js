import React from "react";
import './Login.css';
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <section className="login">
      <Link to="/" className="logo">
        <div className="logo__icon"></div>
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <div className="login__form-text">
          <p className="login__field-name">E-mail</p>
          <input id="email" className="login__input" type="email" placeholder="Введите email" required></input>  {/* value={email} */}
          <span id="email-error" className="login__error"></span>
          <p className="login__field-name">Пароль</p>
          <input id="password" className="login__input" type="password" placeholder="Введите пароль" required></input>  {/* value={password} */}
          {/* <span id="password-error" className="login__error">Что-то пошло не так...</span> */}
        </div>
        <div className="login__buttons">
        <button className="login__button animation" type="submit">Войти</button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link animation"> Регистрация</Link>
          </p>
        </div>
      </form>

      
    </section>
  )
}

export default Login;