import React from "react";
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

const LoginModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.isLoginModalOpen);

  const handleClose = () => dispatch(toggleLoginModal());

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you'd dispatch an async thunk to your backend
    const fakeUser = { name: "Demo User", email: e.target.email.value };
    dispatch(login(fakeUser));
  };

  const switchToSignup = () => {
    dispatch(toggleLoginModal());
    dispatch(toggleSignupModal());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Welcome Back">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
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
