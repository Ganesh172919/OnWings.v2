import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchFlights } from "../../store/slices/flightSlice";
import { Search, ArrowRightLeft, ChevronDown, Plus, Minus, AlertCircle } from "lucide-react";
import { airports } from "../../data/airports";
import { ArkDatePicker } from "../common/ArkDatePicker";
import { validateAirportCode, validateFutureDate, validatePassengerCount } from "../../utils/validation";

const FlightSearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [date, setDate] = useState(new Date());

  const [errors, setErrors] = useState({
    from: "",
    to: "",
    date: "",
    returnDate: "",
    passengers: "",
  });

  const [tripType, setTripType] = useState("oneWay");

  const [returnDate, setReturnDate] = useState(null);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const passengerDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passengerDropdownRef.current && !passengerDropdownRef.current.contains(event.target)) {
        setIsPassengerDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {
      from: "",
      to: "",
      date: "",
      returnDate: "",
      passengers: "",
    };

    // Validate source airport
    if (!from) {
      newErrors.from = "Source airport is required";
    } else if (from.length !== 3) {
      newErrors.from = "Please select a valid airport";
    } else {
      const validAirport = airports.find(a => a.code.toUpperCase() === from.toUpperCase());
      if (!validAirport) {
        newErrors.from = "Invalid airport code";
      }
    }

    // Validate destination airport
    if (!to) {
      newErrors.to = "Destination airport is required";
    } else if (to.length !== 3) {
      newErrors.to = "Please select a valid airport";
    } else {
      const validAirport = airports.find(a => a.code.toUpperCase() === to.toUpperCase());
      if (!validAirport) {
        newErrors.to = "Invalid airport code";
      }
    }

    // Check if same airport
    if (from && to && from.toUpperCase() === to.toUpperCase()) {
      newErrors.from = "Source and destination cannot be the same";
      newErrors.to = "Source and destination cannot be the same";
    }

    // Validate departure date
    const dateError = validateFutureDate(date, "Departure date");
    if (dateError) {
      newErrors.date = dateError;
    }

    // Validate return date for round trip
    if (tripType === "roundTrip") {
      if (!returnDate) {
        newErrors.returnDate = "Return date is required for round trip";
      } else {
        const returnDateError = validateFutureDate(returnDate, "Return date");
        if (returnDateError) {
          newErrors.returnDate = returnDateError;
        } else if (date && returnDate && new Date(returnDate) < new Date(date)) {
          newErrors.returnDate = "Return date must be after departure date";
        }
      }
    }

    // Validate passengers
    const totalPassengers = adults + children;
    const passengerError = validatePassengerCount(totalPassengers);
    if (passengerError) {
      newErrors.passengers = passengerError;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const isRoundTrip = tripType === "roundTrip";
    const totalPassengers = adults + children;
    const passengers = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;
    
    dispatch(
      fetchFlights({
        from,
        to,
        date,
        returnDate: isRoundTrip ? returnDate : null,
        tripType,
        passengers,
      })
    );
    navigate("/flights");
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setErrors(prev => ({ ...prev, from: "" }));
    if (value.length > 0) {
      const filtered = airports.filter(
        (airport) =>
          airport.code.toUpperCase().startsWith(value.toUpperCase()) ||
          airport.city.toUpperCase().startsWith(value.toUpperCase())
      );
      setFromSuggestions(filtered);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setErrors(prev => ({ ...prev, to: "" }));
    if (value.length > 0) {
      const filtered = airports.filter(
        (airport) =>
          airport.code.toUpperCase().startsWith(value.toUpperCase()) ||
          airport.city.toUpperCase().startsWith(value.toUpperCase())
      );
      setToSuggestions(filtered);
    } else {
      setToSuggestions([]);
    }
  };

  const onFromSuggestionClick = (airport) => {
    setFrom(airport.code);
    setFromSuggestions([]);
  };

  const onToSuggestionClick = (airport) => {
    setTo(airport.code);
    setToSuggestions([]);
  };

  const incrementAdults = () => setAdults(prev => prev + 1);
  const decrementAdults = () => setAdults(prev => Math.max(0, prev - 1));
  const incrementChildren = () => setChildren(prev => prev + 1);
  const decrementChildren = () => setChildren(prev => Math.max(0, prev - 1));

  const getPassengerText = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    return parts.length > 0 ? parts.join(', ') : 'Select passengers';
  };

  const activeTripButton =
    "bg-red-700 text-white font-semibold py-2 px-3 rounded-none text-sm sm:text-base";
  const inactiveTripButton =
    "bg-transparent text-gray-500 font-semibold py-2 px-3 rounded-none border border-gray-400 hover:bg-gray-100 text-sm sm:text-base";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4 items-end"
    >
      {/* --- Trip Type Toggle --- */}
      <div className="md:col-span-6 flex justify-start gap-0 mb-2">
        <button
          type="button"
          onClick={() => setTripType("oneWay")}
          className={
            tripType === "oneWay" ? activeTripButton : inactiveTripButton
          }
        >
          One-way
        </button>
        <button
          type="button"
          onClick={() => setTripType("roundTrip")}
          className={
            tripType === "roundTrip" ? activeTripButton : inactiveTripButton
          }
        >
          Round-trip
        </button>
      </div>

      {/* --- Source/Destination --- */}
      <div className="md:col-span-6 flex flex-col md:flex-row items-end gap-x-4 gap-y-4">
        {/* Source Input */}
        <div className="w-full relative">
          <label
            htmlFor="from"
            className="block text-sm font-bold text-slate-700 text-left"
          >
            Source
          </label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={handleFromChange}
            placeholder="Source"
            className={`mt-1 block w-full p-2 sm:p-3 text-sm sm:text-base bg-transparent text-slate-900 border-0 border-b-2 ${
              errors.from ? "border-red-600" : "border-gray-300"
            } focus:border-red-600 focus:ring-0 rounded-none placeholder:text-slate-400`}
            autoComplete="off"
            onBlur={() => setTimeout(() => setFromSuggestions([]), 100)}
            onFocus={handleFromChange}
          />
          {errors.from && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.from}
            </div>
          )}
          {fromSuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white shadow-lg mt-1 rounded-none max-h-60 overflow-y-auto">
              {fromSuggestions.map((airport) => (
                <div
                  key={airport.code}
                  className="p-3 text-black cursor-pointer border-0 border-red-600 hover:bg-red-100 hover:border-l-4"
                  onMouseDown={() => onFromSuggestionClick(airport)}
                >
                  {airport.city} ({airport.code})
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Swap Button */}
        <button
          type="button"
          onClick={handleSwap}
          className="p-2 text-red-700 hover:text-primary transition-colors"
          title="Swap source and destination"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </button>
        {/* Destination Input */}
        <div className="w-full relative">
          <label
            htmlFor="to"
            className="block text-sm font-bold text-slate-700 text-left"
          >
            Destination
          </label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={handleToChange}
            placeholder="Destination"
            className={`mt-1 block w-full p-2 sm:p-3 text-sm sm:text-base bg-transparent text-slate-900 border-0 border-b-2 ${
              errors.to ? "border-red-600" : "border-gray-300"
            } focus:border-red-600 focus:ring-0 rounded-none placeholder:text-slate-400`}
            autoComplete="off"
            onBlur={() => setTimeout(() => setToSuggestions([]), 100)}
            onFocus={handleToChange}
          />
          {errors.to && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.to}
            </div>
          )}
          {toSuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white shadow-lg mt-1 rounded-none max-h-60 overflow-y-auto">
              {toSuggestions.map((airport) => (
                <div
                  key={airport.code}
                  className="p-3 text-black cursor-pointer border-0 border-red-600 hover:bg-red-100 hover:border-l-4"
                  onMouseDown={() => onToSuggestionClick(airport)}
                >
                  {airport.city} ({airport.code})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- Date Fields --- */}
      <div
        className={tripType === "oneWay" ? "md:col-span-3" : "md:col-span-2"}
      >
        <label
          htmlFor="depart-date"
          className="block text-sm font-bold text-slate-700 text-left"
        >
          Depart
        </label>
        <ArkDatePicker
          id="depart-date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            setErrors(prev => ({ ...prev, date: "" }));
          }}
          placeholder="Select date"
        />
        {errors.date && (
          <div className="flex items-center mt-1 text-red-600 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.date}
          </div>
        )}
      </div>

      {tripType === "roundTrip" && (
        <div className="md:col-span-2">
          <label
            htmlFor="return-date"
            className="block text-sm font-bold text-slate-700 text-left"
          >
            Return
          </label>
          <ArkDatePicker
            id="return-date"
            value={returnDate}
            onChange={(newDate) => {
              setReturnDate(newDate);
              setErrors(prev => ({ ...prev, returnDate: "" }));
            }}
            placeholder="Select date"
          />
          {errors.returnDate && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.returnDate}
            </div>
          )}
        </div>
      )}

      {/* --- Passengers Field --- */}
      <div
        className={tripType === "oneWay" ? "md:col-span-3" : "md:col-span-2"}
        ref={passengerDropdownRef}
      >
        <label
          htmlFor="passengers"
          className="block text-sm font-bold text-slate-700 text-left"
        >
          Passengers
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
            className={`mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 ${
              errors.passengers ? "border-red-600" : "border-gray-400"
            } focus:border-red-600 rounded-none text-slate-900 text-sm sm:text-base text-left flex items-center justify-between`}
          >
            <span className={adults + children === 0 ? "text-slate-400" : ""}>
              {getPassengerText()}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isPassengerDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {errors.passengers && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.passengers}
            </div>
          )}
          
          {isPassengerDropdownOpen && (
            <div className="absolute z-20 w-full bg-white shadow-lg border border-gray-200 mt-1 rounded-lg p-4 space-y-4">
              {/* Adults Counter */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Adults</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementAdults}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={adults === 0}
                  >
                    <Minus className="h-4 w-4 text-slate-700" />
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-900">{adults}</span>
                  <button
                    type="button"
                    onClick={incrementAdults}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 text-slate-700" />
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Children</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementChildren}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={children === 0}
                  >
                    <Minus className="h-4 w-4 text-slate-700" />
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-900">{children}</span>
                  <button
                    type="button"
                    onClick={incrementChildren}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-red-900/40 flex items-center justify-center md:col-span-6 text-sm sm:text-base transition-all duration-300"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </motion.button>
    </form>
  );
};

export default FlightSearchForm;
