import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
<<<<<<< HEAD
import { backendLink } from '../../constants';
=======

const backendLink = 'https://rails-uaii.onrender.com/';
>>>>>>> 290b6f6b0e3014115ab48fa407f3bd17df2dee8a

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const token = localStorage.getItem('token');

    // Clear the token from local storage
    localStorage.removeItem('token');

    // Make the logout request to the backend
    await axios.delete(`${backendLink}logout`, {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    });
  },
);

const logoutSlice = createSlice({
  name: 'auth',
  initialState: {
    logoutToken: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(logoutUser.fulfilled, (state) => ({
        ...state,
        loading: false,
        logoutToken: null,
      }))
      .addCase(logoutUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default logoutSlice.reducer;
