import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  toggleSignupModal,
  toggleLoginModal,
} from "../../store/slices/userSlice.js";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { User, Lock, Mail } from "lucide-react";

const SignupModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.isSignupModalOpen);

  const handleClose = () => dispatch(toggleSignupModal());

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you'd dispatch an async thunk to your backend
    const fakeUser = { name: e.target.name.value, email: e.target.email.value };
    dispatch(login(fakeUser));
  };

  const switchToLogin = () => {
    dispatch(toggleSignupModal());
    dispatch(toggleLoginModal());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Account">
      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          label="Full Name"
          id="name"
          type="text"
          placeholder="Demo User"
          required
        />
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          required
        />
        <Button type="submit">Create Account</Button>
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
