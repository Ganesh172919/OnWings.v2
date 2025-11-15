import React, { useState } from "react";
import { Loader2, CreditCard, Lock } from "lucide-react";

const PaymentForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading || formIsIncomplete) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit();
      setLoading(false);
    }, 2000);
  };

  const formIsIncomplete = !name || !card || !expiry || !cvc;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold text-white/90">
        Enter Card Details
      </h3>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-bold text-white/80 text-left"
        >
          Cardholder Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Amith"
          className="mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 border-gray-500 focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500"
        />
      </div>
      <div>
        <label
          htmlFor="card"
          className="block text-sm font-bold text-white/80 text-left"
        >
          Card Number
        </label>
        <div className="relative">
          <input
            id="card"
            type="text"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            placeholder="4242 4242 4242 4242"
            className="mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 border-gray-500 focus:border-red-500 focus:ring-0 rounded-none text-white pl-10 text-sm sm:text-base placeholder:text-gray-500"
          />
          <CreditCard className="absolute top-1/2 left-2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label
            htmlFor="expiry"
            className="block text-sm font-bold text-white/80 text-left"
          >
            Expiry (MM/YY)
          </label>
          <input
            id="expiry"
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="12/26"
            className="mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 border-gray-500 focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500"
          />
        </div>
        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-bold text-white/80 text-left"
          >
            CVC
          </label>
          <input
            id="cvc"
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            className="mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 border-gray-500 focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || formIsIncomplete}
        className="w-full bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-none transition duration-200 hover:bg-white hover:text-red-900 flex items-center justify-center disabled:opacity-50 disabled:hover:bg-red-700 disabled:hover:text-white"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Lock className="h-5 w-5 mr-2" />
        )}
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <p className="text-xs text-center text-gray-500">
        This is a mock payment. No real transaction will occur.
      </p>
    </form>
  );
};

export default PaymentForm;
