import './PageNotFound.css';
import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <h2 className="page-not-found__subtitle">Страница не найдена</h2>
      <button className="page-not-found__link animation" type="button" onClick={() => navigate(-1)}>Назад</button>
    </main>
  )
}

export default PageNotFound;
