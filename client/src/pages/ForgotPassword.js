import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { forgotPassword } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, user, message, isSuccess } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [redirectReset, setRedirectReset] = useState(false)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [user, isError]);

  useEffect(() => {
    if (redirectReset) {
      dispatch(forgotPassword({ email }))
      navigate(`/resetPassword/${user?.id}`, { state: { id: user?.id } });
    }

    setRedirectReset(false)
  }, [redirectReset])

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirectReset(true)
  };
  const handleEmailChange = (e) => {
    const temp = e.target.value;
    setEmail(temp);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Forgot Password
        </h1>
        <p>Please Enter Your Email</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={handleEmailChange}
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

export default ForgotPassword;
