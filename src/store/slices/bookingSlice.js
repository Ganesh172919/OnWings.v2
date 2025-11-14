import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockFlightApi } from "../../data/mockFlights";

// ... (keep completeBooking thunk) ...
export const completeBooking = createAsyncThunk(
  "booking/completeBooking",
  async (bookingDetails) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const bookingId = `OW${Math.floor(Math.random() * 90000) + 10000}`;
    return { ...bookingDetails, bookingId };
  }
);

// ... (keep fetchFlightById thunk) ...
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
  // 1. ADD new fields to the passenger
  passengers: [{ id: 1, firstName: "", lastName: "", age: "", gender: "" }],
  // 2. CHANGE selectedSeat: null to selectedSeats: []
  selectedSeats: [],
  status: "idle",
  lastBooking: null,
  extraBaggage: null, // Add this
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
      // We only allow removal if there is more than 1 passenger
      if (state.passengers.length > 1) {
        state.passengers = state.passengers.filter((p) => p.id !== idToRemove);
      }
    },

    setBookingStatus: (state, action) => {
      state.status = action.payload;
    },
    addPassenger: (state) => {
      const newId = state.passengers.length + 1;
      // 3. ADD new fields when adding a passenger
      state.passengers.push({
        id: newId,
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
      });
    },
    updatePassenger: (state, action) => {
      const { id, field, value } = action.payload;
      const passenger = state.passengers.find((p) => p.id === id);
      if (passenger) {
        passenger[field] = value;
      }
    },
    // 4. RENAME selectSeat to toggleSeat and update logic
    toggleSeat: (state, action) => {
      const seatId = action.payload;
      const isSelected = state.selectedSeats.includes(seatId);

      if (isSelected) {
        // If already selected, remove it
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seatId);
      } else {
        // If not selected, add it ONLY if there is room
        if (state.selectedSeats.length < state.passengers.length) {
          state.selectedSeats.push(seatId);
        }
      }
    },
    clearBooking: (state) => {
      state.flight = null;
      state.passengers = [
        { id: 1, firstName: "", lastName: "", age: "", gender: "" },
      ];
      // 5. UPDATE to clear selectedSeats
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
          { id: 1, firstName: "", lastName: "", age: "", gender: "" },
        ];
        // 5. UPDATE to clear selectedSeats
        state.selectedSeats = [];
        state.extraBaggage = null; // Also clear baggage
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
  toggleSeat, // 6. EXPORT new action
  clearBooking,
  addExtraBaggage, // Export new action
} = bookingSlice.actions;

// Selectors
export const selectCurrentFlight = (state) => state.booking.flight;
export const selectPassengers = (state) => state.booking.passengers;
// 7. UPDATE selector to get the array
export const selectSelectedSeats = (state) => state.booking.selectedSeats;
export const selectBookingStatus = (state) => state.booking.status;
export const selectLastBooking = (state) => state.booking.lastBooking;
export const selectExtraBaggage = (state) => state.booking.extraBaggage; // Add this selector

export default bookingSlice.reducer;
