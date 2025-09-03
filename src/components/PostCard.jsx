import { getCurrentUser } from '../lib/storage';
import { updateLocalPost, deleteLocalPost } from '../lib/api';

function PostCard({ post, isLocal = false, onUpdate }) {
  const currentUser = getCurrentUser();

  const handleEdit = async () => {
    if (!currentUser) {
      alert('Войдите в аккаунт');
      return;
    }

    const newTitle = prompt('Новый заголовок:', post.title);
    if (!newTitle) return;

    const newBody = prompt('Новый текст:', post.body || post.content || '');
    if (!newBody) return;

    const updated = await updateLocalPost(post.id, { title: newTitle, body: newBody });
    if (updated && onUpdate) {
      onUpdate();
    }
  };

  const handleDelete = async () => {
    if (!currentUser) {
      alert('Войдите в аккаунт');
      return;
    }

    if (!confirm('Удалить этот пост?')) return;

    const deleted = await deleteLocalPost(post.id);
    if (deleted && onUpdate) {
      onUpdate();
    }
  };

  const truncatedBody = (post.body || post.content || '').length > 180 
    ? (post.body || post.content || '').substring(0, 180) + '...' 
    : (post.body || post.content || '');

  return (
    <div className="card post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{truncatedBody}</p>
      
      <div className="post-meta">
        <span>ID: {post.id}</span>
        {isLocal && <span className="local-badge">(авторский)</span>}
      </div>

      {isLocal && currentUser && (
        <div className="post-actions">
          <button onClick={handleEdit} className="btn btn-secondary">
            Редактировать
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
