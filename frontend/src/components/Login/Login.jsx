import React, { useState } from 'react';
import './Login.css';
import { signup, login, signInWithGoogle, verifyOwnerEmail } from '../../../../backend/config/firebase';
import { assets } from '../../assets/assets';

const Login = ({ onClose, onLogin }) => {
  const [currState, setCurrState] = useState("Customer Login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous error

    try {
      if (currState === "Owner Signup") {
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        await verifyOwnerEmail(email, userName, password);
        alert('Verification email sent to ' + email); // Alert for the owner signup
      } else if (currState === "Admin Login") {
        if (adminCode !== "IsAdmin") {
          setError("Invalid admin code!");
          return;
        }
        await login(email, password);
      } else {
        await login(email, password); // Customer login
      }
      onLogin();
      onClose(); // Close the modal after login or signup
    } catch (err) {
      setError(err.message); // Set the error message
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login" onClick={(e) => e.stopPropagation()}>
        <img src={assets.logo_big} alt="" className="logo" />
        <form onSubmit={onSubmitHandler} className="login-form">
          <h2>{currState}</h2>
          {currState === "Owner Signup" && (
            <>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                placeholder="Username"
                className="form-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </>
          )}
          {currState !== "Admin Login" && (
            <>
              <input
                type="email"
                placeholder="Email address"
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </>
          )}
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {currState === "Admin Login" && (
            <input
              type="text"
              placeholder="Admin Code"
              className="form-input"
              onChange={(e) => setAdminCode(e.target.value)}
              value={adminCode}
              required
            />
          )}
          <button type="submit">
            {currState === "Owner Signup" ? "Sign Up" : "Login"}
          </button>
          <p className="error-message">{error}</p>
          <div className="login-toggle">
            {currState === "Customer Login" && (
              <span onClick={() => setCurrState("Owner Signup")}>Sign Up as Owner</span>
            )}
            {currState === "Owner Signup" && (
              <span onClick={() => setCurrState("Customer Login")}>Login as Customer</span>
            )}
            {currState === "Admin Login" && (
              <span onClick={() => setCurrState("Customer Login")}>Login as Customer</span>
            )}
            <span onClick={() => setCurrState("Admin Login")}>Login as Admin</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
