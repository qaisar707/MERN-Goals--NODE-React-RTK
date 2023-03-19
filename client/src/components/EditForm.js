import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editGoal, updateGoal, reset } from "../features/goals/goalSlice";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import { toast } from "react-toastify";
function EditForm() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, goal, isError, message, isSuccess } = useSelector(
    (state) => state.goals
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const text = useRef(null);
  const [updatedInput, setUpdatedInput] = useState("");
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (updatedInput) {
      dispatch(updateGoal({ id, updatedInput }));
      if (isSuccess) {
        navigate("/");
        toast.success("Updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [updatedInput, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user || !id) {
      navigate("/Login");
    } else {
      dispatch(editGoal(id));
    }
    return () => {
      dispatch(reset());
    };
  }, [user, id, isError]);

  // useEffect(() => {
  // }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdatedInput(text.current.value);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            ref={text}
            type="text"
            name="text"
            id="text"
            defaultValue={goal?.text}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn  btn-bloc k">
            Update Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditForm;
