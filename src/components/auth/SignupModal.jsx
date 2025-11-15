import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  toggleSignupModal,
  toggleLoginModal,
} from "../../store/slices/userSlice.js";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { User, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { validateName, validateEmail, validatePassword } from "../../utils/validation.js";

const SignupModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.isSignupModalOpen);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  const handleClose = () => {
    dispatch(toggleSignupModal());
    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setErrors({ name: "", email: "", password: "" });
    setTouched({ name: false, email: false, password: false });
  };

  const validateField = (field, value) => {
    let error = "";
    if (field === "name") {
      error = validateName(value, "Full name");
    } else if (field === "email") {
      error = validateEmail(value);
    } else if (field === "password") {
      error = validatePassword(value);
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "name" ? name : field === "email" ? email : password;
    validateField(field, value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (touched.name) validateField("name", e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) validateField("email", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (touched.password) validateField("password", e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(name, "Full name");
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ name: nameError, email: emailError, password: passwordError });
    setTouched({ name: true, email: true, password: true });

    if (nameError || emailError || passwordError) {
      return;
    }

    // In a real app, you'd dispatch an async thunk to your backend
    const fakeUser = { name, email };
    dispatch(login(fakeUser));
    handleClose();
  };

  const switchToLogin = () => {
    dispatch(toggleSignupModal());
    dispatch(toggleLoginModal());
  };

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Account">
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            onBlur={() => handleBlur("name")}
            className={touched.name && errors.name ? "border-red-500" : ""}
          />
          {touched.name && errors.name && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.name}
            </div>
          )}
        </div>
        <div>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur("email")}
            className={touched.email && errors.email ? "border-red-500" : ""}
          />
          {touched.email && errors.email && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.email}
            </div>
          )}
        </div>
        <div>
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur("password")}
            className={touched.password && errors.password ? "border-red-500" : ""}
          />
          {touched.password && password && (
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600 font-semibold">Password must contain:</p>
              <div className="grid grid-cols-2 gap-1">
                <div className={`flex items-center text-xs ${passwordChecks.length ? "text-green-600" : "text-gray-400"}`}>
                  {passwordChecks.length ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  8+ characters
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.uppercase ? "text-green-600" : "text-gray-400"}`}>
                  {passwordChecks.uppercase ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  Uppercase
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.lowercase ? "text-green-600" : "text-gray-400"}`}>
                  {passwordChecks.lowercase ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  Lowercase
                </div>
                <div className={`flex items-center text-xs ${passwordChecks.number ? "text-green-600" : "text-gray-400"}`}>
                  {passwordChecks.number ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                  Number
                </div>
              </div>
            </div>
          )}
        </div>
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="font-medium text-red-600 hover:text-red-500"
        >
          Log in
        </button>
      </p>
    </Modal>
  );
};

export default SignupModal;
