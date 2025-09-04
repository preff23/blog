import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findUser, registerUser } from '../../lib/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    const user = await findUser(username, password);
    if (!user) {
      throw new Error('Неверные данные для входа');
    }
    return user;
  }
);

export const registerNewUser = createAsyncThunk(
  'auth/registerNewUser',
  async (userData) => {
    const user = await registerUser(userData);
    if (!user) {
      throw new Error('Ошибка регистрации');
    }
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
