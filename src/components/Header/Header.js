import './Header.css';
import { useLocation } from "react-router-dom";
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const { pathname } = useLocation();
  const mainPage =  pathname === "/";
  
  return (
    <header className={mainPage ? "header header_page_main" : "header"}>
      <div className="header__container">
        <Link className="header__logo animation" to='/' > 
          <img src={logoPath} alt="логотип в шапке"/>
        </Link>
        <div className="header__navigation">
          <Navigation
            loggedIn={loggedIn}
            pathname={pathname}
          />
        </div>
      </div>
    </header>
  )
}

export default Header;