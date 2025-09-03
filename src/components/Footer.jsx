import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">TechBlog</h3>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Навигация</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Главная</Link>
              <Link to="/reviews" className="footer-link">Отзывы</Link>
              <Link to="/team" className="footer-link">Команда</Link>
              <Link to="/auth" className="footer-link">Войти</Link>
            </nav>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Контакты</h4>
            <div className="footer-contacts">
              <p>Email: info@techblog.ru</p>
              <p>Телефон: +7 (999) 123-45-67</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TechBlog</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
