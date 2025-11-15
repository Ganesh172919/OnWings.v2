import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  toggleLoginModal,
  toggleSignupModal,
} from "../../store/slices/userSlice.js";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { UserIcon, LockIcon } from "../icons/Icons.jsx";
import { validateEmail, validatePassword } from "../../utils/validation.js";
import { AlertCircle } from "lucide-react";

const LoginModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.isLoginModalOpen);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleClose = () => {
    dispatch(toggleLoginModal());
    // Reset form
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
    setTouched({ email: false, password: false });
  };

  const validateField = (field, value) => {
    let error = "";
    if (field === "email") {
      error = validateEmail(value);
    } else if (field === "password") {
      error = validatePassword(value);
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, field === "email" ? email : password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (touched.email) validateField("email", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (touched.password) validateField("password", e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (emailError || passwordError) {
      return;
    }

    // In a real app, you'd dispatch an async thunk to your backend
    const fakeUser = { name: "Demo User", email };
    dispatch(login(fakeUser));
    handleClose();
  };

  const switchToSignup = () => {
    dispatch(toggleLoginModal());
    dispatch(toggleSignupModal());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Welcome Back">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Input
            label="Email"
            id="email"
            name="email"
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
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur("password")}
            className={touched.password && errors.password ? "border-red-500" : ""}
          />
          {touched.password && errors.password && (
            <div className="flex items-center mt-1 text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.password}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full !py-3 text-lg">
          Log In
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <button
          onClick={switchToSignup}
          className="font-medium text-red-600 hover:text-red-500"
        >
          Sign up
        </button>
      </p>
    </Modal>
  );
};

export default LoginModal;
