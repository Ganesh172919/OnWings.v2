import React, { useState } from "react";
import { Loader2, Lock, AlertCircle } from "lucide-react";
import {
  validateCardholderName,
  validateCardNumber,
  validateExpiryDate,
  validateCVC,
  formatCardNumber,
  formatExpiryDate,
  formatCVC,
} from "../../utils/validation";

const PaymentForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    card: false,
    expiry: false,
    cvc: false,
  });

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = "";
    switch (field) {
      case "name":
        error = validateCardholderName(name);
        break;
      case "card":
        error = validateCardNumber(card);
        break;
      case "expiry":
        error = validateExpiryDate(expiry);
        break;
      case "cvc":
        error = validateCVC(cvc);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateAllFields = () => {
    const nameError = validateCardholderName(name);
    const cardError = validateCardNumber(card);
    const expiryError = validateExpiryDate(expiry);
    const cvcError = validateCVC(cvc);

    setErrors({
      name: nameError,
      card: cardError,
      expiry: expiryError,
      cvc: cvcError,
    });

    setTouched({
      name: true,
      card: true,
      expiry: true,
      cvc: true,
    });

    return !nameError && !cardError && !expiryError && !cvcError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const isValid = validateAllFields();
    if (!isValid) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit();
      setLoading(false);
    }, 2000);
  };

  const handleCardChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 19) {
      setCard(formatted);
      if (touched.card) validateField("card");
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiry(formatted);
    if (touched.expiry) validateField("expiry");
  };

  const handleCvcChange = (e) => {
    const formatted = formatCVC(e.target.value);
    setCvc(formatted);
    if (touched.cvc) validateField("cvc");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (touched.name) validateField("name");
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
          onChange={handleNameChange}
          onBlur={() => handleBlur("name")}
          placeholder="e.g. Alex Amith"
          className={`mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 ${
            touched.name && errors.name ? "border-red-600" : "border-gray-500"
          } focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500`}
        />
        {touched.name && errors.name && (
          <div className="flex items-center mt-1 text-red-400 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.name}
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="card"
          className="block text-sm font-bold text-white/80 text-left"
        >
          Card Number
        </label>
        <div>
          <input
            id="card"
            type="text"
            value={card}
            onChange={handleCardChange}
            onBlur={() => handleBlur("card")}
            placeholder="4242 4242 4242 4242"
            className={`mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 ${
              touched.card && errors.card ? "border-red-600" : "border-gray-500"
            } focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500`}
          />
        </div>
        {touched.card && errors.card && (
          <div className="flex items-center mt-1 text-red-400 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.card}
          </div>
        )}
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
            onChange={handleExpiryChange}
            onBlur={() => handleBlur("expiry")}
            placeholder="12/26"
            maxLength="5"
            className={`mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 ${
              touched.expiry && errors.expiry ? "border-red-600" : "border-gray-500"
            } focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500`}
          />
          {touched.expiry && errors.expiry && (
            <div className="flex items-center mt-1 text-red-400 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.expiry}
            </div>
          )}
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
            onChange={handleCvcChange}
            onBlur={() => handleBlur("cvc")}
            placeholder="123"
            maxLength="4"
            className={`mt-1 block w-full p-2 sm:p-3 bg-transparent border-0 border-b-2 ${
              touched.cvc && errors.cvc ? "border-red-600" : "border-gray-500"
            } focus:border-red-500 focus:ring-0 rounded-none text-white text-sm sm:text-base placeholder:text-gray-500`}
          />
          {touched.cvc && errors.cvc && (
            <div className="flex items-center mt-1 text-red-400 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.cvc}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
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
