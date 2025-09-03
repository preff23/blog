import { useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/storage';
import { getLocalPosts, getExternalPosts, createLocalPost } from '../lib/api';
import PostCard from '../components/PostCard';
import '../styles/posts.css';

function Home() {
  const [localPosts, setLocalPosts] = useState([]);
  const [externalPosts, setExternalPosts] = useState([]);
  const [externalStart, setExternalStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadLocalPosts();
    loadExternalPosts();
  }, []);

  const loadLocalPosts = async () => {
    const posts = await getLocalPosts();
    setLocalPosts(posts);
  };

  const loadExternalPosts = async () => {
    const posts = await getExternalPosts(0, 4);
    setExternalPosts(posts);
    setExternalStart(4);
  };

  const loadMoreExternal = async () => {
    setLoading(true);
    const newPosts = await getExternalPosts(externalStart, 4);
    setExternalPosts(prev => [...prev, ...newPosts]);
    setExternalStart(prev => prev + 4);
    setLoading(false);
  };

  const handleAddPost = async () => {
    if (!currentUser) {
      alert('Войдите в аккаунт');
      return;
    }

    const title = prompt('Заголовок поста:');
    if (!title) return;

    const body = prompt('Текст поста:');
    if (!body) return;

    const newPost = await createLocalPost({ title, body });
    if (newPost) {
      await loadLocalPosts();
    }
  };

  return (
    <div className="content">
      <div className="posts-header">
        <h1 className="posts-title">TechBlog</h1>
        {currentUser && (
          <button onClick={handleAddPost} className="btn">
            Добавить пост
          </button>
        )}
      </div>

      <div>
        <h2>Наши статьи</h2>
        {localPosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            isLocal={true} 
            onUpdate={loadLocalPosts}
          />
        ))}
      </div>

      <div className="external-posts">
        <h2>Интересные материалы</h2>
        {externalPosts.map(post => (
          <PostCard key={post.id} post={post} isLocal={false} />
        ))}
        
        <div className="load-more">
          <button 
            onClick={loadMoreExternal} 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Показать ещё'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
