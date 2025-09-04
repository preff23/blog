import { motion } from 'framer-motion';
import { Edit, Trash2, User, Calendar, Eye } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addNotification } from '../store/slices/uiSlice';
import { updateLocalPost, deleteLocalPost } from '../lib/api';
import EditPostModal from './EditPostModal';
import { useState } from 'react';

const PostCard = ({ post, isLocal = false }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn: ({ id, postData }) => updateLocalPost(id, postData),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['localPosts'], (oldData) => {
        return oldData?.map(p => p.id === updatedPost.id ? updatedPost : p) || oldData;
      });
      dispatch(addNotification({
        type: 'success',
        title: 'Успешно!',
        message: 'Пост обновлен'
      }));
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка!',
        message: error.message
      }));
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deleteLocalPost,
    onSuccess: () => {
      queryClient.setQueryData(['localPosts'], (oldData) => {
        return oldData?.filter(p => p.id !== post.id) || oldData;
      });
      dispatch(addNotification({
        type: 'success',
        title: 'Успешно!',
        message: 'Пост удален'
      }));
    },
    onError: (error) => {
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка!',
        message: error.message
      }));
    },
  });

  const handleEdit = (postData) => {
    updatePostMutation.mutate({ id: post.id, postData });
  };

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить этот пост?')) {
      deletePostMutation.mutate(post.id);
    }
  };

  const truncatedBody = (post.body || post.content || '').length > 150 
    ? (post.body || post.content || '').substring(0, 150) + '...' 
    : (post.body || post.content || '');

  return (
    <>
      <motion.div 
        className="card p-6 group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>ID: {post.id}</span>
              </div>
            </div>
          </div>
          
          {isLocal && (
            <div className="flex items-center space-x-1">
              <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                наш пост
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {truncatedBody}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-dark-700">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Eye className="w-3 h-3" />
            <span>Просмотров: {Math.floor(Math.random() * 100) + 10}</span>
          </div>

          {isLocal && isAuthenticated && (
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={updatePostMutation.isLoading}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={deletePostMutation.isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Edit Modal */}
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        post={post}
        isLoading={updatePostMutation.isLoading}
      />
    </>
  );
};

export default PostCard;
