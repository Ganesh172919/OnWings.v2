import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockFlightApi } from "../../data/mockFlights";

export const completeBooking = createAsyncThunk(
  "booking/completeBooking",
  async (bookingDetails) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const bookingId = `OW${Math.floor(Math.random() * 90000) + 10000}`;
    return { ...bookingDetails, bookingId };
  }
);

export const fetchFlightById = (flightId) => (dispatch) => {
  dispatch(bookingSlice.actions.setBookingStatus("loading"));
  mockFlightApi({}).then((allFlights) => {
    const flight = allFlights.find((f) => f.id === flightId);
    if (flight) {
      dispatch(bookingSlice.actions.setFlight(flight));
    } else {
      dispatch(bookingSlice.actions.setBookingStatus("failed"));
    }
  });
};

const initialState = {
  flight: null,
  passengers: [{ id: 1, firstName: "", lastName: "", age: "", gender: "", category: "Adult" }],
  selectedSeats: [],
  status: "idle",
  lastBooking: null,
  extraBaggage: null, 
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFlight: (state, action) => {
      state.flight = action.payload;
      state.status = "succeeded";
    },

    removePassenger: (state, action) => {
      const idToRemove = action.payload;
      if (state.passengers.length > 1) {
        state.passengers = state.passengers.filter((p) => p.id !== idToRemove);
      }
    },

    setBookingStatus: (state, action) => {
      state.status = action.payload;
    },
    addPassenger: (state) => {
      const newId = state.passengers.length > 0 ? Math.max(...state.passengers.map(p => p.id)) + 1 : 1;
      state.passengers.push({
        id: newId,
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        category: "Adult",
      });
    },
    updatePassenger: (state, action) => {
      const { id, field, value } = action.payload;
      const passenger = state.passengers.find((p) => p.id === id);
      if (passenger) {
        passenger[field] = value;
      }
    },

    toggleSeat: (state, action) => {
      const seatId = action.payload;
      const isSelected = state.selectedSeats.includes(seatId);

      if (isSelected) {
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seatId);
      } else {
        if (state.selectedSeats.length < state.passengers.length) {
          state.selectedSeats.push(seatId);
        }
      }
    },
    clearBooking: (state) => {
      state.flight = null;
      state.passengers = [
        { id: 1, firstName: "", lastName: "", age: "", gender: "", category: "Adult" },
      ];
      state.selectedSeats = [];
      state.status = "idle";
    },
    addExtraBaggage: (state, action) => {
      state.extraBaggage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastBooking = action.payload;
        state.flight = null;
        state.passengers = [
          { id: 1, firstName: "", lastName: "", age: "", gender: "", category: "Adult" },
        ];
        state.selectedSeats = [];
        state.extraBaggage = null; 
      })
      .addCase(completeBooking.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setFlight,
  setBookingStatus,
  addPassenger,
  updatePassenger,
  removePassenger,
  toggleSeat, 
  clearBooking,
  addExtraBaggage, 
} = bookingSlice.actions;

// Selectors
export const selectCurrentFlight = (state) => state.booking.flight;
export const selectPassengers = (state) => state.booking.passengers;
export const selectSelectedSeats = (state) => state.booking.selectedSeats;
export const selectBookingStatus = (state) => state.booking.status;
export const selectLastBooking = (state) => state.booking.lastBooking;
export const selectExtraBaggage = (state) => state.booking.extraBaggage; 

export default bookingSlice.reducer;
