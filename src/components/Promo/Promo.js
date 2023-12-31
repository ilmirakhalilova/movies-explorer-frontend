import './Promo.css';
import logoPath from '../../images/promo-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__main">
        <div className="promo__info">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="#project" className="promo__more animation">Узнать больше</a>
        </div>
        <img className="promo__image" src={logoPath} alt="логотип в виде земного шара" />
      </div>
    </section>
  )
}

export default Promo;