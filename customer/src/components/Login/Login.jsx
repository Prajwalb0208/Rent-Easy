import React, { useState } from 'react';
import './Login.css';
import { signup, login, signInWithGoogle } from '../../../../backend/config/firebase';
import { assets } from '../../../../admin/assests/assests';

const Login = ({ onClose, onLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign Up") {
      signup(userName, email, password).then(() => {
        onLogin();
        onClose(); // Close the modal after sign-up
      });
    } else {
      login(email, password).then(() => {
        onLogin();
        onClose(); // Close the modal after login
      });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle().then(() => {
      onLogin();
      onClose(); // Close the modal after Google sign-in
    });
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login" onClick={(e) => e.stopPropagation()}>
        <img src={assets.logo_big} alt="" className="logo" />
        <form onSubmit={onSubmitHandler} className="login-form">
          <h2>{currState}</h2>
          {currState === "Sign Up" && (
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              placeholder="Username"
              className="form-input"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>
          <button type="button" className="google-signin" onClick={handleGoogleSignIn}>
            <span>Sign in with Google</span>
          </button>
          <p className="other-signin-options">Other sign-in options...</p>
          <div className="login-term">
            <input type="checkbox" />
            <p>Agree to the terms of use of Privacy Policy</p>
          </div>
          <div className="login-forgot">
            {currState === "Sign Up" ? (
              <p className="login-toggle">
                Already have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span>
              </p>
            ) : (
              <p className="login-toggle">
                Create an Account! <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
