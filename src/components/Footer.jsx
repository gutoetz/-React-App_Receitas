import React from 'react';
import { Link } from 'react-router-dom';
import drinkImage from '../images/drinkIcon.svg';
import mealImage from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-page">
      <Link to="/drinks">
        <img
          src={ drinkImage }
          alt="Imagem de drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/meals">
        <img
          src={ mealImage }
          alt="Imagem de comidas"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
