import asyncHandler from "express-async-handler";
import Goal from "../model/Goal.js";
import User from "../model/User.js";
//Retrieve
export const getGoal = async (req, res) => {
  try {
    const temp = await Goal.find({ user: req.user?.id });
    return res.status(200).json(temp);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Create
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Error, put some Entries of Data" });
  }

  const temp = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  return res.status(200).json(temp);
});

//EDIT GOALS

export const editGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  try {
    if (!goal) {
      return res.status(400).json({ message: " enter data again " });
    }
    //Authenticating the User
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res
        .status(401)
        .json({ message: "You are not Registered , No Authenticity" });
    }

    //   //Confirming the Authorization
    if (goal.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ message: " This is not your goal , Not Authorized " });
    }

    return res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update

export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ message: " enter data again " });
  }
  //Authenticating the User
  const user = await User.findById({ _id: req.user.id });
  if (!user) {
    return res
      .status(401)
      .json({ message: "You are not Registered , No Authenticity" });
  }

  //   //Confirming the Authorization
  if (goal.user.toString() !== req.user.id) {
    return res
      .status(400)
      .json({ message: " This is not your goal , Not Authorized " });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json(updatedGoal);
});

// Delete
export const delGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ message: " enter id again " });
  }
  //Authenticating the User
  const user = await User.findById({ _id: req.user.id });
  if (!user) {
    res
      .status(401)
      .json({ message: "You are not Registered , No Authenticity" });
  }
  //Confirming the Authorization
  if (goal.user.toString() !== req.user.id) {
    res
      .status(400)
      .json({ message: " This is not your goal , Not Authorized " });
  }
  await goal.remove();

  const temp = await Goal.find({ user: req.user.id });

  return res.status(200).json(temp);
});

export const delALL = asyncHandler(async (req, res) => {
  try {
    await Goal.remove({}, (err) => console.log("success"));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
