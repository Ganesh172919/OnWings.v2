import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentFlight,
  selectSelectedSeats,
  selectPassengers,
  selectExtraBaggage, // Import the new selector
} from "../../store/slices/bookingSlice";
import { ArrowRight, Ticket, Briefcase } from "lucide-react";

// Mock prices
const SEAT_FEE = 800;
const TAX_RATE = 0.18;
const MOCK_COUPON = {
  ONWINGS10: 0.1, // 10% off
  SAVE1000: 1000, // ₹1000 off
};

const PriceSummary = ({ onConfirm }) => {
  const flight = useSelector(selectCurrentFlight);
  const selectedSeats = useSelector(selectSelectedSeats);
  const passengers = useSelector(selectPassengers);
  const extraBaggage = useSelector(selectExtraBaggage); // Get baggage info

  // 3. State for coupons
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  if (!flight) return null;

  const passengerCount = passengers.length;
  const seatFee = selectedSeats.length * SEAT_FEE;
  const baggageFee = extraBaggage ? extraBaggage.price : 0; // Calculate baggage fee
  const basePrice = flight.price * passengerCount;

  const subtotal = basePrice + seatFee + baggageFee; // Add baggage fee to subtotal
  const taxes = subtotal * TAX_RATE;

  // 5. Calculate total with discount
  const total = subtotal + taxes - discount;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (MOCK_COUPON[code]) {
      const discountValue = MOCK_COUPON[code];
      if (discountValue < 1) {
        // It's a percentage
        setDiscount(subtotal * discountValue);
        setCouponMessage(`Applied! ${discountValue * 100}% off.`);
      } else {
        // It's a flat amount
        setDiscount(discountValue);
        setCouponMessage(`Applied! ${formatPrice(discountValue)} off.`);
      }
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  // 6. Check if booking is allowed
  const seatsSelected = selectedSeats.length === passengers.length;
  const passengerInfoFilled = passengers.every(
    (p) => p.firstName && p.lastName && p.age && p.gender
  );

  return (
    <div className="bg-black border border-red-800/50 p-4 sm:p-6 rounded shadow-lg text-white/90 md:sticky md:top-24">
      <h2 className="text-xl sm:text-2xl font-semibold border-b border-red-800/50 pb-3 sm:pb-4 mb-3 sm:mb-4">
        Price Summary
      </h2>

      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <span className="text-lg sm:text-2xl">{}</span>
          <h3 className="text-lg sm:text-xl font-bold">{flight.airline}</h3>
        </div>
        <div className="flex justify-between items-center text-lg font-medium mt-2">
          <span>{flight.from}</span>
          <ArrowRight className="h-5 w-5 text-gray-400" />
          <span>{flight.to}</span>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/20 pt-3 sm:pt-4">
        <div className="flex justify-between">
          <span className="text-white/60">Base Fare (x{passengerCount})</span>
          <span className="font-medium">{formatPrice(basePrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">
            Seat Fee (x{selectedSeats.length})
          </span>
          <span className="font-medium">{formatPrice(seatFee)}</span>
        </div>
        {extraBaggage && (
          <div className="flex justify-between">
            <span className="text-white/60 flex items-center">
              <Briefcase className="h-4 w-4 mr-2" /> Extra Baggage
            </span>
            <span className="font-medium">{formatPrice(baggageFee)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-white/60">Taxes & Fees</span>
          <span className="font-medium">{formatPrice(taxes)}</span>
        </div>
      </div>

      {/* 7. Coupon Section */}
      <div className="border-t border-white/20 mt-4 pt-4 space-y-2">
        <label className="flex items-center text-sm font-semibold text-white/80">
          <Ticket className="h-4 w-4 mr-2" /> Apply Coupon
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="ONWINGS10"
            className="flex-1 p-2 bg-transparent border-b-2 border-gray-500 focus:border-red-500 text-white rounded-none focus:ring-0"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-red-700 text-white/90 px-4 py-2 text-sm font-bold rounded-none hover:bg-red-600"
          >
            Apply
          </button>
        </div>
        {couponMessage && (
          <p
            className={`text-sm ${
              discount > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {couponMessage}
          </p>
        )}
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-lg font-semibold text-green-500 mt-4 pt-4 border-t border-dashed border-white/20">
          <span>Discount</span>
          <span>-{formatPrice(discount)}</span>
        </div>
      )}

      <div className="border-t border-white/20 mt-4 pt-3 sm:pt-4">
        <div className="flex justify-between text-2xl font-bold text-red-500">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!seatsSelected || !passengerInfoFilled}
        className="w-full bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-none mt-6 shadow-lg hover:bg-white hover:text-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm and Pay
      </button>
      {(!seatsSelected || !passengerInfoFilled) && (
        <p className="text-xs text-center text-yellow-500 mt-2">
          Please fill all passenger details and select {passengers.length}{" "}
          seat(s).
        </p>
      )}
    </div>
  );
};

export default PriceSummary;
