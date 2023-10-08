import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

// Function to make POST requests to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make POST requests to login with phone OTP
export const loginWithPhoneOtp = async (phone) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login_with_phone`, phone);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make POST requests to verify phone OTP
export const verifyPhoneOtp = async (otpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify_otp`, otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
