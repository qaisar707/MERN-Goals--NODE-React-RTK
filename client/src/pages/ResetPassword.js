import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
function ResetPassword() {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [finalPass, setFinalPass] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (finalPass.password === finalPass.confirmPassword) {
      dispatch(
        resetPassword({
          id: location.state.id,
          newPassword: finalPass.password,
          newPassword2: finalPass.confirmPassword,
          otp: finalPass.otp,
        })
      );
      navigate('/Login')
    } else {
      console.log("error");
    }
  };

  const handlePasswordChange = (e) => {
    setFinalPass({
      password: e.target.value,
      confirmPassword: "",
      otp: "",
    });
  };
  const handlePassword2Change = (e) => {
    setFinalPass({
      password: finalPass.password,
      confirmPassword: e.target.value,
      otp: "",
    });
  };

  const handleOptChange = (e) => {
    setFinalPass({
      password: finalPass.password,
      confirmPassword: finalPass.confirmPassword,
      otp: e.target.value,
    });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Reset Password
        </h1>
        <p>Please Enter Your Password</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={finalPass.password}
              placeholder="Enter Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              value={finalPass.confirmPassword}
              placeholder="Enter Password again"
              onChange={handlePassword2Change}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="password3"
              name="password3"
              value={finalPass.otp}
              placeholder="Enter OTP"
              onChange={handleOptChange}
            />
          </div>
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default ResetPassword;
