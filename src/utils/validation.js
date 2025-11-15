/**
 * Comprehensive validation utilities for OnWings flight booking system
 */

// Email validation
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  return "";
};

// Name validation (for first name, last name, full name)
export const validateName = (name, fieldName = "Name") => {
  if (!name || name.trim() === "") return `${fieldName} is required`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  if (name.trim().length > 50) return `${fieldName} must be less than 50 characters`;
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  return "";
};

// Age validation
export const validateAge = (age) => {
  if (!age || age === "") return "Age is required";
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum)) return "Age must be a valid number";
  if (ageNum < 0) return "Age cannot be negative";
  if (ageNum > 120) return "Please enter a valid age";
  return "";
};

// Gender validation
export const validateGender = (gender) => {
  if (!gender || gender === "") return "Gender is required";
  return "";
};

// Credit card number validation
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber) return "Card number is required";
  const cleanedCard = cardNumber.replace(/\s/g, "");
  if (!/^\d+$/.test(cleanedCard)) return "Card number must contain only digits";
  if (cleanedCard.length < 13 || cleanedCard.length > 19) return "Card number must be between 13 and 19 digits";
  
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  for (let i = cleanedCard.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCard[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  if (sum % 10 !== 0) return "Invalid card number";
  return "";
};

// Cardholder name validation
export const validateCardholderName = (name) => {
  if (!name || name.trim() === "") return "Cardholder name is required";
  if (name.trim().length < 3) return "Cardholder name must be at least 3 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return "Cardholder name can only contain letters and spaces";
  return "";
};

// Expiry date validation (MM/YY format)
export const validateExpiryDate = (expiry) => {
  if (!expiry) return "Expiry date is required";
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiry)) return "Expiry date must be in MM/YY format";
  
  const [month, year] = expiry.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1;
  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);
  
  if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
    return "Card has expired";
  }
  return "";
};

// CVC validation
export const validateCVC = (cvc) => {
  if (!cvc) return "CVC is required";
  if (!/^\d{3,4}$/.test(cvc)) return "CVC must be 3 or 4 digits";
  return "";
};

// Airport code validation
export const validateAirportCode = (code, fieldName = "Airport") => {
  if (!code || code.trim() === "") return `${fieldName} is required`;
  if (code.trim().length !== 3) return `${fieldName} code must be 3 characters`;
  return "";
};

// Date validation (ensure date is in the future)
export const validateFutureDate = (date, fieldName = "Date") => {
  if (!date) return `${fieldName} is required`;
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  if (selectedDate < today) return `${fieldName} must be in the future`;
  return "";
};

// Phone number validation
export const validatePhoneNumber = (phone) => {
  if (!phone) return "Phone number is required";
  const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
  if (!/^\d{10,15}$/.test(cleanedPhone)) return "Phone number must be between 10 and 15 digits";
  return "";
};

// Passenger count validation
export const validatePassengerCount = (count) => {
  if (count < 1) return "At least one passenger is required";
  if (count > 9) return "Maximum 9 passengers allowed";
  return "";
};

// Format card number with spaces
export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, "");
  const match = cleaned.match(/.{1,4}/g);
  return match ? match.join(" ") : cleaned;
};

// Format expiry date
export const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
};

// Format CVC
export const formatCVC = (value) => {
  return value.replace(/\D/g, "").slice(0, 4);
};
