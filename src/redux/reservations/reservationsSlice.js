import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
<<<<<<< HEAD
import { backendLink } from '../../constants';
=======

const backendLink = 'https://rails-uaii.onrender.com/';
>>>>>>> 290b6f6b0e3014115ab48fa407f3bd17df2dee8a

const initialState = {
  reservationsList: [],
  isLoading: false,
  reserveError: null,
  houseReservationsList: [],
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations',
  async () => {
    const token = localStorage.getItem('token');
    const response = await axios(`${backendLink}reservations`, {
      headers: {
        Accept: 'application/json',
        authorization: token, // Include the token in the Authorization header
      },
    });
    return response.data;
  });

export const fetchHouseReservations = createAsyncThunk('reservations/fetchHouseReservations',
  async (houseId) => {
    const token = localStorage.getItem('token');
    const response = await axios(`${backendLink}house/${houseId}/reservations`, {
      headers: {
        Accept: 'application/json',
        authorization: token, // Include the token in the Authorization header
      },
    });
    return response.data;
  });

export const deleteReservation = createAsyncThunk(
  'reservations/deleteReservation',
  async (reservationId) => {
    const token = localStorage.getItem('token');

    await axios.delete(`${backendLink}reservations/${reservationId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    });
    return reservationId;
  },
);

export const reserve = createAsyncThunk(
  'reservations/reserve',
  async (credentials, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${backendLink}reservations`,
        {
          reservation: {
            house_id: credentials.houseId,
            check_in: credentials.checkIn,
            check_out: credentials.checkOut,
          },
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle error with response from Rails
        return rejectWithValue(error.response.data.base);
      }

      // Handle other errors
      return rejectWithValue(error.message);
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        status: 'loading',
        reserveError: null,
      }))
      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservationsList: action.payload,
        status: 'succeeded',
        reserveError: null,
      }))
      .addCase(fetchHouseReservations.fulfilled, (state, action) => ({
        ...state,
        houseReservationsList: action.payload,
        reserveError: null,
      }))
      .addCase(fetchReservations.rejected, (state) => ({
        ...state,
        status: 'error',
        reserveError: null,
      }))
      .addCase(reserve.rejected, (state, action) => ({
        ...state,
        reserveError: action.payload,
      }))
      .addCase(reserve.fulfilled, (state) => ({
        ...state,
        reserveError: 'Your reservation has been done go check my reservations page!',
      }));
  },
});

export default reservationsSlice.reducer;
