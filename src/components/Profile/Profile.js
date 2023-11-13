import React from "react";
import './Profile.css';
import { Link, useNavigate } from "react-router-dom";

function Profile({ setLoggedIn }) {
  const [name, setName] = React.useState('Ильмира')
  const [email, setEmail] = React.useState('ilmira@gmail.com')
  const [isEditProfile, setEditProfile] = React.useState(false);

  const navigate = useNavigate();
  
  const handleClickEditProfile = () => {
    setEditProfile(true);
  };

  const handleClickSaveProfile = () => {
    setEditProfile(false);
  };

  function handleName(e) {
    setName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function logOut() {
    setLoggedIn(false)
    navigate('/');
  }

  return(
    <main className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        {!isEditProfile && (
          <>
            <div>
              <label className="profile__field-name">
                Имя
                <input id="name" className="profile__input" value={name} type="text" name="name" minLength="2" maxLength="30" placeholder="Введите имя" onChange={handleName} readOnly required/>
              </label>
              <label className="profile__field-name">
                E-mail
                <input id="email" className="profile__input" value={email} type="email" name="email" placeholder="Укажите e-mail" onChange={handleEmail} readOnly required/>
              </label>
            </div>
            <div className="profile__buttons">
              <button className="profile__button profile__button_type_edit animation" type="button" onClick={handleClickEditProfile}>Редактировать</button>
              <Link to="/" className="profile__button profile__button_type_logout animation" onClick={logOut}>
                Выйти из аккаунта
              </Link>
            </div>
          </>
        )}
        {isEditProfile && (
          <>
            <div>
              <label className="profile__field-name">
                Имя
                <input id="name" className="profile__input profile__input_type_active" value={name} type="text" name="name" minLength="2" maxLength="30" placeholder="Введите имя" onChange={handleName} required/>
              </label>
              <label className="profile__field-name">
                E-mail
                <input id="email" className="profile__input profile__input_type_active" value={email} type="email" name="email" placeholder="Укажите e-mail" onChange={handleEmail} required/>
              </label>
            </div>
            <div className="profile__buttons">
              {/* <span className="profile__error">При обновлении профиля произошла ошибка.</span> */}
              <button className="profile__button profile__button_type_save animation" type="submit" onClick={handleClickSaveProfile}>Сохранить</button>
            </div>
          </>
        )}
          
        {/* <button className="profile__button profile__button_type_save profile__button-disable" type="button">Сохранить</button> */}
      </form>
    </main>
  )
}

export default Profile;