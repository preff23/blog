import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalPosts, createLocalPost, updateLocalPost, deleteLocalPost } from '../../lib/api';

export const fetchLocalPosts = createAsyncThunk(
  'posts/fetchLocalPosts',
  async () => {
    const posts = await getLocalPosts();
    return posts;
  }
);

export const addLocalPost = createAsyncThunk(
  'posts/addLocalPost',
  async (postData) => {
    const newPost = await createLocalPost(postData);
    return newPost;
  }
);

export const editLocalPost = createAsyncThunk(
  'posts/editLocalPost',
  async ({ id, postData }) => {
    const updatedPost = await updateLocalPost(id, postData);
    return updatedPost;
  }
);

export const removeLocalPost = createAsyncThunk(
  'posts/removeLocalPost',
  async (id) => {
    await deleteLocalPost(id);
    return id;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    localPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPostsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocalPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.localPosts = action.payload;
      })
      .addCase(fetchLocalPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addLocalPost.fulfilled, (state, action) => {
        state.localPosts.unshift(action.payload);
      })
      .addCase(editLocalPost.fulfilled, (state, action) => {
        const index = state.localPosts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.localPosts[index] = action.payload;
        }
      })
      .addCase(removeLocalPost.fulfilled, (state, action) => {
        state.localPosts = state.localPosts.filter(post => post.id !== action.payload);
      });
  },
});

export const { clearPostsError } = postsSlice.actions;
export default postsSlice.reducer;
