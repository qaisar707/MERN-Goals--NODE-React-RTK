import axios from "../../config/axios";

const API_URL = "/users/";
//@@@@@@@@@@  REGISTER @@@@@@@@@@
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//@@@@@@@@@@  LOGIN @@@@@@@@@@
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//@@@@@@@@@@  FORGOT PASSWORD @@@@@
const forgotPassword = async ({ email }) => {
  const response = await axios.post(API_URL + "forgot", email);

  return response.data;
};
//@@@@@@@@@@  RESET PASSWORD  @@@@@@@@@@
const resetPassword = async ({ password }) => {
  const response = await axios.post(
    API_URL + "resetPassword/" + password.id,
    password
  );

  return response.data;
};
//@@@@@@@@@@  LOGOUT @@@@@@@@@@
export const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
export default authService;
