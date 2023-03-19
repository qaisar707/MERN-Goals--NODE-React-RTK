import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice.js";
import Goal from "../components/GoalForm";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem.js";
import { toast } from "react-toastify";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, goals, isError, message } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/Login");
    } else if (user) {
      dispatch(getGoals());
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome - {user ? user?.name?.toUpperCase() : "Guest"}</h1>
        <p>Goals Dashboard</p>
      </section>
      <Goal />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <>
            <h1>You Dont have any of the Goals</h1>
          </>
        )}
      </section>
    </>
  );
}

export default Dashboard;
