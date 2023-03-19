import React from "react";

import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Link } from "react-router-dom";
import moment from "moment";

function GoalItem({ goal }) {
  const id = goal._id;
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteGoal({ id }));
  };

  return (
    <div className="goal">
      {moment(goal.createdAt).format("DD-MM-YYYY")}
      <h1>{goal.text}</h1>
      <Link to={`UpdateGoals/${goal._id}`} className="edit">
        <FaRegEdit />
      </Link>
      <button className="close" onClick={handleDeleteClick}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default GoalItem;
