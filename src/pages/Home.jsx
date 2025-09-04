import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addLocalPost } from '../store/slices/postsSlice';
import { addNotification } from '../store/slices/uiSlice';
import { getLocalPosts, getExternalPosts, createLocalPost } from '../lib/api';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [externalStart, setExternalStart] = useState(0);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const queryClient = useQueryClient();

  // React Query для локальных постов
  const { data: localPosts = [], isLoading: localLoading } = useQuery({
    queryKey: ['localPosts'],
    queryFn: getLocalPosts,
  });

  // React Query для внешних постов
  const { data: externalPosts = [], isLoading: externalLoading } = useQuery({
    queryKey: ['externalPosts', externalStart],
    queryFn: () => getExternalPosts(externalStart, 4),
    keepPreviousData: true,
  });

  // Мутация для создания поста
  const createPostMutation = useMutation({
    mutationFn: createLocalPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['localPosts'], (oldData) => {
        return oldData ? [newPost, ...oldData] : [newPost];
      });
      dispatch(addNotification({
        type: 'success',
        title: 'Успешно!',
        message: 'Пост создан успешно'
      }));
      setIsModalOpen(false);
    },
    onError: (error) => {
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка!',
        message: error.message
      }));
    },
  });

  const handleCreatePost = (postData) => {
    createPostMutation.mutate(postData);
  };

  const loadMoreExternal = () => {
    setExternalStart(prev => prev + 4);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            TechBlog
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Современная платформа для обмена знаниями
          </p>
        </div>
        {isAuthenticated && (
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Создать пост</span>
          </motion.button>
        )}
      </motion.div>

      {/* Local Posts Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary-600 to-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Наши статьи
          </h2>
        </motion.div>

        {localLoading ? (
          <motion.div 
            className="flex justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </motion.div>
        ) : (
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {localPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                custom={index}
              >
                <PostCard post={post} isLocal={true} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {localPosts.length === 0 && !localLoading && (
          <motion.div 
            className="text-center py-12 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Пока нет статей. Будьте первым!</p>
          </motion.div>
        )}
      </motion.section>

      {/* External Posts Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 pt-8 border-t border-gray-200 dark:border-dark-700"
      >
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Интересные материалы
          </h2>
        </motion.div>

        {externalLoading ? (
          <motion.div 
            className="flex justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </motion.div>
        ) : (
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {externalPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                custom={index}
              >
                <PostCard post={post} isLocal={false} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          className="flex justify-center pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={loadMoreExternal}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={externalLoading}
          >
            {externalLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Загружаю...
              </>
            ) : (
              'Показать ещё'
            )}
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
        isLoading={createPostMutation.isLoading}
      />
    </div>
  );
};

export default Home;
