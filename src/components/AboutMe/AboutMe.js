import './AboutMe.css';
import avatar  from '../../images/avatar.png';

function AboutMe() {
  return (
    <div className="aboutme">
      <h2 className="aboutme__title aboutme__text">Студент</h2>
      <div className="aboutme__line" />
      <div className="aboutme__container">
        <div className="aboutme__text">
          <h3 className="aboutme__subtitle">Виталий</h3>
          <p className="aboutme__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="aboutme__github animation" href="https://github.com/ilmirakhalilova" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img src={avatar} alt="Фото студента" className="aboutme__avatar" />
      </div>
    </div>
  )
}

export default AboutMe;
