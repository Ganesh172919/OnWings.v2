import React from "react";
import { useSelector, useDispatch } from "react-redux";
// 1. Import new action and selectors
import {
  toggleSeat,
  selectSelectedSeats,
  selectPassengers,
} from "../../store/slices/bookingSlice";
import { Armchair } from "lucide-react";

const ROWS = 15;
const SEATS_PER_ROW = ["A", "B", "C", "D", "E", "F"];
const BOOKED_SEATS = ["1A", "1B", "3C", "5F", "8D", "10A", "10B", "10C"];

const Seat = ({ seatId, isBooked, isSelected, isDisabled, onClick }) => {
  let seatClass =
    "border-2 rounded-md h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center font-semibold cursor-pointer transition duration-150 ";

  if (isBooked) {
    seatClass += "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed";
  } else if (isSelected) {
    seatClass += "bg-red-600 border-red-400 text-white"; // Theme color
  } else if (isDisabled) {
    seatClass += "bg-black/50 border-gray-600 text-gray-700 cursor-not-allowed"; // Disabled
  } else {
    seatClass +=
      "bg-black/50 border-gray-600 text-white/80 hover:bg-white/10 hover:border-red-500";
  }

  return (
    <button
      onClick={onClick}
      disabled={isBooked || isDisabled}
      className={seatClass}
      title={`Seat ${seatId}`}
    >
      <Armchair className="h-5 w-5" />
    </button>
  );
};

const SeatMap = () => {
  const dispatch = useDispatch();
  // 2. Get the array of seats and the passenger list
  const selectedSeats = useSelector(selectSelectedSeats);
  const passengers = useSelector(selectPassengers);

  const handleSelectSeat = (seatId) => {
    // 3. Dispatch the new toggle action
    dispatch(toggleSeat(seatId));
  };

  return (
    <div className="p-4 sm:p-6 rounded-none shadow-lg text-white/90">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-black">
        Select Your Seat(s)
      </h2>
      <p className="text-black/60 mb-4 sm:mb-6">
        Please select {passengers.length} seat(s). You have{" "}
        {passengers.length - selectedSeats.length} remaining.
      </p>

      <div className="flex justify-center overflow-auto">
        <div
          className="p-3 sm:p-4 bg-black/80 rounded-md"
          style={{ width: "fit-content" }}
        >
          <div className="space-y-3">
            {Array.from({ length: ROWS }, (_, i) => i + 1).map((row) => (
              <div key={row} className="flex items-center gap-2 sm:gap-3">
                <span className="w-5 sm:w-6 text-center font-bold text-white/80">
                  {row}
                </span>
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {SEATS_PER_ROW.map((seat, index) => {
                    const seatId = `${row}${seat}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isDisabled =
                      !isSelected && selectedSeats.length >= passengers.length;

                    return (
                      <React.Fragment key={seatId}>
                        <Seat
                          seatId={seatId}
                          isBooked={BOOKED_SEATS.includes(seatId)}
                          isSelected={isSelected}
                          isDisabled={isDisabled}
                          onClick={() => handleSelectSeat(seatId)}
                        />
                        {index === 2 && <div className="w-3 sm:w-6" />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 text-sm">
        <div className="flex items-center">
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-black/50 border-2 border-gray-600 rounded-md mr-2"></div>
          Available
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-red-600 border-2 border-red-400 rounded-md mr-2"></div>
          Selected
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-gray-700 border-2 border-gray-600 rounded-md mr-2"></div>
          Booked
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
