import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="content">
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Извините, запрашиваемая страница не существует.</p>
        <Link to="/" className="btn">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
