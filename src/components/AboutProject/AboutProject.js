import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title">О проекте</h2>
      <table className="about-project__table">
        <tbody>
          <tr className="about-project__table-row">
            <td className="about-project__table-column">
              <p className="about-project__table-title">
                Дипломный проект включал 5 этапов
              </p>
              <p className="about-project__table-text">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
              </p>
            </td>
            <td className="about-project__table-column">
              <p className="about-project__table-title">
                На выполнение диплома ушло 5 недель
              </p>
              <p className="about-project__table-text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="about-project__periods">
        <div className="about-project__backend">
          <p className="about-project__period about-project__period_color-text_black">1 неделя</p>
          <p className="about-project__period about-project__period_color-text_grey">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <p className="about-project__period about-project__period_color-text_white">4 недели</p>
          <p className="about-project__period about-project__period_color-text_grey">Front-end</p>
        </div>
        
      </div>
    </section>
  )
}

export default AboutProject;
