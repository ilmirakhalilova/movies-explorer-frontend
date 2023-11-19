import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-element">
          <a href="https://github.com/ilmirakhalilova/how-to-learn" className="portfolio__link animation" target="_blank" rel="noreferrer">
            <p className="portfolio__project">Статичный сайт</p>
            <p className="portfolio__arrow">&#x2197;</p>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a href="https://github.com/ilmirakhalilova/russian-travel" className="portfolio__link animation" target="_blank" rel="noreferrer">
            <p className="portfolio__project" >Адаптивный сайт</p>
            <p className="portfolio__arrow">&#x2197;</p>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a href="https://github.com/ilmirakhalilova/mesto-react" className="portfolio__link animation" target="_blank" rel="noreferrer">
            <p className="portfolio__project" >Одностраничное приложение</p>
            <p className="portfolio__arrow">&#x2197;</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
