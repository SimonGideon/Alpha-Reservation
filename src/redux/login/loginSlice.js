import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendLink } from '../../constants';
// Define the async thunk for logging in
export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(`${backendLink}login`, { user: { email: credentials.email, password: credentials.password } });
    return response.headers.authorization;
  } catch (error) {
    throw new Error('Login failed');
  }
});

// Create the login slice
const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    loginToken: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(login.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        loginToken: action.payload,
      }))
      .addCase(login.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

// Export the async thunk and the slice reducer
export default loginSlice.reducer;
