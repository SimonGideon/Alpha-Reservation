import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendLink } from '../../constants';

const initialState = {
  usersList: [],
  isLoading: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers',
  async () => {
    const response = await axios(`${backendLink}users`);
    return response.data;
  });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        usersList: action.payload,
        isLoading: false,
      }))
      .addCase(fetchUsers.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default usersSlice.reducer;
