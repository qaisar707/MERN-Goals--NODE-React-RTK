import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  const { name, password, password2, email } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [isLoading, isSuccess, isError, message, user, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  const handleNameChange = (e) => {
    setFormData(() => ({
      ...formData,
      name: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setFormData(() => ({
      ...formData,
      email: e.target.value,
    }));
  };
  const handlePasswordChange = (e) => {
    setFormData(() => ({
      ...formData,
      password: e.target.value,
    }));
  };

  const handlePassword2Change = (e) => {
    setFormData(() => ({
      ...formData,
      password2: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          {" "}
          <FaSignInAlt /> Register
        </h1>
        <p>Please Register Account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter Name"
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Enter password again"
              onChange={handlePassword2Change}
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

export default Register;
