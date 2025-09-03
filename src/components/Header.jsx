import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../lib/storage';
import ThemeToggle from './ThemeToggle';
import '../styles/header.css';

function Header() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            TechBlog
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/reviews" className="nav-link">Отзывы</Link>
            <Link to="/team" className="nav-link">Команда</Link>
            
            <div className="user-info">
              {currentUser ? (
                <>
                  <div className="user-profile">
                    <span className="user-avatar">{currentUser.username.charAt(0).toUpperCase()}</span>
                    <span className="user-name">{currentUser.username}</span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-secondary logout-btn">
                    Выйти
                  </button>
                </>
              ) : (
                <Link to="/auth" className="nav-link">Войти</Link>
              )}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
