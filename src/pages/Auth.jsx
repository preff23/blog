import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../lib/storage';
import { findUser, isUsernameTaken, registerUser } from '../lib/api';
import '../styles/auth.css';

function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 'register') {
      if (formData.username.length < 8) {
        newErrors.username = 'Имя пользователя должно содержать минимум 8 символов';
      }
      
      if (formData.password.length < 8) {
        newErrors.password = 'Пароль должен содержать минимум 8 символов';
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (activeTab === 'register') {
      const taken = await isUsernameTaken(formData.username);
      if (taken) {
        setErrors({ username: 'Это имя пользователя уже занято' });
        return;
      }

      const newUser = await registerUser(formData);
      if (newUser) {
        alert('Регистрация успешна! Теперь войдите в аккаунт.');
        setActiveTab('login');
        setFormData({ username: '', email: '', password: '' });
        setErrors({});
      }
    } else {
      const user = await findUser(formData.username, formData.password);
      if (user) {
        setCurrentUser({ id: user.id, username: user.username });
        alert('Вход выполнен успешно!');
        navigate('/');
      } else {
        setErrors({ general: 'Неверные данные для входа' });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="content">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Имя пользователя</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          {activeTab === 'register' && (
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {errors.general && <p className="error">{errors.general}</p>}

          <button type="submit" className="btn form-submit">
            {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
