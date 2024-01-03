import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
<<<<<<< HEAD
import { backendLink } from '../../constants';
=======

const backendLink = 'https://rails-uaii.onrender.com/';
>>>>>>> 290b6f6b0e3014115ab48fa407f3bd17df2dee8a

const initialState = {
  house: null,
  isLoading: false,
};

export const deleteHouse = createAsyncThunk(
  'houses/deleteHouse',
  async (houseId) => {
    const token = localStorage.getItem('token');

    await axios.delete(`${backendLink}houses/${houseId}`, {
      headers: {
        Authorization: token,
      },
    });
    return houseId;
  },
);

const deleteHouseSlice = createSlice({
  name: 'deleteHouse',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteHouse.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteHouse.fulfilled, (state, action) => ({
        ...state,
        house: action.payload,
        isLoading: false,
      }))
      .addCase(deleteHouse.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default deleteHouseSlice.reducer;
