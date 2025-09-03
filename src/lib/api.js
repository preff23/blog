const API_BASE = 'http://localhost:3001';
const EXTERNAL_API = 'https://jsonplaceholder.typicode.com';

export const getLocalPosts = async () => {
  try {
    const response = await fetch(`${API_BASE}/posts`);
    if (!response.ok) throw new Error('Ошибка загрузки постов');
    return await response.json();
  } catch (error) {
    alert('Ошибка загрузки постов: ' + error.message);
    return [];
  }
};

export const createLocalPost = async (post) => {
  try {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (!response.ok) throw new Error('Ошибка создания поста');
    return await response.json();
  } catch (error) {
    alert('Ошибка создания поста: ' + error.message);
    return null;
  }
};

export const updateLocalPost = async (id, post) => {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (!response.ok) throw new Error('Ошибка обновления поста');
    return await response.json();
  } catch (error) {
    alert('Ошибка обновления поста: ' + error.message);
    return null;
  }
};

export const deleteLocalPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Ошибка удаления поста');
    return true;
  } catch (error) {
    alert('Ошибка удаления поста: ' + error.message);
    return false;
  }
};

export const getExternalPosts = async (start = 0, limit = 4) => {
  try {
    const response = await fetch(`${EXTERNAL_API}/posts?_start=${start}&_limit=${limit}`);
    if (!response.ok) throw new Error('Ошибка загрузки внешних постов');
    return await response.json();
  } catch (error) {
    alert('Ошибка загрузки внешних постов: ' + error.message);
    return [];
  }
};

export const findUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE}/users?username=${username}&password=${password}`);
    if (!response.ok) throw new Error('Ошибка поиска пользователя');
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    alert('Ошибка поиска пользователя: ' + error.message);
    return null;
  }
};

export const isUsernameTaken = async (username) => {
  try {
    const response = await fetch(`${API_BASE}/users?username=${username}`);
    if (!response.ok) throw new Error('Ошибка проверки имени пользователя');
    const users = await response.json();
    return users.length > 0;
  } catch (error) {
    alert('Ошибка проверки имени пользователя: ' + error.message);
    return true;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Ошибка регистрации');
    return await response.json();
  } catch (error) {
    alert('Ошибка регистрации: ' + error.message);
    return null;
  }
};
