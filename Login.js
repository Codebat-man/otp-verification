import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState(""); // Add state for password
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make an API request to send OTP to the user's phone number
      const response = await axios.post("/api/send-otp", {
        phone: phoneNumber,
      });

      // Handle OTP sent successfully
      console.log("OTP sent successfully:", response.data);

      // You may also implement a timer here to expire the OTP after a certain time

      // Update the UI to display OTP and password input fields
      setOtpInputVisible(true);
      setPasswordInputVisible(true);
    } catch (err) {
      setError("Failed to send OTP. Please check your phone number.");
      setIsLoading(false);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make an API request to verify OTP and password and log in the user
      const response = await axios.post("/api/login-with-otp", {
        phone: phoneNumber,
        otp,
        password, // Send password to the backend for verification
      });

      // Handle successful login here (e.g., store user data in context)
      console.log("Login successful:", response.data);
    } catch (err) {
      setError("Login failed. Please check the OTP and password.");
      setIsLoading(false);
    }
  };

  const [otpInputVisible, setOtpInputVisible] = useState(false);
  const [passwordInputVisible, setPasswordInputVisible] = useState(false); // State to toggle password input visibility

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleOtpLogin}>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        {otpInputVisible ? (
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        ) : null}

        {passwordInputVisible ? (
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading
            ? "Logging in..."
            : otpInputVisible
            ? "Login with OTP"
            : "Get OTP"}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
