import { useContext, useEffect, useState } from "react";
import './Profile.css';
import { Link, useNavigate } from "react-router-dom";
import useValidation from "../../utils/useValidation";
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import { EMAIL_REGEXP, NAME_REGEXP, PROFILE_FORM_ERROR, SUCCESSFUL_UPDATE } from "../../utils/constants.js";
import { setUserInfo } from "../../utils/MainApi.js";

function Profile(props) {
  const { values, errors, isValid, handleChange } = useValidation();
  const [isEditProfile, setEditProfile] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [updateUserError, setUpdateUserError] = useState('');
  const [saveError, setSaveError] = useState(false);
  const [successfullUpdate, setSuccessfullUpdate] = useState('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  //Кнопка активируется, когда данные отличны от исходных
  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [currentUser, values.name, values.email]);

  const handleClickEditProfile = () => {
    values.name = currentUser.name;
    values.email = currentUser.email;
    setSuccessfullUpdate('');
    setEditProfile(true);
  };

  function handleEmail(e) {
    handleChange(e);
    setActiveButton(true);
    setSaveError(false);
  }

  //Обновление профиля
  function handleUpdateUser(e) {
    e.preventDefault();
    setUserInfo({name: values.name, email: values.email})
      .then((result) => {
        if (result.status === 400) {
          setUpdateUserError('Переданы некорректные данные при создании пользователя.');
        } else if (result.status === 409) {
          setUpdateUserError('Пользователь с таким email уже зарегистрирован.');
        }
        else if (result.status === 200) {
          props.setCurrentUser(result);
          setSaveError(false);
          setEditProfile(false);
          setUpdateUserError('');
          setSuccessfullUpdate(SUCCESSFUL_UPDATE);
        }
      })
      .catch((err) => {
        setUpdateUserError(PROFILE_FORM_ERROR);
        setSaveError(true);
        console.log(err);
      })
  }

  // useEffect(() => {
  //   if (successfullUpdate) {
  //     values.name = currentUser.name;
  //     values.email = currentUser.email
  //   }
  // }, [successfullUpdate])

    // Выход
    function onSignOut() {
      props.setCurrentUser({ name:'', email:'' });
      localStorage.clear();
      props.setLoggedIn(false);
      navigate("/");
    }

  return(
    <main className="profile">
      <h1 className="profile__title">Привет, {currentUser.name || values.name}!</h1>
      <form className="profile__form" onSubmit={handleUpdateUser} >
        {!isEditProfile && !saveError && (
          <>
            <div>
              <label className="profile__field-name">
                Имя
                <input id="name" className="profile__input" value={currentUser.name || values.name} type="text" name="name" minLength="2" maxLength="30" placeholder="Введите имя" readOnly required/>
              </label>
              <label className="profile__field-name">
                E-mail
                <input id="email" className="profile__input" value={currentUser.email || values.email} type="email" name="email" placeholder="Укажите e-mail" readOnly required/>
              </label>
            </div>
            <div className="profile__buttons">
              <span id="profile-successfull-update" className="profile-successfull-update">{successfullUpdate}</span>
              <button className="profile__button profile__button_type_edit animation" type="button" onClick={handleClickEditProfile}>Редактировать</button>
              <Link to="/" className="profile__button profile__button_type_logout animation" onClick={onSignOut}>
                Выйти из аккаунта
              </Link>
            </div>
          </>
        )}
        {(isEditProfile || saveError) && (
          <>
            <div>
              <label className="profile__field-name">
                Имя
                <input id="name" className="profile__input profile__input_type_active" value={values.name || ""} type="text" name="name" minLength="2" maxLength="30" pattern={NAME_REGEXP} placeholder="Введите имя" onChange={handleChange} required/>
              </label>
              <span id="name-error" className="profile__error">{errors.name}</span>
              <label className="profile__field-name">
                E-mail
                <input id="email" className="profile__input profile__input_type_active" value={values.email || ""}  type="email" name="email" pattern={EMAIL_REGEXP} placeholder="Укажите e-mail" onChange={handleEmail} required/>
              </label>
              <span id="email-error" className="profile__error">{errors.email}</span>
            </div>
            <div className="profile__buttons">
              <span id="profile-form-error" className="profile__form-error">{updateUserError}</span>
              <button className={`profile__button profile__button_type_save animation" ${!isValid || !activeButton || saveError ? "profile__button_type_disabled" : ''}`} disabled={!isValid || !activeButton} type="submit" >Сохранить</button>
            </div>
          </>
        )}
      </form>
    </main>
  )
}

export default Profile;
