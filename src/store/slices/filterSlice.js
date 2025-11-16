import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceRange: { min: 0, max: 10000 },
  selectedAirlines: [],
  departureTimeSlot: 'all',
  stopsFilter: 'all', 
  sortOption: 'price-low-high', 
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSelectedAirlines: (state, action) => {
      state.selectedAirlines = action.payload;
    },
    toggleAirline: (state, action) => {
      const airline = action.payload;
      const index = state.selectedAirlines.indexOf(airline);
      if (index > -1) {
        state.selectedAirlines.splice(index, 1);
      } else {
        state.selectedAirlines.push(airline);
      }
    },
    setDepartureTimeSlot: (state, action) => {
      state.departureTimeSlot = action.payload;
    },
    setStopsFilter: (state, action) => {
      state.stopsFilter = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    clearAllFilters: (state) => {
      state.priceRange = { min: 0, max: 10000 };
      state.selectedAirlines = [];
      state.departureTimeSlot = 'all';
      state.stopsFilter = 'all';
      state.sortOption = 'price-low-high';
    },
  },
});

export const {
  setPriceRange,
  setSelectedAirlines,
  toggleAirline,
  setDepartureTimeSlot,
  setStopsFilter,
  setSortOption,
  clearAllFilters,
} = filterSlice.actions;

// Helper function to parse time string to hours
const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + minutes / 60;
};

// Helper function to get time slot from departure time
const getTimeSlot = (departureTime) => {
  const hours = parseTime(departureTime);
  if (hours >= 0 && hours < 6) return 'early-morning';
  if (hours >= 6 && hours < 12) return 'morning';
  if (hours >= 12 && hours < 18) return 'afternoon';
  return 'evening';
};

// Helper function to calculate stops from flight data
const getStopsCount = (flight) => {
  // Since mock data doesn't have stops info, we'll use flight duration as proxy
  // In a real app, this would come from the API
  // For now, we'll randomly assign based on flight ID
  const id = parseInt(flight.id.replace(/\D/g, ''));
  if (id % 3 === 0) return 0; // Non-stop
  if (id % 3 === 1) return 1; // 1 stop
  return 2; // 2+ stops
};

// Selector to get filtered and sorted flights
export const selectFilteredAndSortedFlights = (state) => {
  const flights = state.flights.flights;
  const filters = state.filters;

  // Step 1: Apply filters
  let filteredFlights = flights.filter((flight) => {
    // Price filter
    if (flight.price < filters.priceRange.min || flight.price > filters.priceRange.max) {
      return false;
    }

    // Airline filter
    if (filters.selectedAirlines.length > 0 && !filters.selectedAirlines.includes(flight.airline)) {
      return false;
    }

    // Departure time filter
    if (filters.departureTimeSlot !== 'all') {
      const flightTimeSlot = getTimeSlot(flight.departure);
      if (flightTimeSlot !== filters.departureTimeSlot) {
        return false;
      }
    }

    // Stops filter
    if (filters.stopsFilter !== 'all') {
      const stops = getStopsCount(flight);
      if (filters.stopsFilter === 'non-stop' && stops !== 0) return false;
      if (filters.stopsFilter === '1-stop' && stops !== 1) return false;
      if (filters.stopsFilter === '2-plus-stops' && stops < 2) return false;
    }

    return true;
  });

  // Step 2: Apply sorting
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (filters.sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'departure-early-late':
        return parseTime(a.departure) - parseTime(b.departure);
      case 'departure-late-early':
        return parseTime(b.departure) - parseTime(a.departure);
      case 'duration-shortest':
        // Calculate duration (arrival - departure)
        const durationA = parseTime(a.arrival) - parseTime(a.departure);
        const durationB = parseTime(b.arrival) - parseTime(b.departure);
        return durationA - durationB;
      default:
        return 0;
    }
  });

  return sortedFlights;
};

// Selector to get unique airlines from available flights
export const selectAvailableAirlines = (state) => {
  const flights = state.flights.flights;
  const airlines = [...new Set(flights.map((flight) => flight.airline))];
  return airlines.sort();
};

// Selector to get price range from available flights
export const selectPriceRange = (state) => {
  const flights = state.flights.flights;
  if (flights.length === 0) {
    return { min: 0, max: 10000 };
  }
  const prices = flights.map((flight) => flight.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

// Selector to get active filter count
export const selectActiveFilterCount = (state) => {
  const filters = state.filters;
  let count = 0;

  // Price range filter (only if changed from default)
  const priceRange = selectPriceRange(state);
  if (filters.priceRange.min !== priceRange.min || filters.priceRange.max !== priceRange.max) {
    count++;
  }

  // Airline filter
  if (filters.selectedAirlines.length > 0) {
    count++;
  }

  // Departure time filter
  if (filters.departureTimeSlot !== 'all') {
    count++;
  }

  // Stops filter
  if (filters.stopsFilter !== 'all') {
    count++;
  }

  return count;
};

// Selectors for individual filter values
export const selectPriceRangeFilter = (state) => state.filters.priceRange;
export const selectSelectedAirlines = (state) => state.filters.selectedAirlines;
export const selectDepartureTimeSlot = (state) => state.filters.departureTimeSlot;
export const selectStopsFilter = (state) => state.filters.stopsFilter;
export const selectSortOption = (state) => state.filters.sortOption;

export default filterSlice.reducer;
