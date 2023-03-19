import axios from "../../config/axios";
const API_URL = "/goals";
//CREATE GOALS
const createGoal = async (text, token) => {
  const createGoalsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "/create",
    text,
    createGoalsConfig
  );
  return response.data;
};

//GETGOALS
const getGoals = async (token) => {
  const GetGoalsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, GetGoalsConfig);

  return response.data;
};

//DELETE GOALS
const deleteGoal = async (id, token) => {
  const delGoalsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "/del/" + id, delGoalsConfig);
  return response.data;
};
//EDIT USER
const editGoal = async (id, token) => {
  const editGoalConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `/edit/${id}`, editGoalConfig);
  return response.data;
};
//UPDATE GOALS
const updateGoal = async (id, updatedText, token) => {
  const updateGoalConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "/update/" + id,
    updatedText,
    updateGoalConfig
  );
  return response.data;
};
const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  editGoal,
  updateGoal,
};
export default goalService;
