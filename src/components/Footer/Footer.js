import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__title footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__line" />
      <div className="footer__container footer__text">
        <p className="footer__year">© 2020</p>
        <ul className="footer__navigation">
          <li className="footer__links animation">
            <a className="footer__yprakticum" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__links animation">
            <a className="footer__github" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;